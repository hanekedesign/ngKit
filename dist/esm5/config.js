/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import * as _ from 'lodash';
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
        { type: Injectable },
    ];
    /** @nocollapse */
    Config.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['ngKitOptions',] }] }
    ]; };
    return Config;
}());
export { Config };
function Config_tsickle_Closure_declarations() {
    /**
     * Default configuration.
     * @type {?}
     */
    Config.defaultOptions;
    /**
     * Config options.
     * @type {?}
     */
    Config.prototype.options;
    /** @type {?} */
    Config.prototype._options;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdraXQvIiwic291cmNlcyI6WyJjb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDOztJQTRHeEI7O09BRUc7SUFDSCxnQkFBNEMsUUFBYTtRQUFiLGFBQVEsR0FBUixRQUFRLENBQUs7UUFDckQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2xDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsMkJBQVU7Ozs7SUFBVixjQUFvQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBRTFDOzs7OztPQUtHOzs7Ozs7OztJQUNILG9CQUFHOzs7Ozs7O0lBQUgsVUFBSSxHQUFXLEVBQUUsUUFBcUI7UUFBckIseUJBQUEsRUFBQSxnQkFBcUI7UUFDbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0tBQ3ZDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7O0lBQ0ksY0FBTzs7Ozs7OztJQUFkLFVBQWUsR0FBVyxFQUFFLFFBQWM7UUFDdEMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sQ0FBQyxRQUFRLENBQUM7U0FDbkI7UUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFKLENBQUksRUFBRSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDdkU7S0FDSjtJQUVEOzs7OztPQUtHOzs7Ozs7OztJQUNILHdCQUFPOzs7Ozs7O0lBQVAsVUFBUSxHQUFXLEVBQUUsS0FBVTtRQUMzQixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUMxQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCwyQkFBVTs7Ozs7O0lBQVYsVUFBVyxPQUFZO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRTlDLE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDZjs7Ozs0QkEvSjRCOzs7O1FBSXpCLGNBQWMsRUFBRTs7OztZQUlaLFNBQVMsRUFBRTtnQkFDUCxLQUFLLEVBQUUsRUFBRTtnQkFDVCxlQUFlLEVBQUUsRUFBRTtnQkFDbkIsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osYUFBYSxFQUFFLEVBQUU7Z0JBQ2pCLFVBQVUsRUFBRSxFQUFFO2FBQ2pCOzs7O1lBSUQsTUFBTSxFQUFFO2dCQUNKLEtBQUssRUFBRSxJQUFJO2FBQ2Q7Ozs7WUFJRCxNQUFNLEVBQUU7Z0JBQ0osUUFBUSxFQUFFO29CQUNOLEVBQUUsRUFBRSxFQUFFO29CQUNOLE9BQU8sRUFBRSxNQUFNO29CQUNmLEtBQUssRUFBRSxJQUFJO29CQUNYLEtBQUssRUFBRSxzQkFBc0I7aUJBQ2hDO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxFQUFFLEVBQUUsRUFBRTtpQkFDVDtnQkFDRCxVQUFVLEVBQUUsRUFBRTtnQkFDZCxVQUFVLEVBQUUsRUFBRTthQUNqQjtTQUNKOzs7O1FBSUQsYUFBYSxFQUFFLEVBQUU7Ozs7UUFJakIsSUFBSSxFQUFFOzs7O1lBSUYsT0FBTyxFQUFFLEVBQUU7Ozs7WUFJWCxPQUFPLEVBQUUsRUFBRTtTQUNkOzs7O1FBSUQsT0FBTyxFQUFFO1lBQ0wsSUFBSSxFQUFFLGNBQWM7U0FDdkI7Ozs7UUFJRCxLQUFLLEVBQUU7Ozs7WUFJSCxNQUFNLEVBQUUsT0FBTzs7OztZQUlmLE9BQU8sRUFBRSxRQUFROzs7O1lBSWpCLE1BQU0sRUFBRSxRQUFRO1NBQ25COzs7O1FBSUQsS0FBSyxFQUFFOzs7O1lBSUgsT0FBTyxFQUFFLENBQUM7U0FDYjs7OztRQUlELEtBQUssRUFBRSxLQUFLO0tBQ2Y7O2dCQW5HSixVQUFVOzs7O2dEQTZHTSxNQUFNLFNBQUMsY0FBYzs7aUJBaEh0Qzs7U0FJYSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb25maWcge1xuICAgIC8qKlxuICAgICAqIERlZmF1bHQgY29uZmlndXJhdGlvbi5cbiAgICAgKi9cbiAgICBzdGF0aWMgZGVmYXVsdE9wdGlvbnM6IGFueSA9IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEF1dGhlbnRpY2F0aW9uIHNldHRpbmdzLlxuICAgICAgICAgKi9cbiAgICAgICAgYXV0aGVudGljYXRpb246IHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ29tbW9uIGVuZHBvaW50cyBmb3IgYXV0aGVudGljYXRpb24gc2VyY2ljZS5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZW5kcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgY2hlY2s6ICcnLFxuICAgICAgICAgICAgICAgIGZvcm9nb3RQYXNzd29yZDogJycsXG4gICAgICAgICAgICAgICAgZ2V0VXNlcjogJycsXG4gICAgICAgICAgICAgICAgbG9naW46ICcnLFxuICAgICAgICAgICAgICAgIGxvZ291dDogJycsXG4gICAgICAgICAgICAgICAgcmVnaXN0ZXI6ICcnLFxuICAgICAgICAgICAgICAgIHJlc2V0UGFzc3dvcmQ6ICcnLFxuICAgICAgICAgICAgICAgIHNvY2lhbEF1dGg6ICcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBNZXRob2RzIHVzZWQgZm9yIGF1dGhlbnRpY2F0aW9uLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBtZXRob2Q6IHtcbiAgICAgICAgICAgICAgICB0b2tlbjogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogU29jaWFsIHByb3ZpZGVyIGNvbmZpZ3VyYXRpb24uXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHNvY2lhbDoge1xuICAgICAgICAgICAgICAgIGZhY2Vib29rOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogJ3YyLjYnLFxuICAgICAgICAgICAgICAgICAgICB4ZmJtbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2NvcGU6ICdwdWJsaWNfcHJvZmlsZSxlbWFpbCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHR3aXR0ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICcnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZWRpcmVjdFRvOiAnJyxcbiAgICAgICAgICAgICAgICBvYXV0aFByb3h5OiAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogQXV0aG9yaXphdGlvbiBvcHRpb25zLlxuICAgICAgICAgKi9cbiAgICAgICAgYXV0aG9yaXphdGlvbjoge30sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIdHRwIG9wdGlvbnMuXG4gICAgICAgICAqL1xuICAgICAgICBodHRwOiB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEJhc2VkIHVybCBmb3IgaHR0cCByZXF1ZXN0cy5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgYmFzZVVybDogJycsXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIERlZmF1bHQgaGVhZGVycyBmb3IgaHR0cCByZXF1ZXN0LlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBoZWFkZXJzOiB7fVxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcmFnZSBPcHRpb25zXG4gICAgICAgICAqL1xuICAgICAgICBzdG9yYWdlOiB7XG4gICAgICAgICAgICBuYW1lOiAnbmdraXRTdG9yYWdlJ1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogVG9rZW4gb3B0aW9ucy5cbiAgICAgICAgICovXG4gICAgICAgIHRva2VuOiB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIERlZmF1bHQgbmFtZSBvZiBhdXRob3JpemF0aW9uIHRva2VuIHJlYWQgZnJvbSByZXNwb25zZXMuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJlYWRBczogJ3Rva2VuJyxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRGVmYXVsdCBuYW1lIG9mIGF1dGhvcml6YXRpb24gdG9rZW4gdGhhdCBpcyBzdG9yZWQuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN0b3JlQXM6ICdfdG9rZW4nLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBTY2hlbWUgdG8gdXNlIGluIEF1dGhvcml6YXRpb24gaGVhZGVyIGFsb25nIHdpdGggdG9rZW4uXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHNjaGVtZTogJ0JlYXJlcidcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENhY2hlIHNlcnZpY2Ugb3B0aW9ucy5cbiAgICAgICAgICovXG4gICAgICAgIGNhY2hlOiB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIERlZmF1bHQgZXhwaXJhdGlvbiB0aW1lIGluIG1pbnV0ZXMuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGV4cGlyZXM6IDVcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVuYWJsZSBkZWJ1ZyBtb2RlLlxuICAgICAgICAgKi9cbiAgICAgICAgZGVidWc6IGZhbHNlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uZmlnIG9wdGlvbnMuXG4gICAgICovXG4gICAgb3B0aW9uczogYW55O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBzZXJ2aWNlLi5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KCduZ0tpdE9wdGlvbnMnKSBwcml2YXRlIF9vcHRpb25zOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gQ29uZmlnLmRlZmF1bHRPcHRpb25zO1xuICAgICAgICB0aGlzLnNldE9wdGlvbnModGhpcy5fb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBjb25maWd1cmFibGUgb3B0aW9ucy5cbiAgICAgKi9cbiAgICBnZXRPcHRpb25zKCk6IGFueSB7IHJldHVybiB0aGlzLm9wdGlvbnM7IH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbiBvcHRpb24gYnkga2V5LlxuICAgICAqXG4gICAgICogQHBhcmFtICAga2V5XG4gICAgICogQHBhcmFtICAgb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBnZXQoa2V5OiBzdHJpbmcsIG92ZXJyaWRlOiBhbnkgPSBmYWxzZSk6IGFueSB7XG4gICAgICAgIHJldHVybiBDb25maWcuZ2V0SXRlbShrZXksIG92ZXJyaWRlKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0YXRpYyBtZXRob2QgdG8gZ2V0IGFuIG9wdGlvbiBieSBrZXkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gICBrZXlcbiAgICAgKiBAcGFyYW0gICBvdmVycmlkZVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRJdGVtKGtleTogc3RyaW5nLCBvdmVycmlkZT86IGFueSk6IGFueSB7XG4gICAgICAgIGlmIChvdmVycmlkZSkge1xuICAgICAgICAgICAgcmV0dXJuIG92ZXJyaWRlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKENvbmZpZy5kZWZhdWx0T3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIGtleS5zcGxpdCgnLicpLnJlZHVjZSgobywgaSkgPT4gb1tpXSwgQ29uZmlnLmRlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBhbiBvcHRpb24gYnkga2V5LlxuICAgICAqXG4gICAgICogQHBhcmFtICAga2V5XG4gICAgICogQHBhcmFtICB2YWx1ZVxuICAgICAqL1xuICAgIHNldEl0ZW0oa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICByZXR1cm4gXy5zZXQodGhpcy5vcHRpb25zLCBrZXksIHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGNvbmZpZ3VyYWJsZSBvcHRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtICBvcHRpb25zXG4gICAgICovXG4gICAgc2V0T3B0aW9ucyhvcHRpb25zOiBhbnkpOiBDb25maWcge1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBfLm1lcmdlKHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIl19