import { Inject, Injectable, NgModule } from '@angular/core';
import { set, merge } from 'lodash';
import { Subject, Observable } from 'rxjs';
import { createInstance } from 'localforage';
import { HttpHeaders, HttpParams, HttpClient, HttpErrorResponse, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import * as moment from 'moment';
import { __spread, __extends } from 'tslib';
import { tap } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Config = /** @class */ (function () {
    /**
     * Create a new instance of the service..
     */
    function Config(_options) {
        this._options = _options;
        this.options = Config.defaultOptions;
        this.setOptions(this._options);
    }
    /**
     * Return the configurable options.
     */
    /**
     * Return the configurable options.
     * @return {?}
     */
    Config.prototype.getOptions = /**
     * Return the configurable options.
     * @return {?}
     */
    function () { return this.options; };
    /**
     * Get an option by key.
     *
     * @param   key
     * @param   override
     */
    /**
     * Get an option by key.
     *
     * @param {?} key
     * @param {?=} override
     * @return {?}
     */
    Config.prototype.get = /**
     * Get an option by key.
     *
     * @param {?} key
     * @param {?=} override
     * @return {?}
     */
    function (key, override) {
        if (override === void 0) { override = false; }
        return Config.getItem(key, override);
    };
    /**
     * Static method to get an option by key.
     *
     * @param   key
     * @param   override
     */
    /**
     * Static method to get an option by key.
     *
     * @param {?} key
     * @param {?=} override
     * @return {?}
     */
    Config.getItem = /**
     * Static method to get an option by key.
     *
     * @param {?} key
     * @param {?=} override
     * @return {?}
     */
    function (key, override) {
        if (override) {
            return override;
        }
        if (Config.defaultOptions) {
            return key.split('.').reduce(function (o, i) { return o[i]; }, Config.defaultOptions);
        }
    };
    /**
     * Set an option by key.
     *
     * @param   key
     * @param  value
     */
    /**
     * Set an option by key.
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    Config.prototype.setItem = /**
     * Set an option by key.
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        return set(this.options, key, value);
    };
    /**
     * Set the configurable options.
     *
     * @param  options
     */
    /**
     * Set the configurable options.
     *
     * @param {?} options
     * @return {?}
     */
    Config.prototype.setOptions = /**
     * Set the configurable options.
     *
     * @param {?} options
     * @return {?}
     */
    function (options) {
        this.options = merge(this.options, options);
        return this;
    };
    /**
     * Default configuration.
     */
    Config.defaultOptions = {
        /**
                 * Authentication settings.
                 */
        authentication: {
            /**
                         * Common endpoints for authentication sercice.
                         */
            endpoints: {
                check: '',
                forogotPassword: '',
                getUser: '',
                login: '',
                logout: '',
                register: '',
                resetPassword: '',
                socialAuth: ''
            },
            /**
                         * Methods used for authentication.
                         */
            method: {
                token: true
            },
            /**
                         * Social provider configuration.
                         */
            social: {
                facebook: {
                    id: '',
                    version: 'v2.6',
                    xfbml: true,
                    scope: 'public_profile,email'
                },
                twitter: {
                    id: ''
                },
                redirectTo: '',
                oauthProxy: ''
            }
        },
        /**
                 * Authorization options.
                 */
        authorization: {},
        /**
                 * Http options.
                 */
        http: {
            /**
                         * Based url for http requests.
                         */
            baseUrl: '',
            /**
                         * Default headers for http request.
                         */
            headers: {}
        },
        /**
                 * Storage Options
                 */
        storage: {
            name: 'ngkitStorage'
        },
        /**
                 * Token options.
                 */
        token: {
            /**
                         * Default name of authorization token read from responses.
                         */
            readAs: 'token',
            /**
                         * Default name of authorization token that is stored.
                         */
            storeAs: '_token',
            /**
                         * Scheme to use in Authorization header along with token.
                         */
            scheme: 'Bearer'
        },
        /**
                 * Cache service options.
                 */
        cache: {
            /**
                         * Default expiration time in minutes.
                         */
            expires: 5
        },
        /**
                 * Enable debug mode.
                 */
        debug: false
    };
    Config.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Config.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['ngKitOptions',] }] }
    ]; };
    return Config;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Event = /** @class */ (function () {
    function Event() {
    }
    /**
     * Get an event listener.
     *
     * @param  key
     */
    /**
     * Get an event listener.
     *
     * @param {?} key
     * @return {?}
     */
    Event.channel = /**
     * Get an event listener.
     *
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (typeof Event.channels[key] === 'undefined') {
            Event.channels[key] = new Subject();
        }
        return Event.channels[key];
    };
    /**
     * Set multiple event channels.
     *
     * @param events
     */
    /**
     * Set multiple event channels.
     *
     * @param {?} channels
     * @return {?}
     */
    Event.prototype.setChannels = /**
     * Set multiple event channels.
     *
     * @param {?} channels
     * @return {?}
     */
    function (channels) {
        channels.forEach(function (channel) { return Event.channel(channel); });
    };
    /**
     * Broadcast an event to a channel.
     */
    /**
     * Broadcast an event to a channel.
     * @param {?} key
     * @param {?=} data
     * @return {?}
     */
    Event.prototype.broadcast = /**
     * Broadcast an event to a channel.
     * @param {?} key
     * @param {?=} data
     * @return {?}
     */
    function (key, data) {
        if (data === void 0) { data = {}; }
        return Promise.resolve(Event.channel(key).next(data));
    };
    /**
     *  Listen on a channel for an event.s
     *
     * @param  key
     */
    /**
     *  Listen on a channel for an event.s
     *
     * @param {?} key
     * @return {?}
     */
    Event.prototype.listen = /**
     *  Listen on a channel for an event.s
     *
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return Event.channel(key).asObservable();
    };
    /**
     * Event channels.
     */
    Event.channels = [];
    Event.decorators = [
        { type: Injectable },
    ];
    return Event;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Storage = /** @class */ (function () {
    /**
     * Create a new instance of the service.
     *
     * @param config
     */
    function Storage(config) {
        this.config = config;
        this.db = createInstance({
            name: this.config.get('storage.name')
        });
    }
    /**
     * Get item from local storage.
     */
    /**
     * Get item from local storage.
     * @param {?} key
     * @return {?}
     */
    Storage.prototype.get = /**
     * Get item from local storage.
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.db.getItem(key);
    };
    /**
     * Set an item to local storage.
     *
     * @param  key
     * @param  value
     */
    /**
     * Set an item to local storage.
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    Storage.prototype.set = /**
     * Set an item to local storage.
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        return this.db.setItem(key, value);
    };
    /**
     * Remove an item from local storage.
     *
     * @param   key
     */
    /**
     * Remove an item from local storage.
     *
     * @param {?} key
     * @return {?}
     */
    Storage.prototype.remove = /**
     * Remove an item from local storage.
     *
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.db.removeItem(key);
    };
    /**
     * Clear local storage.
     */
    /**
     * Clear local storage.
     * @return {?}
     */
    Storage.prototype.clear = /**
     * Clear local storage.
     * @return {?}
     */
    function () {
        return this.db.clear();
    };
    Storage.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Storage.ctorParameters = function () { return [
        { type: Config }
    ]; };
    return Storage;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Token = /** @class */ (function () {
    /**
     * Constructor.
     *
     * @param  config
     * @param  storage
     */
    function Token(config, storage) {
        this.config = config;
        this.storage = storage;
        /**
         * Name of token stored in local storage.
         */
        this._token = '_token';
    }
    /**
     * Get the token from local storage.
     *
     * @param  tokenName
     */
    /**
     * Get the token from local storage.
     *
     * @param {?=} tokenName
     * @return {?}
     */
    Token.prototype.get = /**
     * Get the token from local storage.
     *
     * @param {?=} tokenName
     * @return {?}
     */
    function (tokenName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            tokenName = tokenName || _this.config.get('token.name', _this._token);
            _this.storage.get(tokenName).then(function (token) {
                resolve(token);
            }, function (err) { return reject(err); });
        });
    };
    /**
     * Store the token in local storage.
     *
     * @param  token
     * @param  tokenName
     */
    /**
     * Store the token in local storage.
     *
     * @param {?} token
     * @param {?=} tokenName
     * @return {?}
     */
    Token.prototype.set = /**
     * Store the token in local storage.
     *
     * @param {?} token
     * @param {?=} tokenName
     * @return {?}
     */
    function (token, tokenName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            tokenName = tokenName || _this.config.get('token.name', _this._token);
            if (token) {
                _this.storage.set(tokenName, token).then(function () {
                    resolve(true);
                }, function () { return reject('Error: Could not store token.'); });
            }
            else {
                reject('Error: No token provided.');
            }
        });
    };
    /**
     * Remove token from local storage.
     *
     * @param  tokenName
     */
    /**
     * Remove token from local storage.
     *
     * @param {?=} tokenName
     * @return {?}
     */
    Token.prototype.remove = /**
     * Remove token from local storage.
     *
     * @param {?=} tokenName
     * @return {?}
     */
    function (tokenName) {
        tokenName = tokenName || this.config.get('token.name', this._token);
        this.storage.remove(tokenName);
        return true;
    };
    /**
     * Read a token from a response object.
     *
     * @param  response
     */
    /**
     * Read a token from a response object.
     *
     * @param {?=} response
     * @return {?}
     */
    Token.prototype.read = /**
     * Read a token from a response object.
     *
     * @param {?=} response
     * @return {?}
     */
    function (response) {
        if (response === void 0) { response = null; }
        if (response) {
            var /** @type {?} */ key = this.config.get('token.readAs');
            return key.split('.').reduce(function (o, i) { return o[i]; }, response);
        }
        return null;
    };
    Token.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Token.ctorParameters = function () { return [
        { type: Config },
        { type: Storage }
    ]; };
    return Token;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Http = /** @class */ (function () {
    /**
     * Create a new instance of the service.
     *
     * @param  config
     * @param  event
     * @param  token
     */
    function Http(config, event, token) {
        this.config = config;
        this.event = event;
        this.token = token;
        /**
         * Assignable base url for http calls.
         */
        this.baseUrl = '';
        /**
         * Headers to be sent with all http calls.
         */
        this.headers = new HttpHeaders();
        /**
         * The subsciptions of the service.
         */
        this.subs = {};
        this.setDefaultHeaders();
        this.eventListeners();
    }
    /**
     * On service destroy.
     */
    /**
     * On service destroy.
     * @return {?}
     */
    Http.prototype.ngOnDestroy = /**
     * On service destroy.
     * @return {?}
     */
    function () {
        var _this = this;
        Object.keys(this.subs).forEach(function (k) { return _this.subs[k].unsubscribe(); });
    };
    /**
     * Build url parameters for requests.
     *
     * @param  params
     */
    /**
     * Build url parameters for requests.
     *
     * @param {?} params
     * @return {?}
     */
    Http.prototype.buildParams = /**
     * Build url parameters for requests.
     *
     * @param {?} params
     * @return {?}
     */
    function (params) {
        var /** @type {?} */ query_params = new HttpParams();
        if (params) {
            Object.keys(params).forEach(function (key) {
                if (params[key])
                    query_params.set(key, params[key]);
            });
        }
        return query_params;
    };
    /**
     * Event listeners.
     * @return {?}
     */
    Http.prototype.eventListeners = /**
     * Event listeners.
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.event) {
            var /** @type {?} */ sub = function () { return _this.setDefaultHeaders(); };
            this.subs['auth:loggingIn'] = this.event.listen('auth:loggingIn').subscribe(sub);
            this.subs['auth:loggedOut'] = this.event.listen('auth:loggedOut').subscribe(sub);
            this.subs['auth:check'] = this.event.listen('auth:check').subscribe(sub);
        }
    };
    /**
     * Get url for http request.
     *
     * @param {?} url
     * @return {?}
     */
    Http.prototype.getUrl = /**
     * Get url for http request.
     *
     * @param {?} url
     * @return {?}
     */
    function (url) {
        if (url.startsWith('/') || url.startsWith('http'))
            return url;
        var /** @type {?} */ baseUrl = this.baseUrl || this.config.get('http.baseUrl') || '';
        return (baseUrl) ? baseUrl + '/' + url : url;
    };
    /**
     * Set the default headers for http request.
     */
    /**
     * Set the default headers for http request.
     * @return {?}
     */
    Http.prototype.setDefaultHeaders = /**
     * Set the default headers for http request.
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ configHeaders = (this.config) ? this.config.get('http.headers') : null;
        if (configHeaders) {
            Object.keys(configHeaders).forEach(function (key) {
                _this.headers = _this.headers.set(key, configHeaders[key]);
            });
        }
        this.tokenHeader();
    };
    /**
     * Add a token header to the request.
     */
    /**
     * Add a token header to the request.
     * @return {?}
     */
    Http.prototype.tokenHeader = /**
     * Add a token header to the request.
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.config && _this.config.get('authentication.method.token')) {
                _this.token.get().then(function (token) {
                    var /** @type {?} */ scheme = _this.config.get('token.scheme');
                    var /** @type {?} */ value = (scheme) ? scheme + " " + token : token;
                    _this.headers = _this.headers.set('Authorization', value);
                    resolve(token ? true : false);
                }, function () {
                    _this.headers = _this.headers.delete('Authorization');
                    resolve(false);
                });
            }
        });
    };
    Http.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Http.ctorParameters = function () { return [
        { type: Config },
        { type: Event },
        { type: Token }
    ]; };
    return Http;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Model for cache items.
 */
var /**
 * Model for cache items.
 */
CacheItemModel = /** @class */ (function () {
    /**
     * Construcotr.
     *
     * @param  item
     */
    function CacheItemModel(item) {
        Object.assign(this, item);
    }
    Object.defineProperty(CacheItemModel.prototype, "value", {
        /**
         * Get value accessor parses JSON.
         */
        get: /**
         * Get value accessor parses JSON.
         * @return {?}
         */
        function () {
            return JSON.parse(this._value);
        },
        /**
         * Set the value mutator that stringifies value.
         *
         * @param  value
         */
        set: /**
         * Set the value mutator that stringifies value.
         *
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._value = JSON.stringify(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CacheItemModel.prototype, "expires", {
        /**
         * Get expires accessor.
         */
        get: /**
         * Get expires accessor.
         * @return {?}
         */
        function () {
            return this._expires;
        },
        /**
         * Set the expires mutator.
         *
         * @param  minutes
         */
        set: /**
         * Set the expires mutator.
         *
         * @param {?} minutes
         * @return {?}
         */
        function (minutes) {
            var /** @type {?} */ expiration = new Date();
            expiration.setMinutes(expiration.getMinutes() + minutes);
            this._expires = expiration.getTime();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Check if cached item is expired.
     */
    /**
     * Check if cached item is expired.
     * @return {?}
     */
    CacheItemModel.prototype.isExpired = /**
     * Check if cached item is expired.
     * @return {?}
     */
    function () {
        return this.expires <= new Date().getTime();
    };
    return CacheItemModel;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Model = /** @class */ (function () {
    /**
     * Create a new instance of the mdoel.
     *
     * @param  attributes
     */
    function Model(attributes) {
        /**
         * Moment JS
         *
         * @return moment
         */
        this.moment = moment;
        if (typeof attributes === 'string') {
            attributes = JSON.parse(attributes);
        }
        Object.assign(this, attributes);
    }
    return Model;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PolicyModel = /** @class */ (function () {
    /**
     * Constructor.
     *
     * @param  policy
     */
    function PolicyModel(policy) {
        /**
         * The objects of the defined policy.
         */
        this.objects = [];
        Object.assign(this, policy);
    }
    return PolicyModel;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UserModel = /** @class */ (function () {
    /**
     * Create a new instance of the model.
     *
     * @param authorization
     * @param user
     */
    function UserModel(authorization, user) {
        this.authorization = authorization;
        this.user = user;
        Object.assign(this, user);
    }
    /**
     * Check if user can perform action based on a policy.
     *
     * @param  key
     * @param  value
     */
    /**
     * Check if user can perform action based on a policy.
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    UserModel.prototype.can = /**
     * Check if user can perform action based on a policy.
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        return this.authorization.checkPolicy(key, value);
    };
    /**
     * Check if user cannot perform action based on a policy.
     *
     * @param  key
     * @param  value
     */
    /**
     * Check if user cannot perform action based on a policy.
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    UserModel.prototype.cannot = /**
     * Check if user cannot perform action based on a policy.
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        return !this.authorization.checkPolicy(key, value);
    };
    /**
     * Allow a user to perform action based on a policy.
     *
     * @param  policyName
     * @param  object
     * @param  allowed
     */
    /**
     * Allow a user to perform action based on a policy.
     *
     * @param {?} policyName
     * @param {?} object
     * @param {?} allowed
     * @return {?}
     */
    UserModel.prototype.allow = /**
     * Allow a user to perform action based on a policy.
     *
     * @param {?} policyName
     * @param {?} object
     * @param {?} allowed
     * @return {?}
     */
    function (policyName, object, allowed) {
        if (typeof allowed === 'function' && allowed()) {
            this.authorization.addPolicy(policyName, object);
        }
        else if (typeof allowed === 'boolean' && allowed) {
            this.authorization.addPolicy(policyName, object);
        }
        else {
            this.authorization.removePolicy(policyName, object);
        }
        return this;
    };
    /**
     * Don't allow a user to perform action based on a policy.
     *
     * @param  policyName
     * @param  object
     * @param  allowed
     */
    /**
     * Don't allow a user to perform action based on a policy.
     *
     * @param {?} policyName
     * @param {?} object
     * @return {?}
     */
    UserModel.prototype.disallow = /**
     * Don't allow a user to perform action based on a policy.
     *
     * @param {?} policyName
     * @param {?} object
     * @return {?}
     */
    function (policyName, object) {
        this.authorization.removePolicy(policyName, object);
        return this;
    };
    /**
     * Identify a user with a role.
     *
     * @param role
     */
    /**
     * Identify a user with a role.
     *
     * @param {?} role
     * @return {?}
     */
    UserModel.prototype.identify = /**
     * Identify a user with a role.
     *
     * @param {?} role
     * @return {?}
     */
    function (role) {
        this.authorization.addPolicy('roles', role);
        return this;
    };
    /**
     * Check if a user is identified as a role.
     *
     * @param  role
     */
    /**
     * Check if a user is identified as a role.
     *
     * @param {?} role
     * @return {?}
     */
    UserModel.prototype.is = /**
     * Check if a user is identified as a role.
     *
     * @param {?} role
     * @return {?}
     */
    function (role) {
        return this.authorization.checkPolicy('roles', role);
    };
    /**
     * Check if a user is not identified with a role.
     *
     * @param  role
     */
    /**
     * Check if a user is not identified with a role.
     *
     * @param {?} role
     * @return {?}
     */
    UserModel.prototype.isNot = /**
     * Check if a user is not identified with a role.
     *
     * @param {?} role
     * @return {?}
     */
    function (role) {
        return !this.authorization.checkPolicy('roles', role);
    };
    return UserModel;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Authorization = /** @class */ (function () {
    /**
     * Constructor.
     */
    function Authorization() {
        /**
         * Active Policies
         */
        this.policies = [];
    }
    /**
     *  Add a policy to the service.
     *
     * @param  key
     * @param  value
     */
    /**
     *  Add a policy to the service.
     *
     * @param {?} key
     * @param {?=} value
     * @return {?}
     */
    Authorization.prototype.addPolicy = /**
     *  Add a policy to the service.
     *
     * @param {?} key
     * @param {?=} value
     * @return {?}
     */
    function (key, value) {
        if (this.policies.findIndex(function (policy) { return policy.name == key; }) < 0) {
            var /** @type {?} */ policy = new PolicyModel({ name: key });
            if (value)
                policy.objects.push(value);
            this.policies.push(policy);
            return true;
        }
        else {
            var /** @type {?} */ index = this.policies.findIndex(function (policy) { return policy.name == key; });
            if (value && !this.policies[index].objects[value]) {
                this.policies[index].objects.push(value);
                return true;
            }
            return false;
        }
    };
    /**
     * Check the given policy.
     *
     * @param  name
     * @param  value
     */
    /**
     * Check the given policy.
     *
     * @param {?} key
     * @param {?=} value
     * @return {?}
     */
    Authorization.prototype.checkPolicy = /**
     * Check the given policy.
     *
     * @param {?} key
     * @param {?=} value
     * @return {?}
     */
    function (key, value) {
        if (value === void 0) { value = null; }
        var /** @type {?} */ check = false;
        var /** @type {?} */ policy = this.policies.find(function (policy) { return policy.name === key; });
        if (policy) {
            check = true;
        }
        if (policy && ((value && policy.objects.indexOf(value) >= 0) ||
            (!value && !policy.objects.length))) {
            check = true;
        }
        else {
            check = false;
        }
        return check;
    };
    /**
     * Clear all the policies on the service.
     */
    /**
     * Clear all the policies on the service.
     * @return {?}
     */
    Authorization.prototype.clearPolicies = /**
     * Clear all the policies on the service.
     * @return {?}
     */
    function () {
        this.policies = [];
    };
    /**
     *  Remove a policy that has already been defined.
     *
     * @param  key
     * @param  value
     */
    /**
     *  Remove a policy that has already been defined.
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    Authorization.prototype.removePolicy = /**
     *  Remove a policy that has already been defined.
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        var /** @type {?} */ policy = this.policies.find(function (policy) { return policy.name === key; });
        if (policy && policy.objects.indexOf(value) >= 0) {
            var /** @type {?} */ index = this.policies.findIndex(function (policy) { return policy.name === name; });
            var /** @type {?} */ objectIndexs_1 = [];
            policy.objects.forEach(function (o, i) {
                if (o == value) {
                    objectIndexs_1.push(i);
                }
            });
            objectIndexs_1.forEach(function (index) { return delete policy.objects[index]; });
            this.policies[index] = policy;
            return true;
        }
        return false;
    };
    Authorization.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Authorization.ctorParameters = function () { return []; };
    return Authorization;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Authentication = /** @class */ (function () {
    /**
     * Create a new instance of the service.
     *
     * @param  authorization
     * @param  config
     * @param  event
     * @param  http
     * @param  httpService
     * @param  token
     */
    function Authentication(authorization, config, event, http, httpService, token) {
        var _this = this;
        this.authorization = authorization;
        this.config = config;
        this.event = event;
        this.http = http;
        this.httpService = httpService;
        this.token = token;
        /**
         * Authorized user.
         */
        this.authUser = null;
        /**
         * Event channels.
         */
        this.channels = [
            'auth:login',
            'auth:logginIn',
            'auth:loggedIn',
            'auth:logout',
            'auth:loggingOut',
            'auth:loggedOut',
            'auth:required',
            'auth:check',
            'auth:guarded',
            'auth:registered',
        ];
        /**
         * The redirect data on the service.
         */
        this.redirect = null;
        /**
         * The subsciptions of the service.
         */
        this.subs = {};
        /**
         * The timeouts of the component.
         */
        this.timeouts = {};
        /**
         * Get the current authenticated user.
         */
        this.user = function () { return _this.authUser; };
        this.event.setChannels(this.channels);
        this.eventListeners();
    }
    /**
     * On service destroy.
     */
    /**
     * On service destroy.
     * @return {?}
     */
    Authentication.prototype.ngOnDestroy = /**
     * On service destroy.
     * @return {?}
     */
    function () {
        var _this = this;
        Object.keys(this.subs).forEach(function (k) { return _this.subs[k].unsubscribe(); });
        Object.keys(this.timeouts).forEach(function (k) { return clearTimeout(_this.timeouts[k]); });
    };
    /**
     * Check if user is logged in.
     *
     * @param  force
     */
    /**
     * Check if user is logged in.
     *
     * @param {?=} force
     * @return {?}
     */
    Authentication.prototype.check = /**
     * Check if user is logged in.
     *
     * @param {?=} force
     * @return {?}
     */
    function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        var /** @type {?} */ endpoint = this.config.get('authentication.endpoints.check');
        this.event.broadcast('auth:check');
        return new Observable(function (observer) {
            if (_this.authenticated === false) {
                _this.checkResolve(observer, false);
            }
            else if (_this.authenticated === true && !force) {
                _this.event.broadcast('auth:loggedIn', _this.user());
                _this.checkResolve(observer, true);
            }
            else {
                _this.httpService.tokenHeader().then(function (token) {
                    if (token) {
                        _this.getUser(endpoint).then(function (res) {
                            _this.setAuthenticated(true);
                            _this.setUser(res.data || res);
                            _this.event.broadcast('auth:loggedIn', _this.user());
                            _this.checkResolve(observer, true);
                        }, function () {
                            _this.setAuthenticated(false);
                            _this.event.broadcast('auth:required', true);
                            _this.checkResolve(observer, false);
                        });
                    }
                    else {
                        _this.setAuthenticated(false);
                        _this.checkResolve(observer, false);
                    }
                }, function (err) { return observer.error(err); });
            }
        });
    };
    /**
     * Resolve the auth check.
     *
     * @param observer
     * @param authenticated
     */
    /**
     * Resolve the auth check.
     *
     * @param {?} observer
     * @param {?} authenticated
     * @return {?}
     */
    Authentication.prototype.checkResolve = /**
     * Resolve the auth check.
     *
     * @param {?} observer
     * @param {?} authenticated
     * @return {?}
     */
    function (observer, authenticated) {
        var _this = this;
        this.event.broadcast('auth:check', authenticated).then(function () {
            _this.timeouts['checkResolve'] = setTimeout(function () {
                observer.next(authenticated);
            }, 100);
        });
    };
    /**
     * The service event listeners.
     */
    /**
     * The service event listeners.
     * @return {?}
     */
    Authentication.prototype.eventListeners = /**
     * The service event listeners.
     * @return {?}
     */
    function () {
        var _this = this;
        this.subs['auth:loggedIn'] = this.event.listen('auth:loggedIn').subscribe(function (user) {
            _this.setAuthenticated(true);
            _this.setUser(user);
        });
    };
    /**
     * Send a forgot password request.
     *
     * @param  credentials
     * @param  endpoint
     * @param  headers
     */
    /**
     * Send a forgot password request.
     *
     * @param {?} data
     * @param {?=} endpoint
     * @param {?=} headers
     * @return {?}
     */
    Authentication.prototype.forgotPassword = /**
     * Send a forgot password request.
     *
     * @param {?} data
     * @param {?=} endpoint
     * @param {?=} headers
     * @return {?}
     */
    function (data, endpoint, headers) {
        var _this = this;
        if (endpoint === void 0) { endpoint = ''; }
        if (headers === void 0) { headers = {}; }
        endpoint = this.config.get('authentication.endpoints.forgotPassword', endpoint);
        return new Promise(function (resolve, reject) {
            return _this.http.post(endpoint, data, headers).toPromise()
                .then(function (res) { return resolve(res); }, function (error) { return reject(error); });
        });
    };
    /**
     * Returns the redirect data.
     */
    /**
     * Returns the redirect data.
     * @return {?}
     */
    Authentication.prototype.getRedirect = /**
     * Returns the redirect data.
     * @return {?}
     */
    function () {
        return this.redirect;
    };
    /**
     * Get the authentication token.
     */
    /**
     * Get the authentication token.
     * @return {?}
     */
    Authentication.prototype.getToken = /**
     * Get the authentication token.
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.token.get().then(function (token) { return resolve(token); }, function (err) { return reject(err); });
        });
    };
    /**
     * Get the current authenticated user.
     *
     * @param  endpoint
     */
    /**
     * Get the current authenticated user.
     *
     * @param {?=} endpoint
     * @return {?}
     */
    Authentication.prototype.getUser = /**
     * Get the current authenticated user.
     *
     * @param {?=} endpoint
     * @return {?}
     */
    function (endpoint) {
        if (endpoint === void 0) { endpoint = ''; }
        endpoint = this.config.get('authentication.endpoints.getUser', endpoint);
        return this.http.get(endpoint).toPromise();
    };
    /**
     * Get the value authenticated value.
     */
    /**
     * Get the value authenticated value.
     * @return {?}
     */
    Authentication.prototype.getAuthenticated = /**
     * Get the value authenticated value.
     * @return {?}
     */
    function () {
        return this.authenticated;
    };
    /**
     * Set if authenticated value.
     */
    /**
     * Set if authenticated value.
     * @param {?} value
     * @return {?}
     */
    Authentication.prototype.setAuthenticated = /**
     * Set if authenticated value.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.authenticated = value;
    };
    /**
     * Send a login request.
     *
     * @param  credentials
     * @param  endpoint
     * @param  headers
     */
    /**
     * Send a login request.
     *
     * @param {?} credentials
     * @param {?=} endpoint
     * @param {?=} headers
     * @return {?}
     */
    Authentication.prototype.login = /**
     * Send a login request.
     *
     * @param {?} credentials
     * @param {?=} endpoint
     * @param {?=} headers
     * @return {?}
     */
    function (credentials, endpoint, headers) {
        var _this = this;
        if (endpoint === void 0) { endpoint = ''; }
        if (headers === void 0) { headers = {}; }
        endpoint = this.config.get('authentication.endpoints.login', endpoint);
        return new Promise(function (resolve, reject) {
            _this.http.post(endpoint, credentials, headers).toPromise()
                .then(function (res) {
                _this.onLogin(res).then(function () { return resolve(res); }, function (error) { return reject(error); });
            }, function (error) { return reject(error); });
        });
    };
    /**
     * Send a request to log the authenticated user out.
     */
    /**
     * Send a request to log the authenticated user out.
     * @param {?=} endpoint
     * @param {?=} headers
     * @return {?}
     */
    Authentication.prototype.logout = /**
     * Send a request to log the authenticated user out.
     * @param {?=} endpoint
     * @param {?=} headers
     * @return {?}
     */
    function (endpoint, headers) {
        var _this = this;
        if (endpoint === void 0) { endpoint = ''; }
        if (headers === void 0) { headers = {}; }
        return new Promise(function (resolve, reject) {
            _this.event.broadcast('auth:loggingOut').then(function () {
                endpoint = _this.config.get('authentication.endpoints.logout', endpoint);
                if (endpoint) {
                    _this.http.post(endpoint, {}, headers).toPromise().then(function (res) {
                        _this.onLogout();
                        resolve(res);
                    }, function (error) { return reject(error); });
                }
                else {
                    _this.onLogout();
                    resolve();
                }
            });
        });
    };
    /**
     * Actions to perform on login.
     *
     * @param  res
     */
    /**
     * Actions to perform on login.
     *
     * @param {?} res
     * @return {?}
     */
    Authentication.prototype.onLogin = /**
     * Actions to perform on login.
     *
     * @param {?} res
     * @return {?}
     */
    function (res) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storeToken(res).then(function () {
                _this.event.broadcast('auth:loggingIn', res).then(function () {
                    _this.resolveUser().then(function () { return resolve(); }, function (err) { return reject(err); });
                }, function (err) { return reject(err); });
            }, function (err) { return reject(err); });
        });
    };
    /**
     * Actions to perform on logout.
     */
    /**
     * Actions to perform on logout.
     * @return {?}
     */
    Authentication.prototype.onLogout = /**
     * Actions to perform on logout.
     * @return {?}
     */
    function () {
        this.unauthenticate();
        this.event.broadcast('auth:loggedOut');
    };
    /**
     * Returns and clears the redirect data.
     */
    /**
     * Returns and clears the redirect data.
     * @return {?}
     */
    Authentication.prototype.pullRedirect = /**
     * Returns and clears the redirect data.
     * @return {?}
     */
    function () {
        var /** @type {?} */ redirect = this.redirect;
        this.redirect = null;
        return redirect;
    };
    /**
     * Send a register request.
     *
     * @param  data
     * @param   endpoint
     * @param  headers
     * @param postRegisterLogin
     */
    /**
     * Send a register request.
     *
     * @param {?} data
     * @param {?=} endpoint
     * @param {?=} headers
     * @param {?=} postRegisterLogin
     * @return {?}
     */
    Authentication.prototype.register = /**
     * Send a register request.
     *
     * @param {?} data
     * @param {?=} endpoint
     * @param {?=} headers
     * @param {?=} postRegisterLogin
     * @return {?}
     */
    function (data, endpoint, headers, postRegisterLogin) {
        var _this = this;
        if (endpoint === void 0) { endpoint = ''; }
        if (headers === void 0) { headers = {}; }
        if (postRegisterLogin === void 0) { postRegisterLogin = false; }
        endpoint = this.config.get('authentication.endpoints.register', endpoint);
        return new Promise(function (resolve, reject) {
            _this.http.post(endpoint, data, headers).toPromise().then(function (res) {
                if (postRegisterLogin) {
                    _this.onLogin(res).then(function () {
                        resolve(res);
                        _this.event.broadcast('auth:registered', res);
                    }, function (error) { return reject(error); });
                }
                else {
                    _this.event.broadcast('auth:registered', res);
                }
            }, function (error) { return reject(error); });
        });
    };
    /**
     * Send a reset password request.
     *
     * @param   credentials
     * @param   endpoint
     * @param  headers
     */
    /**
     * Send a reset password request.
     *
     * @param {?} data
     * @param {?=} endpoint
     * @param {?=} headers
     * @return {?}
     */
    Authentication.prototype.resetPassword = /**
     * Send a reset password request.
     *
     * @param {?} data
     * @param {?=} endpoint
     * @param {?=} headers
     * @return {?}
     */
    function (data, endpoint, headers) {
        var _this = this;
        if (endpoint === void 0) { endpoint = ''; }
        if (headers === void 0) { headers = {}; }
        endpoint = this.config.get('authentication.endpoints.resetPassword', endpoint);
        return new Promise(function (resolve, reject) {
            _this.http.post(endpoint, data, headers).toPromise().then(function (res) {
                _this.onLogin(res).then(function () { return resolve(res); });
            }, function (error) { return reject(error); });
        });
    };
    /**
     * Resolve the authenticated user.
     */
    /**
     * Resolve the authenticated user.
     * @return {?}
     */
    Authentication.prototype.resolveUser = /**
     * Resolve the authenticated user.
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.timeouts['resolveUser'] = setTimeout(function () {
                _this.getUser().then(function (user) {
                    _this.setAuthenticated(true);
                    _this.setUser(user.data || user).then(function (user) {
                        _this.event.broadcast('auth:loggedIn', user);
                        resolve();
                    }, function (error) { return reject(error); });
                }, function (error) { return reject(error); });
            }, 250);
        });
    };
    /**
     * Set the redirect data.
     */
    /**
     * Set the redirect data.
     * @param {?} value
     * @return {?}
     */
    Authentication.prototype.setRedirect = /**
     * Set the redirect data.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.redirect = value;
    };
    /**
     * Set the current authenticated user.
     *
     * @param  user
     */
    /**
     * Set the current authenticated user.
     *
     * @param {?} user
     * @return {?}
     */
    Authentication.prototype.setUser = /**
     * Set the current authenticated user.
     *
     * @param {?} user
     * @return {?}
     */
    function (user) {
        var _this = this;
        if (user) {
            user = new UserModel(this.authorization, user);
        }
        return new Promise(function (resolve) { return resolve(_this.authUser = user); });
    };
    /**
     * Store aut token and broadcast an event.
     *
     * @param  res
     */
    /**
     * Store aut token and broadcast an event.
     *
     * @param {?} res
     * @return {?}
     */
    Authentication.prototype.storeToken = /**
     * Store aut token and broadcast an event.
     *
     * @param {?} res
     * @return {?}
     */
    function (res) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.token.set(_this.token.read(res)).then(function () {
                resolve(res);
            }, function (error) { return console.error(error); });
        });
    };
    /**
     * Unauthenticate the current user.
     */
    /**
     * Unauthenticate the current user.
     * @return {?}
     */
    Authentication.prototype.unauthenticate = /**
     * Unauthenticate the current user.
     * @return {?}
     */
    function () {
        this.token.remove();
        this.setAuthenticated(false);
        this.setUser(null);
        this.authorization.clearPolicies();
    };
    Authentication.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Authentication.ctorParameters = function () { return [
        { type: Authorization },
        { type: Config },
        { type: Event },
        { type: HttpClient },
        { type: Http },
        { type: Token }
    ]; };
    return Authentication;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SocialAuthentication = /** @class */ (function (_super) {
    __extends(SocialAuthentication, _super);
    /**
     * Constructor.
     */
    function SocialAuthentication(authorization, config, event, http, httpService, token) {
        var _this = _super.call(this, authorization, config, event, http, httpService, token) || this;
        _this.authorization = authorization;
        _this.config = config;
        _this.event = event;
        _this.http = http;
        _this.httpService = httpService;
        _this.token = token;
        /**
         * Handle errors on facebook login.
         *
         * @param error
         */
        _this.handleLoginError = function (error) { return console.log(error); };
        //
        return _this;
    }
    /**
     * Login with a social provider.
     */
    // login(provider: string, options?: any): Promise<any> {
    //     return new Promise(() => {
    //         // this.handleLoginSuccess(res).then((res) => {
    //         //     this.onLogin(res).then(() => resolve(res));
    //         // }, (error) => reject(this.handleLoginError(error)))
    //     });
    // }
    /**
     * Handle succesful Facebook login.
     *
     * @param  res
     */
    /**
     * Handle succesful Facebook login.
     *
     * @param {?} res
     * @return {?}
     */
    SocialAuthentication.prototype.handleLoginSuccess = /**
     * Handle succesful Facebook login.
     *
     * @param {?} res
     * @return {?}
     */
    function (res) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storeSocialCredentials(res);
            _this.http.post(_this.config.get('authentication.endpoints.socialAuth'), res).subscribe(function (res) {
                _this.onLogin(res).then(function () {
                    resolve(res);
                }, function (error) { return reject(error); });
            }, function (error) { return reject(error); });
        });
    };
    /**
     * Store social auth crednetials.
     *
     * @param  res
     */
    /**
     * Store social auth crednetials.
     *
     * @param {?} res
     * @return {?}
     */
    SocialAuthentication.prototype.storeSocialCredentials = /**
     * Store social auth crednetials.
     *
     * @param {?} res
     * @return {?}
     */
    function (res) {
        if (res.network == 'facebook') {
            this.token.set(res.authResponse.accessToken, 'facebook_access_token');
        }
    };
    SocialAuthentication.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SocialAuthentication.ctorParameters = function () { return [
        { type: Authorization },
        { type: Config },
        { type: Event },
        { type: HttpClient },
        { type: Http },
        { type: Token }
    ]; };
    return SocialAuthentication;
}(Authentication));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Cache = /** @class */ (function () {
    /**
     * Constructor.
     */
    function Cache(config, event, storage) {
        var _this = this;
        this.config = config;
        this.event = event;
        this.storage = storage;
        /**
         * The name of the cache instance.
         */
        this.cacheName = 'ngkit_cache';
        /**
         * In memory collection of cache.
         */
        this._cache = {};
        /**
         * The subsciptions of the service.
         */
        this.subs = {};
        this.retrieveCache();
        this.subs['auth:loggedOut'] = this.event.listen('auth:loggedOut')
            .subscribe(function () {
            _this._cache = {};
            _this.clear();
        });
    }
    /**
     * On service destroy.
     */
    /**
     * On service destroy.
     * @return {?}
     */
    Cache.prototype.ngOnDestroy = /**
     * On service destroy.
     * @return {?}
     */
    function () {
        var _this = this;
        Object.keys(this.subs).forEach(function (k) { return _this.subs[k].unsubscribe(); });
    };
    /**
     * Retrieve the stored cache.
     */
    /**
     * Retrieve the stored cache.
     * @return {?}
     */
    Cache.prototype.retrieveCache = /**
     * Retrieve the stored cache.
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get(_this.cacheName).then(function (cache) {
                if (cache) {
                    Object.keys(cache).forEach(function (item) {
                        cache[item] = new CacheItemModel(cache[item]);
                    });
                    _this.cache = cache;
                }
                else {
                    _this.cache = _this.store();
                }
                resolve(_this.cache);
            }, function (err) { return reject(err); });
        });
    };
    /**
     * Save the cache to storage.
     *
     * @param  key
     * @param  value
     */
    /**
     * Save the cache to storage.
     *
     * @return {?}
     */
    Cache.prototype.store = /**
     * Save the cache to storage.
     *
     * @return {?}
     */
    function () {
        this.storage.set(this.cacheName, this._cache);
        return this._cache;
    };
    Object.defineProperty(Cache.prototype, "cache", {
        /**
         * Accessor to the in memeory cache.
         */
        get: /**
         * Accessor to the in memeory cache.
         * @return {?}
         */
        function () {
            return this._cache;
        },
        /**
         * Mutator to the in memeory cache.
         *
         */
        set: /**
         * Mutator to the in memeory cache.
         *
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._cache = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get an item from cache.
     *
     * @param   key
     * @param  defautValue
     */
    /**
     * Get an item from cache.
     *
     * @param {?} key
     * @param {?=} defautValue
     * @return {?}
     */
    Cache.prototype.get = /**
     * Get an item from cache.
     *
     * @param {?} key
     * @param {?=} defautValue
     * @return {?}
     */
    function (key, defautValue) {
        if (defautValue === void 0) { defautValue = null; }
        if (this.cache[key] && !this.cache[key].isExpired()) {
            return this.cache[key].value;
        }
        else if (defautValue) {
            return defautValue;
        }
        else {
            this.remove(key);
            return null;
        }
    };
    /**
     * Set an item to cache.
     *
     * @param  key
     * @param  value
     * @param  expires
     */
    /**
     * Set an item to cache.
     *
     * @param {?} key
     * @param {?} value
     * @param {?=} expires
     * @return {?}
     */
    Cache.prototype.set = /**
     * Set an item to cache.
     *
     * @param {?} key
     * @param {?} value
     * @param {?=} expires
     * @return {?}
     */
    function (key, value, expires) {
        if (expires === void 0) { expires = this.config.get('cache.expires'); }
        var /** @type {?} */ cacheItem = new CacheItemModel({ value: value, expires: expires });
        this._cache[key] = cacheItem;
        this.store();
    };
    /**
     * Remove an item from cache.
     *
     * @param key
     */
    /**
     * Remove an item from cache.
     *
     * @param {?} key
     * @return {?}
     */
    Cache.prototype.remove = /**
     * Remove an item from cache.
     *
     * @param {?} key
     * @return {?}
     */
    function (key) {
        delete this.cache[key];
        this.store();
    };
    /**
     * Clear the cache.
     */
    /**
     * Clear the cache.
     * @return {?}
     */
    Cache.prototype.clear = /**
     * Clear the cache.
     * @return {?}
     */
    function () {
        this.storage.remove(this.cacheName);
    };
    /**
     * Get an item from cache and remove it.
     *
     * @param  key
     */
    /**
     * Get an item from cache and remove it.
     *
     * @param {?} key
     * @return {?}
     */
    Cache.prototype.pull = /**
     * Get an item from cache and remove it.
     *
     * @param {?} key
     * @return {?}
     */
    function (key) {
        var /** @type {?} */ value = this.get(key);
        this.remove(key);
        return value;
    };
    /**
     * Check if cache has an item.
     *
     * @param  key
     */
    /**
     * Check if cache has an item.
     *
     * @param {?} key
     * @return {?}
     */
    Cache.prototype.has = /**
     * Check if cache has an item.
     *
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.get(key) !== null ? true : false;
    };
    Cache.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Cache.ctorParameters = function () { return [
        { type: Config },
        { type: Event },
        { type: Storage }
    ]; };
    return Cache;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AuthGuard = /** @class */ (function () {
    /**
     * Create a new instance.
     *
     * @param  auth
     * @param  event
     */
    function AuthGuard(auth, event) {
        this.auth = auth;
        this.event = event;
        /**
         * The subsciptions of the service.
         */
        this.subs = {};
    }
    /**
     * On service destroy.
     */
    /**
     * On service destroy.
     * @return {?}
     */
    AuthGuard.prototype.ngOnDestroy = /**
     * On service destroy.
     * @return {?}
     */
    function () {
        var _this = this;
        Object.keys(this.subs).forEach(function (k) { return _this.subs[k].unsubscribe(); });
    };
    /**
     * Determine if the user can activate a route.
     *
     * @param route
     * @param state
     */
    /**
     * Determine if the user can activate a route.
     *
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    AuthGuard.prototype.canActivate = /**
     * Determine if the user can activate a route.
     *
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    function (route, state) {
        return this.guard(route, state);
    };
    /**
     * Determine if the user can activate children of a route.
     *
     * @param  route
     * @param  state     *
     */
    /**
     * Determine if the user can activate children of a route.
     *
     * @param {?} route
     * @param {?} state     *
     * @return {?}
     */
    AuthGuard.prototype.canActivateChild = /**
     * Determine if the user can activate children of a route.
     *
     * @param {?} route
     * @param {?} state     *
     * @return {?}
     */
    function (route, state) {
        return this.guard(route, state);
    };
    /**
     * The method to apply to guard.
     *
     * @param route
     * @param state
     */
    /**
     * The method to apply to guard.
     *
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    AuthGuard.prototype.guard = /**
     * The method to apply to guard.
     *
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    function (route, state) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.auth.user()) {
                resolve(true);
            }
            else {
                _this.subs['auth:check'] = _this.auth.check().subscribe(function (check) {
                    if (check) {
                        resolve(true);
                    }
                    else {
                        _this.event.broadcast('auth:modal');
                        _this.auth.setRedirect(state.url);
                        resolve(false);
                    }
                });
            }
        });
    };
    AuthGuard.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AuthGuard.ctorParameters = function () { return [
        { type: Authentication },
        { type: Event }
    ]; };
    return AuthGuard;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AuthResolveGuard = /** @class */ (function () {
    /**
     * Create a new instance.
     *
     * @param  auth
     * @param  event
     */
    function AuthResolveGuard(auth, event) {
        this.auth = auth;
        this.event = event;
        /**
         * The subsciptions of the service.
         */
        this.subs = {};
    }
    /**
     * On service destroy.
     */
    /**
     * On service destroy.
     * @return {?}
     */
    AuthResolveGuard.prototype.ngOnDestroy = /**
     * On service destroy.
     * @return {?}
     */
    function () {
        var _this = this;
        Object.keys(this.subs).forEach(function (k) { return _this.subs[k].unsubscribe(); });
    };
    /**
     * Determine if the user can activate a route.
     */
    /**
     * Determine if the user can activate a route.
     * @return {?}
     */
    AuthResolveGuard.prototype.canActivate = /**
     * Determine if the user can activate a route.
     * @return {?}
     */
    function () {
        return this.guard();
    };
    /**
     * Determine if the user can activate children of a route.
     */
    /**
     * Determine if the user can activate children of a route.
     * @return {?}
     */
    AuthResolveGuard.prototype.canActivateChild = /**
     * Determine if the user can activate children of a route.
     * @return {?}
     */
    function () {
        return this.guard();
    };
    /**
     * The method to apply to guard.
     */
    /**
     * The method to apply to guard.
     * @return {?}
     */
    AuthResolveGuard.prototype.guard = /**
     * The method to apply to guard.
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.auth.user()) {
                resolve(true);
            }
            else {
                _this.subs['auth:check'] = _this.auth.check().subscribe(function () {
                    resolve(true);
                });
            }
        });
    };
    AuthResolveGuard.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AuthResolveGuard.ctorParameters = function () { return [
        { type: Authentication },
        { type: Event }
    ]; };
    return AuthResolveGuard;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var HttpInterceptor = /** @class */ (function () {
    /**
     * Create a new instance of the interceptor.
     *
     * @param  http
     */
    function HttpInterceptor(http) {
        this.http = http;
    }
    /**
     * Intercept the http request.
     *
     * @param  req
     * @param  next
     */
    /**
     * Intercept the http request.
     *
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    HttpInterceptor.prototype.intercept = /**
     * Intercept the http request.
     *
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    function (req, next) {
        req = req.clone({
            headers: this.http.headers,
            url: this.http.getUrl(req.url)
        });
        return next.handle(req);
    };
    HttpInterceptor.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    HttpInterceptor.ctorParameters = function () { return [
        { type: Http }
    ]; };
    return HttpInterceptor;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AuthInterceptor = /** @class */ (function () {
    /**
     * Create a new instance of the interceptor.
     *
     * @param  http
     * @param  event
     */
    function AuthInterceptor(http, event) {
        this.http = http;
        this.event = event;
    }
    /**
     * Intercept the http request.
     *
     * @param  req
     * @param  next
     */
    /**
     * Intercept the http request.
     *
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    AuthInterceptor.prototype.intercept = /**
     * Intercept the http request.
     *
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    function (req, next) {
        var _this = this;
        return next.handle(req).pipe(tap(function () { }, function (error) {
            if (error instanceof HttpErrorResponse) {
                if (error.status === 401) {
                    _this.event.broadcast('auth:required', error);
                }
            }
        }));
    };
    AuthInterceptor.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AuthInterceptor.ctorParameters = function () { return [
        { type: Http },
        { type: Event }
    ]; };
    return AuthInterceptor;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * ngKit Services.
 */
var /** @type {?} */ NGKIT_PROVIDERS = [
    Authentication,
    AuthGuard,
    AuthResolveGuard,
    SocialAuthentication,
    Authorization,
    Config,
    Storage,
    Cache,
    Event,
    Http,
    Token,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ngKitModule = /** @class */ (function () {
    function ngKitModule() {
    }
    /**
     * ngKit module initializer.
     *
     * @param  options
     */
    /**
     * ngKit module initializer.
     *
     * @param {?} options
     * @return {?}
     */
    ngKitModule.forRoot = /**
     * ngKit module initializer.
     *
     * @param {?} options
     * @return {?}
     */
    function (options) {
        return {
            ngModule: ngKitModule,
            providers: [
                { provide: 'ngKitOptions', useValue: options },
            ]
        };
    };
    ngKitModule.decorators = [
        { type: NgModule, args: [{
                    imports: [HttpClientModule],
                    providers: __spread(NGKIT_PROVIDERS)
                },] },
    ];
    return ngKitModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { Config, Authentication, Authorization, Cache, Event, Http, SocialAuthentication, Storage, Token, AuthGuard, AuthResolveGuard, NGKIT_PROVIDERS, Model, ngKitModule, AuthInterceptor as ɵb, HttpInterceptor as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdraXQuanMubWFwIiwic291cmNlcyI6WyJuZzovL25na2l0L2NvbmZpZy50cyIsIm5nOi8vbmdraXQvc2VydmljZXMvZXZlbnQudHMiLCJuZzovL25na2l0L3NlcnZpY2VzL3N0b3JhZ2UudHMiLCJuZzovL25na2l0L3NlcnZpY2VzL3Rva2VuLnRzIiwibmc6Ly9uZ2tpdC9zZXJ2aWNlcy9odHRwLnRzIiwibmc6Ly9uZ2tpdC9tb2RlbHMvY2FjaGUtaXRlbS50cyIsIm5nOi8vbmdraXQvbW9kZWxzL21vZGVsLnRzIiwibmc6Ly9uZ2tpdC9tb2RlbHMvcG9saWN5LnRzIiwibmc6Ly9uZ2tpdC9tb2RlbHMvdXNlci50cyIsIm5nOi8vbmdraXQvc2VydmljZXMvYXV0aG9yaXphdGlvbi50cyIsIm5nOi8vbmdraXQvc2VydmljZXMvYXV0aGVudGljYXRpb24udHMiLCJuZzovL25na2l0L3NlcnZpY2VzL3NvY2lhbC1hdXRoZW50aWNhdGlvbi50cyIsIm5nOi8vbmdraXQvc2VydmljZXMvY2FjaGUudHMiLCJuZzovL25na2l0L2d1YXJkcy9hdXRoLWd1YXJkLnRzIiwibmc6Ly9uZ2tpdC9ndWFyZHMvYXV0aC1yZXNvbHZlLWd1YXJkLnRzIiwibmc6Ly9uZ2tpdC9zZXJ2aWNlcy9odHRwLWludGVyY2VwdG9yLnRzIiwibmc6Ly9uZ2tpdC9zZXJ2aWNlcy9odHRwLWF1dGgtaW50ZXJjZXB0b3IudHMiLCJuZzovL25na2l0L3Byb3ZpZGVycy50cyIsIm5nOi8vbmdraXQvbmdraXQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29uZmlnIHtcbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IGNvbmZpZ3VyYXRpb24uXG4gICAgICovXG4gICAgc3RhdGljIGRlZmF1bHRPcHRpb25zOiBhbnkgPSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBdXRoZW50aWNhdGlvbiBzZXR0aW5ncy5cbiAgICAgICAgICovXG4gICAgICAgIGF1dGhlbnRpY2F0aW9uOiB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIENvbW1vbiBlbmRwb2ludHMgZm9yIGF1dGhlbnRpY2F0aW9uIHNlcmNpY2UuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGVuZHBvaW50czoge1xuICAgICAgICAgICAgICAgIGNoZWNrOiAnJyxcbiAgICAgICAgICAgICAgICBmb3JvZ290UGFzc3dvcmQ6ICcnLFxuICAgICAgICAgICAgICAgIGdldFVzZXI6ICcnLFxuICAgICAgICAgICAgICAgIGxvZ2luOiAnJyxcbiAgICAgICAgICAgICAgICBsb2dvdXQ6ICcnLFxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyOiAnJyxcbiAgICAgICAgICAgICAgICByZXNldFBhc3N3b3JkOiAnJyxcbiAgICAgICAgICAgICAgICBzb2NpYWxBdXRoOiAnJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogTWV0aG9kcyB1c2VkIGZvciBhdXRoZW50aWNhdGlvbi5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbWV0aG9kOiB7XG4gICAgICAgICAgICAgICAgdG9rZW46IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFNvY2lhbCBwcm92aWRlciBjb25maWd1cmF0aW9uLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzb2NpYWw6IHtcbiAgICAgICAgICAgICAgICBmYWNlYm9vazoge1xuICAgICAgICAgICAgICAgICAgICBpZDogJycsXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb246ICd2Mi42JyxcbiAgICAgICAgICAgICAgICAgICAgeGZibWw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlOiAncHVibGljX3Byb2ZpbGUsZW1haWwnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0d2l0dGVyOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVkaXJlY3RUbzogJycsXG4gICAgICAgICAgICAgICAgb2F1dGhQcm94eTogJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEF1dGhvcml6YXRpb24gb3B0aW9ucy5cbiAgICAgICAgICovXG4gICAgICAgIGF1dGhvcml6YXRpb246IHt9LFxuICAgICAgICAvKipcbiAgICAgICAgICogSHR0cCBvcHRpb25zLlxuICAgICAgICAgKi9cbiAgICAgICAgaHR0cDoge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBCYXNlZCB1cmwgZm9yIGh0dHAgcmVxdWVzdHMuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGJhc2VVcmw6ICcnLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBEZWZhdWx0IGhlYWRlcnMgZm9yIGh0dHAgcmVxdWVzdC5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaGVhZGVyczoge31cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JhZ2UgT3B0aW9uc1xuICAgICAgICAgKi9cbiAgICAgICAgc3RvcmFnZToge1xuICAgICAgICAgICAgbmFtZTogJ25na2l0U3RvcmFnZSdcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRva2VuIG9wdGlvbnMuXG4gICAgICAgICAqL1xuICAgICAgICB0b2tlbjoge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBEZWZhdWx0IG5hbWUgb2YgYXV0aG9yaXphdGlvbiB0b2tlbiByZWFkIGZyb20gcmVzcG9uc2VzLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByZWFkQXM6ICd0b2tlbicsXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIERlZmF1bHQgbmFtZSBvZiBhdXRob3JpemF0aW9uIHRva2VuIHRoYXQgaXMgc3RvcmVkLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdG9yZUFzOiAnX3Rva2VuJyxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogU2NoZW1lIHRvIHVzZSBpbiBBdXRob3JpemF0aW9uIGhlYWRlciBhbG9uZyB3aXRoIHRva2VuLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzY2hlbWU6ICdCZWFyZXInXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYWNoZSBzZXJ2aWNlIG9wdGlvbnMuXG4gICAgICAgICAqL1xuICAgICAgICBjYWNoZToge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBEZWZhdWx0IGV4cGlyYXRpb24gdGltZSBpbiBtaW51dGVzLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBleHBpcmVzOiA1XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFbmFibGUgZGVidWcgbW9kZS5cbiAgICAgICAgICovXG4gICAgICAgIGRlYnVnOiBmYWxzZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbmZpZyBvcHRpb25zLlxuICAgICAqL1xuICAgIG9wdGlvbnM6IGFueTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgc2VydmljZS4uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoQEluamVjdCgnbmdLaXRPcHRpb25zJykgcHJpdmF0ZSBfb3B0aW9uczogYW55KSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IENvbmZpZy5kZWZhdWx0T3B0aW9ucztcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKHRoaXMuX29wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgY29uZmlndXJhYmxlIG9wdGlvbnMuXG4gICAgICovXG4gICAgZ2V0T3B0aW9ucygpOiBhbnkgeyByZXR1cm4gdGhpcy5vcHRpb25zOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYW4gb3B0aW9uIGJ5IGtleS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgIGtleVxuICAgICAqIEBwYXJhbSAgIG92ZXJyaWRlXG4gICAgICovXG4gICAgZ2V0KGtleTogc3RyaW5nLCBvdmVycmlkZTogYW55ID0gZmFsc2UpOiBhbnkge1xuICAgICAgICByZXR1cm4gQ29uZmlnLmdldEl0ZW0oa2V5LCBvdmVycmlkZSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdGF0aWMgbWV0aG9kIHRvIGdldCBhbiBvcHRpb24gYnkga2V5LlxuICAgICAqXG4gICAgICogQHBhcmFtICAga2V5XG4gICAgICogQHBhcmFtICAgb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0SXRlbShrZXk6IHN0cmluZywgb3ZlcnJpZGU/OiBhbnkpOiBhbnkge1xuICAgICAgICBpZiAob3ZlcnJpZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBvdmVycmlkZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChDb25maWcuZGVmYXVsdE9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkuc3BsaXQoJy4nKS5yZWR1Y2UoKG8sIGkpID0+IG9baV0sIENvbmZpZy5kZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgYW4gb3B0aW9uIGJ5IGtleS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgIGtleVxuICAgICAqIEBwYXJhbSAgdmFsdWVcbiAgICAgKi9cbiAgICBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgcmV0dXJuIF8uc2V0KHRoaXMub3B0aW9ucywga2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjb25maWd1cmFibGUgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgb3B0aW9uc1xuICAgICAqL1xuICAgIHNldE9wdGlvbnMob3B0aW9uczogYW55KTogQ29uZmlnIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gXy5tZXJnZSh0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEV2ZW50IHtcbiAgICAvKipcbiAgICAgKiBFdmVudCBjaGFubmVscy5cbiAgICAgKi9cbiAgICBzdGF0aWMgY2hhbm5lbHM6IFN1YmplY3Q8YW55PltdID0gW107XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYW4gZXZlbnQgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleVxuICAgICAqL1xuICAgIHN0YXRpYyBjaGFubmVsKGtleTogYW55KTogU3ViamVjdDxhbnk+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBFdmVudC5jaGFubmVsc1trZXldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgRXZlbnQuY2hhbm5lbHNba2V5XSA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBFdmVudC5jaGFubmVsc1trZXldO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBtdWx0aXBsZSBldmVudCBjaGFubmVscy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudHNcbiAgICAgKi9cbiAgICBzZXRDaGFubmVscyhjaGFubmVsczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgY2hhbm5lbHMuZm9yRWFjaCgoY2hhbm5lbCkgPT4gRXZlbnQuY2hhbm5lbChjaGFubmVsKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnJvYWRjYXN0IGFuIGV2ZW50IHRvIGEgY2hhbm5lbC5cbiAgICAgKi9cbiAgICBicm9hZGNhc3Qoa2V5OiBzdHJpbmcsIGRhdGEgPSB7fSk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoRXZlbnQuY2hhbm5lbChrZXkpLm5leHQoZGF0YSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBMaXN0ZW4gb24gYSBjaGFubmVsIGZvciBhbiBldmVudC5zXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleVxuICAgICAqL1xuICAgIGxpc3RlbihrZXk6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBFdmVudC5jaGFubmVsKGtleSkuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCAqIGFzIGxvY2FsRm9yYWdlIGZyb20gXCJsb2NhbGZvcmFnZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0b3JhZ2VEcml2ZXIge1xuICAgIC8qKlxuICAgICAqIFRoZSBkYXRhYmFzZSBvZiB0aGUgc3RvcmFnZSBwcm92aWRlci5cbiAgICAgKi9cbiAgICBkYjogYW55O1xuXG4gICAgLyoqXG4gICAgICogR2V0IGFuIGl0ZW0gZnJvbSBzdG9yYWdlLlxuICAgICAqXG4gICAgICogQHBhcmFtICAga2V5XG4gICAgICovXG4gICAgZ2V0KGtleTogc3RyaW5nKTogUHJvbWlzZTxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogU2V0IGFuIGl0ZW0gdG8gc3RvcmFnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5XG4gICAgICogQHBhcmFtICB2YWx1ZVxuICAgICAqL1xuICAgIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IFByb21pc2U8YW55PjtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbiBpdGVtIGZyb20gc3RvcmFnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKi9cbiAgICByZW1vdmUoa2V5OiBzdHJpbmcpOiBQcm9taXNlPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBDbGVhciBzdG9yYWdlLlxuICAgICAqL1xuICAgIGNsZWFyKCk6IFByb21pc2U8YW55Pjtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0b3JhZ2UgaW1wbGVtZW50cyBTdG9yYWdlRHJpdmVyIHtcbiAgICAvKipcbiAgICAgKiBUaGUgZGF0YWJhc2Ugb2YgdGhlIHN0b3JhZ2UgcHJvdmlkZXIuXG4gICAgICovXG4gICAgZGI6IGFueTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgc2VydmljZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuZGIgPSBsb2NhbEZvcmFnZS5jcmVhdGVJbnN0YW5jZSh7XG4gICAgICAgICAgICBuYW1lOiB0aGlzLmNvbmZpZy5nZXQoJ3N0b3JhZ2UubmFtZScpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBpdGVtIGZyb20gbG9jYWwgc3RvcmFnZS5cbiAgICAgKi9cbiAgICBnZXQoa2V5OiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYi5nZXRJdGVtKGtleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGFuIGl0ZW0gdG8gbG9jYWwgc3RvcmFnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5XG4gICAgICogQHBhcmFtICB2YWx1ZVxuICAgICAqL1xuICAgIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRiLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFuIGl0ZW0gZnJvbSBsb2NhbCBzdG9yYWdlLlxuICAgICAqXG4gICAgICogQHBhcmFtICAga2V5XG4gICAgICovXG4gICAgcmVtb3ZlKGtleTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGIucmVtb3ZlSXRlbShrZXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsZWFyIGxvY2FsIHN0b3JhZ2UuXG4gICAgICovXG4gICAgY2xlYXIoKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGIuY2xlYXIoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4vLi4vY29uZmlnJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRva2VuIHtcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRva2VuIHN0b3JlZCBpbiBsb2NhbCBzdG9yYWdlLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfdG9rZW46IHN0cmluZyA9ICdfdG9rZW4nO1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGNvbmZpZ1xuICAgICAqIEBwYXJhbSAgc3RvcmFnZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgY29uZmlnOiBDb25maWcsXG4gICAgICAgIHByaXZhdGUgc3RvcmFnZTogU3RvcmFnZVxuICAgICkgeyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRva2VuIGZyb20gbG9jYWwgc3RvcmFnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgdG9rZW5OYW1lXG4gICAgICovXG4gICAgZ2V0KHRva2VuTmFtZT86IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0b2tlbk5hbWUgPSB0b2tlbk5hbWUgfHwgdGhpcy5jb25maWcuZ2V0KCd0b2tlbi5uYW1lJywgdGhpcy5fdG9rZW4pO1xuXG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2UuZ2V0KHRva2VuTmFtZSkudGhlbih0b2tlbiA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0b2tlbik7XG4gICAgICAgICAgICB9LCBlcnIgPT4gcmVqZWN0KGVycikpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdG9yZSB0aGUgdG9rZW4gaW4gbG9jYWwgc3RvcmFnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgdG9rZW5cbiAgICAgKiBAcGFyYW0gIHRva2VuTmFtZVxuICAgICAqL1xuICAgIHNldCh0b2tlbjogc3RyaW5nLCB0b2tlbk5hbWU/OiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdG9rZW5OYW1lID0gdG9rZW5OYW1lIHx8IHRoaXMuY29uZmlnLmdldCgndG9rZW4ubmFtZScsIHRoaXMuX3Rva2VuKTtcblxuICAgICAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNldCh0b2tlbk5hbWUsIHRva2VuKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9LCAoKSA9PiByZWplY3QoJ0Vycm9yOiBDb3VsZCBub3Qgc3RvcmUgdG9rZW4uJykpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWplY3QoJ0Vycm9yOiBObyB0b2tlbiBwcm92aWRlZC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIHRva2VuIGZyb20gbG9jYWwgc3RvcmFnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgdG9rZW5OYW1lXG4gICAgICovXG4gICAgcmVtb3ZlKHRva2VuTmFtZT86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICB0b2tlbk5hbWUgPSB0b2tlbk5hbWUgfHwgdGhpcy5jb25maWcuZ2V0KCd0b2tlbi5uYW1lJywgdGhpcy5fdG9rZW4pO1xuXG4gICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUodG9rZW5OYW1lKTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWFkIGEgdG9rZW4gZnJvbSBhIHJlc3BvbnNlIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgcmVzcG9uc2VcbiAgICAgKi9cbiAgICByZWFkKHJlc3BvbnNlOiBhbnkgPSBudWxsKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBsZXQga2V5ID0gdGhpcy5jb25maWcuZ2V0KCd0b2tlbi5yZWFkQXMnKTtcblxuICAgICAgICAgICAgcmV0dXJuIGtleS5zcGxpdCgnLicpLnJlZHVjZSgobzogYW55LCBpOiBzdHJpbmcpID0+IG9baV0sIHJlc3BvbnNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi8uLi9jb25maWcnO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL2V2ZW50JztcbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnLi90b2tlbic7XG5pbXBvcnQgeyBIdHRwSGVhZGVycywgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEh0dHAgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgc2VydmljZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgY29uZmlnXG4gICAgICogQHBhcmFtICBldmVudFxuICAgICAqIEBwYXJhbSAgdG9rZW5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGNvbmZpZzogQ29uZmlnLFxuICAgICAgICBwdWJsaWMgZXZlbnQ6IEV2ZW50LFxuICAgICAgICBwdWJsaWMgdG9rZW46IFRva2VuXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc2V0RGVmYXVsdEhlYWRlcnMoKTtcbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFzc2lnbmFibGUgYmFzZSB1cmwgZm9yIGh0dHAgY2FsbHMuXG4gICAgICovXG4gICAgYmFzZVVybDogc3RyaW5nID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBIZWFkZXJzIHRvIGJlIHNlbnQgd2l0aCBhbGwgaHR0cCBjYWxscy5cbiAgICAgKi9cbiAgICBwdWJsaWMgaGVhZGVyczogSHR0cEhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzdWJzY2lwdGlvbnMgb2YgdGhlIHNlcnZpY2UuXG4gICAgICovXG4gICAgc3ViczogYW55ID0ge307XG5cbiAgICAvKipcbiAgICAgKiBPbiBzZXJ2aWNlIGRlc3Ryb3kuXG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuc3VicykuZm9yRWFjaChrID0+IHRoaXMuc3Vic1trXS51bnN1YnNjcmliZSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZCB1cmwgcGFyYW1ldGVycyBmb3IgcmVxdWVzdHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHBhcmFtc1xuICAgICAqL1xuICAgIGJ1aWxkUGFyYW1zKHBhcmFtczogYW55KTogSHR0cFBhcmFtcyB7XG4gICAgICAgIHZhciBxdWVyeV9wYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuXG4gICAgICAgIGlmIChwYXJhbXMpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaCgoa2V5OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zW2tleV0pIHF1ZXJ5X3BhcmFtcy5zZXQoa2V5LCBwYXJhbXNba2V5XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBxdWVyeV9wYXJhbXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXZlbnQgbGlzdGVuZXJzLlxuICAgICAqL1xuICAgIHByaXZhdGUgZXZlbnRMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmV2ZW50KSB7XG4gICAgICAgICAgICBsZXQgc3ViID0gKCkgPT4gdGhpcy5zZXREZWZhdWx0SGVhZGVycygpO1xuICAgICAgICAgICAgdGhpcy5zdWJzWydhdXRoOmxvZ2dpbmdJbiddID0gdGhpcy5ldmVudC5saXN0ZW4oJ2F1dGg6bG9nZ2luZ0luJykuc3Vic2NyaWJlKHN1Yik7XG4gICAgICAgICAgICB0aGlzLnN1YnNbJ2F1dGg6bG9nZ2VkT3V0J10gPSB0aGlzLmV2ZW50Lmxpc3RlbignYXV0aDpsb2dnZWRPdXQnKS5zdWJzY3JpYmUoc3ViKTtcbiAgICAgICAgICAgIHRoaXMuc3Vic1snYXV0aDpjaGVjayddID0gdGhpcy5ldmVudC5saXN0ZW4oJ2F1dGg6Y2hlY2snKS5zdWJzY3JpYmUoc3ViKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB1cmwgZm9yIGh0dHAgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgdXJsXG4gICAgICovXG4gICAgcHVibGljIGdldFVybCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICh1cmwuc3RhcnRzV2l0aCgnLycpIHx8IHVybC5zdGFydHNXaXRoKCdodHRwJykpIHJldHVybiB1cmw7XG5cbiAgICAgICAgbGV0IGJhc2VVcmwgPSB0aGlzLmJhc2VVcmwgfHwgdGhpcy5jb25maWcuZ2V0KCdodHRwLmJhc2VVcmwnKSB8fCAnJztcblxuICAgICAgICByZXR1cm4gKGJhc2VVcmwpID8gYmFzZVVybCArICcvJyArIHVybCA6IHVybDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGRlZmF1bHQgaGVhZGVycyBmb3IgaHR0cCByZXF1ZXN0LlxuICAgICAqL1xuICAgIHNldERlZmF1bHRIZWFkZXJzKCk6IHZvaWQge1xuICAgICAgICBsZXQgY29uZmlnSGVhZGVycyA9ICh0aGlzLmNvbmZpZykgPyB0aGlzLmNvbmZpZy5nZXQoJ2h0dHAuaGVhZGVycycpIDogbnVsbDtcblxuICAgICAgICBpZiAoY29uZmlnSGVhZGVycykge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoY29uZmlnSGVhZGVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IHRoaXMuaGVhZGVycy5zZXQoa2V5LCBjb25maWdIZWFkZXJzW2tleV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRva2VuSGVhZGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgdG9rZW4gaGVhZGVyIHRvIHRoZSByZXF1ZXN0LlxuICAgICAqL1xuICAgIHRva2VuSGVhZGVyKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLmdldCgnYXV0aGVudGljYXRpb24ubWV0aG9kLnRva2VuJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRva2VuLmdldCgpLnRoZW4odG9rZW4gPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2NoZW1lID0gdGhpcy5jb25maWcuZ2V0KCd0b2tlbi5zY2hlbWUnKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gKHNjaGVtZSkgPyBgJHtzY2hlbWV9ICR7dG9rZW59YCA6IHRva2VuO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlcnMgPSB0aGlzLmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRva2VuID8gdHJ1ZSA6IGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IHRoaXMuaGVhZGVycy5kZWxldGUoJ0F1dGhvcml6YXRpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxufVxuIiwiLyoqXG4gKiBNb2RlbCBmb3IgY2FjaGUgaXRlbXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBDYWNoZUl0ZW1Nb2RlbCB7XG4gICAgLyoqXG4gICAgICogV2hlbiB0aGUgY2FjaGUgaXRlbSBleHBpcmVzLlxuICAgICAqL1xuICAgIF9leHBpcmVzOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgb2YgdGhlIGNhY2hlIGl0ZW0uXG4gICAgICovXG4gICAgX3ZhbHVlOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y290ci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgaXRlbVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGl0ZW06IGFueSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGl0ZW0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlIGFjY2Vzc29yIHBhcnNlcyBKU09OLlxuICAgICAqL1xuICAgIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh0aGlzLl92YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB2YWx1ZSBtdXRhdG9yIHRoYXQgc3RyaW5naWZpZXMgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHZhbHVlXG4gICAgICovXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGV4cGlyZXMgYWNjZXNzb3IuXG4gICAgICovXG4gICAgZ2V0IGV4cGlyZXMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4cGlyZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBleHBpcmVzIG11dGF0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIG1pbnV0ZXNcbiAgICAgKi9cbiAgICBzZXQgZXhwaXJlcyhtaW51dGVzOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGV4cGlyYXRpb24gPSBuZXcgRGF0ZSgpO1xuICAgICAgICBleHBpcmF0aW9uLnNldE1pbnV0ZXMoZXhwaXJhdGlvbi5nZXRNaW51dGVzKCkgKyBtaW51dGVzKTtcbiAgICAgICAgdGhpcy5fZXhwaXJlcyA9IGV4cGlyYXRpb24uZ2V0VGltZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGNhY2hlZCBpdGVtIGlzIGV4cGlyZWQuXG4gICAgICovXG4gICAgaXNFeHBpcmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5leHBpcmVzIDw9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5leHBvcnQgY2xhc3MgTW9kZWwge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbWRvZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGF0dHJpYnV0ZXNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzPzogYW55KSB7XG4gICAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMgPSBKU09OLnBhcnNlKGF0dHJpYnV0ZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBhdHRyaWJ1dGVzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb21lbnQgSlNcbiAgICAgKlxuICAgICAqIEByZXR1cm4gbW9tZW50XG4gICAgICovXG4gICAgbW9tZW50ID0gbW9tZW50O1xufVxuIiwiZXhwb3J0IGNsYXNzIFBvbGljeU1vZGVsIHtcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBwb2xpY3kuXG4gICAgICovXG4gICAgbmFtZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG9iamVjdHMgb2YgdGhlIGRlZmluZWQgcG9saWN5LlxuICAgICAqL1xuICAgIG9iamVjdHM6IGFueVtdID0gW107XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3Rvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgcG9saWN5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IocG9saWN5OiBhbnkpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwb2xpY3kpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEF1dGhvcml6YXRpb24gfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRob3JpemF0aW9uJztcblxuZXhwb3J0IGNsYXNzIFVzZXJNb2RlbCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBtb2RlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBhdXRob3JpemF0aW9uXG4gICAgICogQHBhcmFtIHVzZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBhdXRob3JpemF0aW9uOiBBdXRob3JpemF0aW9uLFxuICAgICAgICBwdWJsaWMgdXNlcjogb2JqZWN0XG4gICAgKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgdXNlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdXNlciBjYW4gcGVyZm9ybSBhY3Rpb24gYmFzZWQgb24gYSBwb2xpY3kuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleVxuICAgICAqIEBwYXJhbSAgdmFsdWVcbiAgICAgKi9cbiAgICBjYW4oa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aG9yaXphdGlvbi5jaGVja1BvbGljeShrZXksIHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB1c2VyIGNhbm5vdCBwZXJmb3JtIGFjdGlvbiBiYXNlZCBvbiBhIHBvbGljeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5XG4gICAgICogQHBhcmFtICB2YWx1ZVxuICAgICAqL1xuICAgIGNhbm5vdChrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuYXV0aG9yaXphdGlvbi5jaGVja1BvbGljeShrZXksIHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGxvdyBhIHVzZXIgdG8gcGVyZm9ybSBhY3Rpb24gYmFzZWQgb24gYSBwb2xpY3kuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHBvbGljeU5hbWVcbiAgICAgKiBAcGFyYW0gIG9iamVjdFxuICAgICAqIEBwYXJhbSAgYWxsb3dlZFxuICAgICAqL1xuICAgIGFsbG93KHBvbGljeU5hbWU6IHN0cmluZywgb2JqZWN0OiBhbnksIGFsbG93ZWQ6IEZ1bmN0aW9uIHwgYm9vbGVhbik6IFVzZXJNb2RlbCB7XG4gICAgICAgIGlmICh0eXBlb2YgYWxsb3dlZCA9PT0gJ2Z1bmN0aW9uJyAmJiBhbGxvd2VkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aG9yaXphdGlvbi5hZGRQb2xpY3kocG9saWN5TmFtZSwgb2JqZWN0KTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYWxsb3dlZCA9PT0gJ2Jvb2xlYW4nICYmIGFsbG93ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aG9yaXphdGlvbi5hZGRQb2xpY3kocG9saWN5TmFtZSwgb2JqZWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aG9yaXphdGlvbi5yZW1vdmVQb2xpY3kocG9saWN5TmFtZSwgb2JqZWN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvbid0IGFsbG93IGEgdXNlciB0byBwZXJmb3JtIGFjdGlvbiBiYXNlZCBvbiBhIHBvbGljeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgcG9saWN5TmFtZVxuICAgICAqIEBwYXJhbSAgb2JqZWN0XG4gICAgICogQHBhcmFtICBhbGxvd2VkXG4gICAgICovXG4gICAgZGlzYWxsb3cocG9saWN5TmFtZTogc3RyaW5nLCBvYmplY3Q6IGFueSk6IFVzZXJNb2RlbCB7XG4gICAgICAgIHRoaXMuYXV0aG9yaXphdGlvbi5yZW1vdmVQb2xpY3kocG9saWN5TmFtZSwgb2JqZWN0KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZGVudGlmeSBhIHVzZXIgd2l0aCBhIHJvbGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcm9sZVxuICAgICAqL1xuICAgIGlkZW50aWZ5KHJvbGU6IHN0cmluZyk6IFVzZXJNb2RlbCB7XG4gICAgICAgIHRoaXMuYXV0aG9yaXphdGlvbi5hZGRQb2xpY3koJ3JvbGVzJywgcm9sZSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYSB1c2VyIGlzIGlkZW50aWZpZWQgYXMgYSByb2xlLlxuICAgICAqXG4gICAgICogQHBhcmFtICByb2xlXG4gICAgICovXG4gICAgaXMocm9sZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhvcml6YXRpb24uY2hlY2tQb2xpY3koJ3JvbGVzJywgcm9sZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYSB1c2VyIGlzIG5vdCBpZGVudGlmaWVkIHdpdGggYSByb2xlLlxuICAgICAqXG4gICAgICogQHBhcmFtICByb2xlXG4gICAgICovXG4gICAgaXNOb3Qocm9sZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5hdXRob3JpemF0aW9uLmNoZWNrUG9saWN5KCdyb2xlcycsIHJvbGUpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBvbGljeU1vZGVsIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aG9yaXphdGlvbiB7XG4gICAgLyoqXG4gICAgICogQWN0aXZlIFBvbGljaWVzXG4gICAgICovXG4gICAgcG9saWNpZXM6IFBvbGljeU1vZGVsW10gPSBbXTtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICAvKipcbiAgICAgKiAgQWRkIGEgcG9saWN5IHRvIHRoZSBzZXJ2aWNlLlxuICAgICAqXG4gICAgICogQHBhcmFtICBrZXlcbiAgICAgKiBAcGFyYW0gIHZhbHVlXG4gICAgICovXG4gICAgYWRkUG9saWN5KGtleTogc3RyaW5nLCB2YWx1ZT86IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5wb2xpY2llcy5maW5kSW5kZXgocG9saWN5ID0+IHBvbGljeS5uYW1lID09IGtleSkgPCAwKSB7XG4gICAgICAgICAgICBsZXQgcG9saWN5ID0gbmV3IFBvbGljeU1vZGVsKHsgbmFtZToga2V5IH0pO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUpIHBvbGljeS5vYmplY3RzLnB1c2godmFsdWUpO1xuXG4gICAgICAgICAgICB0aGlzLnBvbGljaWVzLnB1c2gocG9saWN5KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnBvbGljaWVzLmZpbmRJbmRleChwb2xpY3kgPT4gcG9saWN5Lm5hbWUgPT0ga2V5KTtcblxuICAgICAgICAgICAgaWYgKHZhbHVlICYmICF0aGlzLnBvbGljaWVzW2luZGV4XS5vYmplY3RzW3ZhbHVlXSkge1xuICAgICAgICAgICAgICAgIHRoaXMucG9saWNpZXNbaW5kZXhdLm9iamVjdHMucHVzaCh2YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgdGhlIGdpdmVuIHBvbGljeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgbmFtZVxuICAgICAqIEBwYXJhbSAgdmFsdWVcbiAgICAgKi9cbiAgICBjaGVja1BvbGljeShrZXk6IHN0cmluZywgdmFsdWU6IGFueSA9IG51bGwpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGNoZWNrID0gZmFsc2U7XG4gICAgICAgIGxldCBwb2xpY3kgPSB0aGlzLnBvbGljaWVzLmZpbmQocG9saWN5ID0+IHBvbGljeS5uYW1lID09PSBrZXkpO1xuXG4gICAgICAgIGlmIChwb2xpY3kpIHtcbiAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb2xpY3kgJiYgKCh2YWx1ZSAmJiBwb2xpY3kub2JqZWN0cy5pbmRleE9mKHZhbHVlKSA+PSAwKSB8fFxuICAgICAgICAgICAgKCF2YWx1ZSAmJiAhcG9saWN5Lm9iamVjdHMubGVuZ3RoKSkpIHtcbiAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2hlY2s7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYXIgYWxsIHRoZSBwb2xpY2llcyBvbiB0aGUgc2VydmljZS5cbiAgICAgKi9cbiAgICBjbGVhclBvbGljaWVzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBvbGljaWVzID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIFJlbW92ZSBhIHBvbGljeSB0aGF0IGhhcyBhbHJlYWR5IGJlZW4gZGVmaW5lZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5XG4gICAgICogQHBhcmFtICB2YWx1ZVxuICAgICAqL1xuICAgIHJlbW92ZVBvbGljeShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgcG9saWN5ID0gdGhpcy5wb2xpY2llcy5maW5kKHBvbGljeSA9PiBwb2xpY3kubmFtZSA9PT0ga2V5KTtcblxuICAgICAgICBpZiAocG9saWN5ICYmIHBvbGljeS5vYmplY3RzLmluZGV4T2YodmFsdWUpID49IDApIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMucG9saWNpZXMuZmluZEluZGV4KHBvbGljeSA9PiBwb2xpY3kubmFtZSA9PT0gbmFtZSk7XG4gICAgICAgICAgICBsZXQgb2JqZWN0SW5kZXhzOiBhbnlbXSA9IFtdO1xuXG4gICAgICAgICAgICBwb2xpY3kub2JqZWN0cy5mb3JFYWNoKChvLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG8gPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0SW5kZXhzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG9iamVjdEluZGV4cy5mb3JFYWNoKGluZGV4ID0+IGRlbGV0ZSBwb2xpY3kub2JqZWN0c1tpbmRleF0pO1xuXG4gICAgICAgICAgICB0aGlzLnBvbGljaWVzW2luZGV4XSA9IHBvbGljeTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEh0dHAgfSBmcm9tICcuL2h0dHAnO1xuaW1wb3J0IHsgQXV0aG9yaXphdGlvbiB9IGZyb20gJy4vYXV0aG9yaXphdGlvbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJy4vdG9rZW4nO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL2V2ZW50JztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoZW50aWNhdGlvbiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBzZXJ2aWNlLlxuICAgICAqXG4gICAgICogQHBhcmFtICBhdXRob3JpemF0aW9uXG4gICAgICogQHBhcmFtICBjb25maWdcbiAgICAgKiBAcGFyYW0gIGV2ZW50XG4gICAgICogQHBhcmFtICBodHRwXG4gICAgICogQHBhcmFtICBodHRwU2VydmljZVxuICAgICAqIEBwYXJhbSAgdG9rZW5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGF1dGhvcml6YXRpb246IEF1dGhvcml6YXRpb24sXG4gICAgICAgIHB1YmxpYyBjb25maWc6IENvbmZpZyxcbiAgICAgICAgcHVibGljIGV2ZW50OiBFdmVudCxcbiAgICAgICAgcHVibGljIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgIHB1YmxpYyBodHRwU2VydmljZTogSHR0cCxcbiAgICAgICAgcHVibGljIHRva2VuOiBUb2tlblxuICAgICkge1xuICAgICAgICB0aGlzLmV2ZW50LnNldENoYW5uZWxzKHRoaXMuY2hhbm5lbHMpO1xuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXV0aG9yaXplZCB1c2VyLlxuICAgICAqL1xuICAgIGF1dGhVc2VyOiBhbnkgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogU3RhdGUgb2YgdGhlIHVzZXIgYXV0aGVudGljYXRpb24uXG4gICAgICovXG4gICAgYXV0aGVudGljYXRlZDogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGNoYW5uZWxzLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBjaGFubmVsczogc3RyaW5nW10gPSBbXG4gICAgICAgICdhdXRoOmxvZ2luJyxcbiAgICAgICAgJ2F1dGg6bG9nZ2luSW4nLFxuICAgICAgICAnYXV0aDpsb2dnZWRJbicsXG4gICAgICAgICdhdXRoOmxvZ291dCcsXG4gICAgICAgICdhdXRoOmxvZ2dpbmdPdXQnLFxuICAgICAgICAnYXV0aDpsb2dnZWRPdXQnLFxuICAgICAgICAnYXV0aDpyZXF1aXJlZCcsXG4gICAgICAgICdhdXRoOmNoZWNrJyxcbiAgICAgICAgJ2F1dGg6Z3VhcmRlZCcsXG4gICAgICAgICdhdXRoOnJlZ2lzdGVyZWQnLFxuICAgIF07XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcmVkaXJlY3QgZGF0YSBvbiB0aGUgc2VydmljZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHJlZGlyZWN0OiBhbnkgPSBudWxsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgc3Vic2NpcHRpb25zIG9mIHRoZSBzZXJ2aWNlLlxuICAgICAqL1xuICAgIHN1YnM6IGFueSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRpbWVvdXRzIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICovXG4gICAgdGltZW91dHM6IGFueSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogT24gc2VydmljZSBkZXN0cm95LlxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnN1YnMpLmZvckVhY2goayA9PiB0aGlzLnN1YnNba10udW5zdWJzY3JpYmUoKSk7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMudGltZW91dHMpLmZvckVhY2goayA9PiBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0c1trXSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHVzZXIgaXMgbG9nZ2VkIGluLlxuICAgICAqXG4gICAgICogQHBhcmFtICBmb3JjZVxuICAgICAqL1xuICAgIGNoZWNrKGZvcmNlOiBib29sZWFuID0gZmFsc2UpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgbGV0IGVuZHBvaW50ID0gdGhpcy5jb25maWcuZ2V0KCdhdXRoZW50aWNhdGlvbi5lbmRwb2ludHMuY2hlY2snKTtcblxuICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpjaGVjaycpO1xuXG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnNlcnZlciA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRoZW50aWNhdGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tSZXNvbHZlKG9ic2VydmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXV0aGVudGljYXRlZCA9PT0gdHJ1ZSAmJiAhZm9yY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpsb2dnZWRJbicsIHRoaXMudXNlcigpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrUmVzb2x2ZShvYnNlcnZlciwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaHR0cFNlcnZpY2UudG9rZW5IZWFkZXIoKS50aGVuKCh0b2tlbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VXNlcihlbmRwb2ludCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdXRoZW50aWNhdGVkKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VXNlcihyZXMuZGF0YSB8fCByZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnQuYnJvYWRjYXN0KCdhdXRoOmxvZ2dlZEluJywgdGhpcy51c2VyKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tSZXNvbHZlKG9ic2VydmVyLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF1dGhlbnRpY2F0ZWQoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnQuYnJvYWRjYXN0KCdhdXRoOnJlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1Jlc29sdmUob2JzZXJ2ZXIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdXRoZW50aWNhdGVkKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tSZXNvbHZlKG9ic2VydmVyLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBlcnIgPT4gb2JzZXJ2ZXIuZXJyb3IoZXJyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc29sdmUgdGhlIGF1dGggY2hlY2suXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb2JzZXJ2ZXJcbiAgICAgKiBAcGFyYW0gYXV0aGVudGljYXRlZFxuICAgICAqL1xuICAgIGNoZWNrUmVzb2x2ZShvYnNlcnZlcjogT2JzZXJ2ZXI8Ym9vbGVhbj4sIGF1dGhlbnRpY2F0ZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ldmVudC5icm9hZGNhc3QoJ2F1dGg6Y2hlY2snLCBhdXRoZW50aWNhdGVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGltZW91dHNbJ2NoZWNrUmVzb2x2ZSddID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChhdXRoZW50aWNhdGVkKTtcbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzZXJ2aWNlIGV2ZW50IGxpc3RlbmVycy5cbiAgICAgKi9cbiAgICBldmVudExpc3RlbmVycygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdWJzWydhdXRoOmxvZ2dlZEluJ10gPSB0aGlzLmV2ZW50Lmxpc3RlbignYXV0aDpsb2dnZWRJbicpLnN1YnNjcmliZSgodXNlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRBdXRoZW50aWNhdGVkKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5zZXRVc2VyKHVzZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgZm9yZ290IHBhc3N3b3JkIHJlcXVlc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGNyZWRlbnRpYWxzXG4gICAgICogQHBhcmFtICBlbmRwb2ludFxuICAgICAqIEBwYXJhbSAgaGVhZGVyc1xuICAgICAqL1xuICAgIGZvcmdvdFBhc3N3b3JkKGRhdGE6IGFueSwgZW5kcG9pbnQ6IHN0cmluZyA9ICcnLCBoZWFkZXJzID0ge30pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBlbmRwb2ludCA9IHRoaXMuY29uZmlnLmdldChcbiAgICAgICAgICAgICdhdXRoZW50aWNhdGlvbi5lbmRwb2ludHMuZm9yZ290UGFzc3dvcmQnLCBlbmRwb2ludFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoZW5kcG9pbnQsIGRhdGEsIGhlYWRlcnMpLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlc29sdmUocmVzKSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHJlZGlyZWN0IGRhdGEuXG4gICAgICovXG4gICAgZ2V0UmVkaXJlY3QoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXJlY3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi5cbiAgICAgKi9cbiAgICBnZXRUb2tlbigpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50b2tlbi5nZXQoKS50aGVuKHRva2VuID0+IHJlc29sdmUodG9rZW4pLCBlcnIgPT4gcmVqZWN0KGVycikpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnQgYXV0aGVudGljYXRlZCB1c2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtICBlbmRwb2ludFxuICAgICAqL1xuICAgIGdldFVzZXIoZW5kcG9pbnQ6IHN0cmluZyA9ICcnKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgZW5kcG9pbnQgPSB0aGlzLmNvbmZpZy5nZXQoJ2F1dGhlbnRpY2F0aW9uLmVuZHBvaW50cy5nZXRVc2VyJywgZW5kcG9pbnQpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGVuZHBvaW50KS50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHZhbHVlIGF1dGhlbnRpY2F0ZWQgdmFsdWUuXG4gICAgICovXG4gICAgZ2V0QXV0aGVudGljYXRlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aGVudGljYXRlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgaWYgYXV0aGVudGljYXRlZCB2YWx1ZS5cbiAgICAgKi9cbiAgICBzZXRBdXRoZW50aWNhdGVkKHZhbHVlOiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhlbnRpY2F0ZWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgbG9naW4gcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgY3JlZGVudGlhbHNcbiAgICAgKiBAcGFyYW0gIGVuZHBvaW50XG4gICAgICogQHBhcmFtICBoZWFkZXJzXG4gICAgICovXG4gICAgbG9naW4oY3JlZGVudGlhbHM6IGFueSwgZW5kcG9pbnQ6IHN0cmluZyA9ICcnLCBoZWFkZXJzID0ge30pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBlbmRwb2ludCA9IHRoaXMuY29uZmlnLmdldCgnYXV0aGVudGljYXRpb24uZW5kcG9pbnRzLmxvZ2luJywgZW5kcG9pbnQpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmh0dHAucG9zdChlbmRwb2ludCwgY3JlZGVudGlhbHMsIGhlYWRlcnMpLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkxvZ2luKHJlcykudGhlbigoKSA9PiByZXNvbHZlKHJlcyksIGVycm9yID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgcmVxdWVzdCB0byBsb2cgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlciBvdXQuXG4gICAgICovXG4gICAgbG9nb3V0KGVuZHBvaW50OiBzdHJpbmcgPSAnJywgaGVhZGVycyA9IHt9KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnQuYnJvYWRjYXN0KCdhdXRoOmxvZ2dpbmdPdXQnKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBlbmRwb2ludCA9IHRoaXMuY29uZmlnLmdldCgnYXV0aGVudGljYXRpb24uZW5kcG9pbnRzLmxvZ291dCcsIGVuZHBvaW50KTtcblxuICAgICAgICAgICAgICAgIGlmIChlbmRwb2ludCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmh0dHAucG9zdChlbmRwb2ludCwge30sIGhlYWRlcnMpLnRvUHJvbWlzZSgpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Mb2dvdXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKVxuICAgICAgICAgICAgICAgICAgICB9LCBlcnJvciA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTG9nb3V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWN0aW9ucyB0byBwZXJmb3JtIG9uIGxvZ2luLlxuICAgICAqXG4gICAgICogQHBhcmFtICByZXNcbiAgICAgKi9cbiAgICBvbkxvZ2luKHJlczogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmVUb2tlbihyZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnQuYnJvYWRjYXN0KCdhdXRoOmxvZ2dpbmdJbicsIHJlcykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzb2x2ZVVzZXIoKS50aGVuKCgpID0+IHJlc29sdmUoKSwgZXJyID0+IHJlamVjdChlcnIpKTtcbiAgICAgICAgICAgICAgICB9LCBlcnIgPT4gcmVqZWN0KGVycikpO1xuICAgICAgICAgICAgfSwgZXJyID0+IHJlamVjdChlcnIpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWN0aW9ucyB0byBwZXJmb3JtIG9uIGxvZ291dC5cbiAgICAgKi9cbiAgICBvbkxvZ291dCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51bmF1dGhlbnRpY2F0ZSgpO1xuICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpsb2dnZWRPdXQnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuZCBjbGVhcnMgdGhlIHJlZGlyZWN0IGRhdGEuXG4gICAgICovXG4gICAgcHVsbFJlZGlyZWN0KCk6IGFueSB7XG4gICAgICAgIGxldCByZWRpcmVjdCA9IHRoaXMucmVkaXJlY3Q7XG5cbiAgICAgICAgdGhpcy5yZWRpcmVjdCA9IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIHJlZGlyZWN0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmQgYSByZWdpc3RlciByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtICBkYXRhXG4gICAgICogQHBhcmFtICAgZW5kcG9pbnRcbiAgICAgKiBAcGFyYW0gIGhlYWRlcnNcbiAgICAgKiBAcGFyYW0gcG9zdFJlZ2lzdGVyTG9naW5cbiAgICAgKi9cbiAgICByZWdpc3RlcihkYXRhOiBvYmplY3QsIGVuZHBvaW50OiBzdHJpbmcgPSAnJywgaGVhZGVycyA9IHt9LCBwb3N0UmVnaXN0ZXJMb2dpbjogYm9vbGVhbiA9IGZhbHNlKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgZW5kcG9pbnQgPSB0aGlzLmNvbmZpZy5nZXQoJ2F1dGhlbnRpY2F0aW9uLmVuZHBvaW50cy5yZWdpc3RlcicsIGVuZHBvaW50KTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaHR0cC5wb3N0KGVuZHBvaW50LCBkYXRhLCBoZWFkZXJzKS50b1Byb21pc2UoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHBvc3RSZWdpc3RlckxvZ2luKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Mb2dpbihyZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpyZWdpc3RlcmVkJywgcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudC5icm9hZGNhc3QoJ2F1dGg6cmVnaXN0ZXJlZCcsIHJlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgcmVzZXQgcGFzc3dvcmQgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgIGNyZWRlbnRpYWxzXG4gICAgICogQHBhcmFtICAgZW5kcG9pbnRcbiAgICAgKiBAcGFyYW0gIGhlYWRlcnNcbiAgICAgKi9cbiAgICByZXNldFBhc3N3b3JkKGRhdGE6IGFueSwgZW5kcG9pbnQ6IHN0cmluZyA9ICcnLCBoZWFkZXJzID0ge30pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBlbmRwb2ludCA9IHRoaXMuY29uZmlnLmdldChcbiAgICAgICAgICAgICdhdXRoZW50aWNhdGlvbi5lbmRwb2ludHMucmVzZXRQYXNzd29yZCcsIGVuZHBvaW50XG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaHR0cC5wb3N0KGVuZHBvaW50LCBkYXRhLCBoZWFkZXJzKS50b1Byb21pc2UoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkxvZ2luKHJlcykudGhlbigoKSA9PiByZXNvbHZlKHJlcykpXG4gICAgICAgICAgICB9LCBlcnJvciA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzb2x2ZSB0aGUgYXV0aGVudGljYXRlZCB1c2VyLlxuICAgICAqL1xuICAgIHJlc29sdmVVc2VyKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRpbWVvdXRzWydyZXNvbHZlVXNlciddID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRVc2VyKCkudGhlbigodXNlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF1dGhlbnRpY2F0ZWQodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRVc2VyKHVzZXIuZGF0YSB8fCB1c2VyKS50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpsb2dnZWRJbicsIHVzZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICAgICAgfSwgMjUwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSByZWRpcmVjdCBkYXRhLlxuICAgICAqL1xuICAgIHNldFJlZGlyZWN0KHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcmVjdCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY3VycmVudCBhdXRoZW50aWNhdGVkIHVzZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHVzZXJcbiAgICAgKi9cbiAgICBzZXRVc2VyKHVzZXI6IG9iamVjdCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICB1c2VyID0gbmV3IFVzZXJNb2RlbCh0aGlzLmF1dGhvcml6YXRpb24sIHVzZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiByZXNvbHZlKHRoaXMuYXV0aFVzZXIgPSB1c2VyKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcmUgYXV0IHRva2VuIGFuZCBicm9hZGNhc3QgYW4gZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHJlc1xuICAgICAqL1xuICAgIHN0b3JlVG9rZW4ocmVzOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHRoaXMudG9rZW4uc2V0KHRoaXMudG9rZW4ucmVhZChyZXMpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVuYXV0aGVudGljYXRlIHRoZSBjdXJyZW50IHVzZXIuXG4gICAgICovXG4gICAgdW5hdXRoZW50aWNhdGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudG9rZW4ucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuc2V0QXV0aGVudGljYXRlZChmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0VXNlcihudWxsKTtcbiAgICAgICAgdGhpcy5hdXRob3JpemF0aW9uLmNsZWFyUG9saWNpZXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnQgYXV0aGVudGljYXRlZCB1c2VyLlxuICAgICAqL1xuICAgIHVzZXIgPSAoKTogYW55ID0+IHRoaXMuYXV0aFVzZXI7XG59XG4iLCJpbXBvcnQgeyBBdXRoZW50aWNhdGlvbiB9IGZyb20gJy4vYXV0aGVudGljYXRpb24nO1xuaW1wb3J0IHsgQXV0aG9yaXphdGlvbiB9IGZyb20gJy4vYXV0aG9yaXphdGlvbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSHR0cCB9IGZyb20gJy4vaHR0cCc7XG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJy4vdG9rZW4nO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL2V2ZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNvY2lhbEF1dGhlbnRpY2F0aW9uIGV4dGVuZHMgQXV0aGVudGljYXRpb24ge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgYXV0aG9yaXphdGlvbjogQXV0aG9yaXphdGlvbixcbiAgICAgICAgcHVibGljIGNvbmZpZzogQ29uZmlnLFxuICAgICAgICBwdWJsaWMgZXZlbnQ6IEV2ZW50LFxuICAgICAgICBwdWJsaWMgaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgcHVibGljIGh0dHBTZXJ2aWNlOiBIdHRwLFxuICAgICAgICBwdWJsaWMgdG9rZW46IFRva2VuXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGF1dGhvcml6YXRpb24sIGNvbmZpZywgZXZlbnQsIGh0dHAsIGh0dHBTZXJ2aWNlLCB0b2tlbik7XG5cbiAgICAgICAgLy9cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dpbiB3aXRoIGEgc29jaWFsIHByb3ZpZGVyLlxuICAgICAqL1xuICAgIC8vIGxvZ2luKHByb3ZpZGVyOiBzdHJpbmcsIG9wdGlvbnM/OiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIC8vICAgICByZXR1cm4gbmV3IFByb21pc2UoKCkgPT4ge1xuICAgIC8vICAgICAgICAgLy8gdGhpcy5oYW5kbGVMb2dpblN1Y2Nlc3MocmVzKS50aGVuKChyZXMpID0+IHtcbiAgICAvLyAgICAgICAgIC8vICAgICB0aGlzLm9uTG9naW4ocmVzKS50aGVuKCgpID0+IHJlc29sdmUocmVzKSk7XG4gICAgLy8gICAgICAgICAvLyB9LCAoZXJyb3IpID0+IHJlamVjdCh0aGlzLmhhbmRsZUxvZ2luRXJyb3IoZXJyb3IpKSlcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIHN1Y2Nlc2Z1bCBGYWNlYm9vayBsb2dpbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgcmVzXG4gICAgICovXG4gICAgaGFuZGxlTG9naW5TdWNjZXNzKHJlczogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmVTb2NpYWxDcmVkZW50aWFscyhyZXMpO1xuXG4gICAgICAgICAgICB0aGlzLmh0dHAucG9zdChcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5nZXQoJ2F1dGhlbnRpY2F0aW9uLmVuZHBvaW50cy5zb2NpYWxBdXRoJyksXG4gICAgICAgICAgICAgICAgcmVzXG4gICAgICAgICAgICApLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25Mb2dpbihyZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICAgICAgICAgICAgfSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIGVycm9ycyBvbiBmYWNlYm9vayBsb2dpbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgZXJyb3JcbiAgICAgKi9cbiAgICBoYW5kbGVMb2dpbkVycm9yID0gKGVycm9yOiBvYmplY3QpID0+IGNvbnNvbGUubG9nKGVycm9yKTtcblxuICAgIC8qKlxuICAgICAqIFN0b3JlIHNvY2lhbCBhdXRoIGNyZWRuZXRpYWxzLlxuICAgICAqXG4gICAgICogQHBhcmFtICByZXNcbiAgICAgKi9cbiAgICBzdG9yZVNvY2lhbENyZWRlbnRpYWxzKHJlczogYW55KTogdm9pZCB7XG4gICAgICAgIGlmIChyZXMubmV0d29yayA9PSAnZmFjZWJvb2snKSB7XG4gICAgICAgICAgICB0aGlzLnRva2VuLnNldChcbiAgICAgICAgICAgICAgICByZXMuYXV0aFJlc3BvbnNlLmFjY2Vzc1Rva2VuLFxuICAgICAgICAgICAgICAgICdmYWNlYm9va19hY2Nlc3NfdG9rZW4nXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWNoZUl0ZW1Nb2RlbCB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4vLi4vY29uZmlnJztcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSAnLi9ldmVudCc7XG5cbmludGVyZmFjZSBDYWNoZUludGVyZmFjZSB7XG4gICAgW2tleTogc3RyaW5nXTogQ2FjaGVJdGVtTW9kZWw7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYWNoZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIGNhY2hlIGluc3RhbmNlLlxuICAgICAqL1xuICAgIGNhY2hlTmFtZTogc3RyaW5nID0gJ25na2l0X2NhY2hlJztcblxuICAgIC8qKlxuICAgICAqIEluIG1lbW9yeSBjb2xsZWN0aW9uIG9mIGNhY2hlLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2NhY2hlOiBDYWNoZUludGVyZmFjZSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3IuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY29uZmlnOiBDb25maWcsXG4gICAgICAgIHByaXZhdGUgZXZlbnQ6IEV2ZW50LFxuICAgICAgICBwcml2YXRlIHN0b3JhZ2U6IFN0b3JhZ2VcbiAgICApIHtcbiAgICAgICAgdGhpcy5yZXRyaWV2ZUNhY2hlKCk7XG5cbiAgICAgICAgdGhpcy5zdWJzWydhdXRoOmxvZ2dlZE91dCddID0gdGhpcy5ldmVudC5saXN0ZW4oJ2F1dGg6bG9nZ2VkT3V0JylcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlID0ge307XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHN1YnNjaXB0aW9ucyBvZiB0aGUgc2VydmljZS5cbiAgICAgKi9cbiAgICBzdWJzOiBhbnkgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIE9uIHNlcnZpY2UgZGVzdHJveS5cbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5zdWJzKS5mb3JFYWNoKGsgPT4gdGhpcy5zdWJzW2tdLnVuc3Vic2NyaWJlKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlIHRoZSBzdG9yZWQgY2FjaGUuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHJldHJpZXZlQ2FjaGUoKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5nZXQodGhpcy5jYWNoZU5hbWUpLnRoZW4oY2FjaGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjYWNoZSkge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjYWNoZSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVbaXRlbV0gPSBuZXcgQ2FjaGVJdGVtTW9kZWwoY2FjaGVbaXRlbV0pXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGUgPSBjYWNoZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlID0gdGhpcy5zdG9yZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5jYWNoZSk7XG4gICAgICAgICAgICB9LCBlcnIgPT4gcmVqZWN0KGVycikpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTYXZlIHRoZSBjYWNoZSB0byBzdG9yYWdlLlxuICAgICAqXG4gICAgICogQHBhcmFtICBrZXlcbiAgICAgKiBAcGFyYW0gIHZhbHVlXG4gICAgICovXG4gICAgc3RvcmUoKTogYW55IHtcbiAgICAgICAgdGhpcy5zdG9yYWdlLnNldCh0aGlzLmNhY2hlTmFtZSwgdGhpcy5fY2FjaGUpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBY2Nlc3NvciB0byB0aGUgaW4gbWVtZW9yeSBjYWNoZS5cbiAgICAgKi9cbiAgICBnZXQgY2FjaGUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE11dGF0b3IgdG8gdGhlIGluIG1lbWVvcnkgY2FjaGUuXG4gICAgICpcbiAgICAgKi9cbiAgICBzZXQgY2FjaGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fY2FjaGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYW4gaXRlbSBmcm9tIGNhY2hlLlxuICAgICAqXG4gICAgICogQHBhcmFtICAga2V5XG4gICAgICogQHBhcmFtICBkZWZhdXRWYWx1ZVxuICAgICAqL1xuICAgIGdldChrZXk6IHN0cmluZywgZGVmYXV0VmFsdWU6IGFueSA9IG51bGwpOiBhbnkge1xuICAgICAgICBpZiAodGhpcy5jYWNoZVtrZXldICYmICF0aGlzLmNhY2hlW2tleV0uaXNFeHBpcmVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlW2tleV0udmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZGVmYXV0VmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWZhdXRWYWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGtleSk7XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGFuIGl0ZW0gdG8gY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleVxuICAgICAqIEBwYXJhbSAgdmFsdWVcbiAgICAgKiBAcGFyYW0gIGV4cGlyZXNcbiAgICAgKi9cbiAgICBzZXQoXG4gICAgICAgIGtleTogc3RyaW5nLFxuICAgICAgICB2YWx1ZTogYW55LFxuICAgICAgICBleHBpcmVzOiBudW1iZXIgPSB0aGlzLmNvbmZpZy5nZXQoJ2NhY2hlLmV4cGlyZXMnKVxuICAgICk6IHZvaWQge1xuICAgICAgICBsZXQgY2FjaGVJdGVtID0gbmV3IENhY2hlSXRlbU1vZGVsKHsgdmFsdWU6IHZhbHVlLCBleHBpcmVzOiBleHBpcmVzIH0pO1xuXG4gICAgICAgIHRoaXMuX2NhY2hlW2tleV0gPSBjYWNoZUl0ZW07XG5cbiAgICAgICAgdGhpcy5zdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbiBpdGVtIGZyb20gY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICovXG4gICAgcmVtb3ZlKGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmNhY2hlW2tleV07XG4gICAgICAgIHRoaXMuc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGVhciB0aGUgY2FjaGUuXG4gICAgICovXG4gICAgY2xlYXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUodGhpcy5jYWNoZU5hbWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbiBpdGVtIGZyb20gY2FjaGUgYW5kIHJlbW92ZSBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5XG4gICAgICovXG4gICAgcHVsbChrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0KGtleSk7XG4gICAgICAgIHRoaXMucmVtb3ZlKGtleSk7XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGNhY2hlIGhhcyBhbiBpdGVtLlxuICAgICAqXG4gICAgICogQHBhcmFtICBrZXlcbiAgICAgKi9cbiAgICBoYXMoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KGtleSkgIT09IG51bGwgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIENhbkFjdGl2YXRlLCBDYW5BY3RpdmF0ZUNoaWxkLCBSb3V0ZXJTdGF0ZVNuYXBzaG90XG59IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvbiB9IGZyb20gJy4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24nO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2V2ZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dGhHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlLCBDYW5BY3RpdmF0ZUNoaWxkLCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgYXV0aFxuICAgICAqIEBwYXJhbSAgZXZlbnRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGF1dGg6IEF1dGhlbnRpY2F0aW9uLFxuICAgICAgICBwdWJsaWMgZXZlbnQ6IEV2ZW50XG4gICAgKSB7IH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzdWJzY2lwdGlvbnMgb2YgdGhlIHNlcnZpY2UuXG4gICAgICovXG4gICAgc3ViczogYW55ID0ge307XG5cbiAgICAvKipcbiAgICAgKiBPbiBzZXJ2aWNlIGRlc3Ryb3kuXG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuc3VicykuZm9yRWFjaChrID0+IHRoaXMuc3Vic1trXS51bnN1YnNjcmliZSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgaWYgdGhlIHVzZXIgY2FuIGFjdGl2YXRlIGEgcm91dGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcm91dGVcbiAgICAgKiBAcGFyYW0gc3RhdGVcbiAgICAgKi9cbiAgICBjYW5BY3RpdmF0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3VhcmQocm91dGUsIHN0YXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgaWYgdGhlIHVzZXIgY2FuIGFjdGl2YXRlIGNoaWxkcmVuIG9mIGEgcm91dGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHJvdXRlXG4gICAgICogQHBhcmFtICBzdGF0ZSAgICAgKlxuICAgICAqL1xuICAgIGNhbkFjdGl2YXRlQ2hpbGQocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmd1YXJkKHJvdXRlLCBzdGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIG1ldGhvZCB0byBhcHBseSB0byBndWFyZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByb3V0ZVxuICAgICAqIEBwYXJhbSBzdGF0ZVxuICAgICAqL1xuICAgIGd1YXJkKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByb3V0ZTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dGgudXNlcigpKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJzWydhdXRoOmNoZWNrJ10gPSB0aGlzLmF1dGguY2hlY2soKS5zdWJzY3JpYmUoY2hlY2sgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDptb2RhbCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRoLnNldFJlZGlyZWN0KHN0YXRlLnVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkFjdGl2YXRlLCBDYW5BY3RpdmF0ZUNoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbic7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJy4vLi4vc2VydmljZXMvZXZlbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aFJlc29sdmVHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlLCBDYW5BY3RpdmF0ZUNoaWxkLCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgYXV0aFxuICAgICAqIEBwYXJhbSAgZXZlbnRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGF1dGg6IEF1dGhlbnRpY2F0aW9uLFxuICAgICAgICBwdWJsaWMgZXZlbnQ6IEV2ZW50XG4gICAgKSB7IH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzdWJzY2lwdGlvbnMgb2YgdGhlIHNlcnZpY2UuXG4gICAgICovXG4gICAgc3ViczogYW55ID0ge307XG5cbiAgICAvKipcbiAgICAgKiBPbiBzZXJ2aWNlIGRlc3Ryb3kuXG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuc3VicykuZm9yRWFjaChrID0+IHRoaXMuc3Vic1trXS51bnN1YnNjcmliZSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgaWYgdGhlIHVzZXIgY2FuIGFjdGl2YXRlIGEgcm91dGUuXG4gICAgICovXG4gICAgY2FuQWN0aXZhdGUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmd1YXJkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lIGlmIHRoZSB1c2VyIGNhbiBhY3RpdmF0ZSBjaGlsZHJlbiBvZiBhIHJvdXRlLlxuICAgICAqL1xuICAgIGNhbkFjdGl2YXRlQ2hpbGQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmd1YXJkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIG1ldGhvZCB0byBhcHBseSB0byBndWFyZC5cbiAgICAgKi9cbiAgICBndWFyZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRoLnVzZXIoKSkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3Vic1snYXV0aDpjaGVjayddID0gdGhpcy5hdXRoLmNoZWNrKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cCB9IGZyb20gJy4vaHR0cCc7XG5pbXBvcnQge1xuICAgIEh0dHBFdmVudCwgSHR0cEhhbmRsZXIsIEh0dHBJbnRlcmNlcHRvciBhcyBJbnRlcmNlcHRvciwgSHR0cFJlcXVlc3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSHR0cEludGVyY2VwdG9yIGltcGxlbWVudHMgSW50ZXJjZXB0b3Ige1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgaW50ZXJjZXB0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGh0dHBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGh0dHA6IEh0dHBcbiAgICApIHsgfVxuXG4gICAgLyoqXG4gICAgICogSW50ZXJjZXB0IHRoZSBodHRwIHJlcXVlc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHJlcVxuICAgICAqIEBwYXJhbSAgbmV4dFxuICAgICAqL1xuICAgIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgICAgICByZXEgPSByZXEuY2xvbmUoe1xuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5odHRwLmhlYWRlcnMsXG4gICAgICAgICAgICB1cmw6IHRoaXMuaHR0cC5nZXRVcmwocmVxLnVybClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cCB9IGZyb20gJy4vaHR0cCc7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJy4vZXZlbnQnO1xuaW1wb3J0IHtcbiAgICBIdHRwRXZlbnQsIEh0dHBJbnRlcmNlcHRvciwgSHR0cEhhbmRsZXIsIEh0dHBSZXF1ZXN0LCBIdHRwRXJyb3JSZXNwb25zZVxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgaW50ZXJjZXB0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGh0dHBcbiAgICAgKiBAcGFyYW0gIGV2ZW50XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBodHRwOiBIdHRwLFxuICAgICAgICBwdWJsaWMgZXZlbnQ6IEV2ZW50LFxuICAgICkgeyB9XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcmNlcHQgdGhlIGh0dHAgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgcmVxXG4gICAgICogQHBhcmFtICBuZXh0XG4gICAgICovXG4gICAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpLnBpcGUodGFwKCgpID0+IHsgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnQuYnJvYWRjYXN0KCdhdXRoOnJlcXVpcmVkJywgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7XG4gICAgQXV0aGVudGljYXRpb24sIEF1dGhvcml6YXRpb24sIEV2ZW50LCBIdHRwLCBTb2NpYWxBdXRoZW50aWNhdGlvbixcbiAgICBTdG9yYWdlLCBUb2tlbiwgQ2FjaGVcbn0gZnJvbSAnLi9zZXJ2aWNlcy9pbmRleCc7XG5pbXBvcnQgeyBBdXRoR3VhcmQsIEF1dGhSZXNvbHZlR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9pbmRleCc7XG5pbXBvcnQgeyBIVFRQX0lOVEVSQ0VQVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEh0dHBJbnRlcmNlcHRvciB9IGZyb20gJy4vc2VydmljZXMvaHR0cC1pbnRlcmNlcHRvcic7XG5pbXBvcnQgeyBBdXRoSW50ZXJjZXB0b3IgfSBmcm9tICcuL3NlcnZpY2VzL2h0dHAtYXV0aC1pbnRlcmNlcHRvcic7XG5cbi8qKlxuICogbmdLaXQgU2VydmljZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBOR0tJVF9QUk9WSURFUlM6IGFueVtdID0gW1xuICAgIEF1dGhlbnRpY2F0aW9uLFxuICAgIEF1dGhHdWFyZCxcbiAgICBBdXRoUmVzb2x2ZUd1YXJkLFxuICAgIFNvY2lhbEF1dGhlbnRpY2F0aW9uLFxuICAgIEF1dGhvcml6YXRpb24sXG4gICAgQ29uZmlnLFxuICAgIFN0b3JhZ2UsXG4gICAgQ2FjaGUsXG4gICAgRXZlbnQsXG4gICAgSHR0cCxcbiAgICBUb2tlbixcbiAgICB7XG4gICAgICAgIHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLFxuICAgICAgICB1c2VDbGFzczogSHR0cEludGVyY2VwdG9yLFxuICAgICAgICBtdWx0aTogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUyxcbiAgICAgICAgdXNlQ2xhc3M6IEF1dGhJbnRlcmNlcHRvcixcbiAgICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG5dO1xuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBOR0tJVF9QUk9WSURFUlMgfSBmcm9tICcuL3Byb3ZpZGVycyc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0h0dHBDbGllbnRNb2R1bGVdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICAuLi5OR0tJVF9QUk9WSURFUlMsXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBuZ0tpdE1vZHVsZSB7XG4gICAgLyoqXG4gICAgICogbmdLaXQgbW9kdWxlIGluaXRpYWxpemVyLlxuICAgICAqXG4gICAgICogQHBhcmFtICBvcHRpb25zXG4gICAgICovXG4gICAgc3RhdGljIGZvclJvb3Qob3B0aW9uczogYW55KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogbmdLaXRNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6ICduZ0tpdE9wdGlvbnMnLCB1c2VWYWx1ZTogb3B0aW9ucyB9LFxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIl8uc2V0IiwiXy5tZXJnZSIsImxvY2FsRm9yYWdlLmNyZWF0ZUluc3RhbmNlIiwidHNsaWJfMS5fX2V4dGVuZHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztJQWdISSxnQkFBNEMsUUFBYTtRQUFiLGFBQVEsR0FBUixRQUFRLENBQUs7UUFDckQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2xDOzs7Ozs7OztJQUtELDJCQUFVOzs7O0lBQVYsY0FBb0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0lBUTFDLG9CQUFHOzs7Ozs7O0lBQUgsVUFBSSxHQUFXLEVBQUUsUUFBcUI7UUFBckIseUJBQUEsRUFBQSxnQkFBcUI7UUFDbEMsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQTtLQUN2Qzs7Ozs7Ozs7Ozs7Ozs7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