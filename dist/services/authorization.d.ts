import { PolicyModel } from './../models/index';
export declare class Authorization {
    /**
     * Active Policies
     */
    policies: PolicyModel[];
    /**
     * Constructor.
     */
    constructor();
    /**
     *  Add a policy to the service.
     *
     * @param  key
     * @param  value
     */
    addPolicy(key: string, value?: any): boolean;
    /**
     * Check the given policy.
     *
     * @param  name
     * @param  value
     */
    checkPolicy(key: string, value?: any): boolean;
    /**
     * Clear all the policies on the service.
     */
    clearPolicies(): void;
    /**
     *  Remove a policy that has already been defined.
     *
     * @param  key
     * @param  value
     */
    removePolicy(key: string, value: any): boolean;
}
