import { Injectable } from "@angular/core";
import * as _ from "lodash";
import { SocketIOResponse } from "./socketio.response";

@Injectable()
export class SocketIOConfig {
    private webSocketUrl: string;
    private autoConnect: boolean;
    private transports: [string];
    private useCORSRouteToGetCookie: boolean;
    private headers: object;
    private prefix: string;
    private socketInterceptor: Array<(response: SocketIOResponse) => Promise<SocketIOResponse>> = new Array<(response: SocketIOResponse) => Promise<SocketIOResponse>>();
    private connectedCallback: any;
    private disConnectedCallback: any;
    private timeoutDuration: number;

    public setWebsocketUrl(_webSocketUrl) {
        this.webSocketUrl = _webSocketUrl;
    }

    public getWebsocketUrl(): string {
        return this.webSocketUrl || "ws://localhost:1337";
    }

    public setAutoConnect(autoConnect): void {
        this.autoConnect = autoConnect;
    }
    public getAutoConnect(): boolean {
        return this.autoConnect;
    }
    public setTimeOut(duration: number){
        this.timeoutDuration = duration || 20000;
    }
    public getTimeOut(): number{
        return this.timeoutDuration || 20000;
    }
    public setTransports(transports): void {
        this.transports = transports;
    }
    public getTransports(): [string] {
        return this.transports || ['websocket'];
    }
    public setUseCORSRouteToGetCookie(useCORSRouteToGetCookie): void {
        this.useCORSRouteToGetCookie = useCORSRouteToGetCookie;
    }
    public getUseCORSRouteToGetCookie(): boolean {
        return this.useCORSRouteToGetCookie || false;
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
    public setSocketInterceptor(interceptor: (response: SocketIOResponse) => Promise<SocketIOResponse>): void {
        this.socketInterceptor.push(interceptor);
    }
    public getSocketInterceptor(): any {
        return this.socketInterceptor || [];
    }
    public setConnectionCallbacks(connectedCallback, disConnectedCallback): void {
        this.connectedCallback = connectedCallback;
        this.disConnectedCallback = disConnectedCallback;
    };
    public getOnConnectCallback(): void {
        return this.connectedCallback;
    };
    public getOnDisconnectCallback(): void {
        return this.disConnectedCallback;
    };
}