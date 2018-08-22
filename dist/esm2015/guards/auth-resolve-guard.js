/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Authentication } from './../services/authentication';
import { Event } from './../services/event';
export class AuthResolveGuard {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1yZXNvbHZlLWd1YXJkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdraXQvIiwic291cmNlcyI6WyJndWFyZHMvYXV0aC1yZXNvbHZlLWd1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBRXRELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHNUMsTUFBTTs7Ozs7OztJQU9GLFlBQ1csTUFDQTtRQURBLFNBQUksR0FBSixJQUFJO1FBQ0osVUFBSyxHQUFMLEtBQUs7Ozs7b0JBTUosRUFBRTtLQUxUOzs7OztJQVVMLFdBQVc7UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7S0FDbkU7Ozs7O0lBS0QsV0FBVztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDdkI7Ozs7O0lBS0QsZ0JBQWdCO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUN2Qjs7Ozs7SUFLRCxLQUFLO1FBQ0QsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqQjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO29CQUN2RCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2pCLENBQUMsQ0FBQzthQUNOO1NBQ0osQ0FBQyxDQUFDO0tBQ047OztZQXBESixVQUFVOzs7O1lBSEYsY0FBYztZQUNkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkFjdGl2YXRlLCBDYW5BY3RpdmF0ZUNoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbic7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJy4vLi4vc2VydmljZXMvZXZlbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aFJlc29sdmVHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlLCBDYW5BY3RpdmF0ZUNoaWxkLCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgYXV0aFxuICAgICAqIEBwYXJhbSAgZXZlbnRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGF1dGg6IEF1dGhlbnRpY2F0aW9uLFxuICAgICAgICBwdWJsaWMgZXZlbnQ6IEV2ZW50XG4gICAgKSB7IH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzdWJzY2lwdGlvbnMgb2YgdGhlIHNlcnZpY2UuXG4gICAgICovXG4gICAgc3ViczogYW55ID0ge307XG5cbiAgICAvKipcbiAgICAgKiBPbiBzZXJ2aWNlIGRlc3Ryb3kuXG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuc3VicykuZm9yRWFjaChrID0+IHRoaXMuc3Vic1trXS51bnN1YnNjcmliZSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgaWYgdGhlIHVzZXIgY2FuIGFjdGl2YXRlIGEgcm91dGUuXG4gICAgICovXG4gICAgY2FuQWN0aXZhdGUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmd1YXJkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lIGlmIHRoZSB1c2VyIGNhbiBhY3RpdmF0ZSBjaGlsZHJlbiBvZiBhIHJvdXRlLlxuICAgICAqL1xuICAgIGNhbkFjdGl2YXRlQ2hpbGQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmd1YXJkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIG1ldGhvZCB0byBhcHBseSB0byBndWFyZC5cbiAgICAgKi9cbiAgICBndWFyZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRoLnVzZXIoKSkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3Vic1snYXV0aDpjaGVjayddID0gdGhpcy5hdXRoLmNoZWNrKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19