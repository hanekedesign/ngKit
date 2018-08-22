import { Authorization } from '../services/authorization';
export declare class UserModel {
    private authorization;
    user: object;
    /**
     * Create a new instance of the model.
     *
     * @param authorization
     * @param user
     */
    constructor(authorization: Authorization, user: object);
    /**
     * Check if user can perform action based on a policy.
     *
     * @param  key
     * @param  value
     */
    can(key: string, value: any): boolean;
    /**
     * Check if user cannot perform action based on a policy.
     *
     * @param  key
     * @param  value
     */
    cannot(key: string, value: any): boolean;
    /**
     * Allow a user to perform action based on a policy.
     *
     * @param  policyName
     * @param  object
     * @param  allowed
     */
    allow(policyName: string, object: any, allowed: Function | boolean): UserModel;
    /**
     * Don't allow a user to perform action based on a policy.
     *
     * @param  policyName
     * @param  object
     * @param  allowed
     */
    disallow(policyName: string, object: any): UserModel;
    /**
     * Identify a user with a role.
     *
     * @param role
     */
    identify(role: string): UserModel;
    /**
     * Check if a user is identified as a role.
     *
     * @param  role
     */
    is(role: string): boolean;
    /**
     * Check if a user is not identified with a role.
     *
     * @param  role
     */
    isNot(role: string): boolean;
}
