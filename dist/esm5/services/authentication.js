/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { HttpClient } from '@angular/common/http';
import { Http } from './http';
import { Authorization } from './authorization';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/index';
import { Config } from './../config';
import { Token } from './token';
import { Event } from './event';
import { Observable } from 'rxjs';
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
            ;
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
export { Authentication };
function Authentication_tsickle_Closure_declarations() {
    /**
     * Authorized user.
     * @type {?}
     */
    Authentication.prototype.authUser;
    /**
     * State of the user authentication.
     * @type {?}
     */
    Authentication.prototype.authenticated;
    /**
     * Event channels.
     * @type {?}
     */
    Authentication.prototype.channels;
    /**
     * The redirect data on the service.
     * @type {?}
     */
    Authentication.prototype.redirect;
    /**
     * The subsciptions of the service.
     * @type {?}
     */
    Authentication.prototype.subs;
    /**
     * The timeouts of the component.
     * @type {?}
     */
    Authentication.prototype.timeouts;
    /**
     * Get the current authenticated user.
     * @type {?}
     */
    Authentication.prototype.user;
    /** @type {?} */
    Authentication.prototype.authorization;
    /** @type {?} */
    Authentication.prototype.config;
    /** @type {?} */
    Authentication.prototype.event;
    /** @type {?} */
    Authentication.prototype.http;
    /** @type {?} */
    Authentication.prototype.httpService;
    /** @type {?} */
    Authentication.prototype.token;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ2tpdC8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM5QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDNUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNyQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQzs7SUFJeEM7Ozs7Ozs7OztPQVNHO0lBQ0gsd0JBQ1csZUFDQSxRQUNBLE9BQ0EsTUFDQSxhQUNBO1FBTlgsaUJBVUM7UUFUVSxrQkFBYSxHQUFiLGFBQWE7UUFDYixXQUFNLEdBQU4sTUFBTTtRQUNOLFVBQUssR0FBTCxLQUFLO1FBQ0wsU0FBSSxHQUFKLElBQUk7UUFDSixnQkFBVyxHQUFYLFdBQVc7UUFDWCxVQUFLLEdBQUwsS0FBSzs7Ozt3QkFTQSxJQUFJOzs7O3dCQVVXO1lBQzNCLFlBQVk7WUFDWixlQUFlO1lBQ2YsZUFBZTtZQUNmLGFBQWE7WUFDYixpQkFBaUI7WUFDakIsZ0JBQWdCO1lBQ2hCLGVBQWU7WUFDZixZQUFZO1lBQ1osY0FBYztZQUNkLGlCQUFpQjtTQUNwQjs7Ozt3QkFLdUIsSUFBSTs7OztvQkFLaEIsRUFBRTs7Ozt3QkFLRSxFQUFFOzs7O29CQXlUWCxjQUFXLE9BQUEs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QUUsSUFBSSxDQUFDLENBQUM7U0FDbEQ7UUFFRCxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLElBQUssT0FBQSxPQUFPLENBQUMsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDO0tBQ2xFO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILG1DQUFVOzs7Ozs7SUFBVixVQUFXLEdBQVE7UUFBbkIsaUJBTUM7UUFMRyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPO1lBQ3ZCLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDaEIsRUFBRSxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQXBCLENBQW9CLENBQUMsQ0FBQztTQUNyQyxDQUFDLENBQUM7S0FDTjtJQUVEOztPQUVHOzs7OztJQUNILHVDQUFjOzs7O0lBQWQ7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDdEM7O2dCQW5YSixVQUFVOzs7O2dCQVJGLGFBQWE7Z0JBR2IsTUFBTTtnQkFFTixLQUFLO2dCQVBMLFVBQVU7Z0JBQ1YsSUFBSTtnQkFLSixLQUFLOzt5QkFOZDs7U0FXYSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEh0dHAgfSBmcm9tICcuL2h0dHAnO1xuaW1wb3J0IHsgQXV0aG9yaXphdGlvbiB9IGZyb20gJy4vYXV0aG9yaXphdGlvbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJy4vdG9rZW4nO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL2V2ZW50JztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoZW50aWNhdGlvbiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBzZXJ2aWNlLlxuICAgICAqXG4gICAgICogQHBhcmFtICBhdXRob3JpemF0aW9uXG4gICAgICogQHBhcmFtICBjb25maWdcbiAgICAgKiBAcGFyYW0gIGV2ZW50XG4gICAgICogQHBhcmFtICBodHRwXG4gICAgICogQHBhcmFtICBodHRwU2VydmljZVxuICAgICAqIEBwYXJhbSAgdG9rZW5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGF1dGhvcml6YXRpb246IEF1dGhvcml6YXRpb24sXG4gICAgICAgIHB1YmxpYyBjb25maWc6IENvbmZpZyxcbiAgICAgICAgcHVibGljIGV2ZW50OiBFdmVudCxcbiAgICAgICAgcHVibGljIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgIHB1YmxpYyBodHRwU2VydmljZTogSHR0cCxcbiAgICAgICAgcHVibGljIHRva2VuOiBUb2tlblxuICAgICkge1xuICAgICAgICB0aGlzLmV2ZW50LnNldENoYW5uZWxzKHRoaXMuY2hhbm5lbHMpO1xuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXV0aG9yaXplZCB1c2VyLlxuICAgICAqL1xuICAgIGF1dGhVc2VyOiBhbnkgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogU3RhdGUgb2YgdGhlIHVzZXIgYXV0aGVudGljYXRpb24uXG4gICAgICovXG4gICAgYXV0aGVudGljYXRlZDogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGNoYW5uZWxzLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBjaGFubmVsczogc3RyaW5nW10gPSBbXG4gICAgICAgICdhdXRoOmxvZ2luJyxcbiAgICAgICAgJ2F1dGg6bG9nZ2luSW4nLFxuICAgICAgICAnYXV0aDpsb2dnZWRJbicsXG4gICAgICAgICdhdXRoOmxvZ291dCcsXG4gICAgICAgICdhdXRoOmxvZ2dpbmdPdXQnLFxuICAgICAgICAnYXV0aDpsb2dnZWRPdXQnLFxuICAgICAgICAnYXV0aDpyZXF1aXJlZCcsXG4gICAgICAgICdhdXRoOmNoZWNrJyxcbiAgICAgICAgJ2F1dGg6Z3VhcmRlZCcsXG4gICAgICAgICdhdXRoOnJlZ2lzdGVyZWQnLFxuICAgIF07XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcmVkaXJlY3QgZGF0YSBvbiB0aGUgc2VydmljZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHJlZGlyZWN0OiBhbnkgPSBudWxsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgc3Vic2NpcHRpb25zIG9mIHRoZSBzZXJ2aWNlLlxuICAgICAqL1xuICAgIHN1YnM6IGFueSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRpbWVvdXRzIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICovXG4gICAgdGltZW91dHM6IGFueSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogT24gc2VydmljZSBkZXN0cm95LlxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnN1YnMpLmZvckVhY2goayA9PiB0aGlzLnN1YnNba10udW5zdWJzY3JpYmUoKSk7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMudGltZW91dHMpLmZvckVhY2goayA9PiBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0c1trXSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHVzZXIgaXMgbG9nZ2VkIGluLlxuICAgICAqXG4gICAgICogQHBhcmFtICBmb3JjZVxuICAgICAqL1xuICAgIGNoZWNrKGZvcmNlOiBib29sZWFuID0gZmFsc2UpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgbGV0IGVuZHBvaW50ID0gdGhpcy5jb25maWcuZ2V0KCdhdXRoZW50aWNhdGlvbi5lbmRwb2ludHMuY2hlY2snKTtcblxuICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpjaGVjaycpO1xuXG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnNlcnZlciA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRoZW50aWNhdGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tSZXNvbHZlKG9ic2VydmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXV0aGVudGljYXRlZCA9PT0gdHJ1ZSAmJiAhZm9yY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpsb2dnZWRJbicsIHRoaXMudXNlcigpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrUmVzb2x2ZShvYnNlcnZlciwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaHR0cFNlcnZpY2UudG9rZW5IZWFkZXIoKS50aGVuKCh0b2tlbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VXNlcihlbmRwb2ludCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdXRoZW50aWNhdGVkKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VXNlcihyZXMuZGF0YSB8fCByZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnQuYnJvYWRjYXN0KCdhdXRoOmxvZ2dlZEluJywgdGhpcy51c2VyKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tSZXNvbHZlKG9ic2VydmVyLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF1dGhlbnRpY2F0ZWQoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnQuYnJvYWRjYXN0KCdhdXRoOnJlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1Jlc29sdmUob2JzZXJ2ZXIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdXRoZW50aWNhdGVkKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tSZXNvbHZlKG9ic2VydmVyLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBlcnIgPT4gb2JzZXJ2ZXIuZXJyb3IoZXJyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc29sdmUgdGhlIGF1dGggY2hlY2suXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb2JzZXJ2ZXJcbiAgICAgKiBAcGFyYW0gYXV0aGVudGljYXRlZFxuICAgICAqL1xuICAgIGNoZWNrUmVzb2x2ZShvYnNlcnZlcjogT2JzZXJ2ZXI8Ym9vbGVhbj4sIGF1dGhlbnRpY2F0ZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ldmVudC5icm9hZGNhc3QoJ2F1dGg6Y2hlY2snLCBhdXRoZW50aWNhdGVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGltZW91dHNbJ2NoZWNrUmVzb2x2ZSddID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChhdXRoZW50aWNhdGVkKTtcbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzZXJ2aWNlIGV2ZW50IGxpc3RlbmVycy5cbiAgICAgKi9cbiAgICBldmVudExpc3RlbmVycygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdWJzWydhdXRoOmxvZ2dlZEluJ10gPSB0aGlzLmV2ZW50Lmxpc3RlbignYXV0aDpsb2dnZWRJbicpLnN1YnNjcmliZSgodXNlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRBdXRoZW50aWNhdGVkKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5zZXRVc2VyKHVzZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgZm9yZ290IHBhc3N3b3JkIHJlcXVlc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGNyZWRlbnRpYWxzXG4gICAgICogQHBhcmFtICBlbmRwb2ludFxuICAgICAqIEBwYXJhbSAgaGVhZGVyc1xuICAgICAqL1xuICAgIGZvcmdvdFBhc3N3b3JkKGRhdGE6IGFueSwgZW5kcG9pbnQ6IHN0cmluZyA9ICcnLCBoZWFkZXJzID0ge30pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBlbmRwb2ludCA9IHRoaXMuY29uZmlnLmdldChcbiAgICAgICAgICAgICdhdXRoZW50aWNhdGlvbi5lbmRwb2ludHMuZm9yZ290UGFzc3dvcmQnLCBlbmRwb2ludFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoZW5kcG9pbnQsIGRhdGEsIGhlYWRlcnMpLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlc29sdmUocmVzKSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHJlZGlyZWN0IGRhdGEuXG4gICAgICovXG4gICAgZ2V0UmVkaXJlY3QoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXJlY3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi5cbiAgICAgKi9cbiAgICBnZXRUb2tlbigpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50b2tlbi5nZXQoKS50aGVuKHRva2VuID0+IHJlc29sdmUodG9rZW4pLCBlcnIgPT4gcmVqZWN0KGVycikpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnQgYXV0aGVudGljYXRlZCB1c2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtICBlbmRwb2ludFxuICAgICAqL1xuICAgIGdldFVzZXIoZW5kcG9pbnQ6IHN0cmluZyA9ICcnKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgZW5kcG9pbnQgPSB0aGlzLmNvbmZpZy5nZXQoJ2F1dGhlbnRpY2F0aW9uLmVuZHBvaW50cy5nZXRVc2VyJywgZW5kcG9pbnQpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGVuZHBvaW50KS50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHZhbHVlIGF1dGhlbnRpY2F0ZWQgdmFsdWUuXG4gICAgICovXG4gICAgZ2V0QXV0aGVudGljYXRlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aGVudGljYXRlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgaWYgYXV0aGVudGljYXRlZCB2YWx1ZS5cbiAgICAgKi9cbiAgICBzZXRBdXRoZW50aWNhdGVkKHZhbHVlOiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhlbnRpY2F0ZWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgbG9naW4gcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgY3JlZGVudGlhbHNcbiAgICAgKiBAcGFyYW0gIGVuZHBvaW50XG4gICAgICogQHBhcmFtICBoZWFkZXJzXG4gICAgICovXG4gICAgbG9naW4oY3JlZGVudGlhbHM6IGFueSwgZW5kcG9pbnQ6IHN0cmluZyA9ICcnLCBoZWFkZXJzID0ge30pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBlbmRwb2ludCA9IHRoaXMuY29uZmlnLmdldCgnYXV0aGVudGljYXRpb24uZW5kcG9pbnRzLmxvZ2luJywgZW5kcG9pbnQpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmh0dHAucG9zdChlbmRwb2ludCwgY3JlZGVudGlhbHMsIGhlYWRlcnMpLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkxvZ2luKHJlcykudGhlbigoKSA9PiByZXNvbHZlKHJlcyksIGVycm9yID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgcmVxdWVzdCB0byBsb2cgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlciBvdXQuXG4gICAgICovXG4gICAgbG9nb3V0KGVuZHBvaW50OiBzdHJpbmcgPSAnJywgaGVhZGVycyA9IHt9KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnQuYnJvYWRjYXN0KCdhdXRoOmxvZ2dpbmdPdXQnKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBlbmRwb2ludCA9IHRoaXMuY29uZmlnLmdldCgnYXV0aGVudGljYXRpb24uZW5kcG9pbnRzLmxvZ291dCcsIGVuZHBvaW50KTtcblxuICAgICAgICAgICAgICAgIGlmIChlbmRwb2ludCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmh0dHAucG9zdChlbmRwb2ludCwge30sIGhlYWRlcnMpLnRvUHJvbWlzZSgpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Mb2dvdXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKVxuICAgICAgICAgICAgICAgICAgICB9LCBlcnJvciA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTG9nb3V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWN0aW9ucyB0byBwZXJmb3JtIG9uIGxvZ2luLlxuICAgICAqXG4gICAgICogQHBhcmFtICByZXNcbiAgICAgKi9cbiAgICBvbkxvZ2luKHJlczogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmVUb2tlbihyZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnQuYnJvYWRjYXN0KCdhdXRoOmxvZ2dpbmdJbicsIHJlcykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzb2x2ZVVzZXIoKS50aGVuKCgpID0+IHJlc29sdmUoKSwgZXJyID0+IHJlamVjdChlcnIpKTtcbiAgICAgICAgICAgICAgICB9LCBlcnIgPT4gcmVqZWN0KGVycikpO1xuICAgICAgICAgICAgfSwgZXJyID0+IHJlamVjdChlcnIpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWN0aW9ucyB0byBwZXJmb3JtIG9uIGxvZ291dC5cbiAgICAgKi9cbiAgICBvbkxvZ291dCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51bmF1dGhlbnRpY2F0ZSgpO1xuICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpsb2dnZWRPdXQnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuZCBjbGVhcnMgdGhlIHJlZGlyZWN0IGRhdGEuXG4gICAgICovXG4gICAgcHVsbFJlZGlyZWN0KCk6IGFueSB7XG4gICAgICAgIGxldCByZWRpcmVjdCA9IHRoaXMucmVkaXJlY3Q7XG5cbiAgICAgICAgdGhpcy5yZWRpcmVjdCA9IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIHJlZGlyZWN0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmQgYSByZWdpc3RlciByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtICBkYXRhXG4gICAgICogQHBhcmFtICAgZW5kcG9pbnRcbiAgICAgKiBAcGFyYW0gIGhlYWRlcnNcbiAgICAgKiBAcGFyYW0gcG9zdFJlZ2lzdGVyTG9naW5cbiAgICAgKi9cbiAgICByZWdpc3RlcihkYXRhOiBvYmplY3QsIGVuZHBvaW50OiBzdHJpbmcgPSAnJywgaGVhZGVycyA9IHt9LCBwb3N0UmVnaXN0ZXJMb2dpbjogYm9vbGVhbiA9IGZhbHNlKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgZW5kcG9pbnQgPSB0aGlzLmNvbmZpZy5nZXQoJ2F1dGhlbnRpY2F0aW9uLmVuZHBvaW50cy5yZWdpc3RlcicsIGVuZHBvaW50KTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaHR0cC5wb3N0KGVuZHBvaW50LCBkYXRhLCBoZWFkZXJzKS50b1Byb21pc2UoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHBvc3RSZWdpc3RlckxvZ2luKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Mb2dpbihyZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpyZWdpc3RlcmVkJywgcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudC5icm9hZGNhc3QoJ2F1dGg6cmVnaXN0ZXJlZCcsIHJlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgcmVzZXQgcGFzc3dvcmQgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgIGNyZWRlbnRpYWxzXG4gICAgICogQHBhcmFtICAgZW5kcG9pbnRcbiAgICAgKiBAcGFyYW0gIGhlYWRlcnNcbiAgICAgKi9cbiAgICByZXNldFBhc3N3b3JkKGRhdGE6IGFueSwgZW5kcG9pbnQ6IHN0cmluZyA9ICcnLCBoZWFkZXJzID0ge30pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBlbmRwb2ludCA9IHRoaXMuY29uZmlnLmdldChcbiAgICAgICAgICAgICdhdXRoZW50aWNhdGlvbi5lbmRwb2ludHMucmVzZXRQYXNzd29yZCcsIGVuZHBvaW50XG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaHR0cC5wb3N0KGVuZHBvaW50LCBkYXRhLCBoZWFkZXJzKS50b1Byb21pc2UoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkxvZ2luKHJlcykudGhlbigoKSA9PiByZXNvbHZlKHJlcykpXG4gICAgICAgICAgICB9LCBlcnJvciA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzb2x2ZSB0aGUgYXV0aGVudGljYXRlZCB1c2VyLlxuICAgICAqL1xuICAgIHJlc29sdmVVc2VyKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRpbWVvdXRzWydyZXNvbHZlVXNlciddID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRVc2VyKCkudGhlbigodXNlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF1dGhlbnRpY2F0ZWQodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRVc2VyKHVzZXIuZGF0YSB8fCB1c2VyKS50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpsb2dnZWRJbicsIHVzZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICAgICAgfSwgMjUwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSByZWRpcmVjdCBkYXRhLlxuICAgICAqL1xuICAgIHNldFJlZGlyZWN0KHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcmVjdCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY3VycmVudCBhdXRoZW50aWNhdGVkIHVzZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHVzZXJcbiAgICAgKi9cbiAgICBzZXRVc2VyKHVzZXI6IG9iamVjdCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICB1c2VyID0gbmV3IFVzZXJNb2RlbCh0aGlzLmF1dGhvcml6YXRpb24sIHVzZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiByZXNvbHZlKHRoaXMuYXV0aFVzZXIgPSB1c2VyKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcmUgYXV0IHRva2VuIGFuZCBicm9hZGNhc3QgYW4gZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHJlc1xuICAgICAqL1xuICAgIHN0b3JlVG9rZW4ocmVzOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHRoaXMudG9rZW4uc2V0KHRoaXMudG9rZW4ucmVhZChyZXMpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVuYXV0aGVudGljYXRlIHRoZSBjdXJyZW50IHVzZXIuXG4gICAgICovXG4gICAgdW5hdXRoZW50aWNhdGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudG9rZW4ucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuc2V0QXV0aGVudGljYXRlZChmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0VXNlcihudWxsKTtcbiAgICAgICAgdGhpcy5hdXRob3JpemF0aW9uLmNsZWFyUG9saWNpZXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnQgYXV0aGVudGljYXRlZCB1c2VyLlxuICAgICAqL1xuICAgIHVzZXIgPSAoKTogYW55ID0+IHRoaXMuYXV0aFVzZXI7XG59XG4iXX0=