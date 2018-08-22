import { Inject, Injectable, NgModule } from '@angular/core';
import { set, merge } from 'lodash';
import { Subject, Observable } from 'rxjs';
import { createInstance } from 'localforage';
import { HttpHeaders, HttpParams, HttpClient, HttpErrorResponse, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Config {
    /**
     * Create a new instance of the service..
     * @param {?} _options
     */
    constructor(_options) {
        this._options = _options;
        this.options = Config.defaultOptions;
        this.setOptions(this._options);
    }
    /**
     * Return the configurable options.
     * @return {?}
     */
    getOptions() { return this.options; }
    /**
     * Get an option by key.
     *
     * @param {?} key
     * @param {?=} override
     * @return {?}
     */
    get(key, override = false) {
        return Config.getItem(key, override);
    }
    /**
     * Static method to get an option by key.
     *
     * @param {?} key
     * @param {?=} override
     * @return {?}
     */
    static getItem(key, override) {
        if (override) {
            return override;
        }
        if (Config.defaultOptions) {
            return key.split('.').reduce((o, i) => o[i], Config.defaultOptions);
        }
    }
    /**
     * Set an option by key.
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    setItem(key, value) {
        return set(this.options, key, value);
    }
    /**
     * Set the configurable options.
     *
     * @param {?} options
     * @return {?}
     */
    setOptions(options) {
        this.options = merge(this.options, options);
        return this;
    }
}
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
Config.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['ngKitOptions',] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Event {
    /**
     * Get an event listener.
     *
     * @param {?} key
     * @return {?}
     */
    static channel(key) {
        if (typeof Event.channels[key] === 'undefined') {
            Event.channels[key] = new Subject();
        }
        return Event.channels[key];
    }
    /**
     * Set multiple event channels.
     *
     * @param {?} channels
     * @return {?}
     */
    setChannels(channels) {
        channels.forEach((channel) => Event.channel(channel));
    }
    /**
     * Broadcast an event to a channel.
     * @param {?} key
     * @param {?=} data
     * @return {?}
     */
    broadcast(key, data = {}) {
        return Promise.resolve(Event.channel(key).next(data));
    }
    /**
     *  Listen on a channel for an event.s
     *
     * @param {?} key
     * @return {?}
     */
    listen(key) {
        return Event.channel(key).asObservable();
    }
}
/**
 * Event channels.
 */
Event.channels = [];
Event.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Storage {
    /**
     * Create a new instance of the service.
     *
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
        this.db = createInstance({
            name: this.config.get('storage.name')
        });
    }
    /**
     * Get item from local storage.
     * @param {?} key
     * @return {?}
     */
    get(key) {
        return this.db.getItem(key);
    }
    /**
     * Set an item to local storage.
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    set(key, value) {
        return this.db.setItem(key, value);
    }
    /**
     * Remove an item from local storage.
     *
     * @param {?} key
     * @return {?}
     */
    remove(key) {
        return this.db.removeItem(key);
    }
    /**
     * Clear local storage.
     * @return {?}
     */
    clear() {
        return this.db.clear();
    }
}
Storage.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Storage.ctorParameters = () => [
    { type: Config }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Token {
    /**
     * Constructor.
     *
     * @param {?} config
     * @param {?} storage
     */
    constructor(config, storage) {
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
     * @param {?=} tokenName
     * @return {?}
     */
    get(tokenName) {
        return new Promise((resolve, reject) => {
            tokenName = tokenName || this.config.get('token.name', this._token);
            this.storage.get(tokenName).then(token => {
                resolve(token);
            }, err => reject(err));
        });
    }
    /**
     * Store the token in local storage.
     *
     * @param {?} token
     * @param {?=} tokenName
     * @return {?}
     */
    set(token, tokenName) {
        return new Promise((resolve, reject) => {
            tokenName = tokenName || this.config.get('token.name', this._token);
            if (token) {
                this.storage.set(tokenName, token).then(() => {
                    resolve(true);
                }, () => reject('Error: Could not store token.'));
            }
            else {
                reject('Error: No token provided.');
            }
        });
    }
    /**
     * Remove token from local storage.
     *
     * @param {?=} tokenName
     * @return {?}
     */
    remove(tokenName) {
        tokenName = tokenName || this.config.get('token.name', this._token);
        this.storage.remove(tokenName);
        return true;
    }
    /**
     * Read a token from a response object.
     *
     * @param {?=} response
     * @return {?}
     */
    read(response = null) {
        if (response) {
            let /** @type {?} */ key = this.config.get('token.readAs');
            return key.split('.').reduce((o, i) => o[i], response);
        }
        return null;
    }
}
Token.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Token.ctorParameters = () => [
    { type: Config },
    { type: Storage }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Http {
    /**
     * Create a new instance of the service.
     *
     * @param {?} config
     * @param {?} event
     * @param {?} token
     */
    constructor(config, event, token) {
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
     * @return {?}
     */
    ngOnDestroy() {
        Object.keys(this.subs).forEach(k => this.subs[k].unsubscribe());
    }
    /**
     * Build url parameters for requests.
     *
     * @param {?} params
     * @return {?}
     */
    buildParams(params) {
        var /** @type {?} */ query_params = new HttpParams();
        if (params) {
            Object.keys(params).forEach((key) => {
                if (params[key])
                    query_params.set(key, params[key]);
            });
        }
        return query_params;
    }
    /**
     * Event listeners.
     * @return {?}
     */
    eventListeners() {
        if (this.event) {
            let /** @type {?} */ sub = () => this.setDefaultHeaders();
            this.subs['auth:loggingIn'] = this.event.listen('auth:loggingIn').subscribe(sub);
            this.subs['auth:loggedOut'] = this.event.listen('auth:loggedOut').subscribe(sub);
            this.subs['auth:check'] = this.event.listen('auth:check').subscribe(sub);
        }
    }
    /**
     * Get url for http request.
     *
     * @param {?} url
     * @return {?}
     */
    getUrl(url) {
        if (url.startsWith('/') || url.startsWith('http'))
            return url;
        let /** @type {?} */ baseUrl = this.baseUrl || this.config.get('http.baseUrl') || '';
        return (baseUrl) ? baseUrl + '/' + url : url;
    }
    /**
     * Set the default headers for http request.
     * @return {?}
     */
    setDefaultHeaders() {
        let /** @type {?} */ configHeaders = (this.config) ? this.config.get('http.headers') : null;
        if (configHeaders) {
            Object.keys(configHeaders).forEach(key => {
                this.headers = this.headers.set(key, configHeaders[key]);
            });
        }
        this.tokenHeader();
    }
    /**
     * Add a token header to the request.
     * @return {?}
     */
    tokenHeader() {
        return new Promise((resolve) => {
            if (this.config && this.config.get('authentication.method.token')) {
                this.token.get().then(token => {
                    let /** @type {?} */ scheme = this.config.get('token.scheme');
                    let /** @type {?} */ value = (scheme) ? `${scheme} ${token}` : token;
                    this.headers = this.headers.set('Authorization', value);
                    resolve(token ? true : false);
                }, () => {
                    this.headers = this.headers.delete('Authorization');
                    resolve(false);
                });
            }
        });
    }
}
Http.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Http.ctorParameters = () => [
    { type: Config },
    { type: Event },
    { type: Token }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Model for cache items.
 */
class CacheItemModel {
    /**
     * Construcotr.
     *
     * @param {?} item
     */
    constructor(item) {
        Object.assign(this, item);
    }
    /**
     * Get value accessor parses JSON.
     * @return {?}
     */
    get value() {
        return JSON.parse(this._value);
    }
    /**
     * Set the value mutator that stringifies value.
     *
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = JSON.stringify(value);
    }
    /**
     * Get expires accessor.
     * @return {?}
     */
    get expires() {
        return this._expires;
    }
    /**
     * Set the expires mutator.
     *
     * @param {?} minutes
     * @return {?}
     */
    set expires(minutes) {
        let /** @type {?} */ expiration = new Date();
        expiration.setMinutes(expiration.getMinutes() + minutes);
        this._expires = expiration.getTime();
    }
    /**
     * Check if cached item is expired.
     * @return {?}
     */
    isExpired() {
        return this.expires <= new Date().getTime();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Model {
    /**
     * Create a new instance of the mdoel.
     *
     * @param {?=} attributes
     */
    constructor(attributes) {
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
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PolicyModel {
    /**
     * Constructor.
     *
     * @param {?} policy
     */
    constructor(policy) {
        /**
         * The objects of the defined policy.
         */
        this.objects = [];
        Object.assign(this, policy);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UserModel {
    /**
     * Create a new instance of the model.
     *
     * @param {?} authorization
     * @param {?} user
     */
    constructor(authorization, user) {
        this.authorization = authorization;
        this.user = user;
        Object.assign(this, user);
    }
    /**
     * Check if user can perform action based on a policy.
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    can(key, value) {
        return this.authorization.checkPolicy(key, value);
    }
    /**
     * Check if user cannot perform action based on a policy.
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    cannot(key, value) {
        return !this.authorization.checkPolicy(key, value);
    }
    /**
     * Allow a user to perform action based on a policy.
     *
     * @param {?} policyName
     * @param {?} object
     * @param {?} allowed
     * @return {?}
     */
    allow(policyName, object, allowed) {
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
    }
    /**
     * Don't allow a user to perform action based on a policy.
     *
     * @param {?} policyName
     * @param {?} object
     * @return {?}
     */
    disallow(policyName, object) {
        this.authorization.removePolicy(policyName, object);
        return this;
    }
    /**
     * Identify a user with a role.
     *
     * @param {?} role
     * @return {?}
     */
    identify(role) {
        this.authorization.addPolicy('roles', role);
        return this;
    }
    /**
     * Check if a user is identified as a role.
     *
     * @param {?} role
     * @return {?}
     */
    is(role) {
        return this.authorization.checkPolicy('roles', role);
    }
    /**
     * Check if a user is not identified with a role.
     *
     * @param {?} role
     * @return {?}
     */
    isNot(role) {
        return !this.authorization.checkPolicy('roles', role);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Authorization {
    /**
     * Constructor.
     */
    constructor() {
        /**
         * Active Policies
         */
        this.policies = [];
    }
    /**
     *  Add a policy to the service.
     *
     * @param {?} key
     * @param {?=} value
     * @return {?}
     */
    addPolicy(key, value) {
        if (this.policies.findIndex(policy => policy.name == key) < 0) {
            let /** @type {?} */ policy = new PolicyModel({ name: key });
            if (value)
                policy.objects.push(value);
            this.policies.push(policy);
            return true;
        }
        else {
            let /** @type {?} */ index = this.policies.findIndex(policy => policy.name == key);
            if (value && !this.policies[index].objects[value]) {
                this.policies[index].objects.push(value);
                return true;
            }
            return false;
        }
    }
    /**
     * Check the given policy.
     *
     * @param {?} key
     * @param {?=} value
     * @return {?}
     */
    checkPolicy(key, value = null) {
        let /** @type {?} */ check = false;
        let /** @type {?} */ policy = this.policies.find(policy => policy.name === key);
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
    }
    /**
     * Clear all the policies on the service.
     * @return {?}
     */
    clearPolicies() {
        this.policies = [];
    }
    /**
     *  Remove a policy that has already been defined.
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    removePolicy(key, value) {
        let /** @type {?} */ policy = this.policies.find(policy => policy.name === key);
        if (policy && policy.objects.indexOf(value) >= 0) {
            let /** @type {?} */ index = this.policies.findIndex(policy => policy.name === name);
            let /** @type {?} */ objectIndexs = [];
            policy.objects.forEach((o, i) => {
                if (o == value) {
                    objectIndexs.push(i);
                }
            });
            objectIndexs.forEach(index => delete policy.objects[index]);
            this.policies[index] = policy;
            return true;
        }
        return false;
    }
}
Authorization.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Authorization.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Authentication {
    /**
     * Create a new instance of the service.
     *
     * @param {?} authorization
     * @param {?} config
     * @param {?} event
     * @param {?} http
     * @param {?} httpService
     * @param {?} token
     */
    constructor(authorization, config, event, http, httpService, token) {
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
        this.user = () => this.authUser;
        this.event.setChannels(this.channels);
        this.eventListeners();
    }
    /**
     * On service destroy.
     * @return {?}
     */
    ngOnDestroy() {
        Object.keys(this.subs).forEach(k => this.subs[k].unsubscribe());
        Object.keys(this.timeouts).forEach(k => clearTimeout(this.timeouts[k]));
    }
    /**
     * Check if user is logged in.
     *
     * @param {?=} force
     * @return {?}
     */
    check(force = false) {
        let /** @type {?} */ endpoint = this.config.get('authentication.endpoints.check');
        this.event.broadcast('auth:check');
        return new Observable(observer => {
            if (this.authenticated === false) {
                this.checkResolve(observer, false);
            }
            else if (this.authenticated === true && !force) {
                this.event.broadcast('auth:loggedIn', this.user());
                this.checkResolve(observer, true);
            }
            else {
                this.httpService.tokenHeader().then((token) => {
                    if (token) {
                        this.getUser(endpoint).then((res) => {
                            this.setAuthenticated(true);
                            this.setUser(res.data || res);
                            this.event.broadcast('auth:loggedIn', this.user());
                            this.checkResolve(observer, true);
                        }, () => {
                            this.setAuthenticated(false);
                            this.event.broadcast('auth:required', true);
                            this.checkResolve(observer, false);
                        });
                    }
                    else {
                        this.setAuthenticated(false);
                        this.checkResolve(observer, false);
                    }
                }, err => observer.error(err));
            }
        });
    }
    /**
     * Resolve the auth check.
     *
     * @param {?} observer
     * @param {?} authenticated
     * @return {?}
     */
    checkResolve(observer, authenticated) {
        this.event.broadcast('auth:check', authenticated).then(() => {
            this.timeouts['checkResolve'] = setTimeout(() => {
                observer.next(authenticated);
            }, 100);
        });
    }
    /**
     * The service event listeners.
     * @return {?}
     */
    eventListeners() {
        this.subs['auth:loggedIn'] = this.event.listen('auth:loggedIn').subscribe((user) => {
            this.setAuthenticated(true);
            this.setUser(user);
        });
    }
    /**
     * Send a forgot password request.
     *
     * @param {?} data
     * @param {?=} endpoint
     * @param {?=} headers
     * @return {?}
     */
    forgotPassword(data, endpoint = '', headers = {}) {
        endpoint = this.config.get('authentication.endpoints.forgotPassword', endpoint);
        return new Promise((resolve, reject) => {
            return this.http.post(endpoint, data, headers).toPromise()
                .then(res => resolve(res), error => reject(error));
        });
    }
    /**
     * Returns the redirect data.
     * @return {?}
     */
    getRedirect() {
        return this.redirect;
    }
    /**
     * Get the authentication token.
     * @return {?}
     */
    getToken() {
        return new Promise((resolve, reject) => {
            this.token.get().then(token => resolve(token), err => reject(err));
        });
    }
    /**
     * Get the current authenticated user.
     *
     * @param {?=} endpoint
     * @return {?}
     */
    getUser(endpoint = '') {
        endpoint = this.config.get('authentication.endpoints.getUser', endpoint);
        return this.http.get(endpoint).toPromise();
    }
    /**
     * Get the value authenticated value.
     * @return {?}
     */
    getAuthenticated() {
        return this.authenticated;
    }
    /**
     * Set if authenticated value.
     * @param {?} value
     * @return {?}
     */
    setAuthenticated(value) {
        return this.authenticated = value;
    }
    /**
     * Send a login request.
     *
     * @param {?} credentials
     * @param {?=} endpoint
     * @param {?=} headers
     * @return {?}
     */
    login(credentials, endpoint = '', headers = {}) {
        endpoint = this.config.get('authentication.endpoints.login', endpoint);
        return new Promise((resolve, reject) => {
            this.http.post(endpoint, credentials, headers).toPromise()
                .then(res => {
                this.onLogin(res).then(() => resolve(res), error => reject(error));
            }, error => reject(error));
        });
    }
    /**
     * Send a request to log the authenticated user out.
     * @param {?=} endpoint
     * @param {?=} headers
     * @return {?}
     */
    logout(endpoint = '', headers = {}) {
        return new Promise((resolve, reject) => {
            this.event.broadcast('auth:loggingOut').then(() => {
                endpoint = this.config.get('authentication.endpoints.logout', endpoint);
                if (endpoint) {
                    this.http.post(endpoint, {}, headers).toPromise().then(res => {
                        this.onLogout();
                        resolve(res);
                    }, error => reject(error));
                }
                else {
                    this.onLogout();
                    resolve();
                }
            });
        });
    }
    /**
     * Actions to perform on login.
     *
     * @param {?} res
     * @return {?}
     */
    onLogin(res) {
        return new Promise((resolve, reject) => {
            this.storeToken(res).then(() => {
                this.event.broadcast('auth:loggingIn', res).then(() => {
                    this.resolveUser().then(() => resolve(), err => reject(err));
                }, err => reject(err));
            }, err => reject(err));
        });
    }
    /**
     * Actions to perform on logout.
     * @return {?}
     */
    onLogout() {
        this.unauthenticate();
        this.event.broadcast('auth:loggedOut');
    }
    /**
     * Returns and clears the redirect data.
     * @return {?}
     */
    pullRedirect() {
        let /** @type {?} */ redirect = this.redirect;
        this.redirect = null;
        return redirect;
    }
    /**
     * Send a register request.
     *
     * @param {?} data
     * @param {?=} endpoint
     * @param {?=} headers
     * @param {?=} postRegisterLogin
     * @return {?}
     */
    register(data, endpoint = '', headers = {}, postRegisterLogin = false) {
        endpoint = this.config.get('authentication.endpoints.register', endpoint);
        return new Promise((resolve, reject) => {
            this.http.post(endpoint, data, headers).toPromise().then(res => {
                if (postRegisterLogin) {
                    this.onLogin(res).then(() => {
                        resolve(res);
                        this.event.broadcast('auth:registered', res);
                    }, error => reject(error));
                }
                else {
                    this.event.broadcast('auth:registered', res);
                }
            }, error => reject(error));
        });
    }
    /**
     * Send a reset password request.
     *
     * @param {?} data
     * @param {?=} endpoint
     * @param {?=} headers
     * @return {?}
     */
    resetPassword(data, endpoint = '', headers = {}) {
        endpoint = this.config.get('authentication.endpoints.resetPassword', endpoint);
        return new Promise((resolve, reject) => {
            this.http.post(endpoint, data, headers).toPromise().then(res => {
                this.onLogin(res).then(() => resolve(res));
            }, error => reject(error));
        });
    }
    /**
     * Resolve the authenticated user.
     * @return {?}
     */
    resolveUser() {
        return new Promise((resolve, reject) => {
            this.timeouts['resolveUser'] = setTimeout(() => {
                this.getUser().then((user) => {
                    this.setAuthenticated(true);
                    this.setUser(user.data || user).then((user) => {
                        this.event.broadcast('auth:loggedIn', user);
                        resolve();
                    }, error => reject(error));
                }, error => reject(error));
            }, 250);
        });
    }
    /**
     * Set the redirect data.
     * @param {?} value
     * @return {?}
     */
    setRedirect(value) {
        return this.redirect = value;
    }
    /**
     * Set the current authenticated user.
     *
     * @param {?} user
     * @return {?}
     */
    setUser(user) {
        if (user) {
            user = new UserModel(this.authorization, user);
        }
        return new Promise((resolve) => resolve(this.authUser = user));
    }
    /**
     * Store aut token and broadcast an event.
     *
     * @param {?} res
     * @return {?}
     */
    storeToken(res) {
        return new Promise((resolve) => {
            this.token.set(this.token.read(res)).then(() => {
                resolve(res);
            }, error => console.error(error));
        });
    }
    /**
     * Unauthenticate the current user.
     * @return {?}
     */
    unauthenticate() {
        this.token.remove();
        this.setAuthenticated(false);
        this.setUser(null);
        this.authorization.clearPolicies();
    }
}
Authentication.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Authentication.ctorParameters = () => [
    { type: Authorization },
    { type: Config },
    { type: Event },
    { type: HttpClient },
    { type: Http },
    { type: Token }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SocialAuthentication extends Authentication {
    /**
     * Constructor.
     * @param {?} authorization
     * @param {?} config
     * @param {?} event
     * @param {?} http
     * @param {?} httpService
     * @param {?} token
     */
    constructor(authorization, config, event, http, httpService, token) {
        super(authorization, config, event, http, httpService, token);
        this.authorization = authorization;
        this.config = config;
        this.event = event;
        this.http = http;
        this.httpService = httpService;
        this.token = token;
        /**
         * Handle errors on facebook login.
         *
         * @param error
         */
        this.handleLoginError = (error) => console.log(error);
        //
    }
    /**
     * Handle succesful Facebook login.
     *
     * @param {?} res
     * @return {?}
     */
    handleLoginSuccess(res) {
        return new Promise((resolve, reject) => {
            this.storeSocialCredentials(res);
            this.http.post(this.config.get('authentication.endpoints.socialAuth'), res).subscribe(res => {
                this.onLogin(res).then(() => {
                    resolve(res);
                }, error => reject(error));
            }, error => reject(error));
        });
    }
    /**
     * Store social auth crednetials.
     *
     * @param {?} res
     * @return {?}
     */
    storeSocialCredentials(res) {
        if (res.network == 'facebook') {
            this.token.set(res.authResponse.accessToken, 'facebook_access_token');
        }
    }
}
SocialAuthentication.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SocialAuthentication.ctorParameters = () => [
    { type: Authorization },
    { type: Config },
    { type: Event },
    { type: HttpClient },
    { type: Http },
    { type: Token }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Cache {
    /**
     * Constructor.
     * @param {?} config
     * @param {?} event
     * @param {?} storage
     */
    constructor(config, event, storage) {
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
            .subscribe(() => {
            this._cache = {};
            this.clear();
        });
    }
    /**
     * On service destroy.
     * @return {?}
     */
    ngOnDestroy() {
        Object.keys(this.subs).forEach(k => this.subs[k].unsubscribe());
    }
    /**
     * Retrieve the stored cache.
     * @return {?}
     */
    retrieveCache() {
        return new Promise((resolve, reject) => {
            this.storage.get(this.cacheName).then(cache => {
                if (cache) {
                    Object.keys(cache).forEach((item) => {
                        cache[item] = new CacheItemModel(cache[item]);
                    });
                    this.cache = cache;
                }
                else {
                    this.cache = this.store();
                }
                resolve(this.cache);
            }, err => reject(err));
        });
    }
    /**
     * Save the cache to storage.
     *
     * @return {?}
     */
    store() {
        this.storage.set(this.cacheName, this._cache);
        return this._cache;
    }
    /**
     * Accessor to the in memeory cache.
     * @return {?}
     */
    get cache() {
        return this._cache;
    }
    /**
     * Mutator to the in memeory cache.
     *
     * @param {?} value
     * @return {?}
     */
    set cache(value) {
        this._cache = value;
    }
    /**
     * Get an item from cache.
     *
     * @param {?} key
     * @param {?=} defautValue
     * @return {?}
     */
    get(key, defautValue = null) {
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
    }
    /**
     * Set an item to cache.
     *
     * @param {?} key
     * @param {?} value
     * @param {?=} expires
     * @return {?}
     */
    set(key, value, expires = this.config.get('cache.expires')) {
        let /** @type {?} */ cacheItem = new CacheItemModel({ value: value, expires: expires });
        this._cache[key] = cacheItem;
        this.store();
    }
    /**
     * Remove an item from cache.
     *
     * @param {?} key
     * @return {?}
     */
    remove(key) {
        delete this.cache[key];
        this.store();
    }
    /**
     * Clear the cache.
     * @return {?}
     */
    clear() {
        this.storage.remove(this.cacheName);
    }
    /**
     * Get an item from cache and remove it.
     *
     * @param {?} key
     * @return {?}
     */
    pull(key) {
        let /** @type {?} */ value = this.get(key);
        this.remove(key);
        return value;
    }
    /**
     * Check if cache has an item.
     *
     * @param {?} key
     * @return {?}
     */
    has(key) {
        return this.get(key) !== null ? true : false;
    }
}
Cache.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Cache.ctorParameters = () => [
    { type: Config },
    { type: Event },
    { type: Storage }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AuthGuard {
    /**
     * Create a new instance.
     *
     * @param {?} auth
     * @param {?} event
     */
    constructor(auth, event) {
        this.auth = auth;
        this.event = event;
        /**
         * The subsciptions of the service.
         */
        this.subs = {};
    }
    /**
     * On service destroy.
     * @return {?}
     */
    ngOnDestroy() {
        Object.keys(this.subs).forEach(k => this.subs[k].unsubscribe());
    }
    /**
     * Determine if the user can activate a route.
     *
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    canActivate(route, state) {
        return this.guard(route, state);
    }
    /**
     * Determine if the user can activate children of a route.
     *
     * @param {?} route
     * @param {?} state     *
     * @return {?}
     */
    canActivateChild(route, state) {
        return this.guard(route, state);
    }
    /**
     * The method to apply to guard.
     *
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    guard(route, state) {
        return new Promise((resolve) => {
            if (this.auth.user()) {
                resolve(true);
            }
            else {
                this.subs['auth:check'] = this.auth.check().subscribe(check => {
                    if (check) {
                        resolve(true);
                    }
                    else {
                        this.event.broadcast('auth:modal');
                        this.auth.setRedirect(state.url);
                        resolve(false);
                    }
                });
            }
        });
    }
}
AuthGuard.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AuthGuard.ctorParameters = () => [
    { type: Authentication },
    { type: Event }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AuthResolveGuard {
    /**
     * Create a new instance.
     *
     * @param {?} auth
     * @param {?} event
     */
    constructor(auth, event) {
        this.auth = auth;
        this.event = event;
        /**
         * The subsciptions of the service.
         */
        this.subs = {};
    }
    /**
     * On service destroy.
     * @return {?}
     */
    ngOnDestroy() {
        Object.keys(this.subs).forEach(k => this.subs[k].unsubscribe());
    }
    /**
     * Determine if the user can activate a route.
     * @return {?}
     */
    canActivate() {
        return this.guard();
    }
    /**
     * Determine if the user can activate children of a route.
     * @return {?}
     */
    canActivateChild() {
        return this.guard();
    }
    /**
     * The method to apply to guard.
     * @return {?}
     */
    guard() {
        return new Promise((resolve) => {
            if (this.auth.user()) {
                resolve(true);
            }
            else {
                this.subs['auth:check'] = this.auth.check().subscribe(() => {
                    resolve(true);
                });
            }
        });
    }
}
AuthResolveGuard.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AuthResolveGuard.ctorParameters = () => [
    { type: Authentication },
    { type: Event }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HttpInterceptor {
    /**
     * Create a new instance of the interceptor.
     *
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
    }
    /**
     * Intercept the http request.
     *
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        req = req.clone({
            headers: this.http.headers,
            url: this.http.getUrl(req.url)
        });
        return next.handle(req);
    }
}
HttpInterceptor.decorators = [
    { type: Injectable },
];
/** @nocollapse */
HttpInterceptor.ctorParameters = () => [
    { type: Http }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AuthInterceptor {
    /**
     * Create a new instance of the interceptor.
     *
     * @param {?} http
     * @param {?} event
     */
    constructor(http, event) {
        this.http = http;
        this.event = event;
    }
    /**
     * Intercept the http request.
     *
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        return next.handle(req).pipe(tap(() => { }, (error) => {
            if (error instanceof HttpErrorResponse) {
                if (error.status === 401) {
                    this.event.broadcast('auth:required', error);
                }
            }
        }));
    }
}
AuthInterceptor.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AuthInterceptor.ctorParameters = () => [
    { type: Http },
    { type: Event }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * ngKit Services.
 */
const /** @type {?} */ NGKIT_PROVIDERS = [
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
class ngKitModule {
    /**
     * ngKit module initializer.
     *
     * @param {?} options
     * @return {?}
     */
    static forRoot(options) {
        return {
            ngModule: ngKitModule,
            providers: [
                { provide: 'ngKitOptions', useValue: options },
            ]
        };
    }
}
ngKitModule.decorators = [
    { type: NgModule, args: [{
                imports: [HttpClientModule],
                providers: [
                    ...NGKIT_PROVIDERS,
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { Config, Authentication, Authorization, Cache, Event, Http, SocialAuthentication, Storage, Token, AuthGuard, AuthResolveGuard, NGKIT_PROVIDERS, Model, ngKitModule, AuthInterceptor as ɵb, HttpInterceptor as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdraXQuanMubWFwIiwic291cmNlcyI6WyJuZzovL25na2l0L2NvbmZpZy50cyIsIm5nOi8vbmdraXQvc2VydmljZXMvZXZlbnQudHMiLCJuZzovL25na2l0L3NlcnZpY2VzL3N0b3JhZ2UudHMiLCJuZzovL25na2l0L3NlcnZpY2VzL3Rva2VuLnRzIiwibmc6Ly9uZ2tpdC9zZXJ2aWNlcy9odHRwLnRzIiwibmc6Ly9uZ2tpdC9tb2RlbHMvY2FjaGUtaXRlbS50cyIsIm5nOi8vbmdraXQvbW9kZWxzL21vZGVsLnRzIiwibmc6Ly9uZ2tpdC9tb2RlbHMvcG9saWN5LnRzIiwibmc6Ly9uZ2tpdC9tb2RlbHMvdXNlci50cyIsIm5nOi8vbmdraXQvc2VydmljZXMvYXV0aG9yaXphdGlvbi50cyIsIm5nOi8vbmdraXQvc2VydmljZXMvYXV0aGVudGljYXRpb24udHMiLCJuZzovL25na2l0L3NlcnZpY2VzL3NvY2lhbC1hdXRoZW50aWNhdGlvbi50cyIsIm5nOi8vbmdraXQvc2VydmljZXMvY2FjaGUudHMiLCJuZzovL25na2l0L2d1YXJkcy9hdXRoLWd1YXJkLnRzIiwibmc6Ly9uZ2tpdC9ndWFyZHMvYXV0aC1yZXNvbHZlLWd1YXJkLnRzIiwibmc6Ly9uZ2tpdC9zZXJ2aWNlcy9odHRwLWludGVyY2VwdG9yLnRzIiwibmc6Ly9uZ2tpdC9zZXJ2aWNlcy9odHRwLWF1dGgtaW50ZXJjZXB0b3IudHMiLCJuZzovL25na2l0L3Byb3ZpZGVycy50cyIsIm5nOi8vbmdraXQvbmdraXQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29uZmlnIHtcbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IGNvbmZpZ3VyYXRpb24uXG4gICAgICovXG4gICAgc3RhdGljIGRlZmF1bHRPcHRpb25zOiBhbnkgPSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBdXRoZW50aWNhdGlvbiBzZXR0aW5ncy5cbiAgICAgICAgICovXG4gICAgICAgIGF1dGhlbnRpY2F0aW9uOiB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIENvbW1vbiBlbmRwb2ludHMgZm9yIGF1dGhlbnRpY2F0aW9uIHNlcmNpY2UuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGVuZHBvaW50czoge1xuICAgICAgICAgICAgICAgIGNoZWNrOiAnJyxcbiAgICAgICAgICAgICAgICBmb3JvZ290UGFzc3dvcmQ6ICcnLFxuICAgICAgICAgICAgICAgIGdldFVzZXI6ICcnLFxuICAgICAgICAgICAgICAgIGxvZ2luOiAnJyxcbiAgICAgICAgICAgICAgICBsb2dvdXQ6ICcnLFxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyOiAnJyxcbiAgICAgICAgICAgICAgICByZXNldFBhc3N3b3JkOiAnJyxcbiAgICAgICAgICAgICAgICBzb2NpYWxBdXRoOiAnJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogTWV0aG9kcyB1c2VkIGZvciBhdXRoZW50aWNhdGlvbi5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbWV0aG9kOiB7XG4gICAgICAgICAgICAgICAgdG9rZW46IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFNvY2lhbCBwcm92aWRlciBjb25maWd1cmF0aW9uLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzb2NpYWw6IHtcbiAgICAgICAgICAgICAgICBmYWNlYm9vazoge1xuICAgICAgICAgICAgICAgICAgICBpZDogJycsXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb246ICd2Mi42JyxcbiAgICAgICAgICAgICAgICAgICAgeGZibWw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlOiAncHVibGljX3Byb2ZpbGUsZW1haWwnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0d2l0dGVyOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVkaXJlY3RUbzogJycsXG4gICAgICAgICAgICAgICAgb2F1dGhQcm94eTogJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEF1dGhvcml6YXRpb24gb3B0aW9ucy5cbiAgICAgICAgICovXG4gICAgICAgIGF1dGhvcml6YXRpb246IHt9LFxuICAgICAgICAvKipcbiAgICAgICAgICogSHR0cCBvcHRpb25zLlxuICAgICAgICAgKi9cbiAgICAgICAgaHR0cDoge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBCYXNlZCB1cmwgZm9yIGh0dHAgcmVxdWVzdHMuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGJhc2VVcmw6ICcnLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBEZWZhdWx0IGhlYWRlcnMgZm9yIGh0dHAgcmVxdWVzdC5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaGVhZGVyczoge31cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JhZ2UgT3B0aW9uc1xuICAgICAgICAgKi9cbiAgICAgICAgc3RvcmFnZToge1xuICAgICAgICAgICAgbmFtZTogJ25na2l0U3RvcmFnZSdcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRva2VuIG9wdGlvbnMuXG4gICAgICAgICAqL1xuICAgICAgICB0b2tlbjoge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBEZWZhdWx0IG5hbWUgb2YgYXV0aG9yaXphdGlvbiB0b2tlbiByZWFkIGZyb20gcmVzcG9uc2VzLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByZWFkQXM6ICd0b2tlbicsXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIERlZmF1bHQgbmFtZSBvZiBhdXRob3JpemF0aW9uIHRva2VuIHRoYXQgaXMgc3RvcmVkLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdG9yZUFzOiAnX3Rva2VuJyxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogU2NoZW1lIHRvIHVzZSBpbiBBdXRob3JpemF0aW9uIGhlYWRlciBhbG9uZyB3aXRoIHRva2VuLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzY2hlbWU6ICdCZWFyZXInXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYWNoZSBzZXJ2aWNlIG9wdGlvbnMuXG4gICAgICAgICAqL1xuICAgICAgICBjYWNoZToge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBEZWZhdWx0IGV4cGlyYXRpb24gdGltZSBpbiBtaW51dGVzLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBleHBpcmVzOiA1XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFbmFibGUgZGVidWcgbW9kZS5cbiAgICAgICAgICovXG4gICAgICAgIGRlYnVnOiBmYWxzZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbmZpZyBvcHRpb25zLlxuICAgICAqL1xuICAgIG9wdGlvbnM6IGFueTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgc2VydmljZS4uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoQEluamVjdCgnbmdLaXRPcHRpb25zJykgcHJpdmF0ZSBfb3B0aW9uczogYW55KSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IENvbmZpZy5kZWZhdWx0T3B0aW9ucztcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKHRoaXMuX29wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgY29uZmlndXJhYmxlIG9wdGlvbnMuXG4gICAgICovXG4gICAgZ2V0T3B0aW9ucygpOiBhbnkgeyByZXR1cm4gdGhpcy5vcHRpb25zOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYW4gb3B0aW9uIGJ5IGtleS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgIGtleVxuICAgICAqIEBwYXJhbSAgIG92ZXJyaWRlXG4gICAgICovXG4gICAgZ2V0KGtleTogc3RyaW5nLCBvdmVycmlkZTogYW55ID0gZmFsc2UpOiBhbnkge1xuICAgICAgICByZXR1cm4gQ29uZmlnLmdldEl0ZW0oa2V5LCBvdmVycmlkZSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdGF0aWMgbWV0aG9kIHRvIGdldCBhbiBvcHRpb24gYnkga2V5LlxuICAgICAqXG4gICAgICogQHBhcmFtICAga2V5XG4gICAgICogQHBhcmFtICAgb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0SXRlbShrZXk6IHN0cmluZywgb3ZlcnJpZGU/OiBhbnkpOiBhbnkge1xuICAgICAgICBpZiAob3ZlcnJpZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBvdmVycmlkZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChDb25maWcuZGVmYXVsdE9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkuc3BsaXQoJy4nKS5yZWR1Y2UoKG8sIGkpID0+IG9baV0sIENvbmZpZy5kZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgYW4gb3B0aW9uIGJ5IGtleS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgIGtleVxuICAgICAqIEBwYXJhbSAgdmFsdWVcbiAgICAgKi9cbiAgICBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgcmV0dXJuIF8uc2V0KHRoaXMub3B0aW9ucywga2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjb25maWd1cmFibGUgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgb3B0aW9uc1xuICAgICAqL1xuICAgIHNldE9wdGlvbnMob3B0aW9uczogYW55KTogQ29uZmlnIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gXy5tZXJnZSh0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEV2ZW50IHtcbiAgICAvKipcbiAgICAgKiBFdmVudCBjaGFubmVscy5cbiAgICAgKi9cbiAgICBzdGF0aWMgY2hhbm5lbHM6IFN1YmplY3Q8YW55PltdID0gW107XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYW4gZXZlbnQgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleVxuICAgICAqL1xuICAgIHN0YXRpYyBjaGFubmVsKGtleTogYW55KTogU3ViamVjdDxhbnk+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBFdmVudC5jaGFubmVsc1trZXldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgRXZlbnQuY2hhbm5lbHNba2V5XSA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBFdmVudC5jaGFubmVsc1trZXldO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBtdWx0aXBsZSBldmVudCBjaGFubmVscy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudHNcbiAgICAgKi9cbiAgICBzZXRDaGFubmVscyhjaGFubmVsczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgY2hhbm5lbHMuZm9yRWFjaCgoY2hhbm5lbCkgPT4gRXZlbnQuY2hhbm5lbChjaGFubmVsKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnJvYWRjYXN0IGFuIGV2ZW50IHRvIGEgY2hhbm5lbC5cbiAgICAgKi9cbiAgICBicm9hZGNhc3Qoa2V5OiBzdHJpbmcsIGRhdGEgPSB7fSk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoRXZlbnQuY2hhbm5lbChrZXkpLm5leHQoZGF0YSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBMaXN0ZW4gb24gYSBjaGFubmVsIGZvciBhbiBldmVudC5zXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleVxuICAgICAqL1xuICAgIGxpc3RlbihrZXk6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBFdmVudC5jaGFubmVsKGtleSkuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCAqIGFzIGxvY2FsRm9yYWdlIGZyb20gXCJsb2NhbGZvcmFnZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0b3JhZ2VEcml2ZXIge1xuICAgIC8qKlxuICAgICAqIFRoZSBkYXRhYmFzZSBvZiB0aGUgc3RvcmFnZSBwcm92aWRlci5cbiAgICAgKi9cbiAgICBkYjogYW55O1xuXG4gICAgLyoqXG4gICAgICogR2V0IGFuIGl0ZW0gZnJvbSBzdG9yYWdlLlxuICAgICAqXG4gICAgICogQHBhcmFtICAga2V5XG4gICAgICovXG4gICAgZ2V0KGtleTogc3RyaW5nKTogUHJvbWlzZTxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogU2V0IGFuIGl0ZW0gdG8gc3RvcmFnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5XG4gICAgICogQHBhcmFtICB2YWx1ZVxuICAgICAqL1xuICAgIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IFByb21pc2U8YW55PjtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbiBpdGVtIGZyb20gc3RvcmFnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKi9cbiAgICByZW1vdmUoa2V5OiBzdHJpbmcpOiBQcm9taXNlPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBDbGVhciBzdG9yYWdlLlxuICAgICAqL1xuICAgIGNsZWFyKCk6IFByb21pc2U8YW55Pjtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0b3JhZ2UgaW1wbGVtZW50cyBTdG9yYWdlRHJpdmVyIHtcbiAgICAvKipcbiAgICAgKiBUaGUgZGF0YWJhc2Ugb2YgdGhlIHN0b3JhZ2UgcHJvdmlkZXIuXG4gICAgICovXG4gICAgZGI6IGFueTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgc2VydmljZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuZGIgPSBsb2NhbEZvcmFnZS5jcmVhdGVJbnN0YW5jZSh7XG4gICAgICAgICAgICBuYW1lOiB0aGlzLmNvbmZpZy5nZXQoJ3N0b3JhZ2UubmFtZScpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBpdGVtIGZyb20gbG9jYWwgc3RvcmFnZS5cbiAgICAgKi9cbiAgICBnZXQoa2V5OiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYi5nZXRJdGVtKGtleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGFuIGl0ZW0gdG8gbG9jYWwgc3RvcmFnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5XG4gICAgICogQHBhcmFtICB2YWx1ZVxuICAgICAqL1xuICAgIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRiLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFuIGl0ZW0gZnJvbSBsb2NhbCBzdG9yYWdlLlxuICAgICAqXG4gICAgICogQHBhcmFtICAga2V5XG4gICAgICovXG4gICAgcmVtb3ZlKGtleTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGIucmVtb3ZlSXRlbShrZXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsZWFyIGxvY2FsIHN0b3JhZ2UuXG4gICAgICovXG4gICAgY2xlYXIoKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGIuY2xlYXIoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4vLi4vY29uZmlnJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRva2VuIHtcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRva2VuIHN0b3JlZCBpbiBsb2NhbCBzdG9yYWdlLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfdG9rZW46IHN0cmluZyA9ICdfdG9rZW4nO1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGNvbmZpZ1xuICAgICAqIEBwYXJhbSAgc3RvcmFnZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgY29uZmlnOiBDb25maWcsXG4gICAgICAgIHByaXZhdGUgc3RvcmFnZTogU3RvcmFnZVxuICAgICkgeyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRva2VuIGZyb20gbG9jYWwgc3RvcmFnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgdG9rZW5OYW1lXG4gICAgICovXG4gICAgZ2V0KHRva2VuTmFtZT86IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0b2tlbk5hbWUgPSB0b2tlbk5hbWUgfHwgdGhpcy5jb25maWcuZ2V0KCd0b2tlbi5uYW1lJywgdGhpcy5fdG9rZW4pO1xuXG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2UuZ2V0KHRva2VuTmFtZSkudGhlbih0b2tlbiA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0b2tlbik7XG4gICAgICAgICAgICB9LCBlcnIgPT4gcmVqZWN0KGVycikpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdG9yZSB0aGUgdG9rZW4gaW4gbG9jYWwgc3RvcmFnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgdG9rZW5cbiAgICAgKiBAcGFyYW0gIHRva2VuTmFtZVxuICAgICAqL1xuICAgIHNldCh0b2tlbjogc3RyaW5nLCB0b2tlbk5hbWU/OiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdG9rZW5OYW1lID0gdG9rZW5OYW1lIHx8IHRoaXMuY29uZmlnLmdldCgndG9rZW4ubmFtZScsIHRoaXMuX3Rva2VuKTtcblxuICAgICAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNldCh0b2tlbk5hbWUsIHRva2VuKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9LCAoKSA9PiByZWplY3QoJ0Vycm9yOiBDb3VsZCBub3Qgc3RvcmUgdG9rZW4uJykpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWplY3QoJ0Vycm9yOiBObyB0b2tlbiBwcm92aWRlZC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIHRva2VuIGZyb20gbG9jYWwgc3RvcmFnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgdG9rZW5OYW1lXG4gICAgICovXG4gICAgcmVtb3ZlKHRva2VuTmFtZT86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICB0b2tlbk5hbWUgPSB0b2tlbk5hbWUgfHwgdGhpcy5jb25maWcuZ2V0KCd0b2tlbi5uYW1lJywgdGhpcy5fdG9rZW4pO1xuXG4gICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUodG9rZW5OYW1lKTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWFkIGEgdG9rZW4gZnJvbSBhIHJlc3BvbnNlIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgcmVzcG9uc2VcbiAgICAgKi9cbiAgICByZWFkKHJlc3BvbnNlOiBhbnkgPSBudWxsKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBsZXQga2V5ID0gdGhpcy5jb25maWcuZ2V0KCd0b2tlbi5yZWFkQXMnKTtcblxuICAgICAgICAgICAgcmV0dXJuIGtleS5zcGxpdCgnLicpLnJlZHVjZSgobzogYW55LCBpOiBzdHJpbmcpID0+IG9baV0sIHJlc3BvbnNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi8uLi9jb25maWcnO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL2V2ZW50JztcbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnLi90b2tlbic7XG5pbXBvcnQgeyBIdHRwSGVhZGVycywgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEh0dHAgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgc2VydmljZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgY29uZmlnXG4gICAgICogQHBhcmFtICBldmVudFxuICAgICAqIEBwYXJhbSAgdG9rZW5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGNvbmZpZzogQ29uZmlnLFxuICAgICAgICBwdWJsaWMgZXZlbnQ6IEV2ZW50LFxuICAgICAgICBwdWJsaWMgdG9rZW46IFRva2VuXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc2V0RGVmYXVsdEhlYWRlcnMoKTtcbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFzc2lnbmFibGUgYmFzZSB1cmwgZm9yIGh0dHAgY2FsbHMuXG4gICAgICovXG4gICAgYmFzZVVybDogc3RyaW5nID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBIZWFkZXJzIHRvIGJlIHNlbnQgd2l0aCBhbGwgaHR0cCBjYWxscy5cbiAgICAgKi9cbiAgICBwdWJsaWMgaGVhZGVyczogSHR0cEhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzdWJzY2lwdGlvbnMgb2YgdGhlIHNlcnZpY2UuXG4gICAgICovXG4gICAgc3ViczogYW55ID0ge307XG5cbiAgICAvKipcbiAgICAgKiBPbiBzZXJ2aWNlIGRlc3Ryb3kuXG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuc3VicykuZm9yRWFjaChrID0+IHRoaXMuc3Vic1trXS51bnN1YnNjcmliZSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZCB1cmwgcGFyYW1ldGVycyBmb3IgcmVxdWVzdHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHBhcmFtc1xuICAgICAqL1xuICAgIGJ1aWxkUGFyYW1zKHBhcmFtczogYW55KTogSHR0cFBhcmFtcyB7XG4gICAgICAgIHZhciBxdWVyeV9wYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuXG4gICAgICAgIGlmIChwYXJhbXMpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaCgoa2V5OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zW2tleV0pIHF1ZXJ5X3BhcmFtcy5zZXQoa2V5LCBwYXJhbXNba2V5XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBxdWVyeV9wYXJhbXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXZlbnQgbGlzdGVuZXJzLlxuICAgICAqL1xuICAgIHByaXZhdGUgZXZlbnRMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmV2ZW50KSB7XG4gICAgICAgICAgICBsZXQgc3ViID0gKCkgPT4gdGhpcy5zZXREZWZhdWx0SGVhZGVycygpO1xuICAgICAgICAgICAgdGhpcy5zdWJzWydhdXRoOmxvZ2dpbmdJbiddID0gdGhpcy5ldmVudC5saXN0ZW4oJ2F1dGg6bG9nZ2luZ0luJykuc3Vic2NyaWJlKHN1Yik7XG4gICAgICAgICAgICB0aGlzLnN1YnNbJ2F1dGg6bG9nZ2VkT3V0J10gPSB0aGlzLmV2ZW50Lmxpc3RlbignYXV0aDpsb2dnZWRPdXQnKS5zdWJzY3JpYmUoc3ViKTtcbiAgICAgICAgICAgIHRoaXMuc3Vic1snYXV0aDpjaGVjayddID0gdGhpcy5ldmVudC5saXN0ZW4oJ2F1dGg6Y2hlY2snKS5zdWJzY3JpYmUoc3ViKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB1cmwgZm9yIGh0dHAgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgdXJsXG4gICAgICovXG4gICAgcHVibGljIGdldFVybCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICh1cmwuc3RhcnRzV2l0aCgnLycpIHx8IHVybC5zdGFydHNXaXRoKCdodHRwJykpIHJldHVybiB1cmw7XG5cbiAgICAgICAgbGV0IGJhc2VVcmwgPSB0aGlzLmJhc2VVcmwgfHwgdGhpcy5jb25maWcuZ2V0KCdodHRwLmJhc2VVcmwnKSB8fCAnJztcblxuICAgICAgICByZXR1cm4gKGJhc2VVcmwpID8gYmFzZVVybCArICcvJyArIHVybCA6IHVybDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGRlZmF1bHQgaGVhZGVycyBmb3IgaHR0cCByZXF1ZXN0LlxuICAgICAqL1xuICAgIHNldERlZmF1bHRIZWFkZXJzKCk6IHZvaWQge1xuICAgICAgICBsZXQgY29uZmlnSGVhZGVycyA9ICh0aGlzLmNvbmZpZykgPyB0aGlzLmNvbmZpZy5nZXQoJ2h0dHAuaGVhZGVycycpIDogbnVsbDtcblxuICAgICAgICBpZiAoY29uZmlnSGVhZGVycykge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoY29uZmlnSGVhZGVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IHRoaXMuaGVhZGVycy5zZXQoa2V5LCBjb25maWdIZWFkZXJzW2tleV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRva2VuSGVhZGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgdG9rZW4gaGVhZGVyIHRvIHRoZSByZXF1ZXN0LlxuICAgICAqL1xuICAgIHRva2VuSGVhZGVyKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLmdldCgnYXV0aGVudGljYXRpb24ubWV0aG9kLnRva2VuJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRva2VuLmdldCgpLnRoZW4odG9rZW4gPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2NoZW1lID0gdGhpcy5jb25maWcuZ2V0KCd0b2tlbi5zY2hlbWUnKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gKHNjaGVtZSkgPyBgJHtzY2hlbWV9ICR7dG9rZW59YCA6IHRva2VuO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlcnMgPSB0aGlzLmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRva2VuID8gdHJ1ZSA6IGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IHRoaXMuaGVhZGVycy5kZWxldGUoJ0F1dGhvcml6YXRpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxufVxuIiwiLyoqXG4gKiBNb2RlbCBmb3IgY2FjaGUgaXRlbXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBDYWNoZUl0ZW1Nb2RlbCB7XG4gICAgLyoqXG4gICAgICogV2hlbiB0aGUgY2FjaGUgaXRlbSBleHBpcmVzLlxuICAgICAqL1xuICAgIF9leHBpcmVzOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgb2YgdGhlIGNhY2hlIGl0ZW0uXG4gICAgICovXG4gICAgX3ZhbHVlOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y290ci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgaXRlbVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGl0ZW06IGFueSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGl0ZW0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlIGFjY2Vzc29yIHBhcnNlcyBKU09OLlxuICAgICAqL1xuICAgIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh0aGlzLl92YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB2YWx1ZSBtdXRhdG9yIHRoYXQgc3RyaW5naWZpZXMgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHZhbHVlXG4gICAgICovXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGV4cGlyZXMgYWNjZXNzb3IuXG4gICAgICovXG4gICAgZ2V0IGV4cGlyZXMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4cGlyZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBleHBpcmVzIG11dGF0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIG1pbnV0ZXNcbiAgICAgKi9cbiAgICBzZXQgZXhwaXJlcyhtaW51dGVzOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGV4cGlyYXRpb24gPSBuZXcgRGF0ZSgpO1xuICAgICAgICBleHBpcmF0aW9uLnNldE1pbnV0ZXMoZXhwaXJhdGlvbi5nZXRNaW51dGVzKCkgKyBtaW51dGVzKTtcbiAgICAgICAgdGhpcy5fZXhwaXJlcyA9IGV4cGlyYXRpb24uZ2V0VGltZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGNhY2hlZCBpdGVtIGlzIGV4cGlyZWQuXG4gICAgICovXG4gICAgaXNFeHBpcmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5leHBpcmVzIDw9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5leHBvcnQgY2xhc3MgTW9kZWwge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbWRvZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGF0dHJpYnV0ZXNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzPzogYW55KSB7XG4gICAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMgPSBKU09OLnBhcnNlKGF0dHJpYnV0ZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBhdHRyaWJ1dGVzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb21lbnQgSlNcbiAgICAgKlxuICAgICAqIEByZXR1cm4gbW9tZW50XG4gICAgICovXG4gICAgbW9tZW50ID0gbW9tZW50O1xufVxuIiwiZXhwb3J0IGNsYXNzIFBvbGljeU1vZGVsIHtcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBwb2xpY3kuXG4gICAgICovXG4gICAgbmFtZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG9iamVjdHMgb2YgdGhlIGRlZmluZWQgcG9saWN5LlxuICAgICAqL1xuICAgIG9iamVjdHM6IGFueVtdID0gW107XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3Rvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgcG9saWN5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IocG9saWN5OiBhbnkpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwb2xpY3kpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEF1dGhvcml6YXRpb24gfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRob3JpemF0aW9uJztcblxuZXhwb3J0IGNsYXNzIFVzZXJNb2RlbCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBtb2RlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBhdXRob3JpemF0aW9uXG4gICAgICogQHBhcmFtIHVzZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBhdXRob3JpemF0aW9uOiBBdXRob3JpemF0aW9uLFxuICAgICAgICBwdWJsaWMgdXNlcjogb2JqZWN0XG4gICAgKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgdXNlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdXNlciBjYW4gcGVyZm9ybSBhY3Rpb24gYmFzZWQgb24gYSBwb2xpY3kuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleVxuICAgICAqIEBwYXJhbSAgdmFsdWVcbiAgICAgKi9cbiAgICBjYW4oa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aG9yaXphdGlvbi5jaGVja1BvbGljeShrZXksIHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB1c2VyIGNhbm5vdCBwZXJmb3JtIGFjdGlvbiBiYXNlZCBvbiBhIHBvbGljeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5XG4gICAgICogQHBhcmFtICB2YWx1ZVxuICAgICAqL1xuICAgIGNhbm5vdChrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuYXV0aG9yaXphdGlvbi5jaGVja1BvbGljeShrZXksIHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGxvdyBhIHVzZXIgdG8gcGVyZm9ybSBhY3Rpb24gYmFzZWQgb24gYSBwb2xpY3kuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHBvbGljeU5hbWVcbiAgICAgKiBAcGFyYW0gIG9iamVjdFxuICAgICAqIEBwYXJhbSAgYWxsb3dlZFxuICAgICAqL1xuICAgIGFsbG93KHBvbGljeU5hbWU6IHN0cmluZywgb2JqZWN0OiBhbnksIGFsbG93ZWQ6IEZ1bmN0aW9uIHwgYm9vbGVhbik6IFVzZXJNb2RlbCB7XG4gICAgICAgIGlmICh0eXBlb2YgYWxsb3dlZCA9PT0gJ2Z1bmN0aW9uJyAmJiBhbGxvd2VkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aG9yaXphdGlvbi5hZGRQb2xpY3kocG9saWN5TmFtZSwgb2JqZWN0KTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYWxsb3dlZCA9PT0gJ2Jvb2xlYW4nICYmIGFsbG93ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aG9yaXphdGlvbi5hZGRQb2xpY3kocG9saWN5TmFtZSwgb2JqZWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aG9yaXphdGlvbi5yZW1vdmVQb2xpY3kocG9saWN5TmFtZSwgb2JqZWN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvbid0IGFsbG93IGEgdXNlciB0byBwZXJmb3JtIGFjdGlvbiBiYXNlZCBvbiBhIHBvbGljeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgcG9saWN5TmFtZVxuICAgICAqIEBwYXJhbSAgb2JqZWN0XG4gICAgICogQHBhcmFtICBhbGxvd2VkXG4gICAgICovXG4gICAgZGlzYWxsb3cocG9saWN5TmFtZTogc3RyaW5nLCBvYmplY3Q6IGFueSk6IFVzZXJNb2RlbCB7XG4gICAgICAgIHRoaXMuYXV0aG9yaXphdGlvbi5yZW1vdmVQb2xpY3kocG9saWN5TmFtZSwgb2JqZWN0KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZGVudGlmeSBhIHVzZXIgd2l0aCBhIHJvbGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcm9sZVxuICAgICAqL1xuICAgIGlkZW50aWZ5KHJvbGU6IHN0cmluZyk6IFVzZXJNb2RlbCB7XG4gICAgICAgIHRoaXMuYXV0aG9yaXphdGlvbi5hZGRQb2xpY3koJ3JvbGVzJywgcm9sZSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYSB1c2VyIGlzIGlkZW50aWZpZWQgYXMgYSByb2xlLlxuICAgICAqXG4gICAgICogQHBhcmFtICByb2xlXG4gICAgICovXG4gICAgaXMocm9sZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhvcml6YXRpb24uY2hlY2tQb2xpY3koJ3JvbGVzJywgcm9sZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYSB1c2VyIGlzIG5vdCBpZGVudGlmaWVkIHdpdGggYSByb2xlLlxuICAgICAqXG4gICAgICogQHBhcmFtICByb2xlXG4gICAgICovXG4gICAgaXNOb3Qocm9sZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5hdXRob3JpemF0aW9uLmNoZWNrUG9saWN5KCdyb2xlcycsIHJvbGUpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBvbGljeU1vZGVsIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aG9yaXphdGlvbiB7XG4gICAgLyoqXG4gICAgICogQWN0aXZlIFBvbGljaWVzXG4gICAgICovXG4gICAgcG9saWNpZXM6IFBvbGljeU1vZGVsW10gPSBbXTtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICAvKipcbiAgICAgKiAgQWRkIGEgcG9saWN5IHRvIHRoZSBzZXJ2aWNlLlxuICAgICAqXG4gICAgICogQHBhcmFtICBrZXlcbiAgICAgKiBAcGFyYW0gIHZhbHVlXG4gICAgICovXG4gICAgYWRkUG9saWN5KGtleTogc3RyaW5nLCB2YWx1ZT86IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5wb2xpY2llcy5maW5kSW5kZXgocG9saWN5ID0+IHBvbGljeS5uYW1lID09IGtleSkgPCAwKSB7XG4gICAgICAgICAgICBsZXQgcG9saWN5ID0gbmV3IFBvbGljeU1vZGVsKHsgbmFtZToga2V5IH0pO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUpIHBvbGljeS5vYmplY3RzLnB1c2godmFsdWUpO1xuXG4gICAgICAgICAgICB0aGlzLnBvbGljaWVzLnB1c2gocG9saWN5KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnBvbGljaWVzLmZpbmRJbmRleChwb2xpY3kgPT4gcG9saWN5Lm5hbWUgPT0ga2V5KTtcblxuICAgICAgICAgICAgaWYgKHZhbHVlICYmICF0aGlzLnBvbGljaWVzW2luZGV4XS5vYmplY3RzW3ZhbHVlXSkge1xuICAgICAgICAgICAgICAgIHRoaXMucG9saWNpZXNbaW5kZXhdLm9iamVjdHMucHVzaCh2YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgdGhlIGdpdmVuIHBvbGljeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgbmFtZVxuICAgICAqIEBwYXJhbSAgdmFsdWVcbiAgICAgKi9cbiAgICBjaGVja1BvbGljeShrZXk6IHN0cmluZywgdmFsdWU6IGFueSA9IG51bGwpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGNoZWNrID0gZmFsc2U7XG4gICAgICAgIGxldCBwb2xpY3kgPSB0aGlzLnBvbGljaWVzLmZpbmQocG9saWN5ID0+IHBvbGljeS5uYW1lID09PSBrZXkpO1xuXG4gICAgICAgIGlmIChwb2xpY3kpIHtcbiAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb2xpY3kgJiYgKCh2YWx1ZSAmJiBwb2xpY3kub2JqZWN0cy5pbmRleE9mKHZhbHVlKSA+PSAwKSB8fFxuICAgICAgICAgICAgKCF2YWx1ZSAmJiAhcG9saWN5Lm9iamVjdHMubGVuZ3RoKSkpIHtcbiAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2hlY2s7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYXIgYWxsIHRoZSBwb2xpY2llcyBvbiB0aGUgc2VydmljZS5cbiAgICAgKi9cbiAgICBjbGVhclBvbGljaWVzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBvbGljaWVzID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIFJlbW92ZSBhIHBvbGljeSB0aGF0IGhhcyBhbHJlYWR5IGJlZW4gZGVmaW5lZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5XG4gICAgICogQHBhcmFtICB2YWx1ZVxuICAgICAqL1xuICAgIHJlbW92ZVBvbGljeShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgcG9saWN5ID0gdGhpcy5wb2xpY2llcy5maW5kKHBvbGljeSA9PiBwb2xpY3kubmFtZSA9PT0ga2V5KTtcblxuICAgICAgICBpZiAocG9saWN5ICYmIHBvbGljeS5vYmplY3RzLmluZGV4T2YodmFsdWUpID49IDApIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMucG9saWNpZXMuZmluZEluZGV4KHBvbGljeSA9PiBwb2xpY3kubmFtZSA9PT0gbmFtZSk7XG4gICAgICAgICAgICBsZXQgb2JqZWN0SW5kZXhzOiBhbnlbXSA9IFtdO1xuXG4gICAgICAgICAgICBwb2xpY3kub2JqZWN0cy5mb3JFYWNoKChvLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG8gPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0SW5kZXhzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG9iamVjdEluZGV4cy5mb3JFYWNoKGluZGV4ID0+IGRlbGV0ZSBwb2xpY3kub2JqZWN0c1tpbmRleF0pO1xuXG4gICAgICAgICAgICB0aGlzLnBvbGljaWVzW2luZGV4XSA9IHBvbGljeTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEh0dHAgfSBmcm9tICcuL2h0dHAnO1xuaW1wb3J0IHsgQXV0aG9yaXphdGlvbiB9IGZyb20gJy4vYXV0aG9yaXphdGlvbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJy4vdG9rZW4nO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL2V2ZW50JztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoZW50aWNhdGlvbiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBzZXJ2aWNlLlxuICAgICAqXG4gICAgICogQHBhcmFtICBhdXRob3JpemF0aW9uXG4gICAgICogQHBhcmFtICBjb25maWdcbiAgICAgKiBAcGFyYW0gIGV2ZW50XG4gICAgICogQHBhcmFtICBodHRwXG4gICAgICogQHBhcmFtICBodHRwU2VydmljZVxuICAgICAqIEBwYXJhbSAgdG9rZW5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGF1dGhvcml6YXRpb246IEF1dGhvcml6YXRpb24sXG4gICAgICAgIHB1YmxpYyBjb25maWc6IENvbmZpZyxcbiAgICAgICAgcHVibGljIGV2ZW50OiBFdmVudCxcbiAgICAgICAgcHVibGljIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgIHB1YmxpYyBodHRwU2VydmljZTogSHR0cCxcbiAgICAgICAgcHVibGljIHRva2VuOiBUb2tlblxuICAgICkge1xuICAgICAgICB0aGlzLmV2ZW50LnNldENoYW5uZWxzKHRoaXMuY2hhbm5lbHMpO1xuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXV0aG9yaXplZCB1c2VyLlxuICAgICAqL1xuICAgIGF1dGhVc2VyOiBhbnkgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogU3RhdGUgb2YgdGhlIHVzZXIgYXV0aGVudGljYXRpb24uXG4gICAgICovXG4gICAgYXV0aGVudGljYXRlZDogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGNoYW5uZWxzLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBjaGFubmVsczogc3RyaW5nW10gPSBbXG4gICAgICAgICdhdXRoOmxvZ2luJyxcbiAgICAgICAgJ2F1dGg6bG9nZ2luSW4nLFxuICAgICAgICAnYXV0aDpsb2dnZWRJbicsXG4gICAgICAgICdhdXRoOmxvZ291dCcsXG4gICAgICAgICdhdXRoOmxvZ2dpbmdPdXQnLFxuICAgICAgICAnYXV0aDpsb2dnZWRPdXQnLFxuICAgICAgICAnYXV0aDpyZXF1aXJlZCcsXG4gICAgICAgICdhdXRoOmNoZWNrJyxcbiAgICAgICAgJ2F1dGg6Z3VhcmRlZCcsXG4gICAgICAgICdhdXRoOnJlZ2lzdGVyZWQnLFxuICAgIF07XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcmVkaXJlY3QgZGF0YSBvbiB0aGUgc2VydmljZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHJlZGlyZWN0OiBhbnkgPSBudWxsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgc3Vic2NpcHRpb25zIG9mIHRoZSBzZXJ2aWNlLlxuICAgICAqL1xuICAgIHN1YnM6IGFueSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRpbWVvdXRzIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICovXG4gICAgdGltZW91dHM6IGFueSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogT24gc2VydmljZSBkZXN0cm95LlxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnN1YnMpLmZvckVhY2goayA9PiB0aGlzLnN1YnNba10udW5zdWJzY3JpYmUoKSk7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMudGltZW91dHMpLmZvckVhY2goayA9PiBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0c1trXSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHVzZXIgaXMgbG9nZ2VkIGluLlxuICAgICAqXG4gICAgICogQHBhcmFtICBmb3JjZVxuICAgICAqL1xuICAgIGNoZWNrKGZvcmNlOiBib29sZWFuID0gZmFsc2UpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgbGV0IGVuZHBvaW50ID0gdGhpcy5jb25maWcuZ2V0KCdhdXRoZW50aWNhdGlvbi5lbmRwb2ludHMuY2hlY2snKTtcblxuICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpjaGVjaycpO1xuXG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnNlcnZlciA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRoZW50aWNhdGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tSZXNvbHZlKG9ic2VydmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXV0aGVudGljYXRlZCA9PT0gdHJ1ZSAmJiAhZm9yY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpsb2dnZWRJbicsIHRoaXMudXNlcigpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrUmVzb2x2ZShvYnNlcnZlciwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaHR0cFNlcnZpY2UudG9rZW5IZWFkZXIoKS50aGVuKCh0b2tlbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VXNlcihlbmRwb2ludCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdXRoZW50aWNhdGVkKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VXNlcihyZXMuZGF0YSB8fCByZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnQuYnJvYWRjYXN0KCdhdXRoOmxvZ2dlZEluJywgdGhpcy51c2VyKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tSZXNvbHZlKG9ic2VydmVyLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF1dGhlbnRpY2F0ZWQoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnQuYnJvYWRjYXN0KCdhdXRoOnJlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1Jlc29sdmUob2JzZXJ2ZXIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdXRoZW50aWNhdGVkKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tSZXNvbHZlKG9ic2VydmVyLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBlcnIgPT4gb2JzZXJ2ZXIuZXJyb3IoZXJyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc29sdmUgdGhlIGF1dGggY2hlY2suXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb2JzZXJ2ZXJcbiAgICAgKiBAcGFyYW0gYXV0aGVudGljYXRlZFxuICAgICAqL1xuICAgIGNoZWNrUmVzb2x2ZShvYnNlcnZlcjogT2JzZXJ2ZXI8Ym9vbGVhbj4sIGF1dGhlbnRpY2F0ZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ldmVudC5icm9hZGNhc3QoJ2F1dGg6Y2hlY2snLCBhdXRoZW50aWNhdGVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGltZW91dHNbJ2NoZWNrUmVzb2x2ZSddID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChhdXRoZW50aWNhdGVkKTtcbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzZXJ2aWNlIGV2ZW50IGxpc3RlbmVycy5cbiAgICAgKi9cbiAgICBldmVudExpc3RlbmVycygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdWJzWydhdXRoOmxvZ2dlZEluJ10gPSB0aGlzLmV2ZW50Lmxpc3RlbignYXV0aDpsb2dnZWRJbicpLnN1YnNjcmliZSgodXNlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRBdXRoZW50aWNhdGVkKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5zZXRVc2VyKHVzZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgZm9yZ290IHBhc3N3b3JkIHJlcXVlc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGNyZWRlbnRpYWxzXG4gICAgICogQHBhcmFtICBlbmRwb2ludFxuICAgICAqIEBwYXJhbSAgaGVhZGVyc1xuICAgICAqL1xuICAgIGZvcmdvdFBhc3N3b3JkKGRhdGE6IGFueSwgZW5kcG9pbnQ6IHN0cmluZyA9ICcnLCBoZWFkZXJzID0ge30pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBlbmRwb2ludCA9IHRoaXMuY29uZmlnLmdldChcbiAgICAgICAgICAgICdhdXRoZW50aWNhdGlvbi5lbmRwb2ludHMuZm9yZ290UGFzc3dvcmQnLCBlbmRwb2ludFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoZW5kcG9pbnQsIGRhdGEsIGhlYWRlcnMpLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlc29sdmUocmVzKSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHJlZGlyZWN0IGRhdGEuXG4gICAgICovXG4gICAgZ2V0UmVkaXJlY3QoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXJlY3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi5cbiAgICAgKi9cbiAgICBnZXRUb2tlbigpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50b2tlbi5nZXQoKS50aGVuKHRva2VuID0+IHJlc29sdmUodG9rZW4pLCBlcnIgPT4gcmVqZWN0KGVycikpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnQgYXV0aGVudGljYXRlZCB1c2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtICBlbmRwb2ludFxuICAgICAqL1xuICAgIGdldFVzZXIoZW5kcG9pbnQ6IHN0cmluZyA9ICcnKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgZW5kcG9pbnQgPSB0aGlzLmNvbmZpZy5nZXQoJ2F1dGhlbnRpY2F0aW9uLmVuZHBvaW50cy5nZXRVc2VyJywgZW5kcG9pbnQpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGVuZHBvaW50KS50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHZhbHVlIGF1dGhlbnRpY2F0ZWQgdmFsdWUuXG4gICAgICovXG4gICAgZ2V0QXV0aGVudGljYXRlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aGVudGljYXRlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgaWYgYXV0aGVudGljYXRlZCB2YWx1ZS5cbiAgICAgKi9cbiAgICBzZXRBdXRoZW50aWNhdGVkKHZhbHVlOiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhlbnRpY2F0ZWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgbG9naW4gcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgY3JlZGVudGlhbHNcbiAgICAgKiBAcGFyYW0gIGVuZHBvaW50XG4gICAgICogQHBhcmFtICBoZWFkZXJzXG4gICAgICovXG4gICAgbG9naW4oY3JlZGVudGlhbHM6IGFueSwgZW5kcG9pbnQ6IHN0cmluZyA9ICcnLCBoZWFkZXJzID0ge30pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBlbmRwb2ludCA9IHRoaXMuY29uZmlnLmdldCgnYXV0aGVudGljYXRpb24uZW5kcG9pbnRzLmxvZ2luJywgZW5kcG9pbnQpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmh0dHAucG9zdChlbmRwb2ludCwgY3JlZGVudGlhbHMsIGhlYWRlcnMpLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkxvZ2luKHJlcykudGhlbigoKSA9PiByZXNvbHZlKHJlcyksIGVycm9yID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgcmVxdWVzdCB0byBsb2cgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlciBvdXQuXG4gICAgICovXG4gICAgbG9nb3V0KGVuZHBvaW50OiBzdHJpbmcgPSAnJywgaGVhZGVycyA9IHt9KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnQuYnJvYWRjYXN0KCdhdXRoOmxvZ2dpbmdPdXQnKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBlbmRwb2ludCA9IHRoaXMuY29uZmlnLmdldCgnYXV0aGVudGljYXRpb24uZW5kcG9pbnRzLmxvZ291dCcsIGVuZHBvaW50KTtcblxuICAgICAgICAgICAgICAgIGlmIChlbmRwb2ludCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmh0dHAucG9zdChlbmRwb2ludCwge30sIGhlYWRlcnMpLnRvUHJvbWlzZSgpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Mb2dvdXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKVxuICAgICAgICAgICAgICAgICAgICB9LCBlcnJvciA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTG9nb3V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWN0aW9ucyB0byBwZXJmb3JtIG9uIGxvZ2luLlxuICAgICAqXG4gICAgICogQHBhcmFtICByZXNcbiAgICAgKi9cbiAgICBvbkxvZ2luKHJlczogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmVUb2tlbihyZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnQuYnJvYWRjYXN0KCdhdXRoOmxvZ2dpbmdJbicsIHJlcykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzb2x2ZVVzZXIoKS50aGVuKCgpID0+IHJlc29sdmUoKSwgZXJyID0+IHJlamVjdChlcnIpKTtcbiAgICAgICAgICAgICAgICB9LCBlcnIgPT4gcmVqZWN0KGVycikpO1xuICAgICAgICAgICAgfSwgZXJyID0+IHJlamVjdChlcnIpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWN0aW9ucyB0byBwZXJmb3JtIG9uIGxvZ291dC5cbiAgICAgKi9cbiAgICBvbkxvZ291dCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51bmF1dGhlbnRpY2F0ZSgpO1xuICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpsb2dnZWRPdXQnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuZCBjbGVhcnMgdGhlIHJlZGlyZWN0IGRhdGEuXG4gICAgICovXG4gICAgcHVsbFJlZGlyZWN0KCk6IGFueSB7XG4gICAgICAgIGxldCByZWRpcmVjdCA9IHRoaXMucmVkaXJlY3Q7XG5cbiAgICAgICAgdGhpcy5yZWRpcmVjdCA9IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIHJlZGlyZWN0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmQgYSByZWdpc3RlciByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtICBkYXRhXG4gICAgICogQHBhcmFtICAgZW5kcG9pbnRcbiAgICAgKiBAcGFyYW0gIGhlYWRlcnNcbiAgICAgKiBAcGFyYW0gcG9zdFJlZ2lzdGVyTG9naW5cbiAgICAgKi9cbiAgICByZWdpc3RlcihkYXRhOiBvYmplY3QsIGVuZHBvaW50OiBzdHJpbmcgPSAnJywgaGVhZGVycyA9IHt9LCBwb3N0UmVnaXN0ZXJMb2dpbjogYm9vbGVhbiA9IGZhbHNlKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgZW5kcG9pbnQgPSB0aGlzLmNvbmZpZy5nZXQoJ2F1dGhlbnRpY2F0aW9uLmVuZHBvaW50cy5yZWdpc3RlcicsIGVuZHBvaW50KTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaHR0cC5wb3N0KGVuZHBvaW50LCBkYXRhLCBoZWFkZXJzKS50b1Byb21pc2UoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHBvc3RSZWdpc3RlckxvZ2luKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Mb2dpbihyZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpyZWdpc3RlcmVkJywgcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudC5icm9hZGNhc3QoJ2F1dGg6cmVnaXN0ZXJlZCcsIHJlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgcmVzZXQgcGFzc3dvcmQgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgIGNyZWRlbnRpYWxzXG4gICAgICogQHBhcmFtICAgZW5kcG9pbnRcbiAgICAgKiBAcGFyYW0gIGhlYWRlcnNcbiAgICAgKi9cbiAgICByZXNldFBhc3N3b3JkKGRhdGE6IGFueSwgZW5kcG9pbnQ6IHN0cmluZyA9ICcnLCBoZWFkZXJzID0ge30pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBlbmRwb2ludCA9IHRoaXMuY29uZmlnLmdldChcbiAgICAgICAgICAgICdhdXRoZW50aWNhdGlvbi5lbmRwb2ludHMucmVzZXRQYXNzd29yZCcsIGVuZHBvaW50XG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaHR0cC5wb3N0KGVuZHBvaW50LCBkYXRhLCBoZWFkZXJzKS50b1Byb21pc2UoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkxvZ2luKHJlcykudGhlbigoKSA9PiByZXNvbHZlKHJlcykpXG4gICAgICAgICAgICB9LCBlcnJvciA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzb2x2ZSB0aGUgYXV0aGVudGljYXRlZCB1c2VyLlxuICAgICAqL1xuICAgIHJlc29sdmVVc2VyKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRpbWVvdXRzWydyZXNvbHZlVXNlciddID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRVc2VyKCkudGhlbigodXNlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF1dGhlbnRpY2F0ZWQodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRVc2VyKHVzZXIuZGF0YSB8fCB1c2VyKS50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpsb2dnZWRJbicsIHVzZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICAgICAgfSwgMjUwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSByZWRpcmVjdCBkYXRhLlxuICAgICAqL1xuICAgIHNldFJlZGlyZWN0KHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcmVjdCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY3VycmVudCBhdXRoZW50aWNhdGVkIHVzZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHVzZXJcbiAgICAgKi9cbiAgICBzZXRVc2VyKHVzZXI6IG9iamVjdCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICB1c2VyID0gbmV3IFVzZXJNb2RlbCh0aGlzLmF1dGhvcml6YXRpb24sIHVzZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiByZXNvbHZlKHRoaXMuYXV0aFVzZXIgPSB1c2VyKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcmUgYXV0IHRva2VuIGFuZCBicm9hZGNhc3QgYW4gZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHJlc1xuICAgICAqL1xuICAgIHN0b3JlVG9rZW4ocmVzOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHRoaXMudG9rZW4uc2V0KHRoaXMudG9rZW4ucmVhZChyZXMpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVuYXV0aGVudGljYXRlIHRoZSBjdXJyZW50IHVzZXIuXG4gICAgICovXG4gICAgdW5hdXRoZW50aWNhdGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudG9rZW4ucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuc2V0QXV0aGVudGljYXRlZChmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0VXNlcihudWxsKTtcbiAgICAgICAgdGhpcy5hdXRob3JpemF0aW9uLmNsZWFyUG9saWNpZXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnQgYXV0aGVudGljYXRlZCB1c2VyLlxuICAgICAqL1xuICAgIHVzZXIgPSAoKTogYW55ID0+IHRoaXMuYXV0aFVzZXI7XG59XG4iLCJpbXBvcnQgeyBBdXRoZW50aWNhdGlvbiB9IGZyb20gJy4vYXV0aGVudGljYXRpb24nO1xuaW1wb3J0IHsgQXV0aG9yaXphdGlvbiB9IGZyb20gJy4vYXV0aG9yaXphdGlvbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSHR0cCB9IGZyb20gJy4vaHR0cCc7XG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJy4vdG9rZW4nO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL2V2ZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNvY2lhbEF1dGhlbnRpY2F0aW9uIGV4dGVuZHMgQXV0aGVudGljYXRpb24ge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgYXV0aG9yaXphdGlvbjogQXV0aG9yaXphdGlvbixcbiAgICAgICAgcHVibGljIGNvbmZpZzogQ29uZmlnLFxuICAgICAgICBwdWJsaWMgZXZlbnQ6IEV2ZW50LFxuICAgICAgICBwdWJsaWMgaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgcHVibGljIGh0dHBTZXJ2aWNlOiBIdHRwLFxuICAgICAgICBwdWJsaWMgdG9rZW46IFRva2VuXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGF1dGhvcml6YXRpb24sIGNvbmZpZywgZXZlbnQsIGh0dHAsIGh0dHBTZXJ2aWNlLCB0b2tlbik7XG5cbiAgICAgICAgLy9cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dpbiB3aXRoIGEgc29jaWFsIHByb3ZpZGVyLlxuICAgICAqL1xuICAgIC8vIGxvZ2luKHByb3ZpZGVyOiBzdHJpbmcsIG9wdGlvbnM/OiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIC8vICAgICByZXR1cm4gbmV3IFByb21pc2UoKCkgPT4ge1xuICAgIC8vICAgICAgICAgLy8gdGhpcy5oYW5kbGVMb2dpblN1Y2Nlc3MocmVzKS50aGVuKChyZXMpID0+IHtcbiAgICAvLyAgICAgICAgIC8vICAgICB0aGlzLm9uTG9naW4ocmVzKS50aGVuKCgpID0+IHJlc29sdmUocmVzKSk7XG4gICAgLy8gICAgICAgICAvLyB9LCAoZXJyb3IpID0+IHJlamVjdCh0aGlzLmhhbmRsZUxvZ2luRXJyb3IoZXJyb3IpKSlcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIHN1Y2Nlc2Z1bCBGYWNlYm9vayBsb2dpbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgcmVzXG4gICAgICovXG4gICAgaGFuZGxlTG9naW5TdWNjZXNzKHJlczogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmVTb2NpYWxDcmVkZW50aWFscyhyZXMpO1xuXG4gICAgICAgICAgICB0aGlzLmh0dHAucG9zdChcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5nZXQoJ2F1dGhlbnRpY2F0aW9uLmVuZHBvaW50cy5zb2NpYWxBdXRoJyksXG4gICAgICAgICAgICAgICAgcmVzXG4gICAgICAgICAgICApLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25Mb2dpbihyZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICAgICAgICAgICAgfSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIGVycm9ycyBvbiBmYWNlYm9vayBsb2dpbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgZXJyb3JcbiAgICAgKi9cbiAgICBoYW5kbGVMb2dpbkVycm9yID0gKGVycm9yOiBvYmplY3QpID0+IGNvbnNvbGUubG9nKGVycm9yKTtcblxuICAgIC8qKlxuICAgICAqIFN0b3JlIHNvY2lhbCBhdXRoIGNyZWRuZXRpYWxzLlxuICAgICAqXG4gICAgICogQHBhcmFtICByZXNcbiAgICAgKi9cbiAgICBzdG9yZVNvY2lhbENyZWRlbnRpYWxzKHJlczogYW55KTogdm9pZCB7XG4gICAgICAgIGlmIChyZXMubmV0d29yayA9PSAnZmFjZWJvb2snKSB7XG4gICAgICAgICAgICB0aGlzLnRva2VuLnNldChcbiAgICAgICAgICAgICAgICByZXMuYXV0aFJlc3BvbnNlLmFjY2Vzc1Rva2VuLFxuICAgICAgICAgICAgICAgICdmYWNlYm9va19hY2Nlc3NfdG9rZW4nXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWNoZUl0ZW1Nb2RlbCB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4vLi4vY29uZmlnJztcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSAnLi9ldmVudCc7XG5cbmludGVyZmFjZSBDYWNoZUludGVyZmFjZSB7XG4gICAgW2tleTogc3RyaW5nXTogQ2FjaGVJdGVtTW9kZWw7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYWNoZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIGNhY2hlIGluc3RhbmNlLlxuICAgICAqL1xuICAgIGNhY2hlTmFtZTogc3RyaW5nID0gJ25na2l0X2NhY2hlJztcblxuICAgIC8qKlxuICAgICAqIEluIG1lbW9yeSBjb2xsZWN0aW9uIG9mIGNhY2hlLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2NhY2hlOiBDYWNoZUludGVyZmFjZSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3IuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY29uZmlnOiBDb25maWcsXG4gICAgICAgIHByaXZhdGUgZXZlbnQ6IEV2ZW50LFxuICAgICAgICBwcml2YXRlIHN0b3JhZ2U6IFN0b3JhZ2VcbiAgICApIHtcbiAgICAgICAgdGhpcy5yZXRyaWV2ZUNhY2hlKCk7XG5cbiAgICAgICAgdGhpcy5zdWJzWydhdXRoOmxvZ2dlZE91dCddID0gdGhpcy5ldmVudC5saXN0ZW4oJ2F1dGg6bG9nZ2VkT3V0JylcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlID0ge307XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHN1YnNjaXB0aW9ucyBvZiB0aGUgc2VydmljZS5cbiAgICAgKi9cbiAgICBzdWJzOiBhbnkgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIE9uIHNlcnZpY2UgZGVzdHJveS5cbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5zdWJzKS5mb3JFYWNoKGsgPT4gdGhpcy5zdWJzW2tdLnVuc3Vic2NyaWJlKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlIHRoZSBzdG9yZWQgY2FjaGUuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHJldHJpZXZlQ2FjaGUoKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5nZXQodGhpcy5jYWNoZU5hbWUpLnRoZW4oY2FjaGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjYWNoZSkge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjYWNoZSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVbaXRlbV0gPSBuZXcgQ2FjaGVJdGVtTW9kZWwoY2FjaGVbaXRlbV0pXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGUgPSBjYWNoZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlID0gdGhpcy5zdG9yZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5jYWNoZSk7XG4gICAgICAgICAgICB9LCBlcnIgPT4gcmVqZWN0KGVycikpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTYXZlIHRoZSBjYWNoZSB0byBzdG9yYWdlLlxuICAgICAqXG4gICAgICogQHBhcmFtICBrZXlcbiAgICAgKiBAcGFyYW0gIHZhbHVlXG4gICAgICovXG4gICAgc3RvcmUoKTogYW55IHtcbiAgICAgICAgdGhpcy5zdG9yYWdlLnNldCh0aGlzLmNhY2hlTmFtZSwgdGhpcy5fY2FjaGUpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBY2Nlc3NvciB0byB0aGUgaW4gbWVtZW9yeSBjYWNoZS5cbiAgICAgKi9cbiAgICBnZXQgY2FjaGUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE11dGF0b3IgdG8gdGhlIGluIG1lbWVvcnkgY2FjaGUuXG4gICAgICpcbiAgICAgKi9cbiAgICBzZXQgY2FjaGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fY2FjaGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYW4gaXRlbSBmcm9tIGNhY2hlLlxuICAgICAqXG4gICAgICogQHBhcmFtICAga2V5XG4gICAgICogQHBhcmFtICBkZWZhdXRWYWx1ZVxuICAgICAqL1xuICAgIGdldChrZXk6IHN0cmluZywgZGVmYXV0VmFsdWU6IGFueSA9IG51bGwpOiBhbnkge1xuICAgICAgICBpZiAodGhpcy5jYWNoZVtrZXldICYmICF0aGlzLmNhY2hlW2tleV0uaXNFeHBpcmVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlW2tleV0udmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZGVmYXV0VmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWZhdXRWYWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGtleSk7XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGFuIGl0ZW0gdG8gY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleVxuICAgICAqIEBwYXJhbSAgdmFsdWVcbiAgICAgKiBAcGFyYW0gIGV4cGlyZXNcbiAgICAgKi9cbiAgICBzZXQoXG4gICAgICAgIGtleTogc3RyaW5nLFxuICAgICAgICB2YWx1ZTogYW55LFxuICAgICAgICBleHBpcmVzOiBudW1iZXIgPSB0aGlzLmNvbmZpZy5nZXQoJ2NhY2hlLmV4cGlyZXMnKVxuICAgICk6IHZvaWQge1xuICAgICAgICBsZXQgY2FjaGVJdGVtID0gbmV3IENhY2hlSXRlbU1vZGVsKHsgdmFsdWU6IHZhbHVlLCBleHBpcmVzOiBleHBpcmVzIH0pO1xuXG4gICAgICAgIHRoaXMuX2NhY2hlW2tleV0gPSBjYWNoZUl0ZW07XG5cbiAgICAgICAgdGhpcy5zdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbiBpdGVtIGZyb20gY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICovXG4gICAgcmVtb3ZlKGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmNhY2hlW2tleV07XG4gICAgICAgIHRoaXMuc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGVhciB0aGUgY2FjaGUuXG4gICAgICovXG4gICAgY2xlYXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUodGhpcy5jYWNoZU5hbWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbiBpdGVtIGZyb20gY2FjaGUgYW5kIHJlbW92ZSBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5XG4gICAgICovXG4gICAgcHVsbChrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0KGtleSk7XG4gICAgICAgIHRoaXMucmVtb3ZlKGtleSk7XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGNhY2hlIGhhcyBhbiBpdGVtLlxuICAgICAqXG4gICAgICogQHBhcmFtICBrZXlcbiAgICAgKi9cbiAgICBoYXMoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KGtleSkgIT09IG51bGwgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIENhbkFjdGl2YXRlLCBDYW5BY3RpdmF0ZUNoaWxkLCBSb3V0ZXJTdGF0ZVNuYXBzaG90XG59IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvbiB9IGZyb20gJy4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24nO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2V2ZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dGhHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlLCBDYW5BY3RpdmF0ZUNoaWxkLCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgYXV0aFxuICAgICAqIEBwYXJhbSAgZXZlbnRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGF1dGg6IEF1dGhlbnRpY2F0aW9uLFxuICAgICAgICBwdWJsaWMgZXZlbnQ6IEV2ZW50XG4gICAgKSB7IH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzdWJzY2lwdGlvbnMgb2YgdGhlIHNlcnZpY2UuXG4gICAgICovXG4gICAgc3ViczogYW55ID0ge307XG5cbiAgICAvKipcbiAgICAgKiBPbiBzZXJ2aWNlIGRlc3Ryb3kuXG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuc3VicykuZm9yRWFjaChrID0+IHRoaXMuc3Vic1trXS51bnN1YnNjcmliZSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgaWYgdGhlIHVzZXIgY2FuIGFjdGl2YXRlIGEgcm91dGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcm91dGVcbiAgICAgKiBAcGFyYW0gc3RhdGVcbiAgICAgKi9cbiAgICBjYW5BY3RpdmF0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3VhcmQocm91dGUsIHN0YXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgaWYgdGhlIHVzZXIgY2FuIGFjdGl2YXRlIGNoaWxkcmVuIG9mIGEgcm91dGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHJvdXRlXG4gICAgICogQHBhcmFtICBzdGF0ZSAgICAgKlxuICAgICAqL1xuICAgIGNhbkFjdGl2YXRlQ2hpbGQocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmd1YXJkKHJvdXRlLCBzdGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIG1ldGhvZCB0byBhcHBseSB0byBndWFyZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByb3V0ZVxuICAgICAqIEBwYXJhbSBzdGF0ZVxuICAgICAqL1xuICAgIGd1YXJkKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByb3V0ZTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dGgudXNlcigpKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJzWydhdXRoOmNoZWNrJ10gPSB0aGlzLmF1dGguY2hlY2soKS5zdWJzY3JpYmUoY2hlY2sgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDptb2RhbCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRoLnNldFJlZGlyZWN0KHN0YXRlLnVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkFjdGl2YXRlLCBDYW5BY3RpdmF0ZUNoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbic7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJy4vLi4vc2VydmljZXMvZXZlbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aFJlc29sdmVHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlLCBDYW5BY3RpdmF0ZUNoaWxkLCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgYXV0aFxuICAgICAqIEBwYXJhbSAgZXZlbnRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGF1dGg6IEF1dGhlbnRpY2F0aW9uLFxuICAgICAgICBwdWJsaWMgZXZlbnQ6IEV2ZW50XG4gICAgKSB7IH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzdWJzY2lwdGlvbnMgb2YgdGhlIHNlcnZpY2UuXG4gICAgICovXG4gICAgc3ViczogYW55ID0ge307XG5cbiAgICAvKipcbiAgICAgKiBPbiBzZXJ2aWNlIGRlc3Ryb3kuXG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuc3VicykuZm9yRWFjaChrID0+IHRoaXMuc3Vic1trXS51bnN1YnNjcmliZSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgaWYgdGhlIHVzZXIgY2FuIGFjdGl2YXRlIGEgcm91dGUuXG4gICAgICovXG4gICAgY2FuQWN0aXZhdGUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmd1YXJkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lIGlmIHRoZSB1c2VyIGNhbiBhY3RpdmF0ZSBjaGlsZHJlbiBvZiBhIHJvdXRlLlxuICAgICAqL1xuICAgIGNhbkFjdGl2YXRlQ2hpbGQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmd1YXJkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIG1ldGhvZCB0byBhcHBseSB0byBndWFyZC5cbiAgICAgKi9cbiAgICBndWFyZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRoLnVzZXIoKSkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3Vic1snYXV0aDpjaGVjayddID0gdGhpcy5hdXRoLmNoZWNrKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cCB9IGZyb20gJy4vaHR0cCc7XG5pbXBvcnQge1xuICAgIEh0dHBFdmVudCwgSHR0cEhhbmRsZXIsIEh0dHBJbnRlcmNlcHRvciBhcyBJbnRlcmNlcHRvciwgSHR0cFJlcXVlc3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSHR0cEludGVyY2VwdG9yIGltcGxlbWVudHMgSW50ZXJjZXB0b3Ige1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgaW50ZXJjZXB0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGh0dHBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGh0dHA6IEh0dHBcbiAgICApIHsgfVxuXG4gICAgLyoqXG4gICAgICogSW50ZXJjZXB0IHRoZSBodHRwIHJlcXVlc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHJlcVxuICAgICAqIEBwYXJhbSAgbmV4dFxuICAgICAqL1xuICAgIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgICAgICByZXEgPSByZXEuY2xvbmUoe1xuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5odHRwLmhlYWRlcnMsXG4gICAgICAgICAgICB1cmw6IHRoaXMuaHR0cC5nZXRVcmwocmVxLnVybClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cCB9IGZyb20gJy4vaHR0cCc7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJy4vZXZlbnQnO1xuaW1wb3J0IHtcbiAgICBIdHRwRXZlbnQsIEh0dHBJbnRlcmNlcHRvciwgSHR0cEhhbmRsZXIsIEh0dHBSZXF1ZXN0LCBIdHRwRXJyb3JSZXNwb25zZVxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgaW50ZXJjZXB0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGh0dHBcbiAgICAgKiBAcGFyYW0gIGV2ZW50XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBodHRwOiBIdHRwLFxuICAgICAgICBwdWJsaWMgZXZlbnQ6IEV2ZW50LFxuICAgICkgeyB9XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcmNlcHQgdGhlIGh0dHAgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgcmVxXG4gICAgICogQHBhcmFtICBuZXh0XG4gICAgICovXG4gICAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpLnBpcGUodGFwKCgpID0+IHsgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnQuYnJvYWRjYXN0KCdhdXRoOnJlcXVpcmVkJywgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7XG4gICAgQXV0aGVudGljYXRpb24sIEF1dGhvcml6YXRpb24sIEV2ZW50LCBIdHRwLCBTb2NpYWxBdXRoZW50aWNhdGlvbixcbiAgICBTdG9yYWdlLCBUb2tlbiwgQ2FjaGVcbn0gZnJvbSAnLi9zZXJ2aWNlcy9pbmRleCc7XG5pbXBvcnQgeyBBdXRoR3VhcmQsIEF1dGhSZXNvbHZlR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9pbmRleCc7XG5pbXBvcnQgeyBIVFRQX0lOVEVSQ0VQVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEh0dHBJbnRlcmNlcHRvciB9IGZyb20gJy4vc2VydmljZXMvaHR0cC1pbnRlcmNlcHRvcic7XG5pbXBvcnQgeyBBdXRoSW50ZXJjZXB0b3IgfSBmcm9tICcuL3NlcnZpY2VzL2h0dHAtYXV0aC1pbnRlcmNlcHRvcic7XG5cbi8qKlxuICogbmdLaXQgU2VydmljZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBOR0tJVF9QUk9WSURFUlM6IGFueVtdID0gW1xuICAgIEF1dGhlbnRpY2F0aW9uLFxuICAgIEF1dGhHdWFyZCxcbiAgICBBdXRoUmVzb2x2ZUd1YXJkLFxuICAgIFNvY2lhbEF1dGhlbnRpY2F0aW9uLFxuICAgIEF1dGhvcml6YXRpb24sXG4gICAgQ29uZmlnLFxuICAgIFN0b3JhZ2UsXG4gICAgQ2FjaGUsXG4gICAgRXZlbnQsXG4gICAgSHR0cCxcbiAgICBUb2tlbixcbiAgICB7XG4gICAgICAgIHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLFxuICAgICAgICB1c2VDbGFzczogSHR0cEludGVyY2VwdG9yLFxuICAgICAgICBtdWx0aTogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUyxcbiAgICAgICAgdXNlQ2xhc3M6IEF1dGhJbnRlcmNlcHRvcixcbiAgICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG5dO1xuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBOR0tJVF9QUk9WSURFUlMgfSBmcm9tICcuL3Byb3ZpZGVycyc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0h0dHBDbGllbnRNb2R1bGVdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICAuLi5OR0tJVF9QUk9WSURFUlMsXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBuZ0tpdE1vZHVsZSB7XG4gICAgLyoqXG4gICAgICogbmdLaXQgbW9kdWxlIGluaXRpYWxpemVyLlxuICAgICAqXG4gICAgICogQHBhcmFtICBvcHRpb25zXG4gICAgICovXG4gICAgc3RhdGljIGZvclJvb3Qob3B0aW9uczogYW55KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogbmdLaXRNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6ICduZ0tpdE9wdGlvbnMnLCB1c2VWYWx1ZTogb3B0aW9ucyB9LFxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIl8uc2V0IiwiXy5tZXJnZSIsImxvY2FsRm9yYWdlLmNyZWF0ZUluc3RhbmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7SUFnSEksWUFBNEMsUUFBYTtRQUFiLGFBQVEsR0FBUixRQUFRLENBQUs7UUFDckQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2xDOzs7OztJQUtELFVBQVUsS0FBVSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTs7Ozs7Ozs7SUFRMUMsR0FBRyxDQUFDLEdBQVcsRUFBRSxXQUFnQixLQUFLO1FBQ2xDLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUE7S0FDdkM7Ozs7Ozs7O0lBUUQsT0FBTyxPQUFPLENBQUMsR0FBVyxFQUFFLFFBQWM7UUFDdEMsSUFBSSxRQUFRLEVBQUU7WUFDVixPQUFPLFFBQVEsQ0FBQztT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