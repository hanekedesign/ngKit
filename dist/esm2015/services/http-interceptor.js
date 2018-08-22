/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Http } from './http';
export class HttpInterceptor {
    /**
     * Create a new instance of the interceptor.
     *
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
    }
    /**
     * Intercept the http request.
     *
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        req = req.clone({
            headers: this.http.headers,
            url: this.http.getUrl(req.url)
        });
        return next.handle(req);
    }
}
HttpInterceptor.decorators = [
    { type: Injectable },
];
/** @nocollapse */
HttpInterceptor.ctorParameters = () => [
    { type: Http }
];
function HttpInterceptor_tsickle_Closure_declarations() {
    /** @type {?} */
    HttpInterceptor.prototype.http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25na2l0LyIsInNvdXJjZXMiOlsic2VydmljZXMvaHR0cC1pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBTzlCLE1BQU07Ozs7OztJQU1GLFlBQ1c7UUFBQSxTQUFJLEdBQUosSUFBSTtLQUNWOzs7Ozs7OztJQVFMLFNBQVMsQ0FBQyxHQUFxQixFQUFFLElBQWlCO1FBQzlDLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ1osT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztZQUMxQixHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztTQUNqQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMzQjs7O1lBeEJKLFVBQVU7Ozs7WUFORixJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cCB9IGZyb20gJy4vaHR0cCc7XG5pbXBvcnQge1xuICAgIEh0dHBFdmVudCwgSHR0cEhhbmRsZXIsIEh0dHBJbnRlcmNlcHRvciBhcyBJbnRlcmNlcHRvciwgSHR0cFJlcXVlc3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSHR0cEludGVyY2VwdG9yIGltcGxlbWVudHMgSW50ZXJjZXB0b3Ige1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgaW50ZXJjZXB0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGh0dHBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGh0dHA6IEh0dHBcbiAgICApIHsgfVxuXG4gICAgLyoqXG4gICAgICogSW50ZXJjZXB0IHRoZSBodHRwIHJlcXVlc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHJlcVxuICAgICAqIEBwYXJhbSAgbmV4dFxuICAgICAqL1xuICAgIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgICAgICByZXEgPSByZXEuY2xvbmUoe1xuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5odHRwLmhlYWRlcnMsXG4gICAgICAgICAgICB1cmw6IHRoaXMuaHR0cC5nZXRVcmwocmVxLnVybClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSk7XG4gICAgfVxufVxuIl19