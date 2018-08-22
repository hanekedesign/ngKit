/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UserModel = /** @class */ (function () {
    /**
     * Create a new instance of the model.
     *
     * @param authorization
     * @param user
     */
    function UserModel(authorization, user) {
        this.authorization = authorization;
        this.user = user;
        Object.assign(this, user);
    }
    /**
     * Check if user can perform action based on a policy.
     *
     * @param  key
     * @param  value
     */
    /**
     * Check if user can perform action based on a policy.
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    UserModel.prototype.can = /**
     * Check if user can perform action based on a policy.
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        return this.authorization.checkPolicy(key, value);
    };
    /**
     * Check if user cannot perform action based on a policy.
     *
     * @param  key
     * @param  value
     */
    /**
     * Check if user cannot perform action based on a policy.
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    UserModel.prototype.cannot = /**
     * Check if user cannot perform action based on a policy.
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        return !this.authorization.checkPolicy(key, value);
    };
    /**
     * Allow a user to perform action based on a policy.
     *
     * @param  policyName
     * @param  object
     * @param  allowed
     */
    /**
     * Allow a user to perform action based on a policy.
     *
     * @param {?} policyName
     * @param {?} object
     * @param {?} allowed
     * @return {?}
     */
    UserModel.prototype.allow = /**
     * Allow a user to perform action based on a policy.
     *
     * @param {?} policyName
     * @param {?} object
     * @param {?} allowed
     * @return {?}
     */
    function (policyName, object, allowed) {
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
    };
    /**
     * Don't allow a user to perform action based on a policy.
     *
     * @param  policyName
     * @param  object
     * @param  allowed
     */
    /**
     * Don't allow a user to perform action based on a policy.
     *
     * @param {?} policyName
     * @param {?} object
     * @return {?}
     */
    UserModel.prototype.disallow = /**
     * Don't allow a user to perform action based on a policy.
     *
     * @param {?} policyName
     * @param {?} object
     * @return {?}
     */
    function (policyName, object) {
        this.authorization.removePolicy(policyName, object);
        return this;
    };
    /**
     * Identify a user with a role.
     *
     * @param role
     */
    /**
     * Identify a user with a role.
     *
     * @param {?} role
     * @return {?}
     */
    UserModel.prototype.identify = /**
     * Identify a user with a role.
     *
     * @param {?} role
     * @return {?}
     */
    function (role) {
        this.authorization.addPolicy('roles', role);
        return this;
    };
    /**
     * Check if a user is identified as a role.
     *
     * @param  role
     */
    /**
     * Check if a user is identified as a role.
     *
     * @param {?} role
     * @return {?}
     */
    UserModel.prototype.is = /**
     * Check if a user is identified as a role.
     *
     * @param {?} role
     * @return {?}
     */
    function (role) {
        return this.authorization.checkPolicy('roles', role);
    };
    /**
     * Check if a user is not identified with a role.
     *
     * @param  role
     */
    /**
     * Check if a user is not identified with a role.
     *
     * @param {?} role
     * @return {?}
     */
    UserModel.prototype.isNot = /**
     * Check if a user is not identified with a role.
     *
     * @param {?} role
     * @return {?}
     */
    function (role) {
        return !this.authorization.checkPolicy('roles', role);
    };
    return UserModel;
}());
export { UserModel };
function UserModel_tsickle_Closure_declarations() {
    /** @type {?} */
    UserModel.prototype.authorization;
    /** @type {?} */
    UserModel.prototype.user;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25na2l0LyIsInNvdXJjZXMiOlsibW9kZWxzL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLElBQUE7SUFDSTs7Ozs7T0FLRztJQUNILG1CQUNZLGVBQ0Q7UUFEQyxrQkFBYSxHQUFiLGFBQWE7UUFDZCxTQUFJLEdBQUosSUFBSTtRQUVYLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzdCO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7O0lBQ0gsdUJBQUc7Ozs7Ozs7SUFBSCxVQUFJLEdBQVcsRUFBRSxLQUFVO1FBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDckQ7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7SUFDSCwwQkFBTTs7Ozs7OztJQUFOLFVBQU8sR0FBVyxFQUFFLEtBQVU7UUFDMUIsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3REO0lBRUQ7Ozs7OztPQU1HOzs7Ozs7Ozs7SUFDSCx5QkFBSzs7Ozs7Ozs7SUFBTCxVQUFNLFVBQWtCLEVBQUUsTUFBVyxFQUFFLE9BQTJCO1FBQzlELEVBQUUsQ0FBQyxDQUFDLE9BQU8sT0FBTyxLQUFLLFVBQVUsSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3BEO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sT0FBTyxLQUFLLFNBQVMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNwRDtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3ZEO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmO0lBRUQ7Ozs7OztPQU1HOzs7Ozs7OztJQUNILDRCQUFROzs7Ozs7O0lBQVIsVUFBUyxVQUFrQixFQUFFLE1BQVc7UUFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXBELE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDZjtJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCw0QkFBUTs7Ozs7O0lBQVIsVUFBUyxJQUFZO1FBQ2pCLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUU1QyxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2Y7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsc0JBQUU7Ozs7OztJQUFGLFVBQUcsSUFBWTtRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDeEQ7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gseUJBQUs7Ozs7OztJQUFMLFVBQU0sSUFBWTtRQUNkLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztLQUN6RDtvQkEvRkw7SUFnR0MsQ0FBQTtBQTlGRCxxQkE4RkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBdXRob3JpemF0aW9uIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0aG9yaXphdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBVc2VyTW9kZWwge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbW9kZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYXV0aG9yaXphdGlvblxuICAgICAqIEBwYXJhbSB1c2VyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgYXV0aG9yaXphdGlvbjogQXV0aG9yaXphdGlvbixcbiAgICAgICAgcHVibGljIHVzZXI6IG9iamVjdFxuICAgICkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHVzZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHVzZXIgY2FuIHBlcmZvcm0gYWN0aW9uIGJhc2VkIG9uIGEgcG9saWN5LlxuICAgICAqXG4gICAgICogQHBhcmFtICBrZXlcbiAgICAgKiBAcGFyYW0gIHZhbHVlXG4gICAgICovXG4gICAgY2FuKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhvcml6YXRpb24uY2hlY2tQb2xpY3koa2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdXNlciBjYW5ub3QgcGVyZm9ybSBhY3Rpb24gYmFzZWQgb24gYSBwb2xpY3kuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleVxuICAgICAqIEBwYXJhbSAgdmFsdWVcbiAgICAgKi9cbiAgICBjYW5ub3Qoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmF1dGhvcml6YXRpb24uY2hlY2tQb2xpY3koa2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxsb3cgYSB1c2VyIHRvIHBlcmZvcm0gYWN0aW9uIGJhc2VkIG9uIGEgcG9saWN5LlxuICAgICAqXG4gICAgICogQHBhcmFtICBwb2xpY3lOYW1lXG4gICAgICogQHBhcmFtICBvYmplY3RcbiAgICAgKiBAcGFyYW0gIGFsbG93ZWRcbiAgICAgKi9cbiAgICBhbGxvdyhwb2xpY3lOYW1lOiBzdHJpbmcsIG9iamVjdDogYW55LCBhbGxvd2VkOiBGdW5jdGlvbiB8IGJvb2xlYW4pOiBVc2VyTW9kZWwge1xuICAgICAgICBpZiAodHlwZW9mIGFsbG93ZWQgPT09ICdmdW5jdGlvbicgJiYgYWxsb3dlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmF1dGhvcml6YXRpb24uYWRkUG9saWN5KHBvbGljeU5hbWUsIG9iamVjdCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFsbG93ZWQgPT09ICdib29sZWFuJyAmJiBhbGxvd2VkKSB7XG4gICAgICAgICAgICB0aGlzLmF1dGhvcml6YXRpb24uYWRkUG9saWN5KHBvbGljeU5hbWUsIG9iamVjdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmF1dGhvcml6YXRpb24ucmVtb3ZlUG9saWN5KHBvbGljeU5hbWUsIG9iamVjdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEb24ndCBhbGxvdyBhIHVzZXIgdG8gcGVyZm9ybSBhY3Rpb24gYmFzZWQgb24gYSBwb2xpY3kuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHBvbGljeU5hbWVcbiAgICAgKiBAcGFyYW0gIG9iamVjdFxuICAgICAqIEBwYXJhbSAgYWxsb3dlZFxuICAgICAqL1xuICAgIGRpc2FsbG93KHBvbGljeU5hbWU6IHN0cmluZywgb2JqZWN0OiBhbnkpOiBVc2VyTW9kZWwge1xuICAgICAgICB0aGlzLmF1dGhvcml6YXRpb24ucmVtb3ZlUG9saWN5KHBvbGljeU5hbWUsIG9iamVjdCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWRlbnRpZnkgYSB1c2VyIHdpdGggYSByb2xlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJvbGVcbiAgICAgKi9cbiAgICBpZGVudGlmeShyb2xlOiBzdHJpbmcpOiBVc2VyTW9kZWwge1xuICAgICAgICB0aGlzLmF1dGhvcml6YXRpb24uYWRkUG9saWN5KCdyb2xlcycsIHJvbGUpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGEgdXNlciBpcyBpZGVudGlmaWVkIGFzIGEgcm9sZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgcm9sZVxuICAgICAqL1xuICAgIGlzKHJvbGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hdXRob3JpemF0aW9uLmNoZWNrUG9saWN5KCdyb2xlcycsIHJvbGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGEgdXNlciBpcyBub3QgaWRlbnRpZmllZCB3aXRoIGEgcm9sZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgcm9sZVxuICAgICAqL1xuICAgIGlzTm90KHJvbGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuYXV0aG9yaXphdGlvbi5jaGVja1BvbGljeSgncm9sZXMnLCByb2xlKTtcbiAgICB9XG59XG4iXX0=