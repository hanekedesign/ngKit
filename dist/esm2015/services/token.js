/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Storage } from './storage';
import { Config } from './../config';
export class Token {
    /**
     * Constructor.
     *
     * @param {?} config
     * @param {?} storage
     */
    constructor(config, storage) {
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
     * @param {?=} tokenName
     * @return {?}
     */
    get(tokenName) {
        return new Promise((resolve, reject) => {
            tokenName = tokenName || this.config.get('token.name', this._token);
            this.storage.get(tokenName).then(token => {
                resolve(token);
            }, err => reject(err));
        });
    }
    /**
     * Store the token in local storage.
     *
     * @param {?} token
     * @param {?=} tokenName
     * @return {?}
     */
    set(token, tokenName) {
        return new Promise((resolve, reject) => {
            tokenName = tokenName || this.config.get('token.name', this._token);
            if (token) {
                this.storage.set(tokenName, token).then(() => {
                    resolve(true);
                }, () => reject('Error: Could not store token.'));
            }
            else {
                reject('Error: No token provided.');
            }
        });
    }
    /**
     * Remove token from local storage.
     *
     * @param {?=} tokenName
     * @return {?}
     */
    remove(tokenName) {
        tokenName = tokenName || this.config.get('token.name', this._token);
        this.storage.remove(tokenName);
        return true;
    }
    /**
     * Read a token from a response object.
     *
     * @param {?=} response
     * @return {?}
     */
    read(response = null) {
        if (response) {
            let /** @type {?} */ key = this.config.get('token.readAs');
            return key.split('.').reduce((o, i) => o[i], response);
        }
        return null;
    }
}
Token.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Token.ctorParameters = () => [
    { type: Config },
    { type: Storage }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ2tpdC8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL3Rva2VuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUdyQyxNQUFNOzs7Ozs7O0lBWUYsWUFDVyxRQUNDO1FBREQsV0FBTSxHQUFOLE1BQU07UUFDTCxZQUFPLEdBQVAsT0FBTzs7OztzQkFWUSxRQUFRO0tBVzlCOzs7Ozs7O0lBT0wsR0FBRyxDQUFDLFNBQWtCO1FBQ2xCLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxTQUFTLEdBQUcsU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFcEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNyQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbEIsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzFCLENBQUMsQ0FBQztLQUNOOzs7Ozs7OztJQVFELEdBQUcsQ0FBQyxLQUFhLEVBQUUsU0FBa0I7UUFDakMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLFNBQVMsR0FBRyxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVwRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNSLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO29CQUN6QyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2pCLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLCtCQUErQixDQUFDLENBQUMsQ0FBQzthQUNyRDtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2FBQ3ZDO1NBQ0osQ0FBQyxDQUFDO0tBQ047Ozs7Ozs7SUFPRCxNQUFNLENBQUMsU0FBa0I7UUFDckIsU0FBUyxHQUFHLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXBFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRS9CLE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDZjs7Ozs7OztJQU9ELElBQUksQ0FBQyxXQUFnQixJQUFJO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDWCxxQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFMUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBTSxFQUFFLENBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZFO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmOzs7WUEvRUosVUFBVTs7OztZQUZGLE1BQU07WUFETixPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJy4vc3RvcmFnZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLy4uL2NvbmZpZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUb2tlbiB7XG4gICAgLyoqXG4gICAgICogTmFtZSBvZiB0b2tlbiBzdG9yZWQgaW4gbG9jYWwgc3RvcmFnZS5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX3Rva2VuOiBzdHJpbmcgPSAnX3Rva2VuJztcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqXG4gICAgICogQHBhcmFtICBjb25maWdcbiAgICAgKiBAcGFyYW0gIHN0b3JhZ2VcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGNvbmZpZzogQ29uZmlnLFxuICAgICAgICBwcml2YXRlIHN0b3JhZ2U6IFN0b3JhZ2VcbiAgICApIHsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0b2tlbiBmcm9tIGxvY2FsIHN0b3JhZ2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHRva2VuTmFtZVxuICAgICAqL1xuICAgIGdldCh0b2tlbk5hbWU/OiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdG9rZW5OYW1lID0gdG9rZW5OYW1lIHx8IHRoaXMuY29uZmlnLmdldCgndG9rZW4ubmFtZScsIHRoaXMuX3Rva2VuKTtcblxuICAgICAgICAgICAgdGhpcy5zdG9yYWdlLmdldCh0b2tlbk5hbWUpLnRoZW4odG9rZW4gPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodG9rZW4pO1xuICAgICAgICAgICAgfSwgZXJyID0+IHJlamVjdChlcnIpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcmUgdGhlIHRva2VuIGluIGxvY2FsIHN0b3JhZ2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHRva2VuXG4gICAgICogQHBhcmFtICB0b2tlbk5hbWVcbiAgICAgKi9cbiAgICBzZXQodG9rZW46IHN0cmluZywgdG9rZW5OYW1lPzogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRva2VuTmFtZSA9IHRva2VuTmFtZSB8fCB0aGlzLmNvbmZpZy5nZXQoJ3Rva2VuLm5hbWUnLCB0aGlzLl90b2tlbik7XG5cbiAgICAgICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXQodG9rZW5OYW1lLCB0b2tlbikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSwgKCkgPT4gcmVqZWN0KCdFcnJvcjogQ291bGQgbm90IHN0b3JlIHRva2VuLicpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCdFcnJvcjogTm8gdG9rZW4gcHJvdmlkZWQuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSB0b2tlbiBmcm9tIGxvY2FsIHN0b3JhZ2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHRva2VuTmFtZVxuICAgICAqL1xuICAgIHJlbW92ZSh0b2tlbk5hbWU/OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgdG9rZW5OYW1lID0gdG9rZW5OYW1lIHx8IHRoaXMuY29uZmlnLmdldCgndG9rZW4ubmFtZScsIHRoaXMuX3Rva2VuKTtcblxuICAgICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlKHRva2VuTmFtZSk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVhZCBhIHRva2VuIGZyb20gYSByZXNwb25zZSBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHJlc3BvbnNlXG4gICAgICovXG4gICAgcmVhZChyZXNwb25zZTogYW55ID0gbnVsbCk6IHN0cmluZyB7XG4gICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgbGV0IGtleSA9IHRoaXMuY29uZmlnLmdldCgndG9rZW4ucmVhZEFzJyk7XG5cbiAgICAgICAgICAgIHJldHVybiBrZXkuc3BsaXQoJy4nKS5yZWR1Y2UoKG86IGFueSwgaTogc3RyaW5nKSA9PiBvW2ldLCByZXNwb25zZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG4iXX0=