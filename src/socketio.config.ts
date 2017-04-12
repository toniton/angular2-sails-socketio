import { Injectable } from "@angular/core";
import * as _ from "lodash";
import { SocketIOResponse } from "./socketio.response";

@Injectable()
export class SocketIOConfig {
    private webSocketUrl: string;
    private autoConnect: boolean;
    private transports: [string];
    private useCORSRouteToGetCookie: string;
    private headers: object;
    private prefix: string;
    private socketInterceptor: any;

    public setWebsocketUrl(_webSocketUrl) {
        this.webSocketUrl = _webSocketUrl;
    }

    public getWebsocketUrl(): string {
        return this.webSocketUrl || "ws://localhost:1337";
    }

    public getAutoConnect(): boolean {
        return false;
    }
    public getTransports(): [string] {
        return ['websocket'];
    }
    public getUseCORSRouteToGetCookie(): boolean {
        return false;
    }
    public setHeaders(_headers: object): void {
        this.headers = _headers;
    }
    public getHeaders(): object {
        return this.headers || {};
    }
    public setPrefix(_prefix) {
        this.prefix = _prefix;
    }
    public getPrefix(): string {
        return this.prefix || '';
    }
    public setSocketInterceptor(interceptor: (response:SocketIOResponse)=>void): void {
        if (!_.isFunction(interceptor)) {
            throw new Error('This method only accepts a function');
        }
        this.socketInterceptor = interceptor;
    }
    public getSocketInterceptor(): any {
        return this.socketInterceptor || null;
    }
}