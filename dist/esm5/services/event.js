/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
var Event = /** @class */ (function () {
    function Event() {
    }
    /**
     * Get an event listener.
     *
     * @param  key
     */
    /**
     * Get an event listener.
     *
     * @param {?} key
     * @return {?}
     */
    Event.channel = /**
     * Get an event listener.
     *
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (typeof Event.channels[key] === 'undefined') {
            Event.channels[key] = new Subject();
        }
        return Event.channels[key];
    };
    /**
     * Set multiple event channels.
     *
     * @param events
     */
    /**
     * Set multiple event channels.
     *
     * @param {?} channels
     * @return {?}
     */
    Event.prototype.setChannels = /**
     * Set multiple event channels.
     *
     * @param {?} channels
     * @return {?}
     */
    function (channels) {
        channels.forEach(function (channel) { return Event.channel(channel); });
    };
    /**
     * Broadcast an event to a channel.
     */
    /**
     * Broadcast an event to a channel.
     * @param {?} key
     * @param {?=} data
     * @return {?}
     */
    Event.prototype.broadcast = /**
     * Broadcast an event to a channel.
     * @param {?} key
     * @param {?=} data
     * @return {?}
     */
    function (key, data) {
        if (data === void 0) { data = {}; }
        return Promise.resolve(Event.channel(key).next(data));
    };
    /**
     *  Listen on a channel for an event.s
     *
     * @param  key
     */
    /**
     *  Listen on a channel for an event.s
     *
     * @param {?} key
     * @return {?}
     */
    Event.prototype.listen = /**
     *  Listen on a channel for an event.s
     *
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return Event.channel(key).asObservable();
    };
    /**
     * Event channels.
     */
    Event.channels = [];
    Event.decorators = [
        { type: Injectable },
    ];
    return Event;
}());
export { Event };
function Event_tsickle_Closure_declarations() {
    /**
     * Event channels.
     * @type {?}
     */
    Event.channels;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ2tpdC8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2V2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7SUFTdkM7Ozs7T0FJRzs7Ozs7OztJQUNJLGFBQU87Ozs7OztJQUFkLFVBQWUsR0FBUTtRQUNuQixFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUM3QyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7U0FDNUM7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUM5QjtJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCwyQkFBVzs7Ozs7O0lBQVgsVUFBWSxRQUFrQjtRQUMxQixRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTyxJQUFLLE9BQUEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDO0tBQ3pEO0lBRUQ7O09BRUc7Ozs7Ozs7SUFDSCx5QkFBUzs7Ozs7O0lBQVQsVUFBVSxHQUFXLEVBQUUsSUFBUztRQUFULHFCQUFBLEVBQUEsU0FBUztRQUM1QixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQ3pEO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILHNCQUFNOzs7Ozs7SUFBTixVQUFPLEdBQVc7UUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUM1Qzs7OztxQkF0Q2lDLEVBQUU7O2dCQUx2QyxVQUFVOztnQkFIWDs7U0FJYSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXZlbnQge1xuICAgIC8qKlxuICAgICAqIEV2ZW50IGNoYW5uZWxzLlxuICAgICAqL1xuICAgIHN0YXRpYyBjaGFubmVsczogU3ViamVjdDxhbnk+W10gPSBbXTtcblxuICAgIC8qKlxuICAgICAqIEdldCBhbiBldmVudCBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5XG4gICAgICovXG4gICAgc3RhdGljIGNoYW5uZWwoa2V5OiBhbnkpOiBTdWJqZWN0PGFueT4ge1xuICAgICAgICBpZiAodHlwZW9mIEV2ZW50LmNoYW5uZWxzW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBFdmVudC5jaGFubmVsc1trZXldID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEV2ZW50LmNoYW5uZWxzW2tleV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IG11bHRpcGxlIGV2ZW50IGNoYW5uZWxzLlxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50c1xuICAgICAqL1xuICAgIHNldENoYW5uZWxzKGNoYW5uZWxzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgICAgICBjaGFubmVscy5mb3JFYWNoKChjaGFubmVsKSA9PiBFdmVudC5jaGFubmVsKGNoYW5uZWwpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCcm9hZGNhc3QgYW4gZXZlbnQgdG8gYSBjaGFubmVsLlxuICAgICAqL1xuICAgIGJyb2FkY2FzdChrZXk6IHN0cmluZywgZGF0YSA9IHt9KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShFdmVudC5jaGFubmVsKGtleSkubmV4dChkYXRhKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIExpc3RlbiBvbiBhIGNoYW5uZWwgZm9yIGFuIGV2ZW50LnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5XG4gICAgICovXG4gICAgbGlzdGVuKGtleTogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIEV2ZW50LmNoYW5uZWwoa2V5KS5hc09ic2VydmFibGUoKTtcbiAgICB9XG59XG4iXX0=