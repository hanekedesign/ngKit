import { OnDestroy } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Authentication } from './../services/authentication';
import { Event } from './../services/event';
export declare class AuthResolveGuard implements CanActivate, CanActivateChild, OnDestroy {
    auth: Authentication;
    event: Event;
    /**
     * Create a new instance.
     *
     * @param  auth
     * @param  event
     */
    constructor(auth: Authentication, event: Event);
    /**
     * The subsciptions of the service.
     */
    subs: any;
    /**
     * On service destroy.
     */
    ngOnDestroy(): void;
    /**
     * Determine if the user can activate a route.
     */
    canActivate(): Promise<boolean>;
    /**
     * Determine if the user can activate children of a route.
     */
    canActivateChild(): Promise<boolean>;
    /**
     * The method to apply to guard.
     */
    guard(): Promise<boolean>;
}
