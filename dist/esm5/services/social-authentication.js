/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Authentication } from './authentication';
import { Authorization } from './authorization';
import { Injectable } from '@angular/core';
import { Config } from './../config';
import { HttpClient } from '@angular/common/http';
import { Http } from './http';
import { Token } from './token';
import { Event } from './event';
var SocialAuthentication = /** @class */ (function (_super) {
    tslib_1.__extends(SocialAuthentication, _super);
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
export { SocialAuthentication };
function SocialAuthentication_tsickle_Closure_declarations() {
    /**
     * Handle errors on facebook login.
     *
     * \@param error
     * @type {?}
     */
    SocialAuthentication.prototype.handleLoginError;
    /** @type {?} */
    SocialAuthentication.prototype.authorization;
    /** @type {?} */
    SocialAuthentication.prototype.config;
    /** @type {?} */
    SocialAuthentication.prototype.event;
    /** @type {?} */
    SocialAuthentication.prototype.http;
    /** @type {?} */
    SocialAuthentication.prototype.httpService;
    /** @type {?} */
    SocialAuthentication.prototype.token;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29jaWFsLWF1dGhlbnRpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdraXQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9zb2NpYWwtYXV0aGVudGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNyQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM5QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7O0lBR1UsZ0RBQWM7SUFDcEQ7O09BRUc7SUFDSCw4QkFDVyxlQUNBLFFBQ0EsT0FDQSxNQUNBLGFBQ0E7UUFOWCxZQVFJLGtCQUFNLGFBQWEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLFNBR2hFO1FBVlUsbUJBQWEsR0FBYixhQUFhO1FBQ2IsWUFBTSxHQUFOLE1BQU07UUFDTixXQUFLLEdBQUwsS0FBSztRQUNMLFVBQUksR0FBSixJQUFJO1FBQ0osaUJBQVcsR0FBWCxXQUFXO1FBQ1gsV0FBSyxHQUFMLEtBQUs7Ozs7OztpQ0EyQ0csVUFBQyxLQUFhLElBQUssT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFsQixDQUFrQjs7O0tBdEN2RDtJQUVEOztPQUVHO0lBQ0gseURBQXlEO0lBQ3pELGlDQUFpQztJQUNqQywwREFBMEQ7SUFDMUQsNkRBQTZEO0lBQzdELGlFQUFpRTtJQUNqRSxVQUFVO0lBQ1YsSUFBSTtJQUVKOzs7O09BSUc7Ozs7Ozs7SUFDSCxpREFBa0I7Ozs7OztJQUFsQixVQUFtQixHQUFXO1FBQTlCLGlCQWFDO1FBWkcsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDL0IsS0FBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWpDLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNWLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxDQUFDLEVBQ3RELEdBQUcsQ0FDTixDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUc7Z0JBQ1gsS0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDaEIsRUFBRSxVQUFBLEtBQUssSUFBSSxPQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBYixDQUFhLENBQUMsQ0FBQzthQUM5QixFQUFFLFVBQUEsS0FBSyxJQUFJLE9BQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFiLENBQWEsQ0FBQyxDQUFDO1NBQzlCLENBQUMsQ0FBQztLQUNOO0lBU0Q7Ozs7T0FJRzs7Ozs7OztJQUNILHFEQUFzQjs7Ozs7O0lBQXRCLFVBQXVCLEdBQVE7UUFDM0IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUNWLEdBQUcsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUM1Qix1QkFBdUIsQ0FDMUIsQ0FBQztTQUNMO0tBQ0o7O2dCQXBFSixVQUFVOzs7O2dCQVJGLGFBQWE7Z0JBRWIsTUFBTTtnQkFJTixLQUFLO2dCQUhMLFVBQVU7Z0JBQ1YsSUFBSTtnQkFDSixLQUFLOzsrQkFOZDtFQVUwQyxjQUFjO1NBQTNDLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF1dGhlbnRpY2F0aW9uIH0gZnJvbSAnLi9hdXRoZW50aWNhdGlvbic7XG5pbXBvcnQgeyBBdXRob3JpemF0aW9uIH0gZnJvbSAnLi9hdXRob3JpemF0aW9uJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4vLi4vY29uZmlnJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBIdHRwIH0gZnJvbSAnLi9odHRwJztcbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnLi90b2tlbic7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJy4vZXZlbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU29jaWFsQXV0aGVudGljYXRpb24gZXh0ZW5kcyBBdXRoZW50aWNhdGlvbiB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3IuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBhdXRob3JpemF0aW9uOiBBdXRob3JpemF0aW9uLFxuICAgICAgICBwdWJsaWMgY29uZmlnOiBDb25maWcsXG4gICAgICAgIHB1YmxpYyBldmVudDogRXZlbnQsXG4gICAgICAgIHB1YmxpYyBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICBwdWJsaWMgaHR0cFNlcnZpY2U6IEh0dHAsXG4gICAgICAgIHB1YmxpYyB0b2tlbjogVG9rZW5cbiAgICApIHtcbiAgICAgICAgc3VwZXIoYXV0aG9yaXphdGlvbiwgY29uZmlnLCBldmVudCwgaHR0cCwgaHR0cFNlcnZpY2UsIHRva2VuKTtcblxuICAgICAgICAvL1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ2luIHdpdGggYSBzb2NpYWwgcHJvdmlkZXIuXG4gICAgICovXG4gICAgLy8gbG9naW4ocHJvdmlkZXI6IHN0cmluZywgb3B0aW9ucz86IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgLy8gICAgIHJldHVybiBuZXcgUHJvbWlzZSgoKSA9PiB7XG4gICAgLy8gICAgICAgICAvLyB0aGlzLmhhbmRsZUxvZ2luU3VjY2VzcyhyZXMpLnRoZW4oKHJlcykgPT4ge1xuICAgIC8vICAgICAgICAgLy8gICAgIHRoaXMub25Mb2dpbihyZXMpLnRoZW4oKCkgPT4gcmVzb2x2ZShyZXMpKTtcbiAgICAvLyAgICAgICAgIC8vIH0sIChlcnJvcikgPT4gcmVqZWN0KHRoaXMuaGFuZGxlTG9naW5FcnJvcihlcnJvcikpKVxuICAgIC8vICAgICB9KTtcbiAgICAvLyB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgc3VjY2VzZnVsIEZhY2Vib29rIGxvZ2luLlxuICAgICAqXG4gICAgICogQHBhcmFtICByZXNcbiAgICAgKi9cbiAgICBoYW5kbGVMb2dpblN1Y2Nlc3MocmVzOiBvYmplY3QpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9yZVNvY2lhbENyZWRlbnRpYWxzKHJlcyk7XG5cbiAgICAgICAgICAgIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLmdldCgnYXV0aGVudGljYXRpb24uZW5kcG9pbnRzLnNvY2lhbEF1dGgnKSxcbiAgICAgICAgICAgICAgICByZXNcbiAgICAgICAgICAgICkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkxvZ2luKHJlcykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgICAgICAgICB9LCBlcnJvciA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgZXJyb3JzIG9uIGZhY2Vib29rIGxvZ2luLlxuICAgICAqXG4gICAgICogQHBhcmFtICBlcnJvclxuICAgICAqL1xuICAgIGhhbmRsZUxvZ2luRXJyb3IgPSAoZXJyb3I6IG9iamVjdCkgPT4gY29uc29sZS5sb2coZXJyb3IpO1xuXG4gICAgLyoqXG4gICAgICogU3RvcmUgc29jaWFsIGF1dGggY3JlZG5ldGlhbHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHJlc1xuICAgICAqL1xuICAgIHN0b3JlU29jaWFsQ3JlZGVudGlhbHMocmVzOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHJlcy5uZXR3b3JrID09ICdmYWNlYm9vaycpIHtcbiAgICAgICAgICAgIHRoaXMudG9rZW4uc2V0KFxuICAgICAgICAgICAgICAgIHJlcy5hdXRoUmVzcG9uc2UuYWNjZXNzVG9rZW4sXG4gICAgICAgICAgICAgICAgJ2ZhY2Vib29rX2FjY2Vzc190b2tlbidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=