import { Injectable } from "@angular/core";

@Injectable()
export class SocketIOConfig {
    private webSocketUrl:string;
    private autoConnect:boolean;
    private transports:[string];
    private useCORSRouteToGetCookie:string;
    private headers:object;
    private prefix:string;

    public setWebsocketUrl(_webSocketUrl){
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
    public setHeaders(_headers:object): void {
        this.headers = _headers;
    }
    public getHeaders(): object {
        return this.headers || {};
    }
    public setPrefix(_prefix){
        this.prefix = _prefix;
    }
    public getPrefix(): string {
        return this.prefix || '';
    }
}