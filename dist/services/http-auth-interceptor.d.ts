import { Http } from './http';
import { Event } from './event';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare class AuthInterceptor implements HttpInterceptor {
    http: Http;
    event: Event;
    /**
     * Create a new instance of the interceptor.
     *
     * @param  http
     * @param  event
     */
    constructor(http: Http, event: Event);
    /**
     * Intercept the http request.
     *
     * @param  req
     * @param  next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
