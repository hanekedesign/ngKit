/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as moment from 'moment';
export class Model {
    /**
     * Create a new instance of the mdoel.
     *
     * @param {?=} attributes
     */
    constructor(attributes) {
        /**
         * Moment JS
         *
         * @return moment
         */
        this.moment = moment;
        if (typeof attributes === 'string') {
            attributes = JSON.parse(attributes);
        }
        Object.assign(this, attributes);
    }
}
function Model_tsickle_Closure_declarations() {
    /**
     * Moment JS
     *
     * \@return moment
     * @type {?}
     */
    Model.prototype.moment;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ2tpdC8iLCJzb3VyY2VzIjpbIm1vZGVscy9tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFFakMsTUFBTTs7Ozs7O0lBTUYsWUFBWSxVQUFnQjs7Ozs7O3NCQWFuQixNQUFNO1FBWlgsRUFBRSxDQUFDLENBQUMsT0FBTyxVQUFVLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNqQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN2QztRQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQ25DO0NBUUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuZXhwb3J0IGNsYXNzIE1vZGVsIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIG1kb2VsLlxuICAgICAqXG4gICAgICogQHBhcmFtICBhdHRyaWJ1dGVzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoYXR0cmlidXRlcz86IGFueSkge1xuICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzID0gSlNPTi5wYXJzZShhdHRyaWJ1dGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgYXR0cmlidXRlcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW9tZW50IEpTXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIG1vbWVudFxuICAgICAqL1xuICAgIG1vbWVudCA9IG1vbWVudDtcbn1cbiJdfQ==