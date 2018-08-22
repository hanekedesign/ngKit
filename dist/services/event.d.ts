import { Observable, Subject } from 'rxjs';
export declare class Event {
    /**
     * Event channels.
     */
    static channels: Subject<any>[];
    /**
     * Get an event listener.
     *
     * @param  key
     */
    static channel(key: any): Subject<any>;
    /**
     * Set multiple event channels.
     *
     * @param events
     */
    setChannels(channels: string[]): void;
    /**
     * Broadcast an event to a channel.
     */
    broadcast(key: string, data?: {}): Promise<any>;
    /**
     *  Listen on a channel for an event.s
     *
     * @param  key
     */
    listen(key: string): Observable<any>;
}
