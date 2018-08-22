/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Authentication } from './../services/authentication';
import { Event } from './../services/event';
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
export { AuthResolveGuard };
function AuthResolveGuard_tsickle_Closure_declarations() {
    /**
     * The subsciptions of the service.
     * @type {?}
     */
    AuthResolveGuard.prototype.subs;
    /** @type {?} */
    AuthResolveGuard.prototype.auth;
    /** @type {?} */
    AuthResolveGuard.prototype.event;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1yZXNvbHZlLWd1YXJkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdraXQvIiwic291cmNlcyI6WyJndWFyZHMvYXV0aC1yZXNvbHZlLWd1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBRXRELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0lBSXhDOzs7OztPQUtHO0lBQ0gsMEJBQ1csTUFDQTtRQURBLFNBQUksR0FBSixJQUFJO1FBQ0osVUFBSyxHQUFMLEtBQUs7Ozs7b0JBTUosRUFBRTtLQUxUO0lBT0w7O09BRUc7Ozs7O0lBQ0gsc0NBQVc7Ozs7SUFBWDtRQUFBLGlCQUVDO1FBREcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO0tBQ25FO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsc0NBQVc7Ozs7SUFBWDtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDdkI7SUFFRDs7T0FFRzs7Ozs7SUFDSCwyQ0FBZ0I7Ozs7SUFBaEI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ3ZCO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsZ0NBQUs7Ozs7SUFBTDtRQUFBLGlCQVVDO1FBVEcsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTztZQUN2QixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pCO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osS0FBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDbEQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNqQixDQUFDLENBQUM7YUFDTjtTQUNKLENBQUMsQ0FBQztLQUNOOztnQkFwREosVUFBVTs7OztnQkFIRixjQUFjO2dCQUNkLEtBQUs7OzJCQUhkOztTQU1hLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuQWN0aXZhdGUsIENhbkFjdGl2YXRlQ2hpbGQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb24gfSBmcm9tICcuLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uJztcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ldmVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoUmVzb2x2ZUd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUsIENhbkFjdGl2YXRlQ2hpbGQsIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtICBhdXRoXG4gICAgICogQHBhcmFtICBldmVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgYXV0aDogQXV0aGVudGljYXRpb24sXG4gICAgICAgIHB1YmxpYyBldmVudDogRXZlbnRcbiAgICApIHsgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHN1YnNjaXB0aW9ucyBvZiB0aGUgc2VydmljZS5cbiAgICAgKi9cbiAgICBzdWJzOiBhbnkgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIE9uIHNlcnZpY2UgZGVzdHJveS5cbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5zdWJzKS5mb3JFYWNoKGsgPT4gdGhpcy5zdWJzW2tdLnVuc3Vic2NyaWJlKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZSBpZiB0aGUgdXNlciBjYW4gYWN0aXZhdGUgYSByb3V0ZS5cbiAgICAgKi9cbiAgICBjYW5BY3RpdmF0ZSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3VhcmQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgaWYgdGhlIHVzZXIgY2FuIGFjdGl2YXRlIGNoaWxkcmVuIG9mIGEgcm91dGUuXG4gICAgICovXG4gICAgY2FuQWN0aXZhdGVDaGlsZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3VhcmQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbWV0aG9kIHRvIGFwcGx5IHRvIGd1YXJkLlxuICAgICAqL1xuICAgIGd1YXJkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dGgudXNlcigpKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJzWydhdXRoOmNoZWNrJ10gPSB0aGlzLmF1dGguY2hlY2soKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=