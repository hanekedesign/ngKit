/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Config } from '../config';
import * as localForage from "localforage";
/**
 * @record
 */
export function StorageDriver() { }
function StorageDriver_tsickle_Closure_declarations() {
    /**
     * The database of the storage provider.
     * @type {?}
     */
    StorageDriver.prototype.db;
    /**
     * Get an item from storage.
     *
     * \@param key
     * @type {?}
     */
    StorageDriver.prototype.get;
    /**
     * Set an item to storage.
     *
     * \@param key
     * \@param value
     * @type {?}
     */
    StorageDriver.prototype.set;
    /**
     * Remove an item from storage.
     *
     * \@param key
     * @type {?}
     */
    StorageDriver.prototype.remove;
    /**
     * Clear storage.
     * @type {?}
     */
    StorageDriver.prototype.clear;
}
export class Storage {
    /**
     * Create a new instance of the service.
     *
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
        this.db = localForage.createInstance({
            name: this.config.get('storage.name')
        });
    }
    /**
     * Get item from local storage.
     * @param {?} key
     * @return {?}
     */
    get(key) {
        return this.db.getItem(key);
    }
    /**
     * Set an item to local storage.
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    set(key, value) {
        return this.db.setItem(key, value);
    }
    /**
     * Remove an item from local storage.
     *
     * @param {?} key
     * @return {?}
     */
    remove(key) {
        return this.db.removeItem(key);
    }
    /**
     * Clear local storage.
     * @return {?}
     */
    clear() {
        return this.db.clear();
    }
}
Storage.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Storage.ctorParameters = () => [
    { type: Config }
];
function Storage_tsickle_Closure_declarations() {
    /**
     * The database of the storage provider.
     * @type {?}
     */
    Storage.prototype.db;
    /** @type {?} */
    Storage.prototype.config;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25na2l0LyIsInNvdXJjZXMiOlsic2VydmljZXMvc3RvcmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ25DLE9BQU8sS0FBSyxXQUFXLE1BQU0sYUFBYSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQzNDLE1BQU07Ozs7OztJQVdGLFlBQW9CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQzlCLElBQUksQ0FBQyxFQUFFLEdBQUcsV0FBVyxDQUFDLGNBQWMsQ0FBQztZQUNqQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDO1NBQ3hDLENBQUMsQ0FBQztLQUNOOzs7Ozs7SUFLRCxHQUFHLENBQUMsR0FBVztRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMvQjs7Ozs7Ozs7SUFRRCxHQUFHLENBQUMsR0FBVyxFQUFFLEtBQVU7UUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUN0Qzs7Ozs7OztJQU9ELE1BQU0sQ0FBQyxHQUFXO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2xDOzs7OztJQUtELEtBQUs7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUMxQjs7O1lBakRKLFVBQVU7Ozs7WUFyQ0YsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQgKiBhcyBsb2NhbEZvcmFnZSBmcm9tIFwibG9jYWxmb3JhZ2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBTdG9yYWdlRHJpdmVyIHtcbiAgICAvKipcbiAgICAgKiBUaGUgZGF0YWJhc2Ugb2YgdGhlIHN0b3JhZ2UgcHJvdmlkZXIuXG4gICAgICovXG4gICAgZGI6IGFueTtcblxuICAgIC8qKlxuICAgICAqIEdldCBhbiBpdGVtIGZyb20gc3RvcmFnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgIGtleVxuICAgICAqL1xuICAgIGdldChrZXk6IHN0cmluZyk6IFByb21pc2U8YW55PjtcblxuICAgIC8qKlxuICAgICAqIFNldCBhbiBpdGVtIHRvIHN0b3JhZ2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleVxuICAgICAqIEBwYXJhbSAgdmFsdWVcbiAgICAgKi9cbiAgICBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBQcm9taXNlPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYW4gaXRlbSBmcm9tIHN0b3JhZ2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICovXG4gICAgcmVtb3ZlKGtleTogc3RyaW5nKTogUHJvbWlzZTxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogQ2xlYXIgc3RvcmFnZS5cbiAgICAgKi9cbiAgICBjbGVhcigpOiBQcm9taXNlPGFueT47XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdG9yYWdlIGltcGxlbWVudHMgU3RvcmFnZURyaXZlciB7XG4gICAgLyoqXG4gICAgICogVGhlIGRhdGFiYXNlIG9mIHRoZSBzdG9yYWdlIHByb3ZpZGVyLlxuICAgICAqL1xuICAgIGRiOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHNlcnZpY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IENvbmZpZykge1xuICAgICAgICB0aGlzLmRiID0gbG9jYWxGb3JhZ2UuY3JlYXRlSW5zdGFuY2Uoe1xuICAgICAgICAgICAgbmFtZTogdGhpcy5jb25maWcuZ2V0KCdzdG9yYWdlLm5hbWUnKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgaXRlbSBmcm9tIGxvY2FsIHN0b3JhZ2UuXG4gICAgICovXG4gICAgZ2V0KGtleTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGIuZ2V0SXRlbShrZXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBhbiBpdGVtIHRvIGxvY2FsIHN0b3JhZ2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleVxuICAgICAqIEBwYXJhbSAgdmFsdWVcbiAgICAgKi9cbiAgICBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYi5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbiBpdGVtIGZyb20gbG9jYWwgc3RvcmFnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgIGtleVxuICAgICAqL1xuICAgIHJlbW92ZShrZXk6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRiLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGVhciBsb2NhbCBzdG9yYWdlLlxuICAgICAqL1xuICAgIGNsZWFyKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRiLmNsZWFyKCk7XG4gICAgfVxufVxuIl19