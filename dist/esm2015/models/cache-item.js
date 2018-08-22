/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Model for cache items.
 */
export class CacheItemModel {
    /**
     * Construcotr.
     *
     * @param {?} item
     */
    constructor(item) {
        Object.assign(this, item);
    }
    /**
     * Get value accessor parses JSON.
     * @return {?}
     */
    get value() {
        return JSON.parse(this._value);
    }
    /**
     * Set the value mutator that stringifies value.
     *
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = JSON.stringify(value);
    }
    /**
     * Get expires accessor.
     * @return {?}
     */
    get expires() {
        return this._expires;
    }
    /**
     * Set the expires mutator.
     *
     * @param {?} minutes
     * @return {?}
     */
    set expires(minutes) {
        let /** @type {?} */ expiration = new Date();
        expiration.setMinutes(expiration.getMinutes() + minutes);
        this._expires = expiration.getTime();
    }
    /**
     * Check if cached item is expired.
     * @return {?}
     */
    isExpired() {
        return this.expires <= new Date().getTime();
    }
}
function CacheItemModel_tsickle_Closure_declarations() {
    /**
     * When the cache item expires.
     * @type {?}
     */
    CacheItemModel.prototype._expires;
    /**
     * The value of the cache item.
     * @type {?}
     */
    CacheItemModel.prototype._value;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25na2l0LyIsInNvdXJjZXMiOlsibW9kZWxzL2NhY2hlLWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUdBLE1BQU07Ozs7OztJQWdCRixZQUFZLElBQVM7UUFDakIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7S0FDNUI7Ozs7O0lBS0QsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2xDOzs7Ozs7O0lBT0QsSUFBSSxLQUFLLENBQUMsS0FBVTtRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdkM7Ozs7O0lBS0QsSUFBSSxPQUFPO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDeEI7Ozs7Ozs7SUFPRCxJQUFJLE9BQU8sQ0FBQyxPQUFlO1FBQ3ZCLHFCQUFJLFVBQVUsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzVCLFVBQVUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ3hDOzs7OztJQUtELFNBQVM7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQy9DO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE1vZGVsIGZvciBjYWNoZSBpdGVtcy5cbiAqL1xuZXhwb3J0IGNsYXNzIENhY2hlSXRlbU1vZGVsIHtcbiAgICAvKipcbiAgICAgKiBXaGVuIHRoZSBjYWNoZSBpdGVtIGV4cGlyZXMuXG4gICAgICovXG4gICAgX2V4cGlyZXM6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSBvZiB0aGUgY2FjaGUgaXRlbS5cbiAgICAgKi9cbiAgICBfdmFsdWU6IGFueTtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjb3RyLlxuICAgICAqXG4gICAgICogQHBhcmFtICBpdGVtXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaXRlbTogYW55KSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaXRlbSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdmFsdWUgYWNjZXNzb3IgcGFyc2VzIEpTT04uXG4gICAgICovXG4gICAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHRoaXMuX3ZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHZhbHVlIG11dGF0b3IgdGhhdCBzdHJpbmdpZmllcyB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgdmFsdWVcbiAgICAgKi9cbiAgICBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgZXhwaXJlcyBhY2Nlc3Nvci5cbiAgICAgKi9cbiAgICBnZXQgZXhwaXJlcygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXhwaXJlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGV4cGlyZXMgbXV0YXRvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgbWludXRlc1xuICAgICAqL1xuICAgIHNldCBleHBpcmVzKG1pbnV0ZXM6IG51bWJlcikge1xuICAgICAgICBsZXQgZXhwaXJhdGlvbiA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGV4cGlyYXRpb24uc2V0TWludXRlcyhleHBpcmF0aW9uLmdldE1pbnV0ZXMoKSArIG1pbnV0ZXMpO1xuICAgICAgICB0aGlzLl9leHBpcmVzID0gZXhwaXJhdGlvbi5nZXRUaW1lKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgY2FjaGVkIGl0ZW0gaXMgZXhwaXJlZC5cbiAgICAgKi9cbiAgICBpc0V4cGlyZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmV4cGlyZXMgPD0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgfVxufVxuIl19