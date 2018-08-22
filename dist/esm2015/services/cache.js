/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { CacheItemModel } from '../models/index';
import { Storage } from './storage';
import { Config } from './../config';
import { Event } from './event';
/**
 * @record
 */
function CacheInterface() { }
function CacheInterface_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    [key: string]: CacheItemModel;
    */
}
export class Cache {
    /**
     * Constructor.
     * @param {?} config
     * @param {?} event
     * @param {?} storage
     */
    constructor(config, event, storage) {
        this.config = config;
        this.event = event;
        this.storage = storage;
        /**
         * The name of the cache instance.
         */
        this.cacheName = 'ngkit_cache';
        /**
         * In memory collection of cache.
         */
        this._cache = {};
        /**
         * The subsciptions of the service.
         */
        this.subs = {};
        this.retrieveCache();
        this.subs['auth:loggedOut'] = this.event.listen('auth:loggedOut')
            .subscribe(() => {
            this._cache = {};
            this.clear();
        });
    }
    /**
     * On service destroy.
     * @return {?}
     */
    ngOnDestroy() {
        Object.keys(this.subs).forEach(k => this.subs[k].unsubscribe());
    }
    /**
     * Retrieve the stored cache.
     * @return {?}
     */
    retrieveCache() {
        return new Promise((resolve, reject) => {
            this.storage.get(this.cacheName).then(cache => {
                if (cache) {
                    Object.keys(cache).forEach((item) => {
                        cache[item] = new CacheItemModel(cache[item]);
                    });
                    this.cache = cache;
                }
                else {
                    this.cache = this.store();
                }
                resolve(this.cache);
            }, err => reject(err));
        });
    }
    /**
     * Save the cache to storage.
     *
     * @return {?}
     */
    store() {
        this.storage.set(this.cacheName, this._cache);
        return this._cache;
    }
    /**
     * Accessor to the in memeory cache.
     * @return {?}
     */
    get cache() {
        return this._cache;
    }
    /**
     * Mutator to the in memeory cache.
     *
     * @param {?} value
     * @return {?}
     */
    set cache(value) {
        this._cache = value;
    }
    /**
     * Get an item from cache.
     *
     * @param {?} key
     * @param {?=} defautValue
     * @return {?}
     */
    get(key, defautValue = null) {
        if (this.cache[key] && !this.cache[key].isExpired()) {
            return this.cache[key].value;
        }
        else if (defautValue) {
            return defautValue;
        }
        else {
            this.remove(key);
            return null;
        }
    }
    /**
     * Set an item to cache.
     *
     * @param {?} key
     * @param {?} value
     * @param {?=} expires
     * @return {?}
     */
    set(key, value, expires = this.config.get('cache.expires')) {
        let /** @type {?} */ cacheItem = new CacheItemModel({ value: value, expires: expires });
        this._cache[key] = cacheItem;
        this.store();
    }
    /**
     * Remove an item from cache.
     *
     * @param {?} key
     * @return {?}
     */
    remove(key) {
        delete this.cache[key];
        this.store();
    }
    /**
     * Clear the cache.
     * @return {?}
     */
    clear() {
        this.storage.remove(this.cacheName);
    }
    /**
     * Get an item from cache and remove it.
     *
     * @param {?} key
     * @return {?}
     */
    pull(key) {
        let /** @type {?} */ value = this.get(key);
        this.remove(key);
        return value;
    }
    /**
     * Check if cache has an item.
     *
     * @param {?} key
     * @return {?}
     */
    has(key) {
        return this.get(key) !== null ? true : false;
    }
}
Cache.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Cache.ctorParameters = () => [
    { type: Config },
    { type: Event },
    { type: Storage }
];
function Cache_tsickle_Closure_declarations() {
    /**
     * The name of the cache instance.
     * @type {?}
     */
    Cache.prototype.cacheName;
    /**
     * In memory collection of cache.
     * @type {?}
     */
    Cache.prototype._cache;
    /**
     * The subsciptions of the service.
     * @type {?}
     */
    Cache.prototype.subs;
    /** @type {?} */
    Cache.prototype.config;
    /** @type {?} */
    Cache.prototype.event;
    /** @type {?} */
    Cache.prototype.storage;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ2tpdC8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2NhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDckMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7Ozs7OztBQU9oQyxNQUFNOzs7Ozs7O0lBY0YsWUFDWSxRQUNBLE9BQ0E7UUFGQSxXQUFNLEdBQU4sTUFBTTtRQUNOLFVBQUssR0FBTCxLQUFLO1FBQ0wsWUFBTyxHQUFQLE9BQU87Ozs7eUJBYkMsYUFBYTs7OztzQkFLQSxFQUFFOzs7O29CQXNCdkIsRUFBRTtRQVpWLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7YUFDNUQsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNoQixDQUFDLENBQUM7S0FDVjs7Ozs7SUFVRCxXQUFXO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0tBQ25FOzs7OztJQUtTLGFBQWE7UUFDbkIsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFD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QyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakIsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNoQjs7Ozs7OztJQU9ELEdBQUcsQ0FBQyxHQUFXO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztLQUNoRDs7O1lBbEtKLFVBQVU7Ozs7WUFQRixNQUFNO1lBQ04sS0FBSztZQUZMLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhY2hlSXRlbU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICcuL3N0b3JhZ2UnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi8uLi9jb25maWcnO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL2V2ZW50JztcblxuaW50ZXJmYWNlIENhY2hlSW50ZXJmYWNlIHtcbiAgICBba2V5OiBzdHJpbmddOiBDYWNoZUl0ZW1Nb2RlbDtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhY2hlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgY2FjaGUgaW5zdGFuY2UuXG4gICAgICovXG4gICAgY2FjaGVOYW1lOiBzdHJpbmcgPSAnbmdraXRfY2FjaGUnO1xuXG4gICAgLyoqXG4gICAgICogSW4gbWVtb3J5IGNvbGxlY3Rpb24gb2YgY2FjaGUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBfY2FjaGU6IENhY2hlSW50ZXJmYWNlID0ge307XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3Rvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBldmVudDogRXZlbnQsXG4gICAgICAgIHByaXZhdGUgc3RvcmFnZTogU3RvcmFnZVxuICAgICkge1xuICAgICAgICB0aGlzLnJldHJpZXZlQ2FjaGUoKTtcblxuICAgICAgICB0aGlzLnN1YnNbJ2F1dGg6bG9nZ2VkT3V0J10gPSB0aGlzLmV2ZW50Lmxpc3RlbignYXV0aDpsb2dnZWRPdXQnKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FjaGUgPSB7fTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc3Vic2NpcHRpb25zIG9mIHRoZSBzZXJ2aWNlLlxuICAgICAqL1xuICAgIHN1YnM6IGFueSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogT24gc2VydmljZSBkZXN0cm95LlxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnN1YnMpLmZvckVhY2goayA9PiB0aGlzLnN1YnNba10udW5zdWJzY3JpYmUoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0cmlldmUgdGhlIHN0b3JlZCBjYWNoZS5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgcmV0cmlldmVDYWNoZSgpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9yYWdlLmdldCh0aGlzLmNhY2hlTmFtZSkudGhlbihjYWNoZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNhY2hlKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGNhY2hlKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWNoZVtpdGVtXSA9IG5ldyBDYWNoZUl0ZW1Nb2RlbChjYWNoZVtpdGVtXSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZSA9IGNhY2hlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGUgPSB0aGlzLnN0b3JlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmNhY2hlKTtcbiAgICAgICAgICAgIH0sIGVyciA9PiByZWplY3QoZXJyKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNhdmUgdGhlIGNhY2hlIHRvIHN0b3JhZ2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleVxuICAgICAqIEBwYXJhbSAgdmFsdWVcbiAgICAgKi9cbiAgICBzdG9yZSgpOiBhbnkge1xuICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0KHRoaXMuY2FjaGVOYW1lLCB0aGlzLl9jYWNoZSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFjY2Vzc29yIHRvIHRoZSBpbiBtZW1lb3J5IGNhY2hlLlxuICAgICAqL1xuICAgIGdldCBjYWNoZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTXV0YXRvciB0byB0aGUgaW4gbWVtZW9yeSBjYWNoZS5cbiAgICAgKlxuICAgICAqL1xuICAgIHNldCBjYWNoZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9jYWNoZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbiBpdGVtIGZyb20gY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gICBrZXlcbiAgICAgKiBAcGFyYW0gIGRlZmF1dFZhbHVlXG4gICAgICovXG4gICAgZ2V0KGtleTogc3RyaW5nLCBkZWZhdXRWYWx1ZTogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgICAgIGlmICh0aGlzLmNhY2hlW2tleV0gJiYgIXRoaXMuY2FjaGVba2V5XS5pc0V4cGlyZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVba2V5XS52YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChkZWZhdXRWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmF1dFZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUoa2V5KTtcblxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgYW4gaXRlbSB0byBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5XG4gICAgICogQHBhcmFtICB2YWx1ZVxuICAgICAqIEBwYXJhbSAgZXhwaXJlc1xuICAgICAqL1xuICAgIHNldChcbiAgICAgICAga2V5OiBzdHJpbmcsXG4gICAgICAgIHZhbHVlOiBhbnksXG4gICAgICAgIGV4cGlyZXM6IG51bWJlciA9IHRoaXMuY29uZmlnLmdldCgnY2FjaGUuZXhwaXJlcycpXG4gICAgKTogdm9pZCB7XG4gICAgICAgIGxldCBjYWNoZUl0ZW0gPSBuZXcgQ2FjaGVJdGVtTW9kZWwoeyB2YWx1ZTogdmFsdWUsIGV4cGlyZXM6IGV4cGlyZXMgfSk7XG5cbiAgICAgICAgdGhpcy5fY2FjaGVba2V5XSA9IGNhY2hlSXRlbTtcblxuICAgICAgICB0aGlzLnN0b3JlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFuIGl0ZW0gZnJvbSBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKi9cbiAgICByZW1vdmUoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuY2FjaGVba2V5XTtcbiAgICAgICAgdGhpcy5zdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsZWFyIHRoZSBjYWNoZS5cbiAgICAgKi9cbiAgICBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdG9yYWdlLnJlbW92ZSh0aGlzLmNhY2hlTmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFuIGl0ZW0gZnJvbSBjYWNoZSBhbmQgcmVtb3ZlIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtICBrZXlcbiAgICAgKi9cbiAgICBwdWxsKGtleTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXQoa2V5KTtcbiAgICAgICAgdGhpcy5yZW1vdmUoa2V5KTtcblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgY2FjaGUgaGFzIGFuIGl0ZW0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleVxuICAgICAqL1xuICAgIGhhcyhrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoa2V5KSAhPT0gbnVsbCA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG59XG4iXX0=