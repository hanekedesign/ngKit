import { Injectable } from '@angular/core';
import { CacheItemModel } from '../models/index';
import { Storage } from './storage';
import { Config } from './../config';
import { Event } from './event';

@Injectable()
export class Cache {
    /**
     * The name of the cache instance.
     *
     * @type {string}
     */
    static cacheName: string = 'ngkit_cache';

    /**
     * In memory collection of cache.
     *
     * @type {string}
     */
    private _cache = {};

    /**
     * Constructor.
     */
    constructor(
        private config: Config,
        private event: Event,
        private storage: Storage
    ) {
        this.retrieveCache();

        this.event.listen('auth:loggedOut').subscribe(() => {
            this._cache = {};
            this.clear();
        });
    }

    /**
     * Retrieve the stored cache.
     *
     * @return {any}
     */
    protected retrieveCache(): any {
        this.storage.get(Cache.cacheName).then(cache => {
            if (cache) {
                Object.keys(cache).forEach((item) => {
                    cache[item] = new CacheItemModel(cache[item])
                });

                return this.cache = cache;
            } else {
                return this.cache = this.store();
            }
        });
    }

    /**
     * Save the cache to storage.
     *
     * @param  {string} key
     * @param  {any} value
     * @return {any}
     */
    store(): any {
        this.storage.set(Cache.cacheName, this._cache);

        return this._cache;
    }

    /**
     * Accessor to the in memeory cache.
     *
     * @return {any}
     */
    get cache(): any {
        return this._cache;
    }

    /**
     * Mutator to the in memeory cache.
     *
     */
    set cache(value) {
        this._cache = value;
    }

    /**
     * Get an item from cache.
     *
     * @param  {string} key [description]
     * @return {any} [description]
     */
    get(key: string): any {
        if (this.cache[key] && !this.cache[key].isExpired()) {
            return this.cache[key].value;
        }

        this.remove(key);

        return null;
    }

    /**
     * Set an item to cache.
     *
     * @param  {string} key
     * @param  {any} value
     * @param  {number}
     * @return {void}
     */
    set(
        key: string,
        value: any,
        expires: number = this.config.get('cache.expires')
    ): void {
        let cacheItem = new CacheItemModel({
            value: value, expires: expires
        });

        this._cache[key] = cacheItem;

        this.store();
    }

    /**
     * Remove an item from cache.
     *
     * @param {string} key
     */
    remove(key: string): void {
        delete this.cache[key];
        this.store();
    }

    /**
     * Clear the cache.
     */
    clear(): void {
        this.storage.remove(Cache.cacheName);
    }

    /**
     * Get an item from cache and remove it.
     *
     * @param  {string} key
     * @return {any}
     */
    pull(key: string): any {
        let value = this.get(key);
        this.remove(key);

        return value;
    }

    /**
     * Check if cache has an item.
     *
     * @param  {string} key
     * @return {boolean}
     */
    has(key: string): boolean {
        return this.get(key) !== null ? true : false;
    }
}
