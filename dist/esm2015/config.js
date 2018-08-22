/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import * as _ from 'lodash';
export class Config {
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
        return _.set(this.options, key, value);
    }
    /**
     * Set the configurable options.
     *
     * @param {?} options
     * @return {?}
     */
    setOptions(options) {
        this.options = _.merge(this.options, options);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdraXQvIiwic291cmNlcyI6WyJjb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRzVCLE1BQU07Ozs7O0lBNEdGLFlBQTRDLFFBQWE7UUFBYixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQ3JELElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUNsQzs7Ozs7SUFLRCxVQUFVLEtBQVUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTs7Ozs7Ozs7SUFRMUMsR0FBRyxDQUFDLEdBQVcsRUFBRSxXQUFnQixLQUFLO1FBQ2xDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQTtLQUN2Qzs7Ozs7Ozs7SUFRRCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQVcsRUFBRSxRQUFjO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUMsUUFBUSxDQUFDO1NBQ25CO1FBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUN2RTtLQUNKOzs7Ozs7OztJQVFELE9BQU8sQ0FBQyxHQUFXLEVBQUUsS0FBVTtRQUMzQixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUMxQzs7Ozs7OztJQU9ELFVBQVUsQ0FBQyxPQUFZO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRTlDLE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDZjs7Ozs7d0JBL0o0Qjs7OztJQUl6QixjQUFjLEVBQUU7Ozs7UUFJWixTQUFTLEVBQUU7WUFDUCxLQUFLLEVBQUUsRUFBRTtZQUNULGVBQWUsRUFBRSxFQUFFO1lBQ25CLE9BQU8sRUFBRSxFQUFFO1lBQ1gsS0FBSyxFQUFFLEVBQUU7WUFDVCxNQUFNLEVBQUUsRUFBRTtZQUNWLFFBQVEsRUFBRSxFQUFFO1lBQ1osYUFBYSxFQUFFLEVBQUU7WUFDakIsVUFBVSxFQUFFLEVBQUU7U0FDakI7Ozs7UUFJRCxNQUFNLEVBQUU7WUFDSixLQUFLLEVBQUUsSUFBSTtTQUNkOzs7O1FBSUQsTUFBTSxFQUFFO1lBQ0osUUFBUSxFQUFFO2dCQUNOLEVBQUUsRUFBRSxFQUFFO2dCQUNOLE9BQU8sRUFBRSxNQUFNO2dCQUNmLEtBQUssRUFBRSxJQUFJO2dCQUNYLEtBQUssRUFBRSxzQkFBc0I7YUFDaEM7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsRUFBRSxFQUFFLEVBQUU7YUFDVDtZQUNELFVBQVUsRUFBRSxFQUFFO1lBQ2QsVUFBVSxFQUFFLEVBQUU7U0FDakI7S0FDSjs7OztJQUlELGFBQWEsRUFBRSxFQUFFOzs7O0lBSWpCLElBQUksRUFBRTs7OztRQUlGLE9BQU8sRUFBRSxFQUFFOzs7O1FBSVgsT0FBTyxFQUFFLEVBQUU7S0FDZDs7OztJQUlELE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxjQUFjO0tBQ3ZCOzs7O0lBSUQsS0FBSyxFQUFFOzs7O1FBSUgsTUFBTSxFQUFFLE9BQU87Ozs7UUFJZixPQUFPLEVBQUUsUUFBUTs7OztRQUlqQixNQUFNLEVBQUUsUUFBUTtLQUNuQjs7OztJQUlELEtBQUssRUFBRTs7OztRQUlILE9BQU8sRUFBRSxDQUFDO0tBQ2I7Ozs7SUFJRCxLQUFLLEVBQUUsS0FBSztDQUNmOztZQW5HSixVQUFVOzs7OzRDQTZHTSxNQUFNLFNBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29uZmlnIHtcbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IGNvbmZpZ3VyYXRpb24uXG4gICAgICovXG4gICAgc3RhdGljIGRlZmF1bHRPcHRpb25zOiBhbnkgPSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBdXRoZW50aWNhdGlvbiBzZXR0aW5ncy5cbiAgICAgICAgICovXG4gICAgICAgIGF1dGhlbnRpY2F0aW9uOiB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIENvbW1vbiBlbmRwb2ludHMgZm9yIGF1dGhlbnRpY2F0aW9uIHNlcmNpY2UuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGVuZHBvaW50czoge1xuICAgICAgICAgICAgICAgIGNoZWNrOiAnJyxcbiAgICAgICAgICAgICAgICBmb3JvZ290UGFzc3dvcmQ6ICcnLFxuICAgICAgICAgICAgICAgIGdldFVzZXI6ICcnLFxuICAgICAgICAgICAgICAgIGxvZ2luOiAnJyxcbiAgICAgICAgICAgICAgICBsb2dvdXQ6ICcnLFxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyOiAnJyxcbiAgICAgICAgICAgICAgICByZXNldFBhc3N3b3JkOiAnJyxcbiAgICAgICAgICAgICAgICBzb2NpYWxBdXRoOiAnJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogTWV0aG9kcyB1c2VkIGZvciBhdXRoZW50aWNhdGlvbi5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbWV0aG9kOiB7XG4gICAgICAgICAgICAgICAgdG9rZW46IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFNvY2lhbCBwcm92aWRlciBjb25maWd1cmF0aW9uLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzb2NpYWw6IHtcbiAgICAgICAgICAgICAgICBmYWNlYm9vazoge1xuICAgICAgICAgICAgICAgICAgICBpZDogJycsXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb246ICd2Mi42JyxcbiAgICAgICAgICAgICAgICAgICAgeGZibWw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlOiAncHVibGljX3Byb2ZpbGUsZW1haWwnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0d2l0dGVyOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVkaXJlY3RUbzogJycsXG4gICAgICAgICAgICAgICAgb2F1dGhQcm94eTogJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEF1dGhvcml6YXRpb24gb3B0aW9ucy5cbiAgICAgICAgICovXG4gICAgICAgIGF1dGhvcml6YXRpb246IHt9LFxuICAgICAgICAvKipcbiAgICAgICAgICogSHR0cCBvcHRpb25zLlxuICAgICAgICAgKi9cbiAgICAgICAgaHR0cDoge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBCYXNlZCB1cmwgZm9yIGh0dHAgcmVxdWVzdHMuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGJhc2VVcmw6ICcnLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBEZWZhdWx0IGhlYWRlcnMgZm9yIGh0dHAgcmVxdWVzdC5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaGVhZGVyczoge31cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JhZ2UgT3B0aW9uc1xuICAgICAgICAgKi9cbiAgICAgICAgc3RvcmFnZToge1xuICAgICAgICAgICAgbmFtZTogJ25na2l0U3RvcmFnZSdcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRva2VuIG9wdGlvbnMuXG4gICAgICAgICAqL1xuICAgICAgICB0b2tlbjoge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBEZWZhdWx0IG5hbWUgb2YgYXV0aG9yaXphdGlvbiB0b2tlbiByZWFkIGZyb20gcmVzcG9uc2VzLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByZWFkQXM6ICd0b2tlbicsXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIERlZmF1bHQgbmFtZSBvZiBhdXRob3JpemF0aW9uIHRva2VuIHRoYXQgaXMgc3RvcmVkLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdG9yZUFzOiAnX3Rva2VuJyxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogU2NoZW1lIHRvIHVzZSBpbiBBdXRob3JpemF0aW9uIGhlYWRlciBhbG9uZyB3aXRoIHRva2VuLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzY2hlbWU6ICdCZWFyZXInXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYWNoZSBzZXJ2aWNlIG9wdGlvbnMuXG4gICAgICAgICAqL1xuICAgICAgICBjYWNoZToge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBEZWZhdWx0IGV4cGlyYXRpb24gdGltZSBpbiBtaW51dGVzLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBleHBpcmVzOiA1XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFbmFibGUgZGVidWcgbW9kZS5cbiAgICAgICAgICovXG4gICAgICAgIGRlYnVnOiBmYWxzZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbmZpZyBvcHRpb25zLlxuICAgICAqL1xuICAgIG9wdGlvbnM6IGFueTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgc2VydmljZS4uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoQEluamVjdCgnbmdLaXRPcHRpb25zJykgcHJpdmF0ZSBfb3B0aW9uczogYW55KSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IENvbmZpZy5kZWZhdWx0T3B0aW9ucztcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKHRoaXMuX29wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgY29uZmlndXJhYmxlIG9wdGlvbnMuXG4gICAgICovXG4gICAgZ2V0T3B0aW9ucygpOiBhbnkgeyByZXR1cm4gdGhpcy5vcHRpb25zOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYW4gb3B0aW9uIGJ5IGtleS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgIGtleVxuICAgICAqIEBwYXJhbSAgIG92ZXJyaWRlXG4gICAgICovXG4gICAgZ2V0KGtleTogc3RyaW5nLCBvdmVycmlkZTogYW55ID0gZmFsc2UpOiBhbnkge1xuICAgICAgICByZXR1cm4gQ29uZmlnLmdldEl0ZW0oa2V5LCBvdmVycmlkZSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdGF0aWMgbWV0aG9kIHRvIGdldCBhbiBvcHRpb24gYnkga2V5LlxuICAgICAqXG4gICAgICogQHBhcmFtICAga2V5XG4gICAgICogQHBhcmFtICAgb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0SXRlbShrZXk6IHN0cmluZywgb3ZlcnJpZGU/OiBhbnkpOiBhbnkge1xuICAgICAgICBpZiAob3ZlcnJpZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBvdmVycmlkZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChDb25maWcuZGVmYXVsdE9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkuc3BsaXQoJy4nKS5yZWR1Y2UoKG8sIGkpID0+IG9baV0sIENvbmZpZy5kZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgYW4gb3B0aW9uIGJ5IGtleS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgIGtleVxuICAgICAqIEBwYXJhbSAgdmFsdWVcbiAgICAgKi9cbiAgICBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgcmV0dXJuIF8uc2V0KHRoaXMub3B0aW9ucywga2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjb25maWd1cmFibGUgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgb3B0aW9uc1xuICAgICAqL1xuICAgIHNldE9wdGlvbnMob3B0aW9uczogYW55KTogQ29uZmlnIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gXy5tZXJnZSh0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiJdfQ==