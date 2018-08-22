export declare class Config {
    private _options;
    /**
     * Default configuration.
     */
    static defaultOptions: any;
    /**
     * Config options.
     */
    options: any;
    /**
     * Create a new instance of the service..
     */
    constructor(_options: any);
    /**
     * Return the configurable options.
     */
    getOptions(): any;
    /**
     * Get an option by key.
     *
     * @param   key
     * @param   override
     */
    get(key: string, override?: any): any;
    /**
     * Static method to get an option by key.
     *
     * @param   key
     * @param   override
     */
    static getItem(key: string, override?: any): any;
    /**
     * Set an option by key.
     *
     * @param   key
     * @param  value
     */
    setItem(key: string, value: any): any;
    /**
     * Set the configurable options.
     *
     * @param  options
     */
    setOptions(options: any): Config;
}
