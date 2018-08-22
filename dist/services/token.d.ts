import { Storage } from './storage';
import { Config } from './../config';
export declare class Token {
    config: Config;
    private storage;
    /**
     * Name of token stored in local storage.
     */
    protected _token: string;
    /**
     * Constructor.
     *
     * @param  config
     * @param  storage
     */
    constructor(config: Config, storage: Storage);
    /**
     * Get the token from local storage.
     *
     * @param  tokenName
     */
    get(tokenName?: string): Promise<any>;
    /**
     * Store the token in local storage.
     *
     * @param  token
     * @param  tokenName
     */
    set(token: string, tokenName?: string): Promise<any>;
    /**
     * Remove token from local storage.
     *
     * @param  tokenName
     */
    remove(tokenName?: string): boolean;
    /**
     * Read a token from a response object.
     *
     * @param  response
     */
    read(response?: any): string;
}
