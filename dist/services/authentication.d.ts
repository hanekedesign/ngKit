import { HttpClient } from '@angular/common/http';
import { Http } from './http';
import { Authorization } from './authorization';
import { OnDestroy } from '@angular/core';
import { Config } from './../config';
import { Token } from './token';
import { Event } from './event';
import { Observable, Observer } from 'rxjs';
export declare class Authentication implements OnDestroy {
    authorization: Authorization;
    config: Config;
    event: Event;
    http: HttpClient;
    httpService: Http;
    token: Token;
    /**
     * Create a new instance of the service.
     *
     * @param  authorization
     * @param  config
     * @param  event
     * @param  http
     * @param  httpService
     * @param  token
     */
    constructor(authorization: Authorization, config: Config, event: Event, http: HttpClient, httpService: Http, token: Token);
    /**
     * Authorized user.
     */
    authUser: any;
    /**
     * State of the user authentication.
     */
    authenticated: boolean;
    /**
     * Event channels.
     */
    protected channels: string[];
    /**
     * The redirect data on the service.
     */
    private redirect;
    /**
     * The subsciptions of the service.
     */
    subs: any;
    /**
     * The timeouts of the component.
     */
    timeouts: any;
    /**
     * On service destroy.
     */
    ngOnDestroy(): void;
    /**
     * Check if user is logged in.
     *
     * @param  force
     */
    check(force?: boolean): Observable<boolean>;
    /**
     * Resolve the auth check.
     *
     * @param observer
     * @param authenticated
     */
    checkResolve(observer: Observer<boolean>, authenticated: boolean): void;
    /**
     * The service event listeners.
     */
    eventListeners(): void;
    /**
     * Send a forgot password request.
     *
     * @param  credentials
     * @param  endpoint
     * @param  headers
     */
    forgotPassword(data: any, endpoint?: string, headers?: {}): Promise<any>;
    /**
     * Returns the redirect data.
     */
    getRedirect(): any;
    /**
     * Get the authentication token.
     */
    getToken(): Promise<any>;
    /**
     * Get the current authenticated user.
     *
     * @param  endpoint
     */
    getUser(endpoint?: string): Promise<any>;
    /**
     * Get the value authenticated value.
     */
    getAuthenticated(): boolean;
    /**
     * Set if authenticated value.
     */
    setAuthenticated(value: boolean): boolean;
    /**
     * Send a login request.
     *
     * @param  credentials
     * @param  endpoint
     * @param  headers
     */
    login(credentials: any, endpoint?: string, headers?: {}): Promise<any>;
    /**
     * Send a request to log the authenticated user out.
     */
    logout(endpoint?: string, headers?: {}): Promise<any>;
    /**
     * Actions to perform on login.
     *
     * @param  res
     */
    onLogin(res: object): Promise<any>;
    /**
     * Actions to perform on logout.
     */
    onLogout(): void;
    /**
     * Returns and clears the redirect data.
     */
    pullRedirect(): any;
    /**
     * Send a register request.
     *
     * @param  data
     * @param   endpoint
     * @param  headers
     * @param postRegisterLogin
     */
    register(data: object, endpoint?: string, headers?: {}, postRegisterLogin?: boolean): Promise<any>;
    /**
     * Send a reset password request.
     *
     * @param   credentials
     * @param   endpoint
     * @param  headers
     */
    resetPassword(data: any, endpoint?: string, headers?: {}): Promise<any>;
    /**
     * Resolve the authenticated user.
     */
    resolveUser(): Promise<any>;
    /**
     * Set the redirect data.
     */
    setRedirect(value: any): any;
    /**
     * Set the current authenticated user.
     *
     * @param  user
     */
    setUser(user: object): Promise<any>;
    /**
     * Store aut token and broadcast an event.
     *
     * @param  res
     */
    storeToken(res: any): Promise<any>;
    /**
     * Unauthenticate the current user.
     */
    unauthenticate(): void;
    /**
     * Get the current authenticated user.
     */
    user: () => any;
}
