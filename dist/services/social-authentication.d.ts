import { Authentication } from './authentication';
import { Authorization } from './authorization';
import { Config } from './../config';
import { HttpClient } from '@angular/common/http';
import { Http } from './http';
import { Token } from './token';
import { Event } from './event';
export declare class SocialAuthentication extends Authentication {
    authorization: Authorization;
    config: Config;
    event: Event;
    http: HttpClient;
    httpService: Http;
    token: Token;
    /**
     * Constructor.
     */
    constructor(authorization: Authorization, config: Config, event: Event, http: HttpClient, httpService: Http, token: Token);
    /**
     * Login with a social provider.
     */
    /**
     * Handle succesful Facebook login.
     *
     * @param  res
     */
    handleLoginSuccess(res: object): Promise<any>;
    /**
     * Handle errors on facebook login.
     *
     * @param  error
     */
    handleLoginError: (error: object) => void;
    /**
     * Store social auth crednetials.
     *
     * @param  res
     */
    storeSocialCredentials(res: any): void;
}
