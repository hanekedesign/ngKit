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
var Cache = /** @class */ (function () {
    /**
     * Constructor.
     */
    function Cache(config, event, storage) {
        var _this = this;
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
            .subscribe(function () {
            _this._cache = {};
            _this.clear();
        });
    }
    /**
     * On service destroy.
     */
    /**
     * On service destroy.
     * @return {?}
     */
    Cache.prototype.ngOnDestroy = /**
     * On service destroy.
     * @return {?}
     */
    function () {
        var _this = this;
        Object.keys(this.subs).forEach(function (k) { return _this.subs[k].unsubscribe(); });
    };
    /**
     * Retrieve the stored cache.
     */
    /**
     * Retrieve the stored cache.
     * @return {?}
     */
    Cache.prototype.retrieveCache = /**
     * Retrieve the stored cache.
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get(_this.cacheName).then(function (cache) {
                if (cache) {
                    Object.keys(cache).forEach(function (item) {
                        cache[item] = new CacheItemModel(cache[item]);
                    });
                    _this.cache = cache;
                }
                else {
                    _this.cache = _this.store();
                }
                resolve(_this.cache);
            }, function (err) { return reject(err); });
        });
    };
    /**
     * Save the cache to storage.
     *
     * @param  key
     * @param  value
     */
    /**
     * Save the cache to storage.
     *
     * @return {?}
     */
    Cache.prototype.store = /**
     * Save the cache to storage.
     *
     * @return {?}
     */
    function () {
        this.storage.set(this.cacheName, this._cache);
        return this._cache;
    };
    Object.defineProperty(Cache.prototype, "cache", {
        /**
         * Accessor to the in memeory cache.
         */
        get: /**
         * Accessor to the in memeory cache.
         * @return {?}
         */
        function () {
            return this._cache;
        },
        /**
         * Mutator to the in memeory cache.
         *
         */
        set: /**
         * Mutator to the in memeory cache.
         *
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._cache = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get an item from cache.
     *
     * @param   key
     * @param  defautValue
     */
    /**
     * Get an item from cache.
     *
     * @param {?} key
     * @param {?=} defautValue
     * @return {?}
     */
    Cache.prototype.get = /**
     * Get an item from cache.
     *
     * @param {?} key
     * @param {?=} defautValue
     * @return {?}
     */
    function (key, defautValue) {
        if (defautValue === void 0) { defautValue = null; }
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
    };
    /**
     * Set an item to cache.
     *
     * @param  key
     * @param  value
     * @param  expires
     */
    /**
     * Set an item to cache.
     *
     * @param {?} key
     * @param {?} value
     * @param {?=} expires
     * @return {?}
     */
    Cache.prototype.set = /**
     * Set an item to cache.
     *
     * @param {?} key
     * @param {?} value
     * @param {?=} expires
     * @return {?}
     */
    function (key, value, expires) {
        if (expires === void 0) { expires = this.config.get('cache.expires'); }
        var /** @type {?} */ cacheItem = new CacheItemModel({ value: value, expires: expires });
        this._cache[key] = cacheItem;
        this.store();
    };
    /**
     * Remove an item from cache.
     *
     * @param key
     */
    /**
     * Remove an item from cache.
     *
     * @param {?} key
     * @return {?}
     */
    Cache.prototype.remove = /**
     * Remove an item from cache.
     *
     * @param {?} key
     * @return {?}
     */
    function (key) {
        delete this.cache[key];
        this.store();
    };
    /**
     * Clear the cache.
     */
    /**
     * Clear the cache.
     * @return {?}
     */
    Cache.prototype.clear = /**
     * Clear the cache.
     * @return {?}
     */
    function () {
        this.storage.remove(this.cacheName);
    };
    /**
     * Get an item from cache and remove it.
     *
     * @param  key
     */
    /**
     * Get an item from cache and remove it.
     *
     * @param {?} key
     * @return {?}
     */
    Cache.prototype.pull = /**
     * Get an item from cache and remove it.
     *
     * @param {?} key
     * @return {?}
     */
    function (key) {
        var /** @type {?} */ value = this.get(key);
        this.remove(key);
        return value;
    };
    /**
     * Check if cache has an item.
     *
     * @param  key
     */
    /**
     * Check if cache has an item.
     *
     * @param {?} key
     * @return {?}
     */
    Cache.prototype.has = /**
     * Check if cache has an item.
     *
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.get(key) !== null ? true : false;
    };
    Cache.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Cache.ctorParameters = function () { return [
        { type: Config },
        { type: Event },
        { type: Storage }
    ]; };
    return Cache;
}());
export { Cache };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ2tpdC8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2NhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDckMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7Ozs7Ozs7SUFrQjVCOztPQUVHO0lBQ0gsZUFDWSxRQUNBLE9BQ0E7UUFIWixpQkFZQztRQVhXLFdBQU0sR0FBTixNQUFNO1FBQ04sVUFBSyxHQUFMLEtBQUs7UUFDTCxZQUFPLEdBQVAsT0FBTzs7Ozt5QkFiQyxhQUFhOzs7O3NCQUtBLEVBQUU7Ozs7b0JBc0J2QixFQUFFO1FBWlYsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXJCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQzthQUM1RCxTQUFTLENBQUM7WUFDUCxLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNqQixLQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDaEIsQ0FBQyxDQUFDO0tBQ1Y7SUFPRDs7T0FFRzs7Ozs7SUFDSCwyQkFBVzs7OztJQUFYO1FBQUEsaUJBRUM7UUFERyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUExQixDQUEwQixDQUFDLENBQUM7S0FDbkU7SUFFRDs7T0FFRzs7Ozs7SUFDTyw2QkFBYTs7OztJQUF2QjtRQUFBLGlCQWdCQztRQWZHLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQy9CLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLO2dCQUN2QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTt3QkFDNUIsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO3FCQUNoRCxDQUFDLENBQUM7b0JBRUgsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7aUJBQ3RCO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUM3QjtnQkFFRCxPQUFPLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3ZCLEVBQUUsVUFBQSxHQUFHLElBQUksT0FBQSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQVgsQ0FBVyxDQUFDLENBQUM7U0FDMUIsQ0FBQyxDQUFDO0tBQ047SUFFRDs7Ozs7T0FLRzs7Ozs7O0lBQ0gscUJBQUs7Ozs7O0lBQUw7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU5QyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztLQUN0QjtJQUtELHNCQUFJLHdCQUFLO1FBSFQ7O1dBRUc7Ozs7O1FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUN0QjtRQUVEOzs7V0FHRzs7Ozs7OztRQUNILFVBQVUsS0FBSztZQUNYLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3ZCOzs7T0FSQTtJQVVEOzs7OztPQUtHOzs7Ozs7OztJQUNILG1CQUFHOzs7Ozs7O0lBQUgsVUFBSSxHQUFXLEVBQUUsV0FBdUI7UUFBdkIsNEJBQUEsRUFBQSxrQkFBdUI7UUFDcEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUNoQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxXQUFXLENBQUM7U0FDdEI7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFakIsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNmO0tBQ0o7SUFFRDs7Ozs7O09BTUc7Ozs7Ozs7OztJQUNILG1CQUFHOzs7Ozs7OztJQUFILFVBQ0ksR0FBVyxFQUNYLEtBQVUsRUFDVixPQUFrRDtRQUFsRCx3QkFBQSxFQUFBLFVBQWtCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQztRQUVsRCxxQkFBSSxTQUFTLEdBQUcsSUFBSSxjQUFjLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRXZFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBRTdCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUNoQjtJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCxzQkFBTTs7Ozs7O0lBQU4sVUFBTyxHQUFXO1FBQ2QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUNoQjtJQUVEOztPQUVHOzs7OztJQUNILHFCQUFLOzs7O0lBQUw7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDdkM7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsb0JBQUk7Ozs7OztJQUFKLFVBQUssR0FBVztRQUNaLHFCQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakIsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNoQjtJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCxtQkFBRzs7Ozs7O0lBQUgsVUFBSSxHQUFXO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztLQUNoRDs7Z0JBbEtKLFVBQVU7Ozs7Z0JBUEYsTUFBTTtnQkFDTixLQUFLO2dCQUZMLE9BQU87O2dCQUZoQjs7U0FXYSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWNoZUl0ZW1Nb2RlbCB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4vLi4vY29uZmlnJztcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSAnLi9ldmVudCc7XG5cbmludGVyZmFjZSBDYWNoZUludGVyZmFjZSB7XG4gICAgW2tleTogc3RyaW5nXTogQ2FjaGVJdGVtTW9kZWw7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYWNoZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIGNhY2hlIGluc3RhbmNlLlxuICAgICAqL1xuICAgIGNhY2hlTmFtZTogc3RyaW5nID0gJ25na2l0X2NhY2hlJztcblxuICAgIC8qKlxuICAgICAqIEluIG1lbW9yeSBjb2xsZWN0aW9uIG9mIGNhY2hlLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2NhY2hlOiBDYWNoZUludGVyZmFjZSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3IuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY29uZmlnOiBDb25maWcsXG4gICAgICAgIHByaXZhdGUgZXZlbnQ6IEV2ZW50LFxuICAgICAgICBwcml2YXRlIHN0b3JhZ2U6IFN0b3JhZ2VcbiAgICApIHtcbiAgICAgICAgdGhpcy5yZXRyaWV2ZUNhY2hlKCk7XG5cbiAgICAgICAgdGhpcy5zdWJzWydhdXRoOmxvZ2dlZE91dCddID0gdGhpcy5ldmVudC5saXN0ZW4oJ2F1dGg6bG9nZ2VkT3V0JylcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlID0ge307XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHN1YnNjaXB0aW9ucyBvZiB0aGUgc2VydmljZS5cbiAgICAgKi9cbiAgICBzdWJzOiBhbnkgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIE9uIHNlcnZpY2UgZGVzdHJveS5cbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5zdWJzKS5mb3JFYWNoKGsgPT4gdGhpcy5zdWJzW2tdLnVuc3Vic2NyaWJlKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlIHRoZSBzdG9yZWQgY2FjaGUuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHJldHJpZXZlQ2FjaGUoKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5nZXQodGhpcy5jYWNoZU5hbWUpLnRoZW4oY2FjaGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjYWNoZSkge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjYWNoZSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVbaXRlbV0gPSBuZXcgQ2FjaGVJdGVtTW9kZWwoY2FjaGVbaXRlbV0pXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGUgPSBjYWNoZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlID0gdGhpcy5zdG9yZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5jYWNoZSk7XG4gICAgICAgICAgICB9LCBlcnIgPT4gcmVqZWN0KGVycikpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTYXZlIHRoZSBjYWNoZSB0byBzdG9yYWdlLlxuICAgICAqXG4gICAgICogQHBhcmFtICBrZXlcbiAgICAgKiBAcGFyYW0gIHZhbHVlXG4gICAgICovXG4gICAgc3RvcmUoKTogYW55IHtcbiAgICAgICAgdGhpcy5zdG9yYWdlLnNldCh0aGlzLmNhY2hlTmFtZSwgdGhpcy5fY2FjaGUpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBY2Nlc3NvciB0byB0aGUgaW4gbWVtZW9yeSBjYWNoZS5cbiAgICAgKi9cbiAgICBnZXQgY2FjaGUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE11dGF0b3IgdG8gdGhlIGluIG1lbWVvcnkgY2FjaGUuXG4gICAgICpcbiAgICAgKi9cbiAgICBzZXQgY2FjaGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fY2FjaGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYW4gaXRlbSBmcm9tIGNhY2hlLlxuICAgICAqXG4gICAgICogQHBhcmFtICAga2V5XG4gICAgICogQHBhcmFtICBkZWZhdXRWYWx1ZVxuICAgICAqL1xuICAgIGdldChrZXk6IHN0cmluZywgZGVmYXV0VmFsdWU6IGFueSA9IG51bGwpOiBhbnkge1xuICAgICAgICBpZiAodGhpcy5jYWNoZVtrZXldICYmICF0aGlzLmNhY2hlW2tleV0uaXNFeHBpcmVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlW2tleV0udmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZGVmYXV0VmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWZhdXRWYWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGtleSk7XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGFuIGl0ZW0gdG8gY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleVxuICAgICAqIEBwYXJhbSAgdmFsdWVcbiAgICAgKiBAcGFyYW0gIGV4cGlyZXNcbiAgICAgKi9cbiAgICBzZXQoXG4gICAgICAgIGtleTogc3RyaW5nLFxuICAgICAgICB2YWx1ZTogYW55LFxuICAgICAgICBleHBpcmVzOiBudW1iZXIgPSB0aGlzLmNvbmZpZy5nZXQoJ2NhY2hlLmV4cGlyZXMnKVxuICAgICk6IHZvaWQge1xuICAgICAgICBsZXQgY2FjaGVJdGVtID0gbmV3IENhY2hlSXRlbU1vZGVsKHsgdmFsdWU6IHZhbHVlLCBleHBpcmVzOiBleHBpcmVzIH0pO1xuXG4gICAgICAgIHRoaXMuX2NhY2hlW2tleV0gPSBjYWNoZUl0ZW07XG5cbiAgICAgICAgdGhpcy5zdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbiBpdGVtIGZyb20gY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICovXG4gICAgcmVtb3ZlKGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmNhY2hlW2tleV07XG4gICAgICAgIHRoaXMuc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGVhciB0aGUgY2FjaGUuXG4gICAgICovXG4gICAgY2xlYXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUodGhpcy5jYWNoZU5hbWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbiBpdGVtIGZyb20gY2FjaGUgYW5kIHJlbW92ZSBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5XG4gICAgICovXG4gICAgcHVsbChrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0KGtleSk7XG4gICAgICAgIHRoaXMucmVtb3ZlKGtleSk7XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGNhY2hlIGhhcyBhbiBpdGVtLlxuICAgICAqXG4gICAgICogQHBhcmFtICBrZXlcbiAgICAgKi9cbiAgICBoYXMoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KGtleSkgIT09IG51bGwgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxufVxuIl19