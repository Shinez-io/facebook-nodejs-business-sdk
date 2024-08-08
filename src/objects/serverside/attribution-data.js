/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * @flow
 */

import AttributionModel from './attribution-model';

/**
 * AttributionData used for attribution passback event to optimize the performance.
 */
export default class AttributionData {
    _scope: string;
    _visit_time: number;
    _ad_id: string;
    _adset_id: string;
    _campaign_id: string;
    _attribution_share: number;
    _attribution_model: AttributionModel;
    _attr_window: number;


    /**
     * @param {String} scope Touchpoint type
     * @param {Number} visit_time Time that the campaign_id or fbc was first received
     * @param {String} ad_id Meta-provided ad id from URL/deeplink
     * @param {String} adset_id Meta-provided adset id from URL/deeplink
     * @param {String} campaign_id Meta-provided campaign id from URL/deeplink
     * @param {Number} attribution_share Range [0-1] weight of credit assigned to the visit
     * @param {AttributionModel} attribution_model Attribution model used to attribute the event, check attribution-model.js file.
     * @param {Number} attr_window Attribution window in days.
     */
    constructor(scope: string, visit_time: number, ad_id: string, adset_id: string, campaign_id: string,
        attribution_share: number, attribution_model: AttributionModel, attr_window: number) {
        this._scope = scope;
        this._visit_time = visit_time;
        this._ad_id = ad_id;
        this._adset_id = adset_id;
        this._campaign_id = campaign_id;
        this._attribution_share = attribution_share;
        this._attribution_model = attribution_model;
        this._attr_window = attr_window;
    }

    /**
     * Returns the scope of the attribution data.
     * Exmaple: 'click'.
     */
    get scope(): string {
        return this._scope;
    }

    /**
     * Set the scope of the attribution data.
     * @param {String} scope Touchpoint type
     */
    set scope(scope: string): void {
        this._scope = scope;
    }

    /**
     * Set the scope of the attribution data.
     * @param {String} scope Touchpoint type
     * @returns {AttributionData}
     */
    setScope(scope: string): AttributionData {
        this._scope = scope;
        return this;
    }

    /**
     * Returns the visit time of the attribution data.
     * Example: 1512345678900
     */
    get visit_time(): number {
        return this._visit_time;
    }

    /**
     * Set the visit time of the attribution data.
     * @param {Number} visit_time Time that the campaign_id or fbc was first received
     */
    set visit_time(visit_time: number): void {
        this._visit_time = visit_time;
    }

    /**
     * Set the visit time of the attribution data.
     * @param {Number} visit_time Time that the campaign_id or fbc was first received
     * @returns {AttributionData}
     */
    setVisitTime(visit_time: number): AttributionData {
        this._visit_time = visit_time;
        return this;
    }

    /**
     * Return the ad id of the attribution data
     * Example: '1233435554'
     */
    get ad_id(): string {
        return this._ad_id;
    }

    /**
     * Set the ad id of the attribution data.
     * @param {String} ad_id Meta-provided ad id from URL/deeplink
     */
    set ad_id(ad_id: string): void {
        this._ad_id = ad_id;
    }

    /**
     * Set the ad id of the attribution data.
     * @param {String} ad_id Meta-provided ad id from URL/deeplink
     * @returns {AttributionData}
     */
    setAdId(ad_id: string): AttributionData {
        this._ad_id = ad_id;
        return this;
    }

    /**
     * Return the adset id of the attribution data
     * Example: '1233435554'
     */
    get adset_id(): string {
        return this._adset_id;
    }

    /**
     * Set the adset id of the attribution data.
     * @param {String} adset_id Meta-provided adset id from URL/deeplink
     */
    set adset_id(adset_id: string): void {
        this._adset_id = adset_id;
    }

    /**
     * Set the adset id of the attribution data.
     * @param {String} adset_id Meta-provided adset id from URL/deeplink
     * @returns {AttributionData}
     */
    setAdsetId(adset_id: string): AttributionData {
        this._adset_id = adset_id;
        return this;
    }

    /**
     * Return the campaign id of the attribution data
     * Example: '1233435554'
     */
    get campaign_id(): string {
        return this._campaign_id;
    }

    /**
     * Set the campaign id of the attribution data.
     * @param {String} campaign_id Meta-provided campaign id from URL/deeplink
     */
    set campaign_id(campaign_id: string): void {
        this._campaign_id = campaign_id;
    }

    /**
     * Set the campaign id of the attribution data.
     * @param {String} campaign_id Meta-provided campaign id from URL/deeplink
     * @returns {AttributionData}
     */
    setCampaignId(campaign_id: string): AttributionData {
        this._campaign_id = campaign_id;
        return this;
    }

    /**
     * Returns the attribution share of the attribution data.
     * Example: 0.3
     */
    get attribution_share(): number {
        return this._attribution_share;
    }

    /**
     * Set the attribution share of the attribution data.
     * @param {Number} attribution_share Time that the campaign_id or fbc was first received
     */
    set attribution_share(attribution_share: number): void {
        this._attribution_share = attribution_share;
    }

    /**
     * Set the attribution share of the attribution data.
     * @param {Number} attribution_share Time that the campaign_id or fbc was first received
     * @returns {AttributionData}
     */
    setAttributionShare(attribution_share: number): AttributionData {
        this._attribution_share = attribution_share;
        return this;
    }

    /**
     * Return the attribution model of the attribution data
     * Example: 'last-click'
     */
    get attribution_model(): AttributionModel {
        return this._attribution_model;
    }

    /**
     * Set the attribution model of the attribution data.
     * @param {AttributionModel} attribution_model Advertiser attribution model
     */
    set attribution_model(attribution_model: AttributionModel): void {
        this._attribution_model = attribution_model;
    }

    /**
     * Set the attribution model of the attribution data.
     * @param {String} attribution_model Advertiser attribution model
     * @returns {AttributionData}
     */
    setAttributionModel(attribution_model: AttributionModel): AttributionData {
        this._attribution_model = attribution_model;
        return this;
    }

    /**
     * Return the attribution window of the attribution data
     * Example: 7
     */
    get attr_window(): number {
        return this._attr_window;
    }

    /**
     * Set the attribution window of the attribution data.
     * @param {Number} attr_window Attribution window in days
     */
    set attr_window(attr_window: number): void {
        this._attr_window = attr_window;
    }

    /**
     * Set the attribution window of the attribution data.
     * @param {Number} attr_window Attribution window in days
     * @returns {AttributionData}
     */
    setAttrWindow(attr_window: number): AttributionData {
        this._attr_window = attr_window;
        return this;
    }


    /**
	 * Returns the normalized payload for the attribution data.
	 * @returns {Object} normalized attribution data payload.
	 */
	normalize(): Object {

		const attributionData = {};

		if (this.scope) {
			attributionData.scope = this.scope;
		}

		if (this.visit_time) {
			attributionData.visit_time = this.visit_time;
		}

        if (this.ad_id) {
			attributionData.ad_id = this.ad_id;
		}

		if (this.adset_id) {
			attributionData.adset_id = this.adset_id;
		}

        if (this.campaign_id) {
			attributionData.campaign_id = this.campaign_id;
		}

		if (this.attribution_share) {
			attributionData.attribution_share = this.attribution_share;
		}

        if (this.attribution_model) {
			attributionData.attribution_model = this.attribution_model;
		}

        if (this.attr_window) {
			attributionData.attr_window = this.attr_window;
        }

		return attributionData;
	}
}
