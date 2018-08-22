/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Authentication } from './authentication';
import { Authorization } from './authorization';
import { Injectable } from '@angular/core';
import { Config } from './../config';
import { HttpClient } from '@angular/common/http';
import { Http } from './http';
import { Token } from './token';
import { Event } from './event';
export class SocialAuthentication extends Authentication {
    /**
     * Constructor.
     * @param {?} authorization
     * @param {?} config
     * @param {?} event
     * @param {?} http
     * @param {?} httpService
     * @param {?} token
     */
    constructor(authorization, config, event, http, httpService, token) {
        super(authorization, config, event, http, httpService, token);
        this.authorization = authorization;
        this.config = config;
        this.event = event;
        this.http = http;
        this.httpService = httpService;
        this.token = token;
        /**
         * Handle errors on facebook login.
         *
         * @param error
         */
        this.handleLoginError = (error) => console.log(error);
        //
    }
    /**
     * Handle succesful Facebook login.
     *
     * @param {?} res
     * @return {?}
     */
    handleLoginSuccess(res) {
        return new Promise((resolve, reject) => {
            this.storeSocialCredentials(res);
            this.http.post(this.config.get('authentication.endpoints.socialAuth'), res).subscribe(res => {
                this.onLogin(res).then(() => {
                    resolve(res);
                }, error => reject(error));
            }, error => reject(error));
        });
    }
    /**
     * Store social auth crednetials.
     *
     * @param {?} res
     * @return {?}
     */
    storeSocialCredentials(res) {
        if (res.network == 'facebook') {
            this.token.set(res.authResponse.accessToken, 'facebook_access_token');
        }
    }
}
SocialAuthentication.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SocialAuthentication.ctorParameters = () => [
    { type: Authorization },
    { type: Config },
    { type: Event },
    { type: HttpClient },
    { type: Http },
    { type: Token }
];
function SocialAuthentication_tsickle_Closure_declarations() {
    /**
     * Handle errors on facebook login.
     *
     * \@param error
     * @type {?}
     */
    SocialAuthentication.prototype.handleLoginError;
    /** @type {?} */
    SocialAuthentication.prototype.authorization;
    /** @type {?} */
    SocialAuthentication.prototype.config;
    /** @type {?} */
    SocialAuthentication.prototype.event;
    /** @type {?} */
    SocialAuthentication.prototype.http;
    /** @type {?} */
    SocialAuthentication.prototype.httpService;
    /** @type {?} */
    SocialAuthentication.prototype.token;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29jaWFsLWF1dGhlbnRpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdraXQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9zb2NpYWwtYXV0aGVudGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzlCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUdoQyxNQUFNLDJCQUE0QixTQUFRLGNBQWM7Ozs7Ozs7Ozs7SUFJcEQsWUFDVyxlQUNBLFFBQ0EsT0FDQSxNQUNBLGFBQ0E7UUFFUCxLQUFLLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQVB2RCxrQkFBYSxHQUFiLGFBQWE7UUFDYixXQUFNLEdBQU4sTUFBTTtRQUNOLFVBQUssR0FBTCxLQUFLO1FBQ0wsU0FBSSxHQUFKLElBQUk7UUFDSixnQkFBVyxHQUFYLFdBQVc7UUFDWCxVQUFLLEdBQUwsS0FBSzs7Ozs7O2dDQTJDRyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7O0tBdEN2RDs7Ozs7OztJQWtCRCxrQkFBa0IsQ0FBQyxHQUFXO1FBQzFCLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFakMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsRUFDdEQsR0FBRyxDQUNOLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtvQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNoQixFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDOUIsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzlCLENBQUMsQ0FBQztLQUNOOzs7Ozs7O0lBY0Qsc0JBQXNCLENBQUMsR0FBUTtRQUMzQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ1YsR0FBRyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQzVCLHVCQUF1QixDQUMxQixDQUFDO1NBQ0w7S0FDSjs7O1lBcEVKLFVBQVU7Ozs7WUFSRixhQUFhO1lBRWIsTUFBTTtZQUlOLEtBQUs7WUFITCxVQUFVO1lBQ1YsSUFBSTtZQUNKLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBdXRoZW50aWNhdGlvbiB9IGZyb20gJy4vYXV0aGVudGljYXRpb24nO1xuaW1wb3J0IHsgQXV0aG9yaXphdGlvbiB9IGZyb20gJy4vYXV0aG9yaXphdGlvbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSHR0cCB9IGZyb20gJy4vaHR0cCc7XG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJy4vdG9rZW4nO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL2V2ZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNvY2lhbEF1dGhlbnRpY2F0aW9uIGV4dGVuZHMgQXV0aGVudGljYXRpb24ge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgYXV0aG9yaXphdGlvbjogQXV0aG9yaXphdGlvbixcbiAgICAgICAgcHVibGljIGNvbmZpZzogQ29uZmlnLFxuICAgICAgICBwdWJsaWMgZXZlbnQ6IEV2ZW50LFxuICAgICAgICBwdWJsaWMgaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgcHVibGljIGh0dHBTZXJ2aWNlOiBIdHRwLFxuICAgICAgICBwdWJsaWMgdG9rZW46IFRva2VuXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGF1dGhvcml6YXRpb24sIGNvbmZpZywgZXZlbnQsIGh0dHAsIGh0dHBTZXJ2aWNlLCB0b2tlbik7XG5cbiAgICAgICAgLy9cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dpbiB3aXRoIGEgc29jaWFsIHByb3ZpZGVyLlxuICAgICAqL1xuICAgIC8vIGxvZ2luKHByb3ZpZGVyOiBzdHJpbmcsIG9wdGlvbnM/OiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIC8vICAgICByZXR1cm4gbmV3IFByb21pc2UoKCkgPT4ge1xuICAgIC8vICAgICAgICAgLy8gdGhpcy5oYW5kbGVMb2dpblN1Y2Nlc3MocmVzKS50aGVuKChyZXMpID0+IHtcbiAgICAvLyAgICAgICAgIC8vICAgICB0aGlzLm9uTG9naW4ocmVzKS50aGVuKCgpID0+IHJlc29sdmUocmVzKSk7XG4gICAgLy8gICAgICAgICAvLyB9LCAoZXJyb3IpID0+IHJlamVjdCh0aGlzLmhhbmRsZUxvZ2luRXJyb3IoZXJyb3IpKSlcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIHN1Y2Nlc2Z1bCBGYWNlYm9vayBsb2dpbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgcmVzXG4gICAgICovXG4gICAgaGFuZGxlTG9naW5TdWNjZXNzKHJlczogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmVTb2NpYWxDcmVkZW50aWFscyhyZXMpO1xuXG4gICAgICAgICAgICB0aGlzLmh0dHAucG9zdChcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5nZXQoJ2F1dGhlbnRpY2F0aW9uLmVuZHBvaW50cy5zb2NpYWxBdXRoJyksXG4gICAgICAgICAgICAgICAgcmVzXG4gICAgICAgICAgICApLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25Mb2dpbihyZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICAgICAgICAgICAgfSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIGVycm9ycyBvbiBmYWNlYm9vayBsb2dpbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgZXJyb3JcbiAgICAgKi9cbiAgICBoYW5kbGVMb2dpbkVycm9yID0gKGVycm9yOiBvYmplY3QpID0+IGNvbnNvbGUubG9nKGVycm9yKTtcblxuICAgIC8qKlxuICAgICAqIFN0b3JlIHNvY2lhbCBhdXRoIGNyZWRuZXRpYWxzLlxuICAgICAqXG4gICAgICogQHBhcmFtICByZXNcbiAgICAgKi9cbiAgICBzdG9yZVNvY2lhbENyZWRlbnRpYWxzKHJlczogYW55KTogdm9pZCB7XG4gICAgICAgIGlmIChyZXMubmV0d29yayA9PSAnZmFjZWJvb2snKSB7XG4gICAgICAgICAgICB0aGlzLnRva2VuLnNldChcbiAgICAgICAgICAgICAgICByZXMuYXV0aFJlc3BvbnNlLmFjY2Vzc1Rva2VuLFxuICAgICAgICAgICAgICAgICdmYWNlYm9va19hY2Nlc3NfdG9rZW4nXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19