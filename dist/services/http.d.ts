import { OnDestroy } from '@angular/core';
import { Config } from './../config';
import { Event } from './event';
import { Token } from './token';
import { HttpHeaders, HttpParams } from '@angular/common/http';
export declare class Http implements OnDestroy {
    config: Config;
    event: Event;
    token: Token;
    /**
     * Create a new instance of the service.
     *
     * @param  config
     * @param  event
     * @param  token
     */
    constructor(config: Config, event: Event, token: Token);
    /**
     * Assignable base url for http calls.
     */
    baseUrl: string;
    /**
     * Headers to be sent with all http calls.
     */
    headers: HttpHeaders;
    /**
     * The subsciptions of the service.
     */
    subs: any;
    /**
     * On service destroy.
     */
    ngOnDestroy(): void;
    /**
     * Build url parameters for requests.
     *
     * @param  params
     */
    buildParams(params: any): HttpParams;
    /**
     * Event listeners.
     */
    private eventListeners();
    /**
     * Get url for http request.
     *
     * @param  url
     */
    getUrl(url: string): string;
    /**
     * Set the default headers for http request.
     */
    setDefaultHeaders(): void;
    /**
     * Add a token header to the request.
     */
    tokenHeader(): Promise<any>;
}
