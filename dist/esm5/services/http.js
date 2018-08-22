/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Config } from './../config';
import { Event } from './event';
import { Token } from './token';
import { HttpHeaders, HttpParams } from '@angular/common/http';
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
export { Http };
function Http_tsickle_Closure_declarations() {
    /**
     * Assignable base url for http calls.
     * @type {?}
     */
    Http.prototype.baseUrl;
    /**
     * Headers to be sent with all http calls.
     * @type {?}
     */
    Http.prototype.headers;
    /**
     * The subsciptions of the service.
     * @type {?}
     */
    Http.prototype.subs;
    /** @type {?} */
    Http.prototype.config;
    /** @type {?} */
    Http.prototype.event;
    /** @type {?} */
    Http.prototype.token;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25na2l0LyIsInNvdXJjZXMiOlsic2VydmljZXMvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztJQUkzRDs7Ozs7O09BTUc7SUFDSCxjQUNXLFFBQ0EsT0FDQTtRQUZBLFdBQU0sR0FBTixNQUFNO1FBQ04sVUFBSyxHQUFMLEtBQUs7UUFDTCxVQUFLLEdBQUwsS0FBSzs7Ozt1QkFTRSxFQUFFOzs7O3VCQUtVLElBQUksV0FBVyxFQUFFOzs7O29CQUtuQyxFQUFFO1FBakJWLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN6QjtJQWlCRDs7T0FFRzs7Ozs7SUFDSCwwQkFBVzs7OztJQUFYO1FBQUEsaUJBRUM7UUFERyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUExQixDQUEwQixDQUFDLENBQUM7S0FDbkU7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsMEJBQVc7Ozs7OztJQUFYLFVBQVksTUFBVztRQUNuQixxQkFBSSxZQUFZLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUVwQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1QsTUFBTSxDQUFDLElB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R0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBSSxNQUFNLFNBQUksS0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7b0JBQ3BELEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUN4RCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNqQyxFQUFFO29CQUNDLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQ3BELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbEIsQ0FBQyxDQUFDO2FBQ047U0FDSixDQUFDLENBQUE7S0FDTDs7Z0JBbEhKLFVBQVU7Ozs7Z0JBTEYsTUFBTTtnQkFDTixLQUFLO2dCQUNMLEtBQUs7O2VBSGQ7O1NBT2EsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi8uLi9jb25maWcnO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL2V2ZW50JztcbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnLi90b2tlbic7XG5pbXBvcnQgeyBIdHRwSGVhZGVycywgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEh0dHAgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgc2VydmljZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgY29uZmlnXG4gICAgICogQHBhcmFtICBldmVudFxuICAgICAqIEBwYXJhbSAgdG9rZW5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGNvbmZpZzogQ29uZmlnLFxuICAgICAgICBwdWJsaWMgZXZlbnQ6IEV2ZW50LFxuICAgICAgICBwdWJsaWMgdG9rZW46IFRva2VuXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc2V0RGVmYXVsdEhlYWRlcnMoKTtcbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFzc2lnbmFibGUgYmFzZSB1cmwgZm9yIGh0dHAgY2FsbHMuXG4gICAgICovXG4gICAgYmFzZVVybDogc3RyaW5nID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBIZWFkZXJzIHRvIGJlIHNlbnQgd2l0aCBhbGwgaHR0cCBjYWxscy5cbiAgICAgKi9cbiAgICBwdWJsaWMgaGVhZGVyczogSHR0cEhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzdWJzY2lwdGlvbnMgb2YgdGhlIHNlcnZpY2UuXG4gICAgICovXG4gICAgc3ViczogYW55ID0ge307XG5cbiAgICAvKipcbiAgICAgKiBPbiBzZXJ2aWNlIGRlc3Ryb3kuXG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuc3VicykuZm9yRWFjaChrID0+IHRoaXMuc3Vic1trXS51bnN1YnNjcmliZSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZCB1cmwgcGFyYW1ldGVycyBmb3IgcmVxdWVzdHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHBhcmFtc1xuICAgICAqL1xuICAgIGJ1aWxkUGFyYW1zKHBhcmFtczogYW55KTogSHR0cFBhcmFtcyB7XG4gICAgICAgIHZhciBxdWVyeV9wYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuXG4gICAgICAgIGlmIChwYXJhbXMpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaCgoa2V5OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zW2tleV0pIHF1ZXJ5X3BhcmFtcy5zZXQoa2V5LCBwYXJhbXNba2V5XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBxdWVyeV9wYXJhbXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXZlbnQgbGlzdGVuZXJzLlxuICAgICAqL1xuICAgIHByaXZhdGUgZXZlbnRMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmV2ZW50KSB7XG4gICAgICAgICAgICBsZXQgc3ViID0gKCkgPT4gdGhpcy5zZXREZWZhdWx0SGVhZGVycygpO1xuICAgICAgICAgICAgdGhpcy5zdWJzWydhdXRoOmxvZ2dpbmdJbiddID0gdGhpcy5ldmVudC5saXN0ZW4oJ2F1dGg6bG9nZ2luZ0luJykuc3Vic2NyaWJlKHN1Yik7XG4gICAgICAgICAgICB0aGlzLnN1YnNbJ2F1dGg6bG9nZ2VkT3V0J10gPSB0aGlzLmV2ZW50Lmxpc3RlbignYXV0aDpsb2dnZWRPdXQnKS5zdWJzY3JpYmUoc3ViKTtcbiAgICAgICAgICAgIHRoaXMuc3Vic1snYXV0aDpjaGVjayddID0gdGhpcy5ldmVudC5saXN0ZW4oJ2F1dGg6Y2hlY2snKS5zdWJzY3JpYmUoc3ViKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB1cmwgZm9yIGh0dHAgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgdXJsXG4gICAgICovXG4gICAgcHVibGljIGdldFVybCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICh1cmwuc3RhcnRzV2l0aCgnLycpIHx8IHVybC5zdGFydHNXaXRoKCdodHRwJykpIHJldHVybiB1cmw7XG5cbiAgICAgICAgbGV0IGJhc2VVcmwgPSB0aGlzLmJhc2VVcmwgfHwgdGhpcy5jb25maWcuZ2V0KCdodHRwLmJhc2VVcmwnKSB8fCAnJztcblxuICAgICAgICByZXR1cm4gKGJhc2VVcmwpID8gYmFzZVVybCArICcvJyArIHVybCA6IHVybDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGRlZmF1bHQgaGVhZGVycyBmb3IgaHR0cCByZXF1ZXN0LlxuICAgICAqL1xuICAgIHNldERlZmF1bHRIZWFkZXJzKCk6IHZvaWQge1xuICAgICAgICBsZXQgY29uZmlnSGVhZGVycyA9ICh0aGlzLmNvbmZpZykgPyB0aGlzLmNvbmZpZy5nZXQoJ2h0dHAuaGVhZGVycycpIDogbnVsbDtcblxuICAgICAgICBpZiAoY29uZmlnSGVhZGVycykge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoY29uZmlnSGVhZGVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IHRoaXMuaGVhZGVycy5zZXQoa2V5LCBjb25maWdIZWFkZXJzW2tleV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRva2VuSGVhZGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgdG9rZW4gaGVhZGVyIHRvIHRoZSByZXF1ZXN0LlxuICAgICAqL1xuICAgIHRva2VuSGVhZGVyKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLmdldCgnYXV0aGVudGljYXRpb24ubWV0aG9kLnRva2VuJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRva2VuLmdldCgpLnRoZW4odG9rZW4gPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2NoZW1lID0gdGhpcy5jb25maWcuZ2V0KCd0b2tlbi5zY2hlbWUnKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gKHNjaGVtZSkgPyBgJHtzY2hlbWV9ICR7dG9rZW59YCA6IHRva2VuO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlcnMgPSB0aGlzLmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRva2VuID8gdHJ1ZSA6IGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IHRoaXMuaGVhZGVycy5kZWxldGUoJ0F1dGhvcml6YXRpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxufVxuIl19