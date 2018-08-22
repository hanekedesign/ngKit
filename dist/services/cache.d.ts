import { OnDestroy } from '@angular/core';
import { Storage } from './storage';
import { Config } from './../config';
import { Event } from './event';
export declare class Cache implements OnDestroy {
    private config;
    private event;
    private storage;
    /**
     * The name of the cache instance.
     */
    cacheName: string;
    /**
     * In memory collection of cache.
     */
    private _cache;
    /**
     * Constructor.
     */
    constructor(config: Config, event: Event, storage: Storage);
    /**
     * The subsciptions of the service.
     */
    subs: any;
    /**
     * On service destroy.
     */
    ngOnDestroy(): void;
    /**
     * Retrieve the stored cache.
     */
    protected retrieveCache(): Promise<any>;
    /**
     * Save the cache to storage.
     *
     * @param  key
     * @param  value
     */
    store(): any;
    /**
     * Accessor to the in memeory cache.
     */
    /**
     * Mutator to the in memeory cache.
     *
     */
    cache: any;
    /**
     * Get an item from cache.
     *
     * @param   key
     * @param  defautValue
     */
    get(key: string, defautValue?: any): any;
    /**
     * Set an item to cache.
     *
     * @param  key
     * @param  value
     * @param  expires
     */
    set(key: string, value: any, expires?: number): void;
    /**
     * Remove an item from cache.
     *
     * @param key
     */
    remove(key: string): void;
    /**
     * Clear the cache.
     */
    clear(): void;
    /**
     * Get an item from cache and remove it.
     *
     * @param  key
     */
    pull(key: string): any;
    /**
     * Check if cache has an item.
     *
     * @param  key
     */
    has(key: string): boolean;
}
