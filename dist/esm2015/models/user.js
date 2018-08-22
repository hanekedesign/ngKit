/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export class UserModel {
    /**
     * Create a new instance of the model.
     *
     * @param {?} authorization
     * @param {?} user
     */
    constructor(authorization, user) {
        this.authorization = authorization;
        this.user = user;
        Object.assign(this, user);
    }
    /**
     * Check if user can perform action based on a policy.
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    can(key, value) {
        return this.authorization.checkPolicy(key, value);
    }
    /**
     * Check if user cannot perform action based on a policy.
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    cannot(key, value) {
        return !this.authorization.checkPolicy(key, value);
    }
    /**
     * Allow a user to perform action based on a policy.
     *
     * @param {?} policyName
     * @param {?} object
     * @param {?} allowed
     * @return {?}
     */
    allow(policyName, object, allowed) {
        if (typeof allowed === 'function' && allowed()) {
            this.authorization.addPolicy(policyName, object);
        }
        else if (typeof allowed === 'boolean' && allowed) {
            this.authorization.addPolicy(policyName, object);
        }
        else {
            this.authorization.removePolicy(policyName, object);
        }
        return this;
    }
    /**
     * Don't allow a user to perform action based on a policy.
     *
     * @param {?} policyName
     * @param {?} object
     * @return {?}
     */
    disallow(policyName, object) {
        this.authorization.removePolicy(policyName, object);
        return this;
    }
    /**
     * Identify a user with a role.
     *
     * @param {?} role
     * @return {?}
     */
    identify(role) {
        this.authorization.addPolicy('roles', role);
        return this;
    }
    /**
     * Check if a user is identified as a role.
     *
     * @param {?} role
     * @return {?}
     */
    is(role) {
        return this.authorization.checkPolicy('roles', role);
    }
    /**
     * Check if a user is not identified with a role.
     *
     * @param {?} role
     * @return {?}
     */
    isNot(role) {
        return !this.authorization.checkPolicy('roles', role);
    }
}
function UserModel_tsickle_Closure_declarations() {
    /** @type {?} */
    UserModel.prototype.authorization;
    /** @type {?} */
    UserModel.prototype.user;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25na2l0LyIsInNvdXJjZXMiOlsibW9kZWxzL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE1BQU07Ozs7Ozs7SUFPRixZQUNZLGVBQ0Q7UUFEQyxrQkFBYSxHQUFiLGFBQWE7UUFDZCxTQUFJLEdBQUosSUFBSTtRQUVYLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzdCOzs7Ozs7OztJQVFELEdBQUcsQ0FBQyxHQUFXLEVBQUUsS0FBVTtRQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3JEOzs7Ozs7OztJQVFELE1BQU0sQ0FBQyxHQUFXLEVBQUUsS0FBVTtRQUMxQixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDdEQ7Ozs7Ozs7OztJQVNELEtBQUssQ0FBQyxVQUFrQixFQUFFLE1BQVcsRUFBRSxPQUEyQjtRQUM5RCxFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sS0FBSyxVQUFVLElBQUksT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNwRDtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sS0FBSyxTQUFTLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDcEQ7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN2RDtRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDZjs7Ozs7Ozs7SUFTRCxRQUFRLENBQUMsVUFBa0IsRUFBRSxNQUFXO1FBQ3BDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVwRCxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2Y7Ozs7Ozs7SUFPRCxRQUFRLENBQUMsSUFBWTtRQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFNUMsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmOzs7Ozs7O0lBT0QsRUFBRSxDQUFDLElBQVk7UUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3hEOzs7Ozs7O0lBT0QsS0FBSyxDQUFDLElBQVk7UUFDZCxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDekQ7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF1dGhvcml6YXRpb24gfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRob3JpemF0aW9uJztcblxuZXhwb3J0IGNsYXNzIFVzZXJNb2RlbCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBtb2RlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBhdXRob3JpemF0aW9uXG4gICAgICogQHBhcmFtIHVzZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBhdXRob3JpemF0aW9uOiBBdXRob3JpemF0aW9uLFxuICAgICAgICBwdWJsaWMgdXNlcjogb2JqZWN0XG4gICAgKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgdXNlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdXNlciBjYW4gcGVyZm9ybSBhY3Rpb24gYmFzZWQgb24gYSBwb2xpY3kuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleVxuICAgICAqIEBwYXJhbSAgdmFsdWVcbiAgICAgKi9cbiAgICBjYW4oa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aG9yaXphdGlvbi5jaGVja1BvbGljeShrZXksIHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB1c2VyIGNhbm5vdCBwZXJmb3JtIGFjdGlvbiBiYXNlZCBvbiBhIHBvbGljeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5XG4gICAgICogQHBhcmFtICB2YWx1ZVxuICAgICAqL1xuICAgIGNhbm5vdChrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuYXV0aG9yaXphdGlvbi5jaGVja1BvbGljeShrZXksIHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGxvdyBhIHVzZXIgdG8gcGVyZm9ybSBhY3Rpb24gYmFzZWQgb24gYSBwb2xpY3kuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHBvbGljeU5hbWVcbiAgICAgKiBAcGFyYW0gIG9iamVjdFxuICAgICAqIEBwYXJhbSAgYWxsb3dlZFxuICAgICAqL1xuICAgIGFsbG93KHBvbGljeU5hbWU6IHN0cmluZywgb2JqZWN0OiBhbnksIGFsbG93ZWQ6IEZ1bmN0aW9uIHwgYm9vbGVhbik6IFVzZXJNb2RlbCB7XG4gICAgICAgIGlmICh0eXBlb2YgYWxsb3dlZCA9PT0gJ2Z1bmN0aW9uJyAmJiBhbGxvd2VkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aG9yaXphdGlvbi5hZGRQb2xpY3kocG9saWN5TmFtZSwgb2JqZWN0KTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYWxsb3dlZCA9PT0gJ2Jvb2xlYW4nICYmIGFsbG93ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aG9yaXphdGlvbi5hZGRQb2xpY3kocG9saWN5TmFtZSwgb2JqZWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aG9yaXphdGlvbi5yZW1vdmVQb2xpY3kocG9saWN5TmFtZSwgb2JqZWN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvbid0IGFsbG93IGEgdXNlciB0byBwZXJmb3JtIGFjdGlvbiBiYXNlZCBvbiBhIHBvbGljeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgcG9saWN5TmFtZVxuICAgICAqIEBwYXJhbSAgb2JqZWN0XG4gICAgICogQHBhcmFtICBhbGxvd2VkXG4gICAgICovXG4gICAgZGlzYWxsb3cocG9saWN5TmFtZTogc3RyaW5nLCBvYmplY3Q6IGFueSk6IFVzZXJNb2RlbCB7XG4gICAgICAgIHRoaXMuYXV0aG9yaXphdGlvbi5yZW1vdmVQb2xpY3kocG9saWN5TmFtZSwgb2JqZWN0KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZGVudGlmeSBhIHVzZXIgd2l0aCBhIHJvbGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcm9sZVxuICAgICAqL1xuICAgIGlkZW50aWZ5KHJvbGU6IHN0cmluZyk6IFVzZXJNb2RlbCB7XG4gICAgICAgIHRoaXMuYXV0aG9yaXphdGlvbi5hZGRQb2xpY3koJ3JvbGVzJywgcm9sZSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYSB1c2VyIGlzIGlkZW50aWZpZWQgYXMgYSByb2xlLlxuICAgICAqXG4gICAgICogQHBhcmFtICByb2xlXG4gICAgICovXG4gICAgaXMocm9sZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhvcml6YXRpb24uY2hlY2tQb2xpY3koJ3JvbGVzJywgcm9sZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYSB1c2VyIGlzIG5vdCBpZGVudGlmaWVkIHdpdGggYSByb2xlLlxuICAgICAqXG4gICAgICogQHBhcmFtICByb2xlXG4gICAgICovXG4gICAgaXNOb3Qocm9sZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5hdXRob3JpemF0aW9uLmNoZWNrUG9saWN5KCdyb2xlcycsIHJvbGUpO1xuICAgIH1cbn1cbiJdfQ==