import { Config } from '../config';
export interface StorageDriver {
    /**
     * The database of the storage provider.
     */
    db: any;
    /**
     * Get an item from storage.
     *
     * @param   key
     */
    get(key: string): Promise<any>;
    /**
     * Set an item to storage.
     *
     * @param  key
     * @param  value
     */
    set(key: string, value: any): Promise<any>;
    /**
     * Remove an item from storage.
     *
     * @param key
     */
    remove(key: string): Promise<any>;
    /**
     * Clear storage.
     */
    clear(): Promise<any>;
}
export declare class Storage implements StorageDriver {
    private config;
    /**
     * The database of the storage provider.
     */
    db: any;
    /**
     * Create a new instance of the service.
     *
     * @param config
     */
    constructor(config: Config);
    /**
     * Get item from local storage.
     */
    get(key: string): Promise<any>;
    /**
     * Set an item to local storage.
     *
     * @param  key
     * @param  value
     */
    set(key: string, value: any): Promise<any>;
    /**
     * Remove an item from local storage.
     *
     * @param   key
     */
    remove(key: string): Promise<any>;
    /**
     * Clear local storage.
     */
    clear(): Promise<any>;
}
