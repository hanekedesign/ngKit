/**
 * Model for cache items.
 */
export declare class CacheItemModel {
    /**
     * When the cache item expires.
     */
    _expires: number;
    /**
     * The value of the cache item.
     */
    _value: any;
    /**
     * Construcotr.
     *
     * @param  item
     */
    constructor(item: any);
    /**
     * Get value accessor parses JSON.
     */
    /**
     * Set the value mutator that stringifies value.
     *
     * @param  value
     */
    value: any;
    /**
     * Get expires accessor.
     */
    /**
     * Set the expires mutator.
     *
     * @param  minutes
     */
    expires: number;
    /**
     * Check if cached item is expired.
     */
    isExpired(): boolean;
}
