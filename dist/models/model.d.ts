/// <reference types="moment" />
import * as moment from 'moment';
export declare class Model {
    /**
     * Create a new instance of the mdoel.
     *
     * @param  attributes
     */
    constructor(attributes?: any);
    /**
     * Moment JS
     *
     * @return moment
     */
    moment: typeof moment;
}
