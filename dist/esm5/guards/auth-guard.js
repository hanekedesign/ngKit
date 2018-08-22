/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Authentication } from './../services/authentication';
import { Event } from './../services/event';
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
        route;
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
export { AuthGuard };
function AuthGuard_tsickle_Closure_declarations() {
    /**
     * The subsciptions of the service.
     * @type {?}
     */
    AuthGuard.prototype.subs;
    /** @type {?} */
    AuthGuard.prototype.auth;
    /** @type {?} */
    AuthGuard.prototype.event;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25na2l0LyIsInNvdXJjZXMiOlsiZ3VhcmRzL2F1dGgtZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFJdEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7SUFJeEM7Ozs7O09BS0c7SUFDSCxtQkFDVyxNQUNBO1FBREEsU0FBSSxHQUFKLElBQUk7UUFDSixVQUFLLEdBQUwsS0FBSzs7OztvQkFNSixFQUFFO0tBTFQ7SUFPTDs7T0FFRzs7Ozs7SUFDSCwrQkFBVzs7OztJQUFYO1FBQUEsaUJBRUM7UUFERyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUExQixDQUEwQixDQUFDLENBQUM7S0FDbkU7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7SUFDSCwrQkFBVzs7Ozs7OztJQUFYLFVBQVksS0FBNkIsRUFBRSxLQUEwQjtRQUNqRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDbkM7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7SUFDSCxvQ0FBZ0I7Ozs7Ozs7SUFBaEIsVUFBaUIsS0FBNkIsRUFBRSxLQUEwQjtRQUN0RSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDbkM7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7SUFDSCx5QkFBSzs7Ozs7OztJQUFMLFVBQU0sS0FBNkIsRUFBRSxLQUEwQjtRQUEvRCxpQkFrQkM7UUFqQkcsS0FBSyxDQUFDO1FBRU4sTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTztZQUN2QixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pCO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osS0FBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7b0JBQ3ZELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ1IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNqQjtvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixLQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFDbkMsS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNqQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ2xCO2lCQUNKLENBQUMsQ0FBQzthQUNOO1NBQ0osQ0FBQyxDQUFDO0tBQ047O2dCQXJFSixVQUFVOzs7O2dCQUhGLGNBQWM7Z0JBQ2QsS0FBSzs7b0JBTGQ7O1NBUWEsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBDYW5BY3RpdmF0ZSwgQ2FuQWN0aXZhdGVDaGlsZCwgUm91dGVyU3RhdGVTbmFwc2hvdFxufSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb24gfSBmcm9tICcuLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uJztcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ldmVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoR3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSwgQ2FuQWN0aXZhdGVDaGlsZCwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGF1dGhcbiAgICAgKiBAcGFyYW0gIGV2ZW50XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBhdXRoOiBBdXRoZW50aWNhdGlvbixcbiAgICAgICAgcHVibGljIGV2ZW50OiBFdmVudFxuICAgICkgeyB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc3Vic2NpcHRpb25zIG9mIHRoZSBzZXJ2aWNlLlxuICAgICAqL1xuICAgIHN1YnM6IGFueSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogT24gc2VydmljZSBkZXN0cm95LlxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnN1YnMpLmZvckVhY2goayA9PiB0aGlzLnN1YnNba10udW5zdWJzY3JpYmUoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lIGlmIHRoZSB1c2VyIGNhbiBhY3RpdmF0ZSBhIHJvdXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJvdXRlXG4gICAgICogQHBhcmFtIHN0YXRlXG4gICAgICovXG4gICAgY2FuQWN0aXZhdGUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmd1YXJkKHJvdXRlLCBzdGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lIGlmIHRoZSB1c2VyIGNhbiBhY3RpdmF0ZSBjaGlsZHJlbiBvZiBhIHJvdXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtICByb3V0ZVxuICAgICAqIEBwYXJhbSAgc3RhdGUgICAgICpcbiAgICAgKi9cbiAgICBjYW5BY3RpdmF0ZUNoaWxkKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5ndWFyZChyb3V0ZSwgc3RhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBtZXRob2QgdG8gYXBwbHkgdG8gZ3VhcmQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcm91dGVcbiAgICAgKiBAcGFyYW0gc3RhdGVcbiAgICAgKi9cbiAgICBndWFyZChyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcm91dGU7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRoLnVzZXIoKSkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3Vic1snYXV0aDpjaGVjayddID0gdGhpcy5hdXRoLmNoZWNrKCkuc3Vic2NyaWJlKGNoZWNrID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudC5icm9hZGNhc3QoJ2F1dGg6bW9kYWwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0aC5zZXRSZWRpcmVjdChzdGF0ZS51cmwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19