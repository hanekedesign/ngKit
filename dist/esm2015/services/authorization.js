/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { PolicyModel } from './../models/index';
export class Authorization {
    /**
     * Constructor.
     */
    constructor() {
        /**
         * Active Policies
         */
        this.policies = [];
    }
    /**
     *  Add a policy to the service.
     *
     * @param {?} key
     * @param {?=} value
     * @return {?}
     */
    addPolicy(key, value) {
        if (this.policies.findIndex(policy => policy.name == key) < 0) {
            let /** @type {?} */ policy = new PolicyModel({ name: key });
            if (value)
                policy.objects.push(value);
            this.policies.push(policy);
            return true;
        }
        else {
            let /** @type {?} */ index = this.policies.findIndex(policy => policy.name == key);
            if (value && !this.policies[index].objects[value]) {
                this.policies[index].objects.push(value);
                return true;
            }
            return false;
        }
    }
    /**
     * Check the given policy.
     *
     * @param {?} key
     * @param {?=} value
     * @return {?}
     */
    checkPolicy(key, value = null) {
        let /** @type {?} */ check = false;
        let /** @type {?} */ policy = this.policies.find(policy => policy.name === key);
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
    }
    /**
     * Clear all the policies on the service.
     * @return {?}
     */
    clearPolicies() {
        this.policies = [];
    }
    /**
     *  Remove a policy that has already been defined.
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    removePolicy(key, value) {
        let /** @type {?} */ policy = this.policies.find(policy => policy.name === key);
        if (policy && policy.objects.indexOf(value) >= 0) {
            let /** @type {?} */ index = this.policies.findIndex(policy => policy.name === name);
            let /** @type {?} */ objectIndexs = [];
            policy.objects.forEach((o, i) => {
                if (o == value) {
                    objectIndexs.push(i);
                }
            });
            objectIndexs.forEach(index => delete policy.objects[index]);
            this.policies[index] = policy;
            return true;
        }
        return false;
    }
}
Authorization.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Authorization.ctorParameters = () => [];
function Authorization_tsickle_Closure_declarations() {
    /**
     * Active Policies
     * @type {?}
     */
    Authorization.prototype.policies;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25na2l0LyIsInNvdXJjZXMiOlsic2VydmljZXMvYXV0aG9yaXphdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFHaEQsTUFBTTs7OztJQVNGOzs7O3dCQUwwQixFQUFFO0tBS1g7Ozs7Ozs7O0lBUWpCLFNBQVMsQ0FBQyxHQUFXLEVBQUUsS0FBVztRQUM5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1RCxxQkFBSSxNQUFNLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUU1QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFM0IsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNmO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixxQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1lBRWxFLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUV6QyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ2Y7WUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2hCO0tBQ0o7Ozs7Ozs7O0lBUUQsV0FBVyxDQUFDLEdBQVcsRUFBRSxRQUFhLElBQUk7UUFDdEMscUJBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNsQixxQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBRS9ELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDVCxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ2hCO1FBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hELENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDaEI7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDakI7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO0tBQ2hCOzs7OztJQUtELGFBQWE7UUFDVCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztLQUN0Qjs7Ozs7Ozs7SUFRRCxZQUFZLENBQUMsR0FBVyxFQUFFLEtBQVU7UUFDaEMscUJBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUUvRCxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQyxxQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDO1lBQ3BFLHFCQUFJLFlBQVksR0FBVSxFQUFFLENBQUM7WUFFN0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzVCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNiLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3hCO2FBQ0osQ0FBQyxDQUFDO1lBRUgsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRTVELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDO1lBRTlCLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZjtRQUVELE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDaEI7OztZQWxHSixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9saWN5TW9kZWwgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRob3JpemF0aW9uIHtcbiAgICAvKipcbiAgICAgKiBBY3RpdmUgUG9saWNpZXNcbiAgICAgKi9cbiAgICBwb2xpY2llczogUG9saWN5TW9kZWxbXSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3IuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIC8qKlxuICAgICAqICBBZGQgYSBwb2xpY3kgdG8gdGhlIHNlcnZpY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleVxuICAgICAqIEBwYXJhbSAgdmFsdWVcbiAgICAgKi9cbiAgICBhZGRQb2xpY3koa2V5OiBzdHJpbmcsIHZhbHVlPzogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLnBvbGljaWVzLmZpbmRJbmRleChwb2xpY3kgPT4gcG9saWN5Lm5hbWUgPT0ga2V5KSA8IDApIHtcbiAgICAgICAgICAgIGxldCBwb2xpY3kgPSBuZXcgUG9saWN5TW9kZWwoeyBuYW1lOiBrZXkgfSk7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSkgcG9saWN5Lm9iamVjdHMucHVzaCh2YWx1ZSk7XG5cbiAgICAgICAgICAgIHRoaXMucG9saWNpZXMucHVzaChwb2xpY3kpO1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMucG9saWNpZXMuZmluZEluZGV4KHBvbGljeSA9PiBwb2xpY3kubmFtZSA9PSBrZXkpO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUgJiYgIXRoaXMucG9saWNpZXNbaW5kZXhdLm9iamVjdHNbdmFsdWVdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb2xpY2llc1tpbmRleF0ub2JqZWN0cy5wdXNoKHZhbHVlKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayB0aGUgZ2l2ZW4gcG9saWN5LlxuICAgICAqXG4gICAgICogQHBhcmFtICBuYW1lXG4gICAgICogQHBhcmFtICB2YWx1ZVxuICAgICAqL1xuICAgIGNoZWNrUG9saWN5KGtleTogc3RyaW5nLCB2YWx1ZTogYW55ID0gbnVsbCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgY2hlY2sgPSBmYWxzZTtcbiAgICAgICAgbGV0IHBvbGljeSA9IHRoaXMucG9saWNpZXMuZmluZChwb2xpY3kgPT4gcG9saWN5Lm5hbWUgPT09IGtleSk7XG5cbiAgICAgICAgaWYgKHBvbGljeSkge1xuICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvbGljeSAmJiAoKHZhbHVlICYmIHBvbGljeS5vYmplY3RzLmluZGV4T2YodmFsdWUpID49IDApIHx8XG4gICAgICAgICAgICAoIXZhbHVlICYmICFwb2xpY3kub2JqZWN0cy5sZW5ndGgpKSkge1xuICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjaGVjaztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGVhciBhbGwgdGhlIHBvbGljaWVzIG9uIHRoZSBzZXJ2aWNlLlxuICAgICAqL1xuICAgIGNsZWFyUG9saWNpZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucG9saWNpZXMgPSBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgUmVtb3ZlIGEgcG9saWN5IHRoYXQgaGFzIGFscmVhZHkgYmVlbiBkZWZpbmVkLlxuICAgICAqXG4gICAgICogQHBhcmFtICBrZXlcbiAgICAgKiBAcGFyYW0gIHZhbHVlXG4gICAgICovXG4gICAgcmVtb3ZlUG9saWN5KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBwb2xpY3kgPSB0aGlzLnBvbGljaWVzLmZpbmQocG9saWN5ID0+IHBvbGljeS5uYW1lID09PSBrZXkpO1xuXG4gICAgICAgIGlmIChwb2xpY3kgJiYgcG9saWN5Lm9iamVjdHMuaW5kZXhPZih2YWx1ZSkgPj0gMCkge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5wb2xpY2llcy5maW5kSW5kZXgocG9saWN5ID0+IHBvbGljeS5uYW1lID09PSBuYW1lKTtcbiAgICAgICAgICAgIGxldCBvYmplY3RJbmRleHM6IGFueVtdID0gW107XG5cbiAgICAgICAgICAgIHBvbGljeS5vYmplY3RzLmZvckVhY2goKG8sIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobyA9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBvYmplY3RJbmRleHMucHVzaChpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgb2JqZWN0SW5kZXhzLmZvckVhY2goaW5kZXggPT4gZGVsZXRlIHBvbGljeS5vYmplY3RzW2luZGV4XSk7XG5cbiAgICAgICAgICAgIHRoaXMucG9saWNpZXNbaW5kZXhdID0gcG9saWN5O1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4iXX0=