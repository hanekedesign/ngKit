import { Http } from './http';
import { HttpEvent, HttpHandler, HttpInterceptor as Interceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare class HttpInterceptor implements Interceptor {
    http: Http;
    /**
     * Create a new instance of the interceptor.
     *
     * @param  http
     */
    constructor(http: Http);
    /**
     * Intercept the http request.
     *
     * @param  req
     * @param  next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
