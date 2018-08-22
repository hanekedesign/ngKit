/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NGKIT_PROVIDERS } from './providers';
var ngKitModule = /** @class */ (function () {
    function ngKitModule() {
    }
    /**
     * ngKit module initializer.
     *
     * @param  options
     */
    /**
     * ngKit module initializer.
     *
     * @param {?} options
     * @return {?}
     */
    ngKitModule.forRoot = /**
     * ngKit module initializer.
     *
     * @param {?} options
     * @return {?}
     */
    function (options) {
        return {
            ngModule: ngKitModule,
            providers: [
                { provide: 'ngKitOptions', useValue: options },
            ]
        };
    };
    ngKitModule.decorators = [
        { type: NgModule, args: [{
                    imports: [HttpClientModule],
                    providers: tslib_1.__spread(NGKIT_PROVIDERS)
                },] },
    ];
    return ngKitModule;
}());
export { ngKitModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdraXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdraXQvIiwic291cmNlcyI6WyJuZ2tpdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7O0lBUzFDOzs7O09BSUc7Ozs7Ozs7SUFDSSxtQkFBTzs7Ozs7O0lBQWQsVUFBZSxPQUFZO1FBQ3ZCLE1BQU0sQ0FBQztZQUNILFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFNBQVMsRUFBRTtnQkFDUCxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTthQUNqRDtTQUNKLENBQUE7S0FDSjs7Z0JBbkJKLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDM0IsU0FBUyxtQkFDRixlQUFlLENBQ3JCO2lCQUNKOztzQkFURDs7U0FVYSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBOR0tJVF9QUk9WSURFUlMgfSBmcm9tICcuL3Byb3ZpZGVycyc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0h0dHBDbGllbnRNb2R1bGVdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICAuLi5OR0tJVF9QUk9WSURFUlMsXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBuZ0tpdE1vZHVsZSB7XG4gICAgLyoqXG4gICAgICogbmdLaXQgbW9kdWxlIGluaXRpYWxpemVyLlxuICAgICAqXG4gICAgICogQHBhcmFtICBvcHRpb25zXG4gICAgICovXG4gICAgc3RhdGljIGZvclJvb3Qob3B0aW9uczogYW55KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogbmdLaXRNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6ICduZ0tpdE9wdGlvbnMnLCB1c2VWYWx1ZTogb3B0aW9ucyB9LFxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxufVxuIl19