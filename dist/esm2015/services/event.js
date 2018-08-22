/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
export class Event {
    /**
     * Get an event listener.
     *
     * @param {?} key
     * @return {?}
     */
    static channel(key) {
        if (typeof Event.channels[key] === 'undefined') {
            Event.channels[key] = new Subject();
        }
        return Event.channels[key];
    }
    /**
     * Set multiple event channels.
     *
     * @param {?} channels
     * @return {?}
     */
    setChannels(channels) {
        channels.forEach((channel) => Event.channel(channel));
    }
    /**
     * Broadcast an event to a channel.
     * @param {?} key
     * @param {?=} data
     * @return {?}
     */
    broadcast(key, data = {}) {
        return Promise.resolve(Event.channel(key).next(data));
    }
    /**
     *  Listen on a channel for an event.s
     *
     * @param {?} key
     * @return {?}
     */
    listen(key) {
        return Event.channel(key).asObservable();
    }
}
/**
 * Event channels.
 */
Event.channels = [];
Event.decorators = [
    { type: Injectable },
];
function Event_tsickle_Closure_declarations() {
    /**
     * Event channels.
     * @type {?}
     */
    Event.channels;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ2tpdC8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2V2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsTUFBTTs7Ozs7OztJQVdGLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBUTtRQUNuQixFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUM3QyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7U0FDNUM7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUM5Qjs7Ozs7OztJQU9ELFdBQVcsQ0FBQyxRQUFrQjtRQUMxQixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FDekQ7Ozs7Ozs7SUFLRCxTQUFTLENBQUMsR0FBVyxFQUFFLElBQUksR0FBRyxFQUFFO1FBQzVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDekQ7Ozs7Ozs7SUFPRCxNQUFNLENBQUMsR0FBVztRQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQzVDOzs7OztpQkF0Q2lDLEVBQUU7O1lBTHZDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFdmVudCB7XG4gICAgLyoqXG4gICAgICogRXZlbnQgY2hhbm5lbHMuXG4gICAgICovXG4gICAgc3RhdGljIGNoYW5uZWxzOiBTdWJqZWN0PGFueT5bXSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogR2V0IGFuIGV2ZW50IGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQHBhcmFtICBrZXlcbiAgICAgKi9cbiAgICBzdGF0aWMgY2hhbm5lbChrZXk6IGFueSk6IFN1YmplY3Q8YW55PiB7XG4gICAgICAgIGlmICh0eXBlb2YgRXZlbnQuY2hhbm5lbHNba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIEV2ZW50LmNoYW5uZWxzW2tleV0gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gRXZlbnQuY2hhbm5lbHNba2V5XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgbXVsdGlwbGUgZXZlbnQgY2hhbm5lbHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnRzXG4gICAgICovXG4gICAgc2V0Q2hhbm5lbHMoY2hhbm5lbHM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgICAgIGNoYW5uZWxzLmZvckVhY2goKGNoYW5uZWwpID0+IEV2ZW50LmNoYW5uZWwoY2hhbm5lbCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJyb2FkY2FzdCBhbiBldmVudCB0byBhIGNoYW5uZWwuXG4gICAgICovXG4gICAgYnJvYWRjYXN0KGtleTogc3RyaW5nLCBkYXRhID0ge30pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKEV2ZW50LmNoYW5uZWwoa2V5KS5uZXh0KGRhdGEpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgTGlzdGVuIG9uIGEgY2hhbm5lbCBmb3IgYW4gZXZlbnQuc1xuICAgICAqXG4gICAgICogQHBhcmFtICBrZXlcbiAgICAgKi9cbiAgICBsaXN0ZW4oa2V5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gRXZlbnQuY2hhbm5lbChrZXkpLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cbn1cbiJdfQ==