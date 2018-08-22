/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Http } from './http';
import { Event } from './event';
import { HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
export class AuthInterceptor {
    /**
     * Create a new instance of the interceptor.
     *
     * @param {?} http
     * @param {?} event
     */
    constructor(http, event) {
        this.http = http;
        this.event = event;
    }
    /**
     * Intercept the http request.
     *
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        return next.handle(req).pipe(tap(() => { }, (error) => {
            if (error instanceof HttpErrorResponse) {
                if (error.status === 401) {
                    this.event.broadcast('auth:required', error);
                }
            }
        }));
    }
}
AuthInterceptor.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AuthInterceptor.ctorParameters = () => [
    { type: Http },
    { type: Event }
];
function AuthInterceptor_tsickle_Closure_declarations() {
    /** @type {?} */
    AuthInterceptor.prototype.http;
    /** @type {?} */
    AuthInterceptor.prototype.event;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1hdXRoLWludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdraXQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9odHRwLWF1dGgtaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM5QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2hDLE9BQU8sRUFDbUQsaUJBQWlCLEVBQzFFLE1BQU0sc0JBQXNCLENBQUM7QUFFOUIsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3JDLE1BQU07Ozs7Ozs7SUFPRixZQUNXLE1BQ0E7UUFEQSxTQUFJLEdBQUosSUFBSTtRQUNKLFVBQUssR0FBTCxLQUFLO0tBQ1g7Ozs7Ozs7O0lBUUwsU0FBUyxDQUFDLEdBQXFCLEVBQUUsSUFBaUI7UUFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDdkQsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDckMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQ2hEO2FBQ0o7U0FDSixDQUFDLENBQUMsQ0FBQztLQUNQOzs7WUEzQkosVUFBVTs7OztZQVJGLElBQUk7WUFDSixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cCB9IGZyb20gJy4vaHR0cCc7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJy4vZXZlbnQnO1xuaW1wb3J0IHtcbiAgICBIdHRwRXZlbnQsIEh0dHBJbnRlcmNlcHRvciwgSHR0cEhhbmRsZXIsIEh0dHBSZXF1ZXN0LCBIdHRwRXJyb3JSZXNwb25zZVxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgaW50ZXJjZXB0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGh0dHBcbiAgICAgKiBAcGFyYW0gIGV2ZW50XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBodHRwOiBIdHRwLFxuICAgICAgICBwdWJsaWMgZXZlbnQ6IEV2ZW50LFxuICAgICkgeyB9XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcmNlcHQgdGhlIGh0dHAgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgcmVxXG4gICAgICogQHBhcmFtICBuZXh0XG4gICAgICovXG4gICAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpLnBpcGUodGFwKCgpID0+IHsgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnQuYnJvYWRjYXN0KCdhdXRoOnJlcXVpcmVkJywgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgIH1cbn1cbiJdfQ==