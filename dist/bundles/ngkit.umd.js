(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('lodash'), require('rxjs'), require('localforage'), require('@angular/common/http'), require('moment'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ngkit', ['exports', '@angular/core', 'lodash', 'rxjs', 'localforage', '@angular/common/http', 'moment', 'rxjs/operators'], factory) :
    (factory((global.ngkit = {}),global.ng.core,null,global.rxjs,null,global.ng.common.http,null,global.rxjs.operators));
}(this, (function (exports,core,_,rxjs,localForage,http,moment,operators) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Config = (function () {
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
                if (override === void 0) {
                    override = false;
                }
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
                return _.set(this.options, key, value);
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
                this.options = _.merge(this.options, options);
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        Config.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: ['ngKitOptions',] }] }
            ];
        };
        return Config;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Event = (function () {
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
                    Event.channels[key] = new rxjs.Subject();
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
                if (data === void 0) {
                    data = {};
                }
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
            { type: core.Injectable },
        ];
        return Event;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Storage = (function () {
        /**
         * Create a new instance of the service.
         *
         * @param config
         */
        function Storage(config) {
            this.config = config;
            this.db = localForage.createInstance({
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        Storage.ctorParameters = function () {
            return [
                { type: Config }
            ];
        };
        return Storage;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Token = (function () {
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
                if (response === void 0) {
                    response = null;
                }
                if (response) {
                    var /** @type {?} */ key = this.config.get('token.readAs');
                    return key.split('.').reduce(function (o, i) { return o[i]; }, response);
                }
                return null;
            };
        Token.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        Token.ctorParameters = function () {
            return [
                { type: Config },
                { type: Storage }
            ];
        };
        return Token;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Http = (function () {
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
            this.headers = new http.HttpHeaders();
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
                var /** @type {?} */ query_params = new http.HttpParams();
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        Http.ctorParameters = function () {
            return [
                { type: Config },
                { type: Event },
                { type: Token }
            ];
        };
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
     */ CacheItemModel = (function () {
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
             */ function () {
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
             */ function (value) {
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
             */ function () {
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
             */ function (minutes) {
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
    var Model = (function () {
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
    var PolicyModel = (function () {
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
    var UserModel = (function () {
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
    var Authorization = (function () {
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
                if (value === void 0) {
                    value = null;
                }
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        Authorization.ctorParameters = function () { return []; };
        return Authorization;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Authentication = (function () {
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
        function Authentication(authorization, config, event, http$$1, httpService, token) {
            var _this = this;
            this.authorization = authorization;
            this.config = config;
            this.event = event;
            this.http = http$$1;
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
                if (force === void 0) {
                    force = false;
                }
                var /** @type {?} */ endpoint = this.config.get('authentication.endpoints.check');
                this.event.broadcast('auth:check');
                return new rxjs.Observable(function (observer) {
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
                if (endpoint === void 0) {
                    endpoint = '';
                }
                if (headers === void 0) {
                    headers = {};
                }
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
                if (endpoint === void 0) {
                    endpoint = '';
                }
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
                if (endpoint === void 0) {
                    endpoint = '';
                }
                if (headers === void 0) {
                    headers = {};
                }
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
                if (endpoint === void 0) {
                    endpoint = '';
                }
                if (headers === void 0) {
                    headers = {};
                }
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
                if (endpoint === void 0) {
                    endpoint = '';
                }
                if (headers === void 0) {
                    headers = {};
                }
                if (postRegisterLogin === void 0) {
                    postRegisterLogin = false;
                }
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
                if (endpoint === void 0) {
                    endpoint = '';
                }
                if (headers === void 0) {
                    headers = {};
                }
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        Authentication.ctorParameters = function () {
            return [
                { type: Authorization },
                { type: Config },
                { type: Event },
                { type: http.HttpClient },
                { type: Http },
                { type: Token }
            ];
        };
        return Authentication;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var SocialAuthentication = (function (_super) {
        __extends(SocialAuthentication, _super);
        /**
         * Constructor.
         */
        function SocialAuthentication(authorization, config, event, http$$1, httpService, token) {
            var _this = _super.call(this, authorization, config, event, http$$1, httpService, token) || this;
            _this.authorization = authorization;
            _this.config = config;
            _this.event = event;
            _this.http = http$$1;
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        SocialAuthentication.ctorParameters = function () {
            return [
                { type: Authorization },
                { type: Config },
                { type: Event },
                { type: http.HttpClient },
                { type: Http },
                { type: Token }
            ];
        };
        return SocialAuthentication;
    }(Authentication));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Cache = (function () {
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
             */ function () {
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
             */ function (value) {
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
                if (defautValue === void 0) {
                    defautValue = null;
                }
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
                if (expires === void 0) {
                    expires = this.config.get('cache.expires');
                }
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        Cache.ctorParameters = function () {
            return [
                { type: Config },
                { type: Event },
                { type: Storage }
            ];
        };
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
    var AuthGuard = (function () {
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        AuthGuard.ctorParameters = function () {
            return [
                { type: Authentication },
                { type: Event }
            ];
        };
        return AuthGuard;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AuthResolveGuard = (function () {
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        AuthResolveGuard.ctorParameters = function () {
            return [
                { type: Authentication },
                { type: Event }
            ];
        };
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
    var HttpInterceptor = (function () {
        /**
         * Create a new instance of the interceptor.
         *
         * @param  http
         */
        function HttpInterceptor(http$$1) {
            this.http = http$$1;
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        HttpInterceptor.ctorParameters = function () {
            return [
                { type: Http }
            ];
        };
        return HttpInterceptor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AuthInterceptor = (function () {
        /**
         * Create a new instance of the interceptor.
         *
         * @param  http
         * @param  event
         */
        function AuthInterceptor(http$$1, event) {
            this.http = http$$1;
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
                return next.handle(req).pipe(operators.tap(function () { }, function (error) {
                    if (error instanceof http.HttpErrorResponse) {
                        if (error.status === 401) {
                            _this.event.broadcast('auth:required', error);
                        }
                    }
                }));
            };
        AuthInterceptor.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        AuthInterceptor.ctorParameters = function () {
            return [
                { type: Http },
                { type: Event }
            ];
        };
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
            provide: http.HTTP_INTERCEPTORS,
            useClass: HttpInterceptor,
            multi: true
        },
        {
            provide: http.HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ];

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ngKitModule = (function () {
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
            { type: core.NgModule, args: [{
                        imports: [http.HttpClientModule],
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

    exports.Config = Config;
    exports.Authentication = Authentication;
    exports.Authorization = Authorization;
    exports.Cache = Cache;
    exports.Event = Event;
    exports.Http = Http;
    exports.SocialAuthentication = SocialAuthentication;
    exports.Storage = Storage;
    exports.Token = Token;
    exports.AuthGuard = AuthGuard;
    exports.AuthResolveGuard = AuthResolveGuard;
    exports.NGKIT_PROVIDERS = NGKIT_PROVIDERS;
    exports.Model = Model;
    exports.ngKitModule = ngKitModule;
    exports.ɵb = AuthInterceptor;
    exports.ɵa = HttpInterceptor;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdraXQudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ2tpdC9jb25maWcudHMiLCJuZzovL25na2l0L3NlcnZpY2VzL2V2ZW50LnRzIiwibmc6Ly9uZ2tpdC9zZXJ2aWNlcy9zdG9yYWdlLnRzIiwibmc6Ly9uZ2tpdC9zZXJ2aWNlcy90b2tlbi50cyIsIm5nOi8vbmdraXQvc2VydmljZXMvaHR0cC50cyIsIm5nOi8vbmdraXQvbW9kZWxzL2NhY2hlLWl0ZW0udHMiLCJuZzovL25na2l0L21vZGVscy9tb2RlbC50cyIsIm5nOi8vbmdraXQvbW9kZWxzL3BvbGljeS50cyIsIm5nOi8vbmdraXQvbW9kZWxzL3VzZXIudHMiLCJuZzovL25na2l0L3NlcnZpY2VzL2F1dGhvcml6YXRpb24udHMiLCJuZzovL25na2l0L3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnRzIixudWxsLCJuZzovL25na2l0L3NlcnZpY2VzL3NvY2lhbC1hdXRoZW50aWNhdGlvbi50cyIsIm5nOi8vbmdraXQvc2VydmljZXMvY2FjaGUudHMiLCJuZzovL25na2l0L2d1YXJkcy9hdXRoLWd1YXJkLnRzIiwibmc6Ly9uZ2tpdC9ndWFyZHMvYXV0aC1yZXNvbHZlLWd1YXJkLnRzIiwibmc6Ly9uZ2tpdC9zZXJ2aWNlcy9odHRwLWludGVyY2VwdG9yLnRzIiwibmc6Ly9uZ2tpdC9zZXJ2aWNlcy9odHRwLWF1dGgtaW50ZXJjZXB0b3IudHMiLCJuZzovL25na2l0L3Byb3ZpZGVycy50cyIsIm5nOi8vbmdraXQvbmdraXQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29uZmlnIHtcbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IGNvbmZpZ3VyYXRpb24uXG4gICAgICovXG4gICAgc3RhdGljIGRlZmF1bHRPcHRpb25zOiBhbnkgPSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBdXRoZW50aWNhdGlvbiBzZXR0aW5ncy5cbiAgICAgICAgICovXG4gICAgICAgIGF1dGhlbnRpY2F0aW9uOiB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIENvbW1vbiBlbmRwb2ludHMgZm9yIGF1dGhlbnRpY2F0aW9uIHNlcmNpY2UuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGVuZHBvaW50czoge1xuICAgICAgICAgICAgICAgIGNoZWNrOiAnJyxcbiAgICAgICAgICAgICAgICBmb3JvZ290UGFzc3dvcmQ6ICcnLFxuICAgICAgICAgICAgICAgIGdldFVzZXI6ICcnLFxuICAgICAgICAgICAgICAgIGxvZ2luOiAnJyxcbiAgICAgICAgICAgICAgICBsb2dvdXQ6ICcnLFxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyOiAnJyxcbiAgICAgICAgICAgICAgICByZXNldFBhc3N3b3JkOiAnJyxcbiAgICAgICAgICAgICAgICBzb2NpYWxBdXRoOiAnJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogTWV0aG9kcyB1c2VkIGZvciBhdXRoZW50aWNhdGlvbi5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbWV0aG9kOiB7XG4gICAgICAgICAgICAgICAgdG9rZW46IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFNvY2lhbCBwcm92aWRlciBjb25maWd1cmF0aW9uLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzb2NpYWw6IHtcbiAgICAgICAgICAgICAgICBmYWNlYm9vazoge1xuICAgICAgICAgICAgICAgICAgICBpZDogJycsXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb246ICd2Mi42JyxcbiAgICAgICAgICAgICAgICAgICAgeGZibWw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlOiAncHVibGljX3Byb2ZpbGUsZW1haWwnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0d2l0dGVyOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVkaXJlY3RUbzogJycsXG4gICAgICAgICAgICAgICAgb2F1dGhQcm94eTogJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEF1dGhvcml6YXRpb24gb3B0aW9ucy5cbiAgICAgICAgICovXG4gICAgICAgIGF1dGhvcml6YXRpb246IHt9LFxuICAgICAgICAvKipcbiAgICAgICAgICogSHR0cCBvcHRpb25zLlxuICAgICAgICAgKi9cbiAgICAgICAgaHR0cDoge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBCYXNlZCB1cmwgZm9yIGh0dHAgcmVxdWVzdHMuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGJhc2VVcmw6ICcnLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBEZWZhdWx0IGhlYWRlcnMgZm9yIGh0dHAgcmVxdWVzdC5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaGVhZGVyczoge31cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JhZ2UgT3B0aW9uc1xuICAgICAgICAgKi9cbiAgICAgICAgc3RvcmFnZToge1xuICAgICAgICAgICAgbmFtZTogJ25na2l0U3RvcmFnZSdcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRva2VuIG9wdGlvbnMuXG4gICAgICAgICAqL1xuICAgICAgICB0b2tlbjoge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBEZWZhdWx0IG5hbWUgb2YgYXV0aG9yaXphdGlvbiB0b2tlbiByZWFkIGZyb20gcmVzcG9uc2VzLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByZWFkQXM6ICd0b2tlbicsXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIERlZmF1bHQgbmFtZSBvZiBhdXRob3JpemF0aW9uIHRva2VuIHRoYXQgaXMgc3RvcmVkLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdG9yZUFzOiAnX3Rva2VuJyxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogU2NoZW1lIHRvIHVzZSBpbiBBdXRob3JpemF0aW9uIGhlYWRlciBhbG9uZyB3aXRoIHRva2VuLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzY2hlbWU6ICdCZWFyZXInXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYWNoZSBzZXJ2aWNlIG9wdGlvbnMuXG4gICAgICAgICAqL1xuICAgICAgICBjYWNoZToge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBEZWZhdWx0IGV4cGlyYXRpb24gdGltZSBpbiBtaW51dGVzLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBleHBpcmVzOiA1XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFbmFibGUgZGVidWcgbW9kZS5cbiAgICAgICAgICovXG4gICAgICAgIGRlYnVnOiBmYWxzZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbmZpZyBvcHRpb25zLlxuICAgICAqL1xuICAgIG9wdGlvbnM6IGFueTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgc2VydmljZS4uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoQEluamVjdCgnbmdLaXRPcHRpb25zJykgcHJpdmF0ZSBfb3B0aW9uczogYW55KSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IENvbmZpZy5kZWZhdWx0T3B0aW9ucztcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKHRoaXMuX29wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgY29uZmlndXJhYmxlIG9wdGlvbnMuXG4gICAgICovXG4gICAgZ2V0T3B0aW9ucygpOiBhbnkgeyByZXR1cm4gdGhpcy5vcHRpb25zOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYW4gb3B0aW9uIGJ5IGtleS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgIGtleVxuICAgICAqIEBwYXJhbSAgIG92ZXJyaWRlXG4gICAgICovXG4gICAgZ2V0KGtleTogc3RyaW5nLCBvdmVycmlkZTogYW55ID0gZmFsc2UpOiBhbnkge1xuICAgICAgICByZXR1cm4gQ29uZmlnLmdldEl0ZW0oa2V5LCBvdmVycmlkZSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdGF0aWMgbWV0aG9kIHRvIGdldCBhbiBvcHRpb24gYnkga2V5LlxuICAgICAqXG4gICAgICogQHBhcmFtICAga2V5XG4gICAgICogQHBhcmFtICAgb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0SXRlbShrZXk6IHN0cmluZywgb3ZlcnJpZGU/OiBhbnkpOiBhbnkge1xuICAgICAgICBpZiAob3ZlcnJpZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBvdmVycmlkZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChDb25maWcuZGVmYXVsdE9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkuc3BsaXQoJy4nKS5yZWR1Y2UoKG8sIGkpID0+IG9baV0sIENvbmZpZy5kZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgYW4gb3B0aW9uIGJ5IGtleS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgIGtleVxuICAgICAqIEBwYXJhbSAgdmFsdWVcbiAgICAgKi9cbiAgICBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgcmV0dXJuIF8uc2V0KHRoaXMub3B0aW9ucywga2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjb25maWd1cmFibGUgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgb3B0aW9uc1xuICAgICAqL1xuICAgIHNldE9wdGlvbnMob3B0aW9uczogYW55KTogQ29uZmlnIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gXy5tZXJnZSh0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEV2ZW50IHtcbiAgICAvKipcbiAgICAgKiBFdmVudCBjaGFubmVscy5cbiAgICAgKi9cbiAgICBzdGF0aWMgY2hhbm5lbHM6IFN1YmplY3Q8YW55PltdID0gW107XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYW4gZXZlbnQgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleVxuICAgICAqL1xuICAgIHN0YXRpYyBjaGFubmVsKGtleTogYW55KTogU3ViamVjdDxhbnk+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBFdmVudC5jaGFubmVsc1trZXldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgRXZlbnQuY2hhbm5lbHNba2V5XSA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBFdmVudC5jaGFubmVsc1trZXldO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBtdWx0aXBsZSBldmVudCBjaGFubmVscy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudHNcbiAgICAgKi9cbiAgICBzZXRDaGFubmVscyhjaGFubmVsczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgY2hhbm5lbHMuZm9yRWFjaCgoY2hhbm5lbCkgPT4gRXZlbnQuY2hhbm5lbChjaGFubmVsKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnJvYWRjYXN0IGFuIGV2ZW50IHRvIGEgY2hhbm5lbC5cbiAgICAgKi9cbiAgICBicm9hZGNhc3Qoa2V5OiBzdHJpbmcsIGRhdGEgPSB7fSk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoRXZlbnQuY2hhbm5lbChrZXkpLm5leHQoZGF0YSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBMaXN0ZW4gb24gYSBjaGFubmVsIGZvciBhbiBldmVudC5zXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleVxuICAgICAqL1xuICAgIGxpc3RlbihrZXk6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBFdmVudC5jaGFubmVsKGtleSkuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCAqIGFzIGxvY2FsRm9yYWdlIGZyb20gXCJsb2NhbGZvcmFnZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0b3JhZ2VEcml2ZXIge1xuICAgIC8qKlxuICAgICAqIFRoZSBkYXRhYmFzZSBvZiB0aGUgc3RvcmFnZSBwcm92aWRlci5cbiAgICAgKi9cbiAgICBkYjogYW55O1xuXG4gICAgLyoqXG4gICAgICogR2V0IGFuIGl0ZW0gZnJvbSBzdG9yYWdlLlxuICAgICAqXG4gICAgICogQHBhcmFtICAga2V5XG4gICAgICovXG4gICAgZ2V0KGtleTogc3RyaW5nKTogUHJvbWlzZTxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogU2V0IGFuIGl0ZW0gdG8gc3RvcmFnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5XG4gICAgICogQHBhcmFtICB2YWx1ZVxuICAgICAqL1xuICAgIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IFByb21pc2U8YW55PjtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbiBpdGVtIGZyb20gc3RvcmFnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKi9cbiAgICByZW1vdmUoa2V5OiBzdHJpbmcpOiBQcm9taXNlPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBDbGVhciBzdG9yYWdlLlxuICAgICAqL1xuICAgIGNsZWFyKCk6IFByb21pc2U8YW55Pjtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0b3JhZ2UgaW1wbGVtZW50cyBTdG9yYWdlRHJpdmVyIHtcbiAgICAvKipcbiAgICAgKiBUaGUgZGF0YWJhc2Ugb2YgdGhlIHN0b3JhZ2UgcHJvdmlkZXIuXG4gICAgICovXG4gICAgZGI6IGFueTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgc2VydmljZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuZGIgPSBsb2NhbEZvcmFnZS5jcmVhdGVJbnN0YW5jZSh7XG4gICAgICAgICAgICBuYW1lOiB0aGlzLmNvbmZpZy5nZXQoJ3N0b3JhZ2UubmFtZScpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBpdGVtIGZyb20gbG9jYWwgc3RvcmFnZS5cbiAgICAgKi9cbiAgICBnZXQoa2V5OiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYi5nZXRJdGVtKGtleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGFuIGl0ZW0gdG8gbG9jYWwgc3RvcmFnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5XG4gICAgICogQHBhcmFtICB2YWx1ZVxuICAgICAqL1xuICAgIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRiLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFuIGl0ZW0gZnJvbSBsb2NhbCBzdG9yYWdlLlxuICAgICAqXG4gICAgICogQHBhcmFtICAga2V5XG4gICAgICovXG4gICAgcmVtb3ZlKGtleTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGIucmVtb3ZlSXRlbShrZXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsZWFyIGxvY2FsIHN0b3JhZ2UuXG4gICAgICovXG4gICAgY2xlYXIoKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGIuY2xlYXIoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4vLi4vY29uZmlnJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRva2VuIHtcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRva2VuIHN0b3JlZCBpbiBsb2NhbCBzdG9yYWdlLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfdG9rZW46IHN0cmluZyA9ICdfdG9rZW4nO1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGNvbmZpZ1xuICAgICAqIEBwYXJhbSAgc3RvcmFnZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgY29uZmlnOiBDb25maWcsXG4gICAgICAgIHByaXZhdGUgc3RvcmFnZTogU3RvcmFnZVxuICAgICkgeyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRva2VuIGZyb20gbG9jYWwgc3RvcmFnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgdG9rZW5OYW1lXG4gICAgICovXG4gICAgZ2V0KHRva2VuTmFtZT86IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0b2tlbk5hbWUgPSB0b2tlbk5hbWUgfHwgdGhpcy5jb25maWcuZ2V0KCd0b2tlbi5uYW1lJywgdGhpcy5fdG9rZW4pO1xuXG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2UuZ2V0KHRva2VuTmFtZSkudGhlbih0b2tlbiA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0b2tlbik7XG4gICAgICAgICAgICB9LCBlcnIgPT4gcmVqZWN0KGVycikpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdG9yZSB0aGUgdG9rZW4gaW4gbG9jYWwgc3RvcmFnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgdG9rZW5cbiAgICAgKiBAcGFyYW0gIHRva2VuTmFtZVxuICAgICAqL1xuICAgIHNldCh0b2tlbjogc3RyaW5nLCB0b2tlbk5hbWU/OiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdG9rZW5OYW1lID0gdG9rZW5OYW1lIHx8IHRoaXMuY29uZmlnLmdldCgndG9rZW4ubmFtZScsIHRoaXMuX3Rva2VuKTtcblxuICAgICAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNldCh0b2tlbk5hbWUsIHRva2VuKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9LCAoKSA9PiByZWplY3QoJ0Vycm9yOiBDb3VsZCBub3Qgc3RvcmUgdG9rZW4uJykpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWplY3QoJ0Vycm9yOiBObyB0b2tlbiBwcm92aWRlZC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIHRva2VuIGZyb20gbG9jYWwgc3RvcmFnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgdG9rZW5OYW1lXG4gICAgICovXG4gICAgcmVtb3ZlKHRva2VuTmFtZT86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICB0b2tlbk5hbWUgPSB0b2tlbk5hbWUgfHwgdGhpcy5jb25maWcuZ2V0KCd0b2tlbi5uYW1lJywgdGhpcy5fdG9rZW4pO1xuXG4gICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUodG9rZW5OYW1lKTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWFkIGEgdG9rZW4gZnJvbSBhIHJlc3BvbnNlIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgcmVzcG9uc2VcbiAgICAgKi9cbiAgICByZWFkKHJlc3BvbnNlOiBhbnkgPSBudWxsKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBsZXQga2V5ID0gdGhpcy5jb25maWcuZ2V0KCd0b2tlbi5yZWFkQXMnKTtcblxuICAgICAgICAgICAgcmV0dXJuIGtleS5zcGxpdCgnLicpLnJlZHVjZSgobzogYW55LCBpOiBzdHJpbmcpID0+IG9baV0sIHJlc3BvbnNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi8uLi9jb25maWcnO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL2V2ZW50JztcbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnLi90b2tlbic7XG5pbXBvcnQgeyBIdHRwSGVhZGVycywgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEh0dHAgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgc2VydmljZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgY29uZmlnXG4gICAgICogQHBhcmFtICBldmVudFxuICAgICAqIEBwYXJhbSAgdG9rZW5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGNvbmZpZzogQ29uZmlnLFxuICAgICAgICBwdWJsaWMgZXZlbnQ6IEV2ZW50LFxuICAgICAgICBwdWJsaWMgdG9rZW46IFRva2VuXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc2V0RGVmYXVsdEhlYWRlcnMoKTtcbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFzc2lnbmFibGUgYmFzZSB1cmwgZm9yIGh0dHAgY2FsbHMuXG4gICAgICovXG4gICAgYmFzZVVybDogc3RyaW5nID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBIZWFkZXJzIHRvIGJlIHNlbnQgd2l0aCBhbGwgaHR0cCBjYWxscy5cbiAgICAgKi9cbiAgICBwdWJsaWMgaGVhZGVyczogSHR0cEhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzdWJzY2lwdGlvbnMgb2YgdGhlIHNlcnZpY2UuXG4gICAgICovXG4gICAgc3ViczogYW55ID0ge307XG5cbiAgICAvKipcbiAgICAgKiBPbiBzZXJ2aWNlIGRlc3Ryb3kuXG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuc3VicykuZm9yRWFjaChrID0+IHRoaXMuc3Vic1trXS51bnN1YnNjcmliZSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZCB1cmwgcGFyYW1ldGVycyBmb3IgcmVxdWVzdHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHBhcmFtc1xuICAgICAqL1xuICAgIGJ1aWxkUGFyYW1zKHBhcmFtczogYW55KTogSHR0cFBhcmFtcyB7XG4gICAgICAgIHZhciBxdWVyeV9wYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuXG4gICAgICAgIGlmIChwYXJhbXMpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaCgoa2V5OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zW2tleV0pIHF1ZXJ5X3BhcmFtcy5zZXQoa2V5LCBwYXJhbXNba2V5XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBxdWVyeV9wYXJhbXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXZlbnQgbGlzdGVuZXJzLlxuICAgICAqL1xuICAgIHByaXZhdGUgZXZlbnRMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmV2ZW50KSB7XG4gICAgICAgICAgICBsZXQgc3ViID0gKCkgPT4gdGhpcy5zZXREZWZhdWx0SGVhZGVycygpO1xuICAgICAgICAgICAgdGhpcy5zdWJzWydhdXRoOmxvZ2dpbmdJbiddID0gdGhpcy5ldmVudC5saXN0ZW4oJ2F1dGg6bG9nZ2luZ0luJykuc3Vic2NyaWJlKHN1Yik7XG4gICAgICAgICAgICB0aGlzLnN1YnNbJ2F1dGg6bG9nZ2VkT3V0J10gPSB0aGlzLmV2ZW50Lmxpc3RlbignYXV0aDpsb2dnZWRPdXQnKS5zdWJzY3JpYmUoc3ViKTtcbiAgICAgICAgICAgIHRoaXMuc3Vic1snYXV0aDpjaGVjayddID0gdGhpcy5ldmVudC5saXN0ZW4oJ2F1dGg6Y2hlY2snKS5zdWJzY3JpYmUoc3ViKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB1cmwgZm9yIGh0dHAgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgdXJsXG4gICAgICovXG4gICAgcHVibGljIGdldFVybCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICh1cmwuc3RhcnRzV2l0aCgnLycpIHx8IHVybC5zdGFydHNXaXRoKCdodHRwJykpIHJldHVybiB1cmw7XG5cbiAgICAgICAgbGV0IGJhc2VVcmwgPSB0aGlzLmJhc2VVcmwgfHwgdGhpcy5jb25maWcuZ2V0KCdodHRwLmJhc2VVcmwnKSB8fCAnJztcblxuICAgICAgICByZXR1cm4gKGJhc2VVcmwpID8gYmFzZVVybCArICcvJyArIHVybCA6IHVybDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGRlZmF1bHQgaGVhZGVycyBmb3IgaHR0cCByZXF1ZXN0LlxuICAgICAqL1xuICAgIHNldERlZmF1bHRIZWFkZXJzKCk6IHZvaWQge1xuICAgICAgICBsZXQgY29uZmlnSGVhZGVycyA9ICh0aGlzLmNvbmZpZykgPyB0aGlzLmNvbmZpZy5nZXQoJ2h0dHAuaGVhZGVycycpIDogbnVsbDtcblxuICAgICAgICBpZiAoY29uZmlnSGVhZGVycykge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoY29uZmlnSGVhZGVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IHRoaXMuaGVhZGVycy5zZXQoa2V5LCBjb25maWdIZWFkZXJzW2tleV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRva2VuSGVhZGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgdG9rZW4gaGVhZGVyIHRvIHRoZSByZXF1ZXN0LlxuICAgICAqL1xuICAgIHRva2VuSGVhZGVyKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLmdldCgnYXV0aGVudGljYXRpb24ubWV0aG9kLnRva2VuJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRva2VuLmdldCgpLnRoZW4odG9rZW4gPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2NoZW1lID0gdGhpcy5jb25maWcuZ2V0KCd0b2tlbi5zY2hlbWUnKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gKHNjaGVtZSkgPyBgJHtzY2hlbWV9ICR7dG9rZW59YCA6IHRva2VuO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlcnMgPSB0aGlzLmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRva2VuID8gdHJ1ZSA6IGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IHRoaXMuaGVhZGVycy5kZWxldGUoJ0F1dGhvcml6YXRpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxufVxuIiwiLyoqXG4gKiBNb2RlbCBmb3IgY2FjaGUgaXRlbXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBDYWNoZUl0ZW1Nb2RlbCB7XG4gICAgLyoqXG4gICAgICogV2hlbiB0aGUgY2FjaGUgaXRlbSBleHBpcmVzLlxuICAgICAqL1xuICAgIF9leHBpcmVzOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgb2YgdGhlIGNhY2hlIGl0ZW0uXG4gICAgICovXG4gICAgX3ZhbHVlOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y290ci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgaXRlbVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGl0ZW06IGFueSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGl0ZW0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlIGFjY2Vzc29yIHBhcnNlcyBKU09OLlxuICAgICAqL1xuICAgIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh0aGlzLl92YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB2YWx1ZSBtdXRhdG9yIHRoYXQgc3RyaW5naWZpZXMgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHZhbHVlXG4gICAgICovXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGV4cGlyZXMgYWNjZXNzb3IuXG4gICAgICovXG4gICAgZ2V0IGV4cGlyZXMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4cGlyZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBleHBpcmVzIG11dGF0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIG1pbnV0ZXNcbiAgICAgKi9cbiAgICBzZXQgZXhwaXJlcyhtaW51dGVzOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGV4cGlyYXRpb24gPSBuZXcgRGF0ZSgpO1xuICAgICAgICBleHBpcmF0aW9uLnNldE1pbnV0ZXMoZXhwaXJhdGlvbi5nZXRNaW51dGVzKCkgKyBtaW51dGVzKTtcbiAgICAgICAgdGhpcy5fZXhwaXJlcyA9IGV4cGlyYXRpb24uZ2V0VGltZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGNhY2hlZCBpdGVtIGlzIGV4cGlyZWQuXG4gICAgICovXG4gICAgaXNFeHBpcmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5leHBpcmVzIDw9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5leHBvcnQgY2xhc3MgTW9kZWwge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbWRvZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGF0dHJpYnV0ZXNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzPzogYW55KSB7XG4gICAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMgPSBKU09OLnBhcnNlKGF0dHJpYnV0ZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBhdHRyaWJ1dGVzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb21lbnQgSlNcbiAgICAgKlxuICAgICAqIEByZXR1cm4gbW9tZW50XG4gICAgICovXG4gICAgbW9tZW50ID0gbW9tZW50O1xufVxuIiwiZXhwb3J0IGNsYXNzIFBvbGljeU1vZGVsIHtcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBwb2xpY3kuXG4gICAgICovXG4gICAgbmFtZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG9iamVjdHMgb2YgdGhlIGRlZmluZWQgcG9saWN5LlxuICAgICAqL1xuICAgIG9iamVjdHM6IGFueVtdID0gW107XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3Rvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgcG9saWN5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IocG9saWN5OiBhbnkpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwb2xpY3kpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEF1dGhvcml6YXRpb24gfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRob3JpemF0aW9uJztcblxuZXhwb3J0IGNsYXNzIFVzZXJNb2RlbCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBtb2RlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBhdXRob3JpemF0aW9uXG4gICAgICogQHBhcmFtIHVzZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBhdXRob3JpemF0aW9uOiBBdXRob3JpemF0aW9uLFxuICAgICAgICBwdWJsaWMgdXNlcjogb2JqZWN0XG4gICAgKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgdXNlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdXNlciBjYW4gcGVyZm9ybSBhY3Rpb24gYmFzZWQgb24gYSBwb2xpY3kuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleVxuICAgICAqIEBwYXJhbSAgdmFsdWVcbiAgICAgKi9cbiAgICBjYW4oa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aG9yaXphdGlvbi5jaGVja1BvbGljeShrZXksIHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB1c2VyIGNhbm5vdCBwZXJmb3JtIGFjdGlvbiBiYXNlZCBvbiBhIHBvbGljeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5XG4gICAgICogQHBhcmFtICB2YWx1ZVxuICAgICAqL1xuICAgIGNhbm5vdChrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuYXV0aG9yaXphdGlvbi5jaGVja1BvbGljeShrZXksIHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGxvdyBhIHVzZXIgdG8gcGVyZm9ybSBhY3Rpb24gYmFzZWQgb24gYSBwb2xpY3kuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHBvbGljeU5hbWVcbiAgICAgKiBAcGFyYW0gIG9iamVjdFxuICAgICAqIEBwYXJhbSAgYWxsb3dlZFxuICAgICAqL1xuICAgIGFsbG93KHBvbGljeU5hbWU6IHN0cmluZywgb2JqZWN0OiBhbnksIGFsbG93ZWQ6IEZ1bmN0aW9uIHwgYm9vbGVhbik6IFVzZXJNb2RlbCB7XG4gICAgICAgIGlmICh0eXBlb2YgYWxsb3dlZCA9PT0gJ2Z1bmN0aW9uJyAmJiBhbGxvd2VkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aG9yaXphdGlvbi5hZGRQb2xpY3kocG9saWN5TmFtZSwgb2JqZWN0KTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYWxsb3dlZCA9PT0gJ2Jvb2xlYW4nICYmIGFsbG93ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aG9yaXphdGlvbi5hZGRQb2xpY3kocG9saWN5TmFtZSwgb2JqZWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aG9yaXphdGlvbi5yZW1vdmVQb2xpY3kocG9saWN5TmFtZSwgb2JqZWN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvbid0IGFsbG93IGEgdXNlciB0byBwZXJmb3JtIGFjdGlvbiBiYXNlZCBvbiBhIHBvbGljeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgcG9saWN5TmFtZVxuICAgICAqIEBwYXJhbSAgb2JqZWN0XG4gICAgICogQHBhcmFtICBhbGxvd2VkXG4gICAgICovXG4gICAgZGlzYWxsb3cocG9saWN5TmFtZTogc3RyaW5nLCBvYmplY3Q6IGFueSk6IFVzZXJNb2RlbCB7XG4gICAgICAgIHRoaXMuYXV0aG9yaXphdGlvbi5yZW1vdmVQb2xpY3kocG9saWN5TmFtZSwgb2JqZWN0KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZGVudGlmeSBhIHVzZXIgd2l0aCBhIHJvbGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcm9sZVxuICAgICAqL1xuICAgIGlkZW50aWZ5KHJvbGU6IHN0cmluZyk6IFVzZXJNb2RlbCB7XG4gICAgICAgIHRoaXMuYXV0aG9yaXphdGlvbi5hZGRQb2xpY3koJ3JvbGVzJywgcm9sZSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYSB1c2VyIGlzIGlkZW50aWZpZWQgYXMgYSByb2xlLlxuICAgICAqXG4gICAgICogQHBhcmFtICByb2xlXG4gICAgICovXG4gICAgaXMocm9sZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhvcml6YXRpb24uY2hlY2tQb2xpY3koJ3JvbGVzJywgcm9sZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYSB1c2VyIGlzIG5vdCBpZGVudGlmaWVkIHdpdGggYSByb2xlLlxuICAgICAqXG4gICAgICogQHBhcmFtICByb2xlXG4gICAgICovXG4gICAgaXNOb3Qocm9sZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5hdXRob3JpemF0aW9uLmNoZWNrUG9saWN5KCdyb2xlcycsIHJvbGUpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBvbGljeU1vZGVsIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aG9yaXphdGlvbiB7XG4gICAgLyoqXG4gICAgICogQWN0aXZlIFBvbGljaWVzXG4gICAgICovXG4gICAgcG9saWNpZXM6IFBvbGljeU1vZGVsW10gPSBbXTtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICAvKipcbiAgICAgKiAgQWRkIGEgcG9saWN5IHRvIHRoZSBzZXJ2aWNlLlxuICAgICAqXG4gICAgICogQHBhcmFtICBrZXlcbiAgICAgKiBAcGFyYW0gIHZhbHVlXG4gICAgICovXG4gICAgYWRkUG9saWN5KGtleTogc3RyaW5nLCB2YWx1ZT86IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5wb2xpY2llcy5maW5kSW5kZXgocG9saWN5ID0+IHBvbGljeS5uYW1lID09IGtleSkgPCAwKSB7XG4gICAgICAgICAgICBsZXQgcG9saWN5ID0gbmV3IFBvbGljeU1vZGVsKHsgbmFtZToga2V5IH0pO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUpIHBvbGljeS5vYmplY3RzLnB1c2godmFsdWUpO1xuXG4gICAgICAgICAgICB0aGlzLnBvbGljaWVzLnB1c2gocG9saWN5KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnBvbGljaWVzLmZpbmRJbmRleChwb2xpY3kgPT4gcG9saWN5Lm5hbWUgPT0ga2V5KTtcblxuICAgICAgICAgICAgaWYgKHZhbHVlICYmICF0aGlzLnBvbGljaWVzW2luZGV4XS5vYmplY3RzW3ZhbHVlXSkge1xuICAgICAgICAgICAgICAgIHRoaXMucG9saWNpZXNbaW5kZXhdLm9iamVjdHMucHVzaCh2YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgdGhlIGdpdmVuIHBvbGljeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgbmFtZVxuICAgICAqIEBwYXJhbSAgdmFsdWVcbiAgICAgKi9cbiAgICBjaGVja1BvbGljeShrZXk6IHN0cmluZywgdmFsdWU6IGFueSA9IG51bGwpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGNoZWNrID0gZmFsc2U7XG4gICAgICAgIGxldCBwb2xpY3kgPSB0aGlzLnBvbGljaWVzLmZpbmQocG9saWN5ID0+IHBvbGljeS5uYW1lID09PSBrZXkpO1xuXG4gICAgICAgIGlmIChwb2xpY3kpIHtcbiAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb2xpY3kgJiYgKCh2YWx1ZSAmJiBwb2xpY3kub2JqZWN0cy5pbmRleE9mKHZhbHVlKSA+PSAwKSB8fFxuICAgICAgICAgICAgKCF2YWx1ZSAmJiAhcG9saWN5Lm9iamVjdHMubGVuZ3RoKSkpIHtcbiAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2hlY2s7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYXIgYWxsIHRoZSBwb2xpY2llcyBvbiB0aGUgc2VydmljZS5cbiAgICAgKi9cbiAgICBjbGVhclBvbGljaWVzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBvbGljaWVzID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIFJlbW92ZSBhIHBvbGljeSB0aGF0IGhhcyBhbHJlYWR5IGJlZW4gZGVmaW5lZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5XG4gICAgICogQHBhcmFtICB2YWx1ZVxuICAgICAqL1xuICAgIHJlbW92ZVBvbGljeShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgcG9saWN5ID0gdGhpcy5wb2xpY2llcy5maW5kKHBvbGljeSA9PiBwb2xpY3kubmFtZSA9PT0ga2V5KTtcblxuICAgICAgICBpZiAocG9saWN5ICYmIHBvbGljeS5vYmplY3RzLmluZGV4T2YodmFsdWUpID49IDApIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMucG9saWNpZXMuZmluZEluZGV4KHBvbGljeSA9PiBwb2xpY3kubmFtZSA9PT0gbmFtZSk7XG4gICAgICAgICAgICBsZXQgb2JqZWN0SW5kZXhzOiBhbnlbXSA9IFtdO1xuXG4gICAgICAgICAgICBwb2xpY3kub2JqZWN0cy5mb3JFYWNoKChvLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG8gPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0SW5kZXhzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG9iamVjdEluZGV4cy5mb3JFYWNoKGluZGV4ID0+IGRlbGV0ZSBwb2xpY3kub2JqZWN0c1tpbmRleF0pO1xuXG4gICAgICAgICAgICB0aGlzLnBvbGljaWVzW2luZGV4XSA9IHBvbGljeTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEh0dHAgfSBmcm9tICcuL2h0dHAnO1xuaW1wb3J0IHsgQXV0aG9yaXphdGlvbiB9IGZyb20gJy4vYXV0aG9yaXphdGlvbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJy4vdG9rZW4nO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL2V2ZW50JztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoZW50aWNhdGlvbiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBzZXJ2aWNlLlxuICAgICAqXG4gICAgICogQHBhcmFtICBhdXRob3JpemF0aW9uXG4gICAgICogQHBhcmFtICBjb25maWdcbiAgICAgKiBAcGFyYW0gIGV2ZW50XG4gICAgICogQHBhcmFtICBodHRwXG4gICAgICogQHBhcmFtICBodHRwU2VydmljZVxuICAgICAqIEBwYXJhbSAgdG9rZW5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGF1dGhvcml6YXRpb246IEF1dGhvcml6YXRpb24sXG4gICAgICAgIHB1YmxpYyBjb25maWc6IENvbmZpZyxcbiAgICAgICAgcHVibGljIGV2ZW50OiBFdmVudCxcbiAgICAgICAgcHVibGljIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgIHB1YmxpYyBodHRwU2VydmljZTogSHR0cCxcbiAgICAgICAgcHVibGljIHRva2VuOiBUb2tlblxuICAgICkge1xuICAgICAgICB0aGlzLmV2ZW50LnNldENoYW5uZWxzKHRoaXMuY2hhbm5lbHMpO1xuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXV0aG9yaXplZCB1c2VyLlxuICAgICAqL1xuICAgIGF1dGhVc2VyOiBhbnkgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogU3RhdGUgb2YgdGhlIHVzZXIgYXV0aGVudGljYXRpb24uXG4gICAgICovXG4gICAgYXV0aGVudGljYXRlZDogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGNoYW5uZWxzLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBjaGFubmVsczogc3RyaW5nW10gPSBbXG4gICAgICAgICdhdXRoOmxvZ2luJyxcbiAgICAgICAgJ2F1dGg6bG9nZ2luSW4nLFxuICAgICAgICAnYXV0aDpsb2dnZWRJbicsXG4gICAgICAgICdhdXRoOmxvZ291dCcsXG4gICAgICAgICdhdXRoOmxvZ2dpbmdPdXQnLFxuICAgICAgICAnYXV0aDpsb2dnZWRPdXQnLFxuICAgICAgICAnYXV0aDpyZXF1aXJlZCcsXG4gICAgICAgICdhdXRoOmNoZWNrJyxcbiAgICAgICAgJ2F1dGg6Z3VhcmRlZCcsXG4gICAgICAgICdhdXRoOnJlZ2lzdGVyZWQnLFxuICAgIF07XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcmVkaXJlY3QgZGF0YSBvbiB0aGUgc2VydmljZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHJlZGlyZWN0OiBhbnkgPSBudWxsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgc3Vic2NpcHRpb25zIG9mIHRoZSBzZXJ2aWNlLlxuICAgICAqL1xuICAgIHN1YnM6IGFueSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRpbWVvdXRzIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICovXG4gICAgdGltZW91dHM6IGFueSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogT24gc2VydmljZSBkZXN0cm95LlxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnN1YnMpLmZvckVhY2goayA9PiB0aGlzLnN1YnNba10udW5zdWJzY3JpYmUoKSk7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMudGltZW91dHMpLmZvckVhY2goayA9PiBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0c1trXSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHVzZXIgaXMgbG9nZ2VkIGluLlxuICAgICAqXG4gICAgICogQHBhcmFtICBmb3JjZVxuICAgICAqL1xuICAgIGNoZWNrKGZvcmNlOiBib29sZWFuID0gZmFsc2UpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgbGV0IGVuZHBvaW50ID0gdGhpcy5jb25maWcuZ2V0KCdhdXRoZW50aWNhdGlvbi5lbmRwb2ludHMuY2hlY2snKTtcblxuICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpjaGVjaycpO1xuXG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnNlcnZlciA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRoZW50aWNhdGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tSZXNvbHZlKG9ic2VydmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXV0aGVudGljYXRlZCA9PT0gdHJ1ZSAmJiAhZm9yY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpsb2dnZWRJbicsIHRoaXMudXNlcigpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrUmVzb2x2ZShvYnNlcnZlciwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaHR0cFNlcnZpY2UudG9rZW5IZWFkZXIoKS50aGVuKCh0b2tlbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VXNlcihlbmRwb2ludCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdXRoZW50aWNhdGVkKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VXNlcihyZXMuZGF0YSB8fCByZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnQuYnJvYWRjYXN0KCdhdXRoOmxvZ2dlZEluJywgdGhpcy51c2VyKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tSZXNvbHZlKG9ic2VydmVyLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF1dGhlbnRpY2F0ZWQoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnQuYnJvYWRjYXN0KCdhdXRoOnJlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1Jlc29sdmUob2JzZXJ2ZXIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdXRoZW50aWNhdGVkKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tSZXNvbHZlKG9ic2VydmVyLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBlcnIgPT4gb2JzZXJ2ZXIuZXJyb3IoZXJyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc29sdmUgdGhlIGF1dGggY2hlY2suXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb2JzZXJ2ZXJcbiAgICAgKiBAcGFyYW0gYXV0aGVudGljYXRlZFxuICAgICAqL1xuICAgIGNoZWNrUmVzb2x2ZShvYnNlcnZlcjogT2JzZXJ2ZXI8Ym9vbGVhbj4sIGF1dGhlbnRpY2F0ZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ldmVudC5icm9hZGNhc3QoJ2F1dGg6Y2hlY2snLCBhdXRoZW50aWNhdGVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGltZW91dHNbJ2NoZWNrUmVzb2x2ZSddID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChhdXRoZW50aWNhdGVkKTtcbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzZXJ2aWNlIGV2ZW50IGxpc3RlbmVycy5cbiAgICAgKi9cbiAgICBldmVudExpc3RlbmVycygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdWJzWydhdXRoOmxvZ2dlZEluJ10gPSB0aGlzLmV2ZW50Lmxpc3RlbignYXV0aDpsb2dnZWRJbicpLnN1YnNjcmliZSgodXNlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRBdXRoZW50aWNhdGVkKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5zZXRVc2VyKHVzZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgZm9yZ290IHBhc3N3b3JkIHJlcXVlc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGNyZWRlbnRpYWxzXG4gICAgICogQHBhcmFtICBlbmRwb2ludFxuICAgICAqIEBwYXJhbSAgaGVhZGVyc1xuICAgICAqL1xuICAgIGZvcmdvdFBhc3N3b3JkKGRhdGE6IGFueSwgZW5kcG9pbnQ6IHN0cmluZyA9ICcnLCBoZWFkZXJzID0ge30pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBlbmRwb2ludCA9IHRoaXMuY29uZmlnLmdldChcbiAgICAgICAgICAgICdhdXRoZW50aWNhdGlvbi5lbmRwb2ludHMuZm9yZ290UGFzc3dvcmQnLCBlbmRwb2ludFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoZW5kcG9pbnQsIGRhdGEsIGhlYWRlcnMpLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlc29sdmUocmVzKSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHJlZGlyZWN0IGRhdGEuXG4gICAgICovXG4gICAgZ2V0UmVkaXJlY3QoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXJlY3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi5cbiAgICAgKi9cbiAgICBnZXRUb2tlbigpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50b2tlbi5nZXQoKS50aGVuKHRva2VuID0+IHJlc29sdmUodG9rZW4pLCBlcnIgPT4gcmVqZWN0KGVycikpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnQgYXV0aGVudGljYXRlZCB1c2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtICBlbmRwb2ludFxuICAgICAqL1xuICAgIGdldFVzZXIoZW5kcG9pbnQ6IHN0cmluZyA9ICcnKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgZW5kcG9pbnQgPSB0aGlzLmNvbmZpZy5nZXQoJ2F1dGhlbnRpY2F0aW9uLmVuZHBvaW50cy5nZXRVc2VyJywgZW5kcG9pbnQpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGVuZHBvaW50KS50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHZhbHVlIGF1dGhlbnRpY2F0ZWQgdmFsdWUuXG4gICAgICovXG4gICAgZ2V0QXV0aGVudGljYXRlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aGVudGljYXRlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgaWYgYXV0aGVudGljYXRlZCB2YWx1ZS5cbiAgICAgKi9cbiAgICBzZXRBdXRoZW50aWNhdGVkKHZhbHVlOiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhlbnRpY2F0ZWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgbG9naW4gcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgY3JlZGVudGlhbHNcbiAgICAgKiBAcGFyYW0gIGVuZHBvaW50XG4gICAgICogQHBhcmFtICBoZWFkZXJzXG4gICAgICovXG4gICAgbG9naW4oY3JlZGVudGlhbHM6IGFueSwgZW5kcG9pbnQ6IHN0cmluZyA9ICcnLCBoZWFkZXJzID0ge30pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBlbmRwb2ludCA9IHRoaXMuY29uZmlnLmdldCgnYXV0aGVudGljYXRpb24uZW5kcG9pbnRzLmxvZ2luJywgZW5kcG9pbnQpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmh0dHAucG9zdChlbmRwb2ludCwgY3JlZGVudGlhbHMsIGhlYWRlcnMpLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkxvZ2luKHJlcykudGhlbigoKSA9PiByZXNvbHZlKHJlcyksIGVycm9yID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgcmVxdWVzdCB0byBsb2cgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlciBvdXQuXG4gICAgICovXG4gICAgbG9nb3V0KGVuZHBvaW50OiBzdHJpbmcgPSAnJywgaGVhZGVycyA9IHt9KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnQuYnJvYWRjYXN0KCdhdXRoOmxvZ2dpbmdPdXQnKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBlbmRwb2ludCA9IHRoaXMuY29uZmlnLmdldCgnYXV0aGVudGljYXRpb24uZW5kcG9pbnRzLmxvZ291dCcsIGVuZHBvaW50KTtcblxuICAgICAgICAgICAgICAgIGlmIChlbmRwb2ludCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmh0dHAucG9zdChlbmRwb2ludCwge30sIGhlYWRlcnMpLnRvUHJvbWlzZSgpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Mb2dvdXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKVxuICAgICAgICAgICAgICAgICAgICB9LCBlcnJvciA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTG9nb3V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWN0aW9ucyB0byBwZXJmb3JtIG9uIGxvZ2luLlxuICAgICAqXG4gICAgICogQHBhcmFtICByZXNcbiAgICAgKi9cbiAgICBvbkxvZ2luKHJlczogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmVUb2tlbihyZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnQuYnJvYWRjYXN0KCdhdXRoOmxvZ2dpbmdJbicsIHJlcykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzb2x2ZVVzZXIoKS50aGVuKCgpID0+IHJlc29sdmUoKSwgZXJyID0+IHJlamVjdChlcnIpKTtcbiAgICAgICAgICAgICAgICB9LCBlcnIgPT4gcmVqZWN0KGVycikpO1xuICAgICAgICAgICAgfSwgZXJyID0+IHJlamVjdChlcnIpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWN0aW9ucyB0byBwZXJmb3JtIG9uIGxvZ291dC5cbiAgICAgKi9cbiAgICBvbkxvZ291dCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51bmF1dGhlbnRpY2F0ZSgpO1xuICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpsb2dnZWRPdXQnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuZCBjbGVhcnMgdGhlIHJlZGlyZWN0IGRhdGEuXG4gICAgICovXG4gICAgcHVsbFJlZGlyZWN0KCk6IGFueSB7XG4gICAgICAgIGxldCByZWRpcmVjdCA9IHRoaXMucmVkaXJlY3Q7XG5cbiAgICAgICAgdGhpcy5yZWRpcmVjdCA9IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIHJlZGlyZWN0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmQgYSByZWdpc3RlciByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtICBkYXRhXG4gICAgICogQHBhcmFtICAgZW5kcG9pbnRcbiAgICAgKiBAcGFyYW0gIGhlYWRlcnNcbiAgICAgKiBAcGFyYW0gcG9zdFJlZ2lzdGVyTG9naW5cbiAgICAgKi9cbiAgICByZWdpc3RlcihkYXRhOiBvYmplY3QsIGVuZHBvaW50OiBzdHJpbmcgPSAnJywgaGVhZGVycyA9IHt9LCBwb3N0UmVnaXN0ZXJMb2dpbjogYm9vbGVhbiA9IGZhbHNlKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgZW5kcG9pbnQgPSB0aGlzLmNvbmZpZy5nZXQoJ2F1dGhlbnRpY2F0aW9uLmVuZHBvaW50cy5yZWdpc3RlcicsIGVuZHBvaW50KTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaHR0cC5wb3N0KGVuZHBvaW50LCBkYXRhLCBoZWFkZXJzKS50b1Byb21pc2UoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHBvc3RSZWdpc3RlckxvZ2luKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Mb2dpbihyZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpyZWdpc3RlcmVkJywgcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudC5icm9hZGNhc3QoJ2F1dGg6cmVnaXN0ZXJlZCcsIHJlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgcmVzZXQgcGFzc3dvcmQgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgIGNyZWRlbnRpYWxzXG4gICAgICogQHBhcmFtICAgZW5kcG9pbnRcbiAgICAgKiBAcGFyYW0gIGhlYWRlcnNcbiAgICAgKi9cbiAgICByZXNldFBhc3N3b3JkKGRhdGE6IGFueSwgZW5kcG9pbnQ6IHN0cmluZyA9ICcnLCBoZWFkZXJzID0ge30pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBlbmRwb2ludCA9IHRoaXMuY29uZmlnLmdldChcbiAgICAgICAgICAgICdhdXRoZW50aWNhdGlvbi5lbmRwb2ludHMucmVzZXRQYXNzd29yZCcsIGVuZHBvaW50XG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaHR0cC5wb3N0KGVuZHBvaW50LCBkYXRhLCBoZWFkZXJzKS50b1Byb21pc2UoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkxvZ2luKHJlcykudGhlbigoKSA9PiByZXNvbHZlKHJlcykpXG4gICAgICAgICAgICB9LCBlcnJvciA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzb2x2ZSB0aGUgYXV0aGVudGljYXRlZCB1c2VyLlxuICAgICAqL1xuICAgIHJlc29sdmVVc2VyKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRpbWVvdXRzWydyZXNvbHZlVXNlciddID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRVc2VyKCkudGhlbigodXNlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF1dGhlbnRpY2F0ZWQodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRVc2VyKHVzZXIuZGF0YSB8fCB1c2VyKS50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpsb2dnZWRJbicsIHVzZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICAgICAgfSwgMjUwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSByZWRpcmVjdCBkYXRhLlxuICAgICAqL1xuICAgIHNldFJlZGlyZWN0KHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcmVjdCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY3VycmVudCBhdXRoZW50aWNhdGVkIHVzZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHVzZXJcbiAgICAgKi9cbiAgICBzZXRVc2VyKHVzZXI6IG9iamVjdCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICB1c2VyID0gbmV3IFVzZXJNb2RlbCh0aGlzLmF1dGhvcml6YXRpb24sIHVzZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiByZXNvbHZlKHRoaXMuYXV0aFVzZXIgPSB1c2VyKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcmUgYXV0IHRva2VuIGFuZCBicm9hZGNhc3QgYW4gZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHJlc1xuICAgICAqL1xuICAgIHN0b3JlVG9rZW4ocmVzOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHRoaXMudG9rZW4uc2V0KHRoaXMudG9rZW4ucmVhZChyZXMpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVuYXV0aGVudGljYXRlIHRoZSBjdXJyZW50IHVzZXIuXG4gICAgICovXG4gICAgdW5hdXRoZW50aWNhdGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudG9rZW4ucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuc2V0QXV0aGVudGljYXRlZChmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0VXNlcihudWxsKTtcbiAgICAgICAgdGhpcy5hdXRob3JpemF0aW9uLmNsZWFyUG9saWNpZXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnQgYXV0aGVudGljYXRlZCB1c2VyLlxuICAgICAqL1xuICAgIHVzZXIgPSAoKTogYW55ID0+IHRoaXMuYXV0aFVzZXI7XG59XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IEF1dGhlbnRpY2F0aW9uIH0gZnJvbSAnLi9hdXRoZW50aWNhdGlvbic7XG5pbXBvcnQgeyBBdXRob3JpemF0aW9uIH0gZnJvbSAnLi9hdXRob3JpemF0aW9uJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4vLi4vY29uZmlnJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBIdHRwIH0gZnJvbSAnLi9odHRwJztcbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnLi90b2tlbic7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJy4vZXZlbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU29jaWFsQXV0aGVudGljYXRpb24gZXh0ZW5kcyBBdXRoZW50aWNhdGlvbiB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3IuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBhdXRob3JpemF0aW9uOiBBdXRob3JpemF0aW9uLFxuICAgICAgICBwdWJsaWMgY29uZmlnOiBDb25maWcsXG4gICAgICAgIHB1YmxpYyBldmVudDogRXZlbnQsXG4gICAgICAgIHB1YmxpYyBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICBwdWJsaWMgaHR0cFNlcnZpY2U6IEh0dHAsXG4gICAgICAgIHB1YmxpYyB0b2tlbjogVG9rZW5cbiAgICApIHtcbiAgICAgICAgc3VwZXIoYXV0aG9yaXphdGlvbiwgY29uZmlnLCBldmVudCwgaHR0cCwgaHR0cFNlcnZpY2UsIHRva2VuKTtcblxuICAgICAgICAvL1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ2luIHdpdGggYSBzb2NpYWwgcHJvdmlkZXIuXG4gICAgICovXG4gICAgLy8gbG9naW4ocHJvdmlkZXI6IHN0cmluZywgb3B0aW9ucz86IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgLy8gICAgIHJldHVybiBuZXcgUHJvbWlzZSgoKSA9PiB7XG4gICAgLy8gICAgICAgICAvLyB0aGlzLmhhbmRsZUxvZ2luU3VjY2VzcyhyZXMpLnRoZW4oKHJlcykgPT4ge1xuICAgIC8vICAgICAgICAgLy8gICAgIHRoaXMub25Mb2dpbihyZXMpLnRoZW4oKCkgPT4gcmVzb2x2ZShyZXMpKTtcbiAgICAvLyAgICAgICAgIC8vIH0sIChlcnJvcikgPT4gcmVqZWN0KHRoaXMuaGFuZGxlTG9naW5FcnJvcihlcnJvcikpKVxuICAgIC8vICAgICB9KTtcbiAgICAvLyB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgc3VjY2VzZnVsIEZhY2Vib29rIGxvZ2luLlxuICAgICAqXG4gICAgICogQHBhcmFtICByZXNcbiAgICAgKi9cbiAgICBoYW5kbGVMb2dpblN1Y2Nlc3MocmVzOiBvYmplY3QpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9yZVNvY2lhbENyZWRlbnRpYWxzKHJlcyk7XG5cbiAgICAgICAgICAgIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLmdldCgnYXV0aGVudGljYXRpb24uZW5kcG9pbnRzLnNvY2lhbEF1dGgnKSxcbiAgICAgICAgICAgICAgICByZXNcbiAgICAgICAgICAgICkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkxvZ2luKHJlcykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgICAgICAgICB9LCBlcnJvciA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgZXJyb3JzIG9uIGZhY2Vib29rIGxvZ2luLlxuICAgICAqXG4gICAgICogQHBhcmFtICBlcnJvclxuICAgICAqL1xuICAgIGhhbmRsZUxvZ2luRXJyb3IgPSAoZXJyb3I6IG9iamVjdCkgPT4gY29uc29sZS5sb2coZXJyb3IpO1xuXG4gICAgLyoqXG4gICAgICogU3RvcmUgc29jaWFsIGF1dGggY3JlZG5ldGlhbHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHJlc1xuICAgICAqL1xuICAgIHN0b3JlU29jaWFsQ3JlZGVudGlhbHMocmVzOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHJlcy5uZXR3b3JrID09ICdmYWNlYm9vaycpIHtcbiAgICAgICAgICAgIHRoaXMudG9rZW4uc2V0KFxuICAgICAgICAgICAgICAgIHJlcy5hdXRoUmVzcG9uc2UuYWNjZXNzVG9rZW4sXG4gICAgICAgICAgICAgICAgJ2ZhY2Vib29rX2FjY2Vzc190b2tlbidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhY2hlSXRlbU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICcuL3N0b3JhZ2UnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi8uLi9jb25maWcnO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL2V2ZW50JztcblxuaW50ZXJmYWNlIENhY2hlSW50ZXJmYWNlIHtcbiAgICBba2V5OiBzdHJpbmddOiBDYWNoZUl0ZW1Nb2RlbDtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhY2hlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgY2FjaGUgaW5zdGFuY2UuXG4gICAgICovXG4gICAgY2FjaGVOYW1lOiBzdHJpbmcgPSAnbmdraXRfY2FjaGUnO1xuXG4gICAgLyoqXG4gICAgICogSW4gbWVtb3J5IGNvbGxlY3Rpb24gb2YgY2FjaGUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBfY2FjaGU6IENhY2hlSW50ZXJmYWNlID0ge307XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3Rvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBldmVudDogRXZlbnQsXG4gICAgICAgIHByaXZhdGUgc3RvcmFnZTogU3RvcmFnZVxuICAgICkge1xuICAgICAgICB0aGlzLnJldHJpZXZlQ2FjaGUoKTtcblxuICAgICAgICB0aGlzLnN1YnNbJ2F1dGg6bG9nZ2VkT3V0J10gPSB0aGlzLmV2ZW50Lmxpc3RlbignYXV0aDpsb2dnZWRPdXQnKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FjaGUgPSB7fTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc3Vic2NpcHRpb25zIG9mIHRoZSBzZXJ2aWNlLlxuICAgICAqL1xuICAgIHN1YnM6IGFueSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogT24gc2VydmljZSBkZXN0cm95LlxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnN1YnMpLmZvckVhY2goayA9PiB0aGlzLnN1YnNba10udW5zdWJzY3JpYmUoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0cmlldmUgdGhlIHN0b3JlZCBjYWNoZS5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgcmV0cmlldmVDYWNoZSgpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9yYWdlLmdldCh0aGlzLmNhY2hlTmFtZSkudGhlbihjYWNoZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNhY2hlKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGNhY2hlKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWNoZVtpdGVtXSA9IG5ldyBDYWNoZUl0ZW1Nb2RlbChjYWNoZVtpdGVtXSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZSA9IGNhY2hlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGUgPSB0aGlzLnN0b3JlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmNhY2hlKTtcbiAgICAgICAgICAgIH0sIGVyciA9PiByZWplY3QoZXJyKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNhdmUgdGhlIGNhY2hlIHRvIHN0b3JhZ2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleVxuICAgICAqIEBwYXJhbSAgdmFsdWVcbiAgICAgKi9cbiAgICBzdG9yZSgpOiBhbnkge1xuICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0KHRoaXMuY2FjaGVOYW1lLCB0aGlzLl9jYWNoZSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFjY2Vzc29yIHRvIHRoZSBpbiBtZW1lb3J5IGNhY2hlLlxuICAgICAqL1xuICAgIGdldCBjYWNoZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTXV0YXRvciB0byB0aGUgaW4gbWVtZW9yeSBjYWNoZS5cbiAgICAgKlxuICAgICAqL1xuICAgIHNldCBjYWNoZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9jYWNoZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbiBpdGVtIGZyb20gY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gICBrZXlcbiAgICAgKiBAcGFyYW0gIGRlZmF1dFZhbHVlXG4gICAgICovXG4gICAgZ2V0KGtleTogc3RyaW5nLCBkZWZhdXRWYWx1ZTogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgICAgIGlmICh0aGlzLmNhY2hlW2tleV0gJiYgIXRoaXMuY2FjaGVba2V5XS5pc0V4cGlyZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVba2V5XS52YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChkZWZhdXRWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmF1dFZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUoa2V5KTtcblxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgYW4gaXRlbSB0byBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5XG4gICAgICogQHBhcmFtICB2YWx1ZVxuICAgICAqIEBwYXJhbSAgZXhwaXJlc1xuICAgICAqL1xuICAgIHNldChcbiAgICAgICAga2V5OiBzdHJpbmcsXG4gICAgICAgIHZhbHVlOiBhbnksXG4gICAgICAgIGV4cGlyZXM6IG51bWJlciA9IHRoaXMuY29uZmlnLmdldCgnY2FjaGUuZXhwaXJlcycpXG4gICAgKTogdm9pZCB7XG4gICAgICAgIGxldCBjYWNoZUl0ZW0gPSBuZXcgQ2FjaGVJdGVtTW9kZWwoeyB2YWx1ZTogdmFsdWUsIGV4cGlyZXM6IGV4cGlyZXMgfSk7XG5cbiAgICAgICAgdGhpcy5fY2FjaGVba2V5XSA9IGNhY2hlSXRlbTtcblxuICAgICAgICB0aGlzLnN0b3JlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFuIGl0ZW0gZnJvbSBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKi9cbiAgICByZW1vdmUoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuY2FjaGVba2V5XTtcbiAgICAgICAgdGhpcy5zdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsZWFyIHRoZSBjYWNoZS5cbiAgICAgKi9cbiAgICBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdG9yYWdlLnJlbW92ZSh0aGlzLmNhY2hlTmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFuIGl0ZW0gZnJvbSBjYWNoZSBhbmQgcmVtb3ZlIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtICBrZXlcbiAgICAgKi9cbiAgICBwdWxsKGtleTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXQoa2V5KTtcbiAgICAgICAgdGhpcy5yZW1vdmUoa2V5KTtcblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgY2FjaGUgaGFzIGFuIGl0ZW0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleVxuICAgICAqL1xuICAgIGhhcyhrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoa2V5KSAhPT0gbnVsbCA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgQ2FuQWN0aXZhdGUsIENhbkFjdGl2YXRlQ2hpbGQsIFJvdXRlclN0YXRlU25hcHNob3Rcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbic7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJy4vLi4vc2VydmljZXMvZXZlbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aEd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUsIENhbkFjdGl2YXRlQ2hpbGQsIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtICBhdXRoXG4gICAgICogQHBhcmFtICBldmVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgYXV0aDogQXV0aGVudGljYXRpb24sXG4gICAgICAgIHB1YmxpYyBldmVudDogRXZlbnRcbiAgICApIHsgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHN1YnNjaXB0aW9ucyBvZiB0aGUgc2VydmljZS5cbiAgICAgKi9cbiAgICBzdWJzOiBhbnkgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIE9uIHNlcnZpY2UgZGVzdHJveS5cbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5zdWJzKS5mb3JFYWNoKGsgPT4gdGhpcy5zdWJzW2tdLnVuc3Vic2NyaWJlKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZSBpZiB0aGUgdXNlciBjYW4gYWN0aXZhdGUgYSByb3V0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByb3V0ZVxuICAgICAqIEBwYXJhbSBzdGF0ZVxuICAgICAqL1xuICAgIGNhbkFjdGl2YXRlKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5ndWFyZChyb3V0ZSwgc3RhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZSBpZiB0aGUgdXNlciBjYW4gYWN0aXZhdGUgY2hpbGRyZW4gb2YgYSByb3V0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgcm91dGVcbiAgICAgKiBAcGFyYW0gIHN0YXRlICAgICAqXG4gICAgICovXG4gICAgY2FuQWN0aXZhdGVDaGlsZChyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3VhcmQocm91dGUsIHN0YXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbWV0aG9kIHRvIGFwcGx5IHRvIGd1YXJkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJvdXRlXG4gICAgICogQHBhcmFtIHN0YXRlXG4gICAgICovXG4gICAgZ3VhcmQocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJvdXRlO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXV0aC51c2VyKCkpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YnNbJ2F1dGg6Y2hlY2snXSA9IHRoaXMuYXV0aC5jaGVjaygpLnN1YnNjcmliZShjaGVjayA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGVjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnQuYnJvYWRjYXN0KCdhdXRoOm1vZGFsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dGguc2V0UmVkaXJlY3Qoc3RhdGUudXJsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuQWN0aXZhdGUsIENhbkFjdGl2YXRlQ2hpbGQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb24gfSBmcm9tICcuLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uJztcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ldmVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoUmVzb2x2ZUd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUsIENhbkFjdGl2YXRlQ2hpbGQsIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtICBhdXRoXG4gICAgICogQHBhcmFtICBldmVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgYXV0aDogQXV0aGVudGljYXRpb24sXG4gICAgICAgIHB1YmxpYyBldmVudDogRXZlbnRcbiAgICApIHsgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHN1YnNjaXB0aW9ucyBvZiB0aGUgc2VydmljZS5cbiAgICAgKi9cbiAgICBzdWJzOiBhbnkgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIE9uIHNlcnZpY2UgZGVzdHJveS5cbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5zdWJzKS5mb3JFYWNoKGsgPT4gdGhpcy5zdWJzW2tdLnVuc3Vic2NyaWJlKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZSBpZiB0aGUgdXNlciBjYW4gYWN0aXZhdGUgYSByb3V0ZS5cbiAgICAgKi9cbiAgICBjYW5BY3RpdmF0ZSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3VhcmQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgaWYgdGhlIHVzZXIgY2FuIGFjdGl2YXRlIGNoaWxkcmVuIG9mIGEgcm91dGUuXG4gICAgICovXG4gICAgY2FuQWN0aXZhdGVDaGlsZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3VhcmQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbWV0aG9kIHRvIGFwcGx5IHRvIGd1YXJkLlxuICAgICAqL1xuICAgIGd1YXJkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dGgudXNlcigpKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJzWydhdXRoOmNoZWNrJ10gPSB0aGlzLmF1dGguY2hlY2soKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwIH0gZnJvbSAnLi9odHRwJztcbmltcG9ydCB7XG4gICAgSHR0cEV2ZW50LCBIdHRwSGFuZGxlciwgSHR0cEludGVyY2VwdG9yIGFzIEludGVyY2VwdG9yLCBIdHRwUmVxdWVzdFxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIdHRwSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBJbnRlcmNlcHRvciB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBpbnRlcmNlcHRvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgaHR0cFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgaHR0cDogSHR0cFxuICAgICkgeyB9XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcmNlcHQgdGhlIGh0dHAgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgcmVxXG4gICAgICogQHBhcmFtICBuZXh0XG4gICAgICovXG4gICAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgICAgIHJlcSA9IHJlcS5jbG9uZSh7XG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmh0dHAuaGVhZGVycyxcbiAgICAgICAgICAgIHVybDogdGhpcy5odHRwLmdldFVybChyZXEudXJsKVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwIH0gZnJvbSAnLi9odHRwJztcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSAnLi9ldmVudCc7XG5pbXBvcnQge1xuICAgIEh0dHBFdmVudCwgSHR0cEludGVyY2VwdG9yLCBIdHRwSGFuZGxlciwgSHR0cFJlcXVlc3QsIEh0dHBFcnJvclJlc3BvbnNlXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dGhJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBpbnRlcmNlcHRvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgaHR0cFxuICAgICAqIEBwYXJhbSAgZXZlbnRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGh0dHA6IEh0dHAsXG4gICAgICAgIHB1YmxpYyBldmVudDogRXZlbnQsXG4gICAgKSB7IH1cblxuICAgIC8qKlxuICAgICAqIEludGVyY2VwdCB0aGUgaHR0cCByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtICByZXFcbiAgICAgKiBAcGFyYW0gIG5leHRcbiAgICAgKi9cbiAgICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSkucGlwZSh0YXAoKCkgPT4geyB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudC5icm9hZGNhc3QoJ2F1dGg6cmVxdWlyZWQnLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtcbiAgICBBdXRoZW50aWNhdGlvbiwgQXV0aG9yaXphdGlvbiwgRXZlbnQsIEh0dHAsIFNvY2lhbEF1dGhlbnRpY2F0aW9uLFxuICAgIFN0b3JhZ2UsIFRva2VuLCBDYWNoZVxufSBmcm9tICcuL3NlcnZpY2VzL2luZGV4JztcbmltcG9ydCB7IEF1dGhHdWFyZCwgQXV0aFJlc29sdmVHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL2luZGV4JztcbmltcG9ydCB7IEhUVFBfSU5URVJDRVBUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSHR0cEludGVyY2VwdG9yIH0gZnJvbSAnLi9zZXJ2aWNlcy9odHRwLWludGVyY2VwdG9yJztcbmltcG9ydCB7IEF1dGhJbnRlcmNlcHRvciB9IGZyb20gJy4vc2VydmljZXMvaHR0cC1hdXRoLWludGVyY2VwdG9yJztcblxuLyoqXG4gKiBuZ0tpdCBTZXJ2aWNlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IE5HS0lUX1BST1ZJREVSUzogYW55W10gPSBbXG4gICAgQXV0aGVudGljYXRpb24sXG4gICAgQXV0aEd1YXJkLFxuICAgIEF1dGhSZXNvbHZlR3VhcmQsXG4gICAgU29jaWFsQXV0aGVudGljYXRpb24sXG4gICAgQXV0aG9yaXphdGlvbixcbiAgICBDb25maWcsXG4gICAgU3RvcmFnZSxcbiAgICBDYWNoZSxcbiAgICBFdmVudCxcbiAgICBIdHRwLFxuICAgIFRva2VuLFxuICAgIHtcbiAgICAgICAgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsXG4gICAgICAgIHVzZUNsYXNzOiBIdHRwSW50ZXJjZXB0b3IsXG4gICAgICAgIG11bHRpOiB0cnVlXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLFxuICAgICAgICB1c2VDbGFzczogQXV0aEludGVyY2VwdG9yLFxuICAgICAgICBtdWx0aTogdHJ1ZVxuICAgIH1cbl07XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE5HS0lUX1BST1ZJREVSUyB9IGZyb20gJy4vcHJvdmlkZXJzJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbSHR0cENsaWVudE1vZHVsZV0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIC4uLk5HS0lUX1BST1ZJREVSUyxcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIG5nS2l0TW9kdWxlIHtcbiAgICAvKipcbiAgICAgKiBuZ0tpdCBtb2R1bGUgaW5pdGlhbGl6ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIG9wdGlvbnNcbiAgICAgKi9cbiAgICBzdGF0aWMgZm9yUm9vdChvcHRpb25zOiBhbnkpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBuZ0tpdE1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogJ25nS2l0T3B0aW9ucycsIHVzZVZhbHVlOiBvcHRpb25zIH0sXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwibmFtZXMiOlsiXy5zZXQiLCJfLm1lcmdlIiwiSW5qZWN0YWJsZSIsIkluamVjdCIsIlN1YmplY3QiLCJsb2NhbEZvcmFnZS5jcmVhdGVJbnN0YW5jZSIsIkh0dHBIZWFkZXJzIiwiSHR0cFBhcmFtcyIsImh0dHAiLCJPYnNlcnZhYmxlIiwiSHR0cENsaWVudCIsInRzbGliXzEuX19leHRlbmRzIiwidGFwIiwiSHR0cEVycm9yUmVzcG9uc2UiLCJIVFRQX0lOVEVSQ0VQVE9SUyIsIk5nTW9kdWxlIiwiSHR0cENsaWVudE1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O1FBZ0hJLGdCQUE0QyxRQUFhO1lBQWIsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUNyRCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUM7WUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbEM7Ozs7Ozs7O1FBS0QsMkJBQVU7Ozs7WUFBVixjQUFvQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTs7Ozs7Ozs7Ozs7Ozs7UUFRMUMsb0JBQUc7Ozs7Ozs7WUFBSCxVQUFJLEdBQVcsRUFBRSxRQUFxQjtnQkFBckIseUJBQUE7b0JBQUEsZ0JBQXFCOztnQkFDbEMsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQTthQUN2Qzs7Ozs7Ozs7Ozs7Ozs7UUFRTSxjQUFPOzs7Ozs7O1lBQWQsVUFBZSxHQUFXLEVBQUUsUUFBYztnQkFDdEMsSUFBSSxRQUFRLEVBQUU7b0JBQ1YsT0FBTyxRQUFRLENBQUM7aUJBQ25CO2dCQUVELElBQUksTUFBTSxDQUFDLGNBQWMsRUFBRTtvQkFDdkIsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUEs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