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
export class Authentication {
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
            ;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ2tpdC8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM5QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDNUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNyQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUc1QyxNQUFNOzs7Ozs7Ozs7OztJQVdGLFlBQ1csZUFDQSxRQUNBLE9BQ0EsTUFDQSxhQUNBO1FBTEEsa0JBQWEsR0FBYixhQUFhO1FBQ2IsV0FBTSxHQUFOLE1BQU07UUFDTixVQUFLLEdBQUwsS0FBSztRQUNMLFNBQUksR0FBSixJQUFJO1FBQ0osZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsVUFBSyxHQUFMLEtBQUs7Ozs7d0JBU0EsSUFBSTs7Ozt3QkFVVztZQUMzQixZQUFZO1lBQ1osZUFBZTtZQUNmLGVBQWU7WUFDZixhQUFhO1lBQ2IsaUJBQWlCO1lBQ2pCLGdCQUFnQjtZQUNoQixlQUFlO1lBQ2YsWUFBWTtZQUNaLGNBQWM7WUFDZCxpQkFBaUI7U0FDcEI7Ozs7d0JBS3VCLElBQUk7Ozs7b0JBS2hCLEVBQUU7Ozs7d0JBS0UsRUFBRTs7OztvQkF5VFgsR0FBUSxFQUFFLENBQUMsSUFBSSxD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T0QsT0FBTyxDQUFDLElBQVk7UUFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNQLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2xEO1FBRUQsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQ2xFOzs7Ozs7O0lBT0QsVUFBVSxDQUFDLEdBQVE7UUFDZixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNoQixFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3JDLENBQUMsQ0FBQztLQUNOOzs7OztJQUtELGNBQWM7UUFDVixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDdEM7OztZQW5YSixVQUFVOzs7O1lBUkYsYUFBYTtZQUdiLE1BQU07WUFFTixLQUFLO1lBUEwsVUFBVTtZQUNWLElBQUk7WUFLSixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEh0dHAgfSBmcm9tICcuL2h0dHAnO1xuaW1wb3J0IHsgQXV0aG9yaXphdGlvbiB9IGZyb20gJy4vYXV0aG9yaXphdGlvbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJy4vdG9rZW4nO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL2V2ZW50JztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoZW50aWNhdGlvbiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBzZXJ2aWNlLlxuICAgICAqXG4gICAgICogQHBhcmFtICBhdXRob3JpemF0aW9uXG4gICAgICogQHBhcmFtICBjb25maWdcbiAgICAgKiBAcGFyYW0gIGV2ZW50XG4gICAgICogQHBhcmFtICBodHRwXG4gICAgICogQHBhcmFtICBodHRwU2VydmljZVxuICAgICAqIEBwYXJhbSAgdG9rZW5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGF1dGhvcml6YXRpb246IEF1dGhvcml6YXRpb24sXG4gICAgICAgIHB1YmxpYyBjb25maWc6IENvbmZpZyxcbiAgICAgICAgcHVibGljIGV2ZW50OiBFdmVudCxcbiAgICAgICAgcHVibGljIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgIHB1YmxpYyBodHRwU2VydmljZTogSHR0cCxcbiAgICAgICAgcHVibGljIHRva2VuOiBUb2tlblxuICAgICkge1xuICAgICAgICB0aGlzLmV2ZW50LnNldENoYW5uZWxzKHRoaXMuY2hhbm5lbHMpO1xuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXV0aG9yaXplZCB1c2VyLlxuICAgICAqL1xuICAgIGF1dGhVc2VyOiBhbnkgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogU3RhdGUgb2YgdGhlIHVzZXIgYXV0aGVudGljYXRpb24uXG4gICAgICovXG4gICAgYXV0aGVudGljYXRlZDogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGNoYW5uZWxzLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBjaGFubmVsczogc3RyaW5nW10gPSBbXG4gICAgICAgICdhdXRoOmxvZ2luJyxcbiAgICAgICAgJ2F1dGg6bG9nZ2luSW4nLFxuICAgICAgICAnYXV0aDpsb2dnZWRJbicsXG4gICAgICAgICdhdXRoOmxvZ291dCcsXG4gICAgICAgICdhdXRoOmxvZ2dpbmdPdXQnLFxuICAgICAgICAnYXV0aDpsb2dnZWRPdXQnLFxuICAgICAgICAnYXV0aDpyZXF1aXJlZCcsXG4gICAgICAgICdhdXRoOmNoZWNrJyxcbiAgICAgICAgJ2F1dGg6Z3VhcmRlZCcsXG4gICAgICAgICdhdXRoOnJlZ2lzdGVyZWQnLFxuICAgIF07XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcmVkaXJlY3QgZGF0YSBvbiB0aGUgc2VydmljZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHJlZGlyZWN0OiBhbnkgPSBudWxsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgc3Vic2NpcHRpb25zIG9mIHRoZSBzZXJ2aWNlLlxuICAgICAqL1xuICAgIHN1YnM6IGFueSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRpbWVvdXRzIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICovXG4gICAgdGltZW91dHM6IGFueSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogT24gc2VydmljZSBkZXN0cm95LlxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnN1YnMpLmZvckVhY2goayA9PiB0aGlzLnN1YnNba10udW5zdWJzY3JpYmUoKSk7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMudGltZW91dHMpLmZvckVhY2goayA9PiBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0c1trXSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHVzZXIgaXMgbG9nZ2VkIGluLlxuICAgICAqXG4gICAgICogQHBhcmFtICBmb3JjZVxuICAgICAqL1xuICAgIGNoZWNrKGZvcmNlOiBib29sZWFuID0gZmFsc2UpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgbGV0IGVuZHBvaW50ID0gdGhpcy5jb25maWcuZ2V0KCdhdXRoZW50aWNhdGlvbi5lbmRwb2ludHMuY2hlY2snKTtcblxuICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpjaGVjaycpO1xuXG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnNlcnZlciA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRoZW50aWNhdGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tSZXNvbHZlKG9ic2VydmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXV0aGVudGljYXRlZCA9PT0gdHJ1ZSAmJiAhZm9yY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpsb2dnZWRJbicsIHRoaXMudXNlcigpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrUmVzb2x2ZShvYnNlcnZlciwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaHR0cFNlcnZpY2UudG9rZW5IZWFkZXIoKS50aGVuKCh0b2tlbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VXNlcihlbmRwb2ludCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdXRoZW50aWNhdGVkKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VXNlcihyZXMuZGF0YSB8fCByZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnQuYnJvYWRjYXN0KCdhdXRoOmxvZ2dlZEluJywgdGhpcy51c2VyKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tSZXNvbHZlKG9ic2VydmVyLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF1dGhlbnRpY2F0ZWQoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnQuYnJvYWRjYXN0KCdhdXRoOnJlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1Jlc29sdmUob2JzZXJ2ZXIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdXRoZW50aWNhdGVkKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tSZXNvbHZlKG9ic2VydmVyLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBlcnIgPT4gb2JzZXJ2ZXIuZXJyb3IoZXJyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc29sdmUgdGhlIGF1dGggY2hlY2suXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb2JzZXJ2ZXJcbiAgICAgKiBAcGFyYW0gYXV0aGVudGljYXRlZFxuICAgICAqL1xuICAgIGNoZWNrUmVzb2x2ZShvYnNlcnZlcjogT2JzZXJ2ZXI8Ym9vbGVhbj4sIGF1dGhlbnRpY2F0ZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ldmVudC5icm9hZGNhc3QoJ2F1dGg6Y2hlY2snLCBhdXRoZW50aWNhdGVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGltZW91dHNbJ2NoZWNrUmVzb2x2ZSddID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChhdXRoZW50aWNhdGVkKTtcbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzZXJ2aWNlIGV2ZW50IGxpc3RlbmVycy5cbiAgICAgKi9cbiAgICBldmVudExpc3RlbmVycygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdWJzWydhdXRoOmxvZ2dlZEluJ10gPSB0aGlzLmV2ZW50Lmxpc3RlbignYXV0aDpsb2dnZWRJbicpLnN1YnNjcmliZSgodXNlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRBdXRoZW50aWNhdGVkKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5zZXRVc2VyKHVzZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgZm9yZ290IHBhc3N3b3JkIHJlcXVlc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGNyZWRlbnRpYWxzXG4gICAgICogQHBhcmFtICBlbmRwb2ludFxuICAgICAqIEBwYXJhbSAgaGVhZGVyc1xuICAgICAqL1xuICAgIGZvcmdvdFBhc3N3b3JkKGRhdGE6IGFueSwgZW5kcG9pbnQ6IHN0cmluZyA9ICcnLCBoZWFkZXJzID0ge30pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBlbmRwb2ludCA9IHRoaXMuY29uZmlnLmdldChcbiAgICAgICAgICAgICdhdXRoZW50aWNhdGlvbi5lbmRwb2ludHMuZm9yZ290UGFzc3dvcmQnLCBlbmRwb2ludFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoZW5kcG9pbnQsIGRhdGEsIGhlYWRlcnMpLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlc29sdmUocmVzKSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHJlZGlyZWN0IGRhdGEuXG4gICAgICovXG4gICAgZ2V0UmVkaXJlY3QoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXJlY3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi5cbiAgICAgKi9cbiAgICBnZXRUb2tlbigpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50b2tlbi5nZXQoKS50aGVuKHRva2VuID0+IHJlc29sdmUodG9rZW4pLCBlcnIgPT4gcmVqZWN0KGVycikpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnQgYXV0aGVudGljYXRlZCB1c2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtICBlbmRwb2ludFxuICAgICAqL1xuICAgIGdldFVzZXIoZW5kcG9pbnQ6IHN0cmluZyA9ICcnKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgZW5kcG9pbnQgPSB0aGlzLmNvbmZpZy5nZXQoJ2F1dGhlbnRpY2F0aW9uLmVuZHBvaW50cy5nZXRVc2VyJywgZW5kcG9pbnQpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGVuZHBvaW50KS50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHZhbHVlIGF1dGhlbnRpY2F0ZWQgdmFsdWUuXG4gICAgICovXG4gICAgZ2V0QXV0aGVudGljYXRlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aGVudGljYXRlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgaWYgYXV0aGVudGljYXRlZCB2YWx1ZS5cbiAgICAgKi9cbiAgICBzZXRBdXRoZW50aWNhdGVkKHZhbHVlOiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhlbnRpY2F0ZWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgbG9naW4gcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgY3JlZGVudGlhbHNcbiAgICAgKiBAcGFyYW0gIGVuZHBvaW50XG4gICAgICogQHBhcmFtICBoZWFkZXJzXG4gICAgICovXG4gICAgbG9naW4oY3JlZGVudGlhbHM6IGFueSwgZW5kcG9pbnQ6IHN0cmluZyA9ICcnLCBoZWFkZXJzID0ge30pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBlbmRwb2ludCA9IHRoaXMuY29uZmlnLmdldCgnYXV0aGVudGljYXRpb24uZW5kcG9pbnRzLmxvZ2luJywgZW5kcG9pbnQpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmh0dHAucG9zdChlbmRwb2ludCwgY3JlZGVudGlhbHMsIGhlYWRlcnMpLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkxvZ2luKHJlcykudGhlbigoKSA9PiByZXNvbHZlKHJlcyksIGVycm9yID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgcmVxdWVzdCB0byBsb2cgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlciBvdXQuXG4gICAgICovXG4gICAgbG9nb3V0KGVuZHBvaW50OiBzdHJpbmcgPSAnJywgaGVhZGVycyA9IHt9KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnQuYnJvYWRjYXN0KCdhdXRoOmxvZ2dpbmdPdXQnKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBlbmRwb2ludCA9IHRoaXMuY29uZmlnLmdldCgnYXV0aGVudGljYXRpb24uZW5kcG9pbnRzLmxvZ291dCcsIGVuZHBvaW50KTtcblxuICAgICAgICAgICAgICAgIGlmIChlbmRwb2ludCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmh0dHAucG9zdChlbmRwb2ludCwge30sIGhlYWRlcnMpLnRvUHJvbWlzZSgpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Mb2dvdXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKVxuICAgICAgICAgICAgICAgICAgICB9LCBlcnJvciA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTG9nb3V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWN0aW9ucyB0byBwZXJmb3JtIG9uIGxvZ2luLlxuICAgICAqXG4gICAgICogQHBhcmFtICByZXNcbiAgICAgKi9cbiAgICBvbkxvZ2luKHJlczogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmVUb2tlbihyZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnQuYnJvYWRjYXN0KCdhdXRoOmxvZ2dpbmdJbicsIHJlcykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzb2x2ZVVzZXIoKS50aGVuKCgpID0+IHJlc29sdmUoKSwgZXJyID0+IHJlamVjdChlcnIpKTtcbiAgICAgICAgICAgICAgICB9LCBlcnIgPT4gcmVqZWN0KGVycikpO1xuICAgICAgICAgICAgfSwgZXJyID0+IHJlamVjdChlcnIpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWN0aW9ucyB0byBwZXJmb3JtIG9uIGxvZ291dC5cbiAgICAgKi9cbiAgICBvbkxvZ291dCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51bmF1dGhlbnRpY2F0ZSgpO1xuICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpsb2dnZWRPdXQnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuZCBjbGVhcnMgdGhlIHJlZGlyZWN0IGRhdGEuXG4gICAgICovXG4gICAgcHVsbFJlZGlyZWN0KCk6IGFueSB7XG4gICAgICAgIGxldCByZWRpcmVjdCA9IHRoaXMucmVkaXJlY3Q7XG5cbiAgICAgICAgdGhpcy5yZWRpcmVjdCA9IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIHJlZGlyZWN0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmQgYSByZWdpc3RlciByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtICBkYXRhXG4gICAgICogQHBhcmFtICAgZW5kcG9pbnRcbiAgICAgKiBAcGFyYW0gIGhlYWRlcnNcbiAgICAgKiBAcGFyYW0gcG9zdFJlZ2lzdGVyTG9naW5cbiAgICAgKi9cbiAgICByZWdpc3RlcihkYXRhOiBvYmplY3QsIGVuZHBvaW50OiBzdHJpbmcgPSAnJywgaGVhZGVycyA9IHt9LCBwb3N0UmVnaXN0ZXJMb2dpbjogYm9vbGVhbiA9IGZhbHNlKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgZW5kcG9pbnQgPSB0aGlzLmNvbmZpZy5nZXQoJ2F1dGhlbnRpY2F0aW9uLmVuZHBvaW50cy5yZWdpc3RlcicsIGVuZHBvaW50KTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaHR0cC5wb3N0KGVuZHBvaW50LCBkYXRhLCBoZWFkZXJzKS50b1Byb21pc2UoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHBvc3RSZWdpc3RlckxvZ2luKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Mb2dpbihyZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpyZWdpc3RlcmVkJywgcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudC5icm9hZGNhc3QoJ2F1dGg6cmVnaXN0ZXJlZCcsIHJlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgcmVzZXQgcGFzc3dvcmQgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgIGNyZWRlbnRpYWxzXG4gICAgICogQHBhcmFtICAgZW5kcG9pbnRcbiAgICAgKiBAcGFyYW0gIGhlYWRlcnNcbiAgICAgKi9cbiAgICByZXNldFBhc3N3b3JkKGRhdGE6IGFueSwgZW5kcG9pbnQ6IHN0cmluZyA9ICcnLCBoZWFkZXJzID0ge30pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBlbmRwb2ludCA9IHRoaXMuY29uZmlnLmdldChcbiAgICAgICAgICAgICdhdXRoZW50aWNhdGlvbi5lbmRwb2ludHMucmVzZXRQYXNzd29yZCcsIGVuZHBvaW50XG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaHR0cC5wb3N0KGVuZHBvaW50LCBkYXRhLCBoZWFkZXJzKS50b1Byb21pc2UoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkxvZ2luKHJlcykudGhlbigoKSA9PiByZXNvbHZlKHJlcykpXG4gICAgICAgICAgICB9LCBlcnJvciA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzb2x2ZSB0aGUgYXV0aGVudGljYXRlZCB1c2VyLlxuICAgICAqL1xuICAgIHJlc29sdmVVc2VyKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRpbWVvdXRzWydyZXNvbHZlVXNlciddID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRVc2VyKCkudGhlbigodXNlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF1dGhlbnRpY2F0ZWQodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRVc2VyKHVzZXIuZGF0YSB8fCB1c2VyKS50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpsb2dnZWRJbicsIHVzZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICAgICAgfSwgMjUwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSByZWRpcmVjdCBkYXRhLlxuICAgICAqL1xuICAgIHNldFJlZGlyZWN0KHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcmVjdCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY3VycmVudCBhdXRoZW50aWNhdGVkIHVzZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHVzZXJcbiAgICAgKi9cbiAgICBzZXRVc2VyKHVzZXI6IG9iamVjdCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICB1c2VyID0gbmV3IFVzZXJNb2RlbCh0aGlzLmF1dGhvcml6YXRpb24sIHVzZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiByZXNvbHZlKHRoaXMuYXV0aFVzZXIgPSB1c2VyKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcmUgYXV0IHRva2VuIGFuZCBicm9hZGNhc3QgYW4gZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHJlc1xuICAgICAqL1xuICAgIHN0b3JlVG9rZW4ocmVzOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHRoaXMudG9rZW4uc2V0KHRoaXMudG9rZW4ucmVhZChyZXMpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVuYXV0aGVudGljYXRlIHRoZSBjdXJyZW50IHVzZXIuXG4gICAgICovXG4gICAgdW5hdXRoZW50aWNhdGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudG9rZW4ucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuc2V0QXV0aGVudGljYXRlZChmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0VXNlcihudWxsKTtcbiAgICAgICAgdGhpcy5hdXRob3JpemF0aW9uLmNsZWFyUG9saWNpZXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnQgYXV0aGVudGljYXRlZCB1c2VyLlxuICAgICAqL1xuICAgIHVzZXIgPSAoKTogYW55ID0+IHRoaXMuYXV0aFVzZXI7XG59XG4iXX0=