/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Storage } from './storage';
import { Config } from './../config';
var Token = /** @class */ (function () {
    /**
     * Constructor.
     *
     * @param  config
     * @param  storage
     */
    function Token(config, storage) {
        this.config = config;
        this.storage = storage;
        /**
         * Name of token stored in local storage.
         */
        this._token = '_token';
    }
    /**
     * Get the token from local storage.
     *
     * @param  tokenName
     */
    /**
     * Get the token from local storage.
     *
     * @param {?=} tokenName
     * @return {?}
     */
    Token.prototype.get = /**
     * Get the token from local storage.
     *
     * @param {?=} tokenName
     * @return {?}
     */
    function (tokenName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            tokenName = tokenName || _this.config.get('token.name', _this._token);
            _this.storage.get(tokenName).then(function (token) {
                resolve(token);
            }, function (err) { return reject(err); });
        });
    };
    /**
     * Store the token in local storage.
     *
     * @param  token
     * @param  tokenName
     */
    /**
     * Store the token in local storage.
     *
     * @param {?} token
     * @param {?=} tokenName
     * @return {?}
     */
    Token.prototype.set = /**
     * Store the token in local storage.
     *
     * @param {?} token
     * @param {?=} tokenName
     * @return {?}
     */
    function (token, tokenName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            tokenName = tokenName || _this.config.get('token.name', _this._token);
            if (token) {
                _this.storage.set(tokenName, token).then(function () {
                    resolve(true);
                }, function () { return reject('Error: Could not store token.'); });
            }
            else {
                reject('Error: No token provided.');
            }
        });
    };
    /**
     * Remove token from local storage.
     *
     * @param  tokenName
     */
    /**
     * Remove token from local storage.
     *
     * @param {?=} tokenName
     * @return {?}
     */
    Token.prototype.remove = /**
     * Remove token from local storage.
     *
     * @param {?=} tokenName
     * @return {?}
     */
    function (tokenName) {
        tokenName = tokenName || this.config.get('token.name', this._token);
        this.storage.remove(tokenName);
        return true;
    };
    /**
     * Read a token from a response object.
     *
     * @param  response
     */
    /**
     * Read a token from a response object.
     *
     * @param {?=} response
     * @return {?}
     */
    Token.prototype.read = /**
     * Read a token from a response object.
     *
     * @param {?=} response
     * @return {?}
     */
    function (response) {
        if (response === void 0) { response = null; }
        if (response) {
            var /** @type {?} */ key = this.config.get('token.readAs');
            return key.split('.').reduce(function (o, i) { return o[i]; }, response);
        }
        return null;
    };
    Token.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Token.ctorParameters = function () { return [
        { type: Config },
        { type: Storage }
    ]; };
    return Token;
}());
export { Token };
function Token_tsickle_Closure_declarations() {
    /**
     * Name of token stored in local storage.
     * @type {?}
     */
    Token.prototype._token;
    /** @type {?} */
    Token.prototype.config;
    /** @type {?} */
    Token.prototype.storage;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ2tpdC8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL3Rva2VuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQzs7SUFTakM7Ozs7O09BS0c7SUFDSCxlQUNXLFFBQ0M7UUFERCxXQUFNLEdBQU4sTUFBTTtRQUNMLFlBQU8sR0FBUCxPQUFPOzs7O3NCQVZRLFFBQVE7S0FXOUI7SUFFTDs7OztPQUlHOzs7Ozs7O0lBQ0gsbUJBQUc7Ozs7OztJQUFILFVBQUksU0FBa0I7UUFBdEIsaUJBUUM7UUFQRyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUMvQixTQUFTLEdBQUcsU0FBUyxJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFcEUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSztnQkFDbEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2xCLEVBQUUsVUFBQSxHQUFHLElBQUksT0FBQSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQVgsQ0FBVyxDQUFDLENBQUM7U0FDMUIsQ0FBQyxDQUFDO0tBQ047SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7SUFDSCxtQkFBRzs7Ozs7OztJQUFILFVBQUksS0FBYSxFQUFFLFNBQWtCO1FBQXJDLGlCQVlDO1FBWEcsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDL0IsU0FBUyxHQUFHLFNBQVMsSUFBSSxLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXBFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsS0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDcEMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNqQixFQUFFLGNBQU0sT0FBQSxNQUFNLENBQUMsK0JBQStCLENBQUMsRUFBdkMsQ0FBdUMsQ0FBQyxDQUFDO2FBQ3JEO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxDQUFDLDJCQUEyQixDQUFDLENBQUM7YUFDdkM7U0FDSixDQUFDLENBQUM7S0FDTjtJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCxzQkFBTTs7Ozs7O0lBQU4sVUFBTyxTQUFrQjtRQUNyQixTQUFTLEdBQUcsU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFcEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFL0IsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILG9CQUFJOzs7Ozs7SUFBSixVQUFLLFFBQW9CO1FBQXBCLHlCQUFBLEVBQUEsZUFBb0I7UUFDckIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNYLHFCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUUxQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFNLEVBQUUsQ0FBUyxJQUFLLE9BQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFKLENBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztTQUN2RTtRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDZjs7Z0JBL0VKLFVBQVU7Ozs7Z0JBRkYsTUFBTTtnQkFETixPQUFPOztnQkFEaEI7O1NBS2EsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICcuL3N0b3JhZ2UnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi8uLi9jb25maWcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVG9rZW4ge1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdG9rZW4gc3RvcmVkIGluIGxvY2FsIHN0b3JhZ2UuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF90b2tlbjogc3RyaW5nID0gJ190b2tlbic7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3Rvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgY29uZmlnXG4gICAgICogQHBhcmFtICBzdG9yYWdlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBjb25maWc6IENvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBzdG9yYWdlOiBTdG9yYWdlXG4gICAgKSB7IH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdG9rZW4gZnJvbSBsb2NhbCBzdG9yYWdlLlxuICAgICAqXG4gICAgICogQHBhcmFtICB0b2tlbk5hbWVcbiAgICAgKi9cbiAgICBnZXQodG9rZW5OYW1lPzogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRva2VuTmFtZSA9IHRva2VuTmFtZSB8fCB0aGlzLmNvbmZpZy5nZXQoJ3Rva2VuLm5hbWUnLCB0aGlzLl90b2tlbik7XG5cbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5nZXQodG9rZW5OYW1lKS50aGVuKHRva2VuID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRva2VuKTtcbiAgICAgICAgICAgIH0sIGVyciA9PiByZWplY3QoZXJyKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0b3JlIHRoZSB0b2tlbiBpbiBsb2NhbCBzdG9yYWdlLlxuICAgICAqXG4gICAgICogQHBhcmFtICB0b2tlblxuICAgICAqIEBwYXJhbSAgdG9rZW5OYW1lXG4gICAgICovXG4gICAgc2V0KHRva2VuOiBzdHJpbmcsIHRva2VuTmFtZT86IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0b2tlbk5hbWUgPSB0b2tlbk5hbWUgfHwgdGhpcy5jb25maWcuZ2V0KCd0b2tlbi5uYW1lJywgdGhpcy5fdG9rZW4pO1xuXG4gICAgICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0KHRva2VuTmFtZSwgdG9rZW4pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgIH0sICgpID0+IHJlamVjdCgnRXJyb3I6IENvdWxkIG5vdCBzdG9yZSB0b2tlbi4nKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlamVjdCgnRXJyb3I6IE5vIHRva2VuIHByb3ZpZGVkLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgdG9rZW4gZnJvbSBsb2NhbCBzdG9yYWdlLlxuICAgICAqXG4gICAgICogQHBhcmFtICB0b2tlbk5hbWVcbiAgICAgKi9cbiAgICByZW1vdmUodG9rZW5OYW1lPzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHRva2VuTmFtZSA9IHRva2VuTmFtZSB8fCB0aGlzLmNvbmZpZy5nZXQoJ3Rva2VuLm5hbWUnLCB0aGlzLl90b2tlbik7XG5cbiAgICAgICAgdGhpcy5zdG9yYWdlLnJlbW92ZSh0b2tlbk5hbWUpO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlYWQgYSB0b2tlbiBmcm9tIGEgcmVzcG9uc2Ugb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtICByZXNwb25zZVxuICAgICAqL1xuICAgIHJlYWQocmVzcG9uc2U6IGFueSA9IG51bGwpOiBzdHJpbmcge1xuICAgICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGxldCBrZXkgPSB0aGlzLmNvbmZpZy5nZXQoJ3Rva2VuLnJlYWRBcycpO1xuXG4gICAgICAgICAgICByZXR1cm4ga2V5LnNwbGl0KCcuJykucmVkdWNlKChvOiBhbnksIGk6IHN0cmluZykgPT4gb1tpXSwgcmVzcG9uc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuIl19