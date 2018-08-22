/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Http } from './http';
import { Event } from './event';
import { HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
var AuthInterceptor = /** @class */ (function () {
    /**
     * Create a new instance of the interceptor.
     *
     * @param  http
     * @param  event
     */
    function AuthInterceptor(http, event) {
        this.http = http;
        this.event = event;
    }
    /**
     * Intercept the http request.
     *
     * @param  req
     * @param  next
     */
    /**
     * Intercept the http request.
     *
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    AuthInterceptor.prototype.intercept = /**
     * Intercept the http request.
     *
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    function (req, next) {
        var _this = this;
        return next.handle(req).pipe(tap(function () { }, function (error) {
            if (error instanceof HttpErrorResponse) {
                if (error.status === 401) {
                    _this.event.broadcast('auth:required', error);
                }
            }
        }));
    };
    AuthInterceptor.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AuthInterceptor.ctorParameters = function () { return [
        { type: Http },
        { type: Event }
    ]; };
    return AuthInterceptor;
}());
export { AuthInterceptor };
function AuthInterceptor_tsickle_Closure_declarations() {
    /** @type {?} */
    AuthInterceptor.prototype.http;
    /** @type {?} */
    AuthInterceptor.prototype.event;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1hdXRoLWludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdraXQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9odHRwLWF1dGgtaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM5QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2hDLE9BQU8sRUFDbUQsaUJBQWlCLEVBQzFFLE1BQU0sc0JBQXNCLENBQUM7QUFFOUIsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztJQUlqQzs7Ozs7T0FLRztJQUNILHlCQUNXLE1BQ0E7UUFEQSxTQUFJLEdBQUosSUFBSTtRQUNKLFVBQUssR0FBTCxLQUFLO0tBQ1g7SUFFTDs7Ozs7T0FLRzs7Ozs7Ozs7SUFDSCxtQ0FBUzs7Ozs7OztJQUFULFVBQVUsR0FBcUIsRUFBRSxJQUFpQjtRQUFsRCxpQkFRQztRQVBHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBUyxFQUFFLFVBQUMsS0FBVTtZQUNuRCxFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLEtBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDaEQ7YUFDSjtTQUNKLENBQUMsQ0FBQyxDQUFDO0tBQ1A7O2dCQTNCSixVQUFVOzs7O2dCQVJGLElBQUk7Z0JBQ0osS0FBSzs7MEJBRmQ7O1NBVWEsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHAgfSBmcm9tICcuL2h0dHAnO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL2V2ZW50JztcbmltcG9ydCB7XG4gICAgSHR0cEV2ZW50LCBIdHRwSW50ZXJjZXB0b3IsIEh0dHBIYW5kbGVyLCBIdHRwUmVxdWVzdCwgSHR0cEVycm9yUmVzcG9uc2Vcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aEludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIGludGVyY2VwdG9yLlxuICAgICAqXG4gICAgICogQHBhcmFtICBodHRwXG4gICAgICogQHBhcmFtICBldmVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgaHR0cDogSHR0cCxcbiAgICAgICAgcHVibGljIGV2ZW50OiBFdmVudCxcbiAgICApIHsgfVxuXG4gICAgLyoqXG4gICAgICogSW50ZXJjZXB0IHRoZSBodHRwIHJlcXVlc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHJlcVxuICAgICAqIEBwYXJhbSAgbmV4dFxuICAgICAqL1xuICAgIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxKS5waXBlKHRhcCgoKSA9PiB7IH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50LmJyb2FkY2FzdCgnYXV0aDpyZXF1aXJlZCcsIGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9XG59XG4iXX0=