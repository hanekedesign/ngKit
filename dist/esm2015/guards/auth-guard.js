/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Authentication } from './../services/authentication';
import { Event } from './../services/event';
export class AuthGuard {
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
        route;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25na2l0LyIsInNvdXJjZXMiOlsiZ3VhcmRzL2F1dGgtZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFJdEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUc1QyxNQUFNOzs7Ozs7O0lBT0YsWUFDVyxNQUNBO1FBREEsU0FBSSxHQUFKLElBQUk7UUFDSixVQUFLLEdBQUwsS0FBSzs7OztvQkFNSixFQUFFO0tBTFQ7Ozs7O0lBVUwsV0FBVztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztLQUNuRTs7Ozs7Ozs7SUFRRCxXQUFXLENBQUMsS0FBNkIsRUFBRSxLQUEwQjtRQUNqRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDbkM7Ozs7Ozs7O0lBUUQsZ0JBQWdCLENBQUMsS0FBNkIsRUFBRSxLQUEwQjtRQUN0RSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDbkM7Ozs7Ozs7O0lBUUQsS0FBSyxDQUFDLEtBQTZCLEVBQUUsS0FBMEI7UUFDM0QsS0FBSyxDQUFDO1FBRU4sTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqQjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQzFELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ1IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNqQjtvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNqQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ2xCO2lCQUNKLENBQUMsQ0FBQzthQUNOO1NBQ0osQ0FBQyxDQUFDO0tBQ047OztZQXJFSixVQUFVOzs7O1lBSEYsY0FBYztZQUNkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgQ2FuQWN0aXZhdGUsIENhbkFjdGl2YXRlQ2hpbGQsIFJvdXRlclN0YXRlU25hcHNob3Rcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbic7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJy4vLi4vc2VydmljZXMvZXZlbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aEd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUsIENhbkFjdGl2YXRlQ2hpbGQsIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtICBhdXRoXG4gICAgICogQHBhcmFtICBldmVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgYXV0aDogQXV0aGVudGljYXRpb24sXG4gICAgICAgIHB1YmxpYyBldmVudDogRXZlbnRcbiAgICApIHsgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHN1YnNjaXB0aW9ucyBvZiB0aGUgc2VydmljZS5cbiAgICAgKi9cbiAgICBzdWJzOiBhbnkgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIE9uIHNlcnZpY2UgZGVzdHJveS5cbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5zdWJzKS5mb3JFYWNoKGsgPT4gdGhpcy5zdWJzW2tdLnVuc3Vic2NyaWJlKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZSBpZiB0aGUgdXNlciBjYW4gYWN0aXZhdGUgYSByb3V0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByb3V0ZVxuICAgICAqIEBwYXJhbSBzdGF0ZVxuICAgICAqL1xuICAgIGNhbkFjdGl2YXRlKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5ndWFyZChyb3V0ZSwgc3RhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZSBpZiB0aGUgdXNlciBjYW4gYWN0aXZhdGUgY2hpbGRyZW4gb2YgYSByb3V0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgcm91dGVcbiAgICAgKiBAcGFyYW0gIHN0YXRlICAgICAqXG4gICAgICovXG4gICAgY2FuQWN0aXZhdGVDaGlsZChyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3VhcmQocm91dGUsIHN0YXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbWV0aG9kIHRvIGFwcGx5IHRvIGd1YXJkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJvdXRlXG4gICAgICogQHBhcmFtIHN0YXRlXG4gICAgICovXG4gICAgZ3VhcmQocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJvdXRlO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXV0aC51c2VyKCkpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YnNbJ2F1dGg6Y2hlY2snXSA9IHRoaXMuYXV0aC5jaGVjaygpLnN1YnNjcmliZShjaGVjayA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGVjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnQuYnJvYWRjYXN0KCdhdXRoOm1vZGFsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dGguc2V0UmVkaXJlY3Qoc3RhdGUudXJsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==