/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Model for cache items.
 */
var /**
 * Model for cache items.
 */
CacheItemModel = /** @class */ (function () {
    /**
     * Construcotr.
     *
     * @param  item
     */
    function CacheItemModel(item) {
        Object.assign(this, item);
    }
    Object.defineProperty(CacheItemModel.prototype, "value", {
        /**
         * Get value accessor parses JSON.
         */
        get: /**
         * Get value accessor parses JSON.
         * @return {?}
         */
        function () {
            return JSON.parse(this._value);
        },
        /**
         * Set the value mutator that stringifies value.
         *
         * @param  value
         */
        set: /**
         * Set the value mutator that stringifies value.
         *
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._value = JSON.stringify(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CacheItemModel.prototype, "expires", {
        /**
         * Get expires accessor.
         */
        get: /**
         * Get expires accessor.
         * @return {?}
         */
        function () {
            return this._expires;
        },
        /**
         * Set the expires mutator.
         *
         * @param  minutes
         */
        set: /**
         * Set the expires mutator.
         *
         * @param {?} minutes
         * @return {?}
         */
        function (minutes) {
            var /** @type {?} */ expiration = new Date();
            expiration.setMinutes(expiration.getMinutes() + minutes);
            this._expires = expiration.getTime();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Check if cached item is expired.
     */
    /**
     * Check if cached item is expired.
     * @return {?}
     */
    CacheItemModel.prototype.isExpired = /**
     * Check if cached item is expired.
     * @return {?}
     */
    function () {
        return this.expires <= new Date().getTime();
    };
    return CacheItemModel;
}());
/**
 * Model for cache items.
 */
export { CacheItemModel };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25na2l0LyIsInNvdXJjZXMiOlsibW9kZWxzL2NhY2hlLWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUdBOzs7QUFBQTtJQVdJOzs7O09BSUc7SUFDSCx3QkFBWSxJQUFTO1FBQ2pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0tBQzVCO0lBS0Qsc0JBQUksaUNBQUs7UUFIVDs7V0FFRzs7Ozs7UUFDSDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNsQztRQUVEOzs7O1dBSUc7Ozs7Ozs7UUFDSCxVQUFVLEtBQVU7WUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3ZDOzs7T0FUQTtJQWNELHNCQUFJLG1DQUFPO1FBSFg7O1dBRUc7Ozs7O1FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN4QjtRQUVEOzs7O1dBSUc7Ozs7Ozs7UUFDSCxVQUFZLE9BQWU7WUFDdkIscUJBQUksVUFBVSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDNUIsVUFBVSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDeEM7OztPQVhBO0lBYUQ7O09BRUc7Ozs7O0lBQ0gsa0NBQVM7Ozs7SUFBVDtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDL0M7eUJBOURMO0lBK0RDLENBQUE7Ozs7QUE1REQsMEJBNERDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBNb2RlbCBmb3IgY2FjaGUgaXRlbXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBDYWNoZUl0ZW1Nb2RlbCB7XG4gICAgLyoqXG4gICAgICogV2hlbiB0aGUgY2FjaGUgaXRlbSBleHBpcmVzLlxuICAgICAqL1xuICAgIF9leHBpcmVzOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgb2YgdGhlIGNhY2hlIGl0ZW0uXG4gICAgICovXG4gICAgX3ZhbHVlOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y290ci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgaXRlbVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGl0ZW06IGFueSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGl0ZW0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlIGFjY2Vzc29yIHBhcnNlcyBKU09OLlxuICAgICAqL1xuICAgIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh0aGlzLl92YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB2YWx1ZSBtdXRhdG9yIHRoYXQgc3RyaW5naWZpZXMgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHZhbHVlXG4gICAgICovXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGV4cGlyZXMgYWNjZXNzb3IuXG4gICAgICovXG4gICAgZ2V0IGV4cGlyZXMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4cGlyZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBleHBpcmVzIG11dGF0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIG1pbnV0ZXNcbiAgICAgKi9cbiAgICBzZXQgZXhwaXJlcyhtaW51dGVzOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGV4cGlyYXRpb24gPSBuZXcgRGF0ZSgpO1xuICAgICAgICBleHBpcmF0aW9uLnNldE1pbnV0ZXMoZXhwaXJhdGlvbi5nZXRNaW51dGVzKCkgKyBtaW51dGVzKTtcbiAgICAgICAgdGhpcy5fZXhwaXJlcyA9IGV4cGlyYXRpb24uZ2V0VGltZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGNhY2hlZCBpdGVtIGlzIGV4cGlyZWQuXG4gICAgICovXG4gICAgaXNFeHBpcmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5leHBpcmVzIDw9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIH1cbn1cbiJdfQ==