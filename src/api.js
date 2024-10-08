/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * @flow
 * @format
 */
import Http from './http';
import { FacebookRequestError } from './exceptions';
import CrashReporter from './crash-reporter';
var promiseRetry = require('promise-retry');

let apiUsage = {};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
/**
 * Facebook Ads API
 */
export default class FacebookAdsApi {
  _debug: boolean;
  _showHeader: boolean;
  _showRequest: boolean;
  _showResponse: boolean;
  _showUsage: boolean;
  _useRateLimit: boolean;
  _retryNumber: number;
  accessToken: string;
  locale: string;
  static _defaultApi: FacebookAdsApi;
  static get VERSION(): string {
    return 'v20.0';
  }
  static get SDK_VERSION(): string {
    return '20.0.0';
  }
  static get GRAPH(): string {
    return 'https://graph.facebook.com';
  }

  static get GRAPH_VIDEO(): string {
    return 'https://graph-video.facebook.com';
  }

  /**
   * @param {String} accessToken
   * @param {String} [locale]
   */
  constructor (accessToken: string, locale: string = 'en_US', crash_log: boolean = true) {
    if (!accessToken) {
      throw new Error('Access token required');
    }
    this.accessToken = accessToken;
    this.locale = locale;
    this._debug = false;
    this._showHeader = false;
    this._showRequest = false;
    this._showResponse = false;
    this._showUsage = false;
    this._useRateLimit = false;
    this._retryNumber = 3;
    if (crash_log) {
      CrashReporter.enable();
    }
  }

  /**
   * Instantiate an API and store it as the default
   * @param  {String} accessToken
   * @param  {String} [locale]
   * @return {FacebookAdsApi}
   */
  static init (accessToken: string, locale: string = 'en_US', crash_log: boolean = true): FacebookAdsApi {
    const api = new this(accessToken, locale, crash_log);
    this.setDefaultApi(api);
    return api;
  }

  static setDefaultApi (api: FacebookAdsApi) {
    this._defaultApi = api;
  }

  static getDefaultApi(): FacebookAdsApi {
    return this._defaultApi;
  }

  getAppID (): Promise<*> {
    let url = [FacebookAdsApi.GRAPH, FacebookAdsApi.VERSION, 'debug_token'].join('/');
    type Params = {
      [key: string]: any
    };
    let params: Params = {};

    params['access_token'] = this.accessToken;
    params['input_token'] = this.accessToken;
    params['fields'] = 'app_id';
    url += `?${FacebookAdsApi._encodeParams(params)}`;

    return Http.request('GET', url, {}, {}, false);
  }

  setDebug (flag: boolean): FacebookAdsApi {
    this._debug = flag;
    return this;
  }

  setShowHeader (flag: boolean): FacebookAdsApi {
    this._showHeader = flag;
    return this;
  }

  setShowRequest (flag: boolean): FacebookAdsApi {
    this._showRequest = flag;
    return this;
  }

  setShowResponse (flag: boolean): FacebookAdsApi {
    this._showResponse = flag;
    return this;
  }

  setShowUsage (flag: boolean): FacebookAdsApi {
    this._showUsage = flag;
    return this;
  }

  setUseRateLimit (flag: boolean): FacebookAdsApi {
    this._useRateLimit = flag;
    return this;
  }

  setRetryNumber (n: number): FacebookAdsApi {
    this._retryNumber = n;
    return this;
  }

  /**
   * Http Request
   * @param  {String} method
   * @param  {String} path
   * @param  {Object} [params]
   * @param  {Object} [files]
   * @return {Promise}
   */
  call (
    method: string,
    path: string | Array<string> | String,
    params: Object = {},
    files: Object = {},
    useMultipartFormData: boolean = false,
    urlOverride: string = ''
  ): Promise<*> {
    let url: any;
    let data: Object = {};
    if (method === 'POST' || method === 'PUT') {
      data = params;
      params = {};
    }
    const domain = urlOverride || FacebookAdsApi.GRAPH;
    if (typeof path !== 'string' && !(path instanceof String)) {
      url = [domain, FacebookAdsApi.VERSION, ...path].join('/');
      params['access_token'] = this.accessToken;
      url += `?${FacebookAdsApi._encodeParams(params)}`;
    } else {
      url = path;
    }
    const strUrl: string = (url: any);
    if (this._showUsage) {
      console.log(`apiUsage: ${JSON.stringify(apiUsage)}`);
    }
    return promiseRetry({ retries: this._retryNumber, factor: 3 }, (retry, number) => {
      if (this._showRequest) {
        console.log(`200 ${method} ${url} ${Object.keys(data).length > 0 ? JSON.stringify(data) : ''}`);
      }

      return Http.request(method, strUrl, data, files, useMultipartFormData, this._showHeader).catch((err) => {
        const strErr = err.toString();
        const headers = err.response && err.response.headers || {};
        console.error(
          `Caught error: ${strErr} Request: ${method} ${url} ${
            Object.keys(data).length > 0 ? JSON.stringify(data) : ''
          } Headers: ${JSON.stringify(headers)} `
        );
        if (headers['x-app-usage']) {
          // see https://developers.facebook.com/docs/graph-api/overview/rate-limiting#headers
          apiUsage['x-app-usage'] = headers['x-app-usage'];
        }
        if (
          strErr &&
          (/*strErr.includes('User request limit reached') || */
            strErr.includes('An unknown error occurred') ||
            (strErr.includes('Application request limit reached') && this._useRateLimit) ||
            strErr.includes('An unknown error has occurred') ||
            strErr.includes('unexpected error has occurred') ||
            strErr.includes('Unsupported post request') ||
            /*strErr.includes('Please try again later') || */
            strErr.includes('StatusCodeError: 5') ||
            strErr.includes('Unexpected token < in JSON at position 0') ||
            strErr.includes('Unexpected token S in JSON at position 0') ||
            strErr.includes('Could not roll back transaction: Something went wrong with the DB connection.') ||
            strErr.includes('Client network socket disconnected before secure TLS connection was established') ||
            strErr.includes("Cannot read property 'error_user_msg' of undefined"))
        ) {
          if (apiUsage['x-app-usage']) {
            // see https://developers.facebook.com/docs/graph-api/overview/rate-limiting#headers
            const usage = JSON.parse(apiUsage['x-app-usage']);
            if (this._useRateLimit) {
              const hour_percent_total = usage.total_time;
              // wait for 10% of the hour (6 minutes if we used 100%(total_time=100)
              const max_minutes_to_wait = Math.min(60, (60 * hour_percent_total) / 100 / 10);
              console.error(
                `We have used ${hour_percent_total} % of hour limit. Wait ${max_minutes_to_wait} minutes before call again!`
              );
              return sleep(max_minutes_to_wait * 60 * 1000).then(() => retry(err));
            }
          }
          console.warn(`FBSDK: Retry request attempt number: ${number} after ${strErr}`);
          retry(err);
        }
        throw err;
      });
    })
      .then((response) => {
        if (response.headers) {
          if (response.headers['x-business-use-case-usage']) {
            apiUsage['x-business-use-case-usage'] = response.headers['x-business-use-case-usage'];
          }
          if (response.headers['x-app-usage']) {
            apiUsage['x-app-usage'] = response.headers['x-app-usage'];
          }
        }

        if (this._showResponse) {
          console.log(`Response: ${response ? JSON.stringify(response) : ''}`);
        }
        if (this._showHeader) {
          response.data['headers'] = response.headers;
        }

        response = response.data;

        if (this._debug) {
          console.log(`200 ${method} ${url} ${Object.keys(data).length > 0 ? JSON.stringify(data) : ""}`);
          console.log(
            `Response: ${response ? JSON.stringify(response) : ""}`
          );
        }
        return Promise.resolve(response);
      })
      .catch(response => {
        if (this._debug && response.response) {
          console.log(
            `${response.response.status} ${method} ${url}
            ${Object.keys(data).length > 0 ? JSON.stringify(data) : ''}`,
          );
        }
        throw response;
      });
  }

  static _encodeParams(params: Object): string {
    return Object.keys(params)
      .map((key) => {
        var param = params[key];
        if (typeof param === 'object') {
          param = param ? JSON.stringify(param) : '';
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(param)}`;
      })
      .join('&');
  }
}
