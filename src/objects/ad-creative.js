/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * @flow
 */
import {AbstractCrudObject} from './../abstract-crud-object';
import AbstractObject from './../abstract-object';
import Cursor from './../cursor';
import AdCreativeInsights from './ad-creative-insights';
import AdPreview from './ad-preview';

/**
 * AdCreative
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */
export default class AdCreative extends AbstractCrudObject {
  static get Fields (): Object {
    return Object.freeze({
      account_id: 'account_id',
      actor_id: 'actor_id',
      adlabels: 'adlabels',
      applink_treatment: 'applink_treatment',
      asset_feed_spec: 'asset_feed_spec',
      authorization_category: 'authorization_category',
      auto_update: 'auto_update',
      body: 'body',
      branded_content_sponsor_page_id: 'branded_content_sponsor_page_id',
      bundle_folder_id: 'bundle_folder_id',
      call_to_action_type: 'call_to_action_type',
      categorization_criteria: 'categorization_criteria',
      category_media_source: 'category_media_source',
      destination_set_id: 'destination_set_id',
      dynamic_ad_voice: 'dynamic_ad_voice',
      effective_authorization_category: 'effective_authorization_category',
      effective_instagram_media_id: 'effective_instagram_media_id',
      effective_instagram_story_id: 'effective_instagram_story_id',
      effective_object_story_id: 'effective_object_story_id',
      enable_direct_install: 'enable_direct_install',
      enable_launch_instant_app: 'enable_launch_instant_app',
      id: 'id',
      image_crops: 'image_crops',
      image_hash: 'image_hash',
      image_url: 'image_url',
      instagram_actor_id: 'instagram_actor_id',
      instagram_permalink_url: 'instagram_permalink_url',
      instagram_story_id: 'instagram_story_id',
      instagram_user_id: 'instagram_user_id',
      interactive_components_spec: 'interactive_components_spec',
      link_deep_link_url: 'link_deep_link_url',
      link_destination_display_url: 'link_destination_display_url',
      link_og_id: 'link_og_id',
      link_url: 'link_url',
      messenger_sponsored_message: 'messenger_sponsored_message',
      name: 'name',
      object_id: 'object_id',
      object_store_url: 'object_store_url',
      object_story_id: 'object_story_id',
      object_story_spec: 'object_story_spec',
      object_type: 'object_type',
      object_url: 'object_url',
      place_page_set_id: 'place_page_set_id',
      platform_customizations: 'platform_customizations',
      playable_asset_id: 'playable_asset_id',
      portrait_customizations: 'portrait_customizations',
      product_set_id: 'product_set_id',
      recommender_settings: 'recommender_settings',
      source_instagram_media_id: 'source_instagram_media_id',
      status: 'status',
      template_url: 'template_url',
      template_url_spec: 'template_url_spec',
      thumbnail_url: 'thumbnail_url',
      title: 'title',
      url_tags: 'url_tags',
      use_page_actor_override: 'use_page_actor_override',
      video_id: 'video_id',
    });
  }

  static get CallToActionType (): Object {
    return Object.freeze({
      add_to_cart: 'ADD_TO_CART',
      apply_now: 'APPLY_NOW',
      book_travel: 'BOOK_TRAVEL',
      buy: 'BUY',
      buy_now: 'BUY_NOW',
      buy_tickets: 'BUY_TICKETS',
      call: 'CALL',
      call_me: 'CALL_ME',
      call_now: 'CALL_NOW',
      contact: 'CONTACT',
      contact_us: 'CONTACT_US',
      donate: 'DONATE',
      donate_now: 'DONATE_NOW',
      download: 'DOWNLOAD',
      event_rsvp: 'EVENT_RSVP',
      find_a_group: 'FIND_A_GROUP',
      find_your_groups: 'FIND_YOUR_GROUPS',
      follow_news_storyline: 'FOLLOW_NEWS_STORYLINE',
      follow_page: 'FOLLOW_PAGE',
      follow_user: 'FOLLOW_USER',
      get_directions: 'GET_DIRECTIONS',
      get_offer: 'GET_OFFER',
      get_offer_view: 'GET_OFFER_VIEW',
      get_quote: 'GET_QUOTE',
      get_showtimes: 'GET_SHOWTIMES',
      install_app: 'INSTALL_APP',
      install_mobile_app: 'INSTALL_MOBILE_APP',
      learn_more: 'LEARN_MORE',
      like_page: 'LIKE_PAGE',
      listen_music: 'LISTEN_MUSIC',
      listen_now: 'LISTEN_NOW',
      message_page: 'MESSAGE_PAGE',
      mobile_download: 'MOBILE_DOWNLOAD',
      moments: 'MOMENTS',
      no_button: 'NO_BUTTON',
      open_link: 'OPEN_LINK',
      order_now: 'ORDER_NOW',
      pay_to_access: 'PAY_TO_ACCESS',
      play_game: 'PLAY_GAME',
      purchase_gift_cards: 'PURCHASE_GIFT_CARDS',
      record_now: 'RECORD_NOW',
      refer_friends: 'REFER_FRIENDS',
      request_time: 'REQUEST_TIME',
      say_thanks: 'SAY_THANKS',
      see_more: 'SEE_MORE',
      sell_now: 'SELL_NOW',
      send_a_gift: 'SEND_A_GIFT',
      send_gift_money: 'SEND_GIFT_MONEY',
      share: 'SHARE',
      shop_now: 'SHOP_NOW',
      sign_up: 'SIGN_UP',
      sotto_subscribe: 'SOTTO_SUBSCRIBE',
      start_order: 'START_ORDER',
      subscribe: 'SUBSCRIBE',
      swipe_up_product: 'SWIPE_UP_PRODUCT',
      swipe_up_shop: 'SWIPE_UP_SHOP',
      update_app: 'UPDATE_APP',
      use_app: 'USE_APP',
      use_mobile_app: 'USE_MOBILE_APP',
      video_annotation: 'VIDEO_ANNOTATION',
      video_call: 'VIDEO_CALL',
      visit_pages_feed: 'VISIT_PAGES_FEED',
      watch_more: 'WATCH_MORE',
      watch_video: 'WATCH_VIDEO',
      whatsapp_message: 'WHATSAPP_MESSAGE',
      woodhenge_support: 'WOODHENGE_SUPPORT',
    });
  }
  static get ObjectType (): Object {
    return Object.freeze({
      application: 'APPLICATION',
      domain: 'DOMAIN',
      event: 'EVENT',
      invalid: 'INVALID',
      offer: 'OFFER',
      page: 'PAGE',
      photo: 'PHOTO',
      post_deleted: 'POST_DELETED',
      privacy_check_fail: 'PRIVACY_CHECK_FAIL',
      share: 'SHARE',
      status: 'STATUS',
      store_item: 'STORE_ITEM',
      video: 'VIDEO',
    });
  }
  static get Status (): Object {
    return Object.freeze({
      active: 'ACTIVE',
      deleted: 'DELETED',
      in_process: 'IN_PROCESS',
      with_issues: 'WITH_ISSUES',
    });
  }
  static get ApplinkTreatment (): Object {
    return Object.freeze({
      automatic: 'automatic',
      deeplink_with_appstore_fallback: 'deeplink_with_appstore_fallback',
      deeplink_with_web_fallback: 'deeplink_with_web_fallback',
      web_only: 'web_only',
    });
  }
  static get AuthorizationCategory (): Object {
    return Object.freeze({
      none: 'NONE',
      political: 'POLITICAL',
    });
  }
  static get CategorizationCriteria (): Object {
    return Object.freeze({
      brand: 'brand',
      category: 'category',
      product_type: 'product_type',
    });
  }
  static get CategoryMediaSource (): Object {
    return Object.freeze({
      category: 'CATEGORY',
      mixed: 'MIXED',
      products_collage: 'PRODUCTS_COLLAGE',
      products_slideshow: 'PRODUCTS_SLIDESHOW',
    });
  }
  static get DynamicAdVoice (): Object {
    return Object.freeze({
      dynamic: 'DYNAMIC',
      story_owner: 'STORY_OWNER',
    });
  }
  static get InstantCheckoutSetting (): Object {
    return Object.freeze({
      off: 'off',
      on: 'on',
    });
  }
  static get Operator (): Object {
    return Object.freeze({
      all: 'ALL',
      any: 'ANY',
    });
  }

  createAdLabel (fields: Array<string>, params: Object = {}, pathOverride?: ?string = null): Promise<AdCreative> {
    return this.createEdge(
      '/adlabels',
      fields,
      params,
      AdCreative,
      pathOverride,
    );
  }

  getCreativeInsights (fields: Array<string>, params: Object = {}, fetchFirstPage: boolean = true): Cursor | Promise<*> {
    return this.getEdge(
      AdCreativeInsights,
      fields,
      params,
      fetchFirstPage,
      '/creative_insights'
    );
  }

  getPreviews (fields: Array<string>, params: Object = {}, fetchFirstPage: boolean = true): Cursor | Promise<*> {
    return this.getEdge(
      AdPreview,
      fields,
      params,
      fetchFirstPage,
      '/previews'
    );
  }

  // $FlowFixMe : Support Generic Types
  delete (fields: Array<string>, params: Object = {}): AbstractObject {
    // $FlowFixMe : Support Generic Types
    return super.delete(
      params
    );
  }

  
  get (fields: Array<string>, params: Object = {}): AdCreative {
    // $FlowFixMe : Support Generic Types
    return this.read(
      fields,
      params
    );
  }

  // $FlowFixMe : Support Generic Types
  update (fields: Array<string>, params: Object = {}): AdCreative {
    // $FlowFixMe : Support Generic Types
    return super.update(
      params
    );
  }
}
