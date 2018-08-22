/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { PolicyModel } from './../models/index';
var Authorization = /** @class */ (function () {
    /**
     * Constructor.
     */
    function Authorization() {
        /**
         * Active Policies
         */
        this.policies = [];
    }
    /**
     *  Add a policy to the service.
     *
     * @param  key
     * @param  value
     */
    /**
     *  Add a policy to the service.
     *
     * @param {?} key
     * @param {?=} value
     * @return {?}
     */
    Authorization.prototype.addPolicy = /**
     *  Add a policy to the service.
     *
     * @param {?} key
     * @param {?=} value
     * @return {?}
     */
    function (key, value) {
        if (this.policies.findIndex(function (policy) { return policy.name == key; }) < 0) {
            var /** @type {?} */ policy = new PolicyModel({ name: key });
            if (value)
                policy.objects.push(value);
            this.policies.push(policy);
            return true;
        }
        else {
            var /** @type {?} */ index = this.policies.findIndex(function (policy) { return policy.name == key; });
            if (value && !this.policies[index].objects[value]) {
                this.policies[index].objects.push(value);
                return true;
            }
            return false;
        }
    };
    /**
     * Check the given policy.
     *
     * @param  name
     * @param  value
     */
    /**
     * Check the given policy.
     *
     * @param {?} key
     * @param {?=} value
     * @return {?}
     */
    Authorization.prototype.checkPolicy = /**
     * Check the given policy.
     *
     * @param {?} key
     * @param {?=} value
     * @return {?}
     */
    function (key, value) {
        if (value === void 0) { value = null; }
        var /** @type {?} */ check = false;
        var /** @type {?} */ policy = this.policies.find(function (policy) { return policy.name === key; });
        if (policy) {
            check = true;
        }
        if (policy && ((value && policy.objects.indexOf(value) >= 0) ||
            (!value && !policy.objects.length))) {
            check = true;
        }
        else {
            check = false;
        }
        return check;
    };
    /**
     * Clear all the policies on the service.
     */
    /**
     * Clear all the policies on the service.
     * @return {?}
     */
    Authorization.prototype.clearPolicies = /**
     * Clear all the policies on the service.
     * @return {?}
     */
    function () {
        this.policies = [];
    };
    /**
     *  Remove a policy that has already been defined.
     *
     * @param  key
     * @param  value
     */
    /**
     *  Remove a policy that has already been defined.
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    Authorization.prototype.removePolicy = /**
     *  Remove a policy that has already been defined.
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        var /** @type {?} */ policy = this.policies.find(function (policy) { return policy.name === key; });
        if (policy && policy.objects.indexOf(value) >= 0) {
            var /** @type {?} */ index = this.policies.findIndex(function (policy) { return policy.name === name; });
            var /** @type {?} */ objectIndexs_1 = [];
            policy.objects.forEach(function (o, i) {
                if (o == value) {
                    objectIndexs_1.push(i);
                }
            });
            objectIndexs_1.forEach(function (index) { return delete policy.objects[index]; });
            this.policies[index] = policy;
            return true;
        }
        return false;
    };
    Authorization.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Authorization.ctorParameters = function () { return []; };
    return Authorization;
}());
export { Authorization };
function Authorization_tsickle_Closure_declarations() {
    /**
     * Active Policies
     * @type {?}
     */
    Authorization.prototype.policies;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25na2l0LyIsInNvdXJjZXMiOlsic2VydmljZXMvYXV0aG9yaXphdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0lBUzVDOztPQUVHO0lBQ0g7Ozs7d0JBTDBCLEVBQUU7S0FLWDtJQUVqQjs7Ozs7T0FLRzs7Ozs7Ozs7SUFDSCxpQ0FBUzs7Ozs7OztJQUFULFVBQVUsR0FBVyxFQUFFLEtBQVc7UUFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsSUFBSSxJQUFJLEdBQUcsRUFBbEIsQ0FBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUQscUJBQUksTUFBTSxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFFNUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXRDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRTNCLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0oscUJBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLElBQUksSUFBSSxHQUFHLEVBQWxCLENBQWtCLENBQUMsQ0FBQztZQUVsRSxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFekMsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNmO1lBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNoQjtLQUNKO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7O0lBQ0gsbUNBQVc7Ozs7Ozs7SUFBWCxVQUFZLEdBQVcsRUFBRSxLQUFpQjtRQUFqQixzQkFBQSxFQUFBLFlBQWlCO1FBQ3RDLHFCQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbEIscUJBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLElBQUksS0FBSyxHQUFHLEVBQW5CLENBQW1CLENBQUMsQ0FBQztRQUUvRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1QsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNoQjtRQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4RCxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ2hCO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQ2pCO1FBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNoQjtJQUVEOztPQUVHOzs7OztJQUNILHFDQUFhOzs7O0lBQWI7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztLQUN0QjtJQUVEOzs7OztPQUtHOzs7Ozs7OztJQUNILG9DQUFZOzs7Ozs7O0lBQVosVUFBYSxHQUFXLEVBQUUsS0FBVTtRQUNoQyxxQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO1FBRS9ELEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLHFCQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFwQixDQUFvQixDQUFDLENBQUM7WUFDcEUscUJBQUksY0FBWSxHQUFVLEVBQUUsQ0FBQztZQUU3QixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDO2dCQUN4QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDYixjQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN4QjthQUNKLENBQUMsQ0FBQztZQUVILGNBQVksQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQTVCLENBQTRCLENBQUMsQ0FBQztZQUU1RCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQztZQUU5QixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2Y7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO0tBQ2hCOztnQkFsR0osVUFBVTs7Ozt3QkFIWDs7U0FJYSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9saWN5TW9kZWwgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRob3JpemF0aW9uIHtcbiAgICAvKipcbiAgICAgKiBBY3RpdmUgUG9saWNpZXNcbiAgICAgKi9cbiAgICBwb2xpY2llczogUG9saWN5TW9kZWxbXSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3IuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIC8qKlxuICAgICAqICBBZGQgYSBwb2xpY3kgdG8gdGhlIHNlcnZpY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleVxuICAgICAqIEBwYXJhbSAgdmFsdWVcbiAgICAgKi9cbiAgICBhZGRQb2xpY3koa2V5OiBzdHJpbmcsIHZhbHVlPzogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLnBvbGljaWVzLmZpbmRJbmRleChwb2xpY3kgPT4gcG9saWN5Lm5hbWUgPT0ga2V5KSA8IDApIHtcbiAgICAgICAgICAgIGxldCBwb2xpY3kgPSBuZXcgUG9saWN5TW9kZWwoeyBuYW1lOiBrZXkgfSk7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSkgcG9saWN5Lm9iamVjdHMucHVzaCh2YWx1ZSk7XG5cbiAgICAgICAgICAgIHRoaXMucG9saWNpZXMucHVzaChwb2xpY3kpO1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMucG9saWNpZXMuZmluZEluZGV4KHBvbGljeSA9PiBwb2xpY3kubmFtZSA9PSBrZXkpO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUgJiYgIXRoaXMucG9saWNpZXNbaW5kZXhdLm9iamVjdHNbdmFsdWVdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb2xpY2llc1tpbmRleF0ub2JqZWN0cy5wdXNoKHZhbHVlKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayB0aGUgZ2l2ZW4gcG9saWN5LlxuICAgICAqXG4gICAgICogQHBhcmFtICBuYW1lXG4gICAgICogQHBhcmFtICB2YWx1ZVxuICAgICAqL1xuICAgIGNoZWNrUG9saWN5KGtleTogc3RyaW5nLCB2YWx1ZTogYW55ID0gbnVsbCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgY2hlY2sgPSBmYWxzZTtcbiAgICAgICAgbGV0IHBvbGljeSA9IHRoaXMucG9saWNpZXMuZmluZChwb2xpY3kgPT4gcG9saWN5Lm5hbWUgPT09IGtleSk7XG5cbiAgICAgICAgaWYgKHBvbGljeSkge1xuICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvbGljeSAmJiAoKHZhbHVlICYmIHBvbGljeS5vYmplY3RzLmluZGV4T2YodmFsdWUpID49IDApIHx8XG4gICAgICAgICAgICAoIXZhbHVlICYmICFwb2xpY3kub2JqZWN0cy5sZW5ndGgpKSkge1xuICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjaGVjaztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGVhciBhbGwgdGhlIHBvbGljaWVzIG9uIHRoZSBzZXJ2aWNlLlxuICAgICAqL1xuICAgIGNsZWFyUG9saWNpZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucG9saWNpZXMgPSBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgUmVtb3ZlIGEgcG9saWN5IHRoYXQgaGFzIGFscmVhZHkgYmVlbiBkZWZpbmVkLlxuICAgICAqXG4gICAgICogQHBhcmFtICBrZXlcbiAgICAgKiBAcGFyYW0gIHZhbHVlXG4gICAgICovXG4gICAgcmVtb3ZlUG9saWN5KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBwb2xpY3kgPSB0aGlzLnBvbGljaWVzLmZpbmQocG9saWN5ID0+IHBvbGljeS5uYW1lID09PSBrZXkpO1xuXG4gICAgICAgIGlmIChwb2xpY3kgJiYgcG9saWN5Lm9iamVjdHMuaW5kZXhPZih2YWx1ZSkgPj0gMCkge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5wb2xpY2llcy5maW5kSW5kZXgocG9saWN5ID0+IHBvbGljeS5uYW1lID09PSBuYW1lKTtcbiAgICAgICAgICAgIGxldCBvYmplY3RJbmRleHM6IGFueVtdID0gW107XG5cbiAgICAgICAgICAgIHBvbGljeS5vYmplY3RzLmZvckVhY2goKG8sIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobyA9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBvYmplY3RJbmRleHMucHVzaChpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgb2JqZWN0SW5kZXhzLmZvckVhY2goaW5kZXggPT4gZGVsZXRlIHBvbGljeS5vYmplY3RzW2luZGV4XSk7XG5cbiAgICAgICAgICAgIHRoaXMucG9saWNpZXNbaW5kZXhdID0gcG9saWN5O1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4iXX0=