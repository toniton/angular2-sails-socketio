import { SocketIOInterface } from "./socketio.interface";
import { SocketIOConfig } from "./socketio.config";
import { SocketIOQuery } from "./socketio.query";
import { Observable } from "rxjs";
import * as SocketIOClient from "socket.io-client";
import * as SailsIOClient from "sails.io.js";
import { Component, OnInit } from "@angular/core";
import { SocketIOCallback } from "./socketio.callback";
import { SocketIOResponse } from "./socketio.response";

declare var window;


@Component({
    providers: [SocketIOConfig]
})
export class SocketIO {
    private socket: any = null;
    constructor(private socketIOConfig: SocketIOConfig) {
        this.connect();
    }

    private connected(): boolean {
        return window.io.socketpoint.isConnected();
    }

    public connect(): SocketIO {
        if (window.io == undefined) {
            window.io = SailsIOClient(SocketIOClient);
            window.io.sails.autoConnect = this.socketIOConfig.getAutoConnect();
            window.io.sails.url = this.socketIOConfig.getWebsocketUrl();
            window.io.sails.transports = this.socketIOConfig.getTransports();
            window.io.sails.useCORSRouteToGetCookie = this.socketIOConfig.getUseCORSRouteToGetCookie();
            window.io.sails.headers = this.socketIOConfig.getHeaders();
            if (!window.io.socketpoint) {
                window.io.socketpoint = window.io.sails.connect(window.io.sails.url);
            }
        }
        return this;
    }

    public isConnecting(): boolean {
        return window.io.socketpoint.isConnecting() || false;
    }

    public disconnect(): SocketIO {
        if (window.io.socketpoint && window.io.socketpoint.isConnected()) {
            window.io.socketpoint.disconnect();
        }
        return this;
    }

    public get(url: string, callback: SocketIOCallback): void {
        this.initParameters();
        console.log(window.io.socketpoint);
        window.io.socketpoint.get(url, {}, (response) => {
            callback.done(new SocketIOResponse(response));
        });
    }

    public post(url: string, data: object, callback: SocketIOCallback): void {
        this.initParameters();
        window.io.socketpoint.post(url, data, (response) => {
            callback.done(new SocketIOResponse(response));
        });
    }

    public put(url: string, data: object, callback: SocketIOCallback): SocketIO {
        this.initParameters();
        return window.io.socketpoint.put(url, data, (response) => {
            callback.done(new SocketIOResponse(response));
        });
    }

    public delete(url: string, callback: SocketIOCallback): SocketIO {
        this.initParameters();
        return window.io.socketpoint.delete(url, {}, (response) => {
            callback.done(new SocketIOResponse(response));
        });
    }

    public on(eventName: string, callback: SocketIOCallback): any {
        this.initParameters();
        window.io.socketpoint.on(eventName, (response) => {
            callback.done(new SocketIOResponse(response));
        });
    }

    public off(eventName: string, callback: SocketIOCallback): SocketIO {
        this.initParameters();
        return window.io.socketpoint.off(eventName, (response) => {
            callback.done(new SocketIOResponse(response));
        });
    }

    private initParameters(): void {
        if (window.io.socketpoint) {
            window.io.socketpoint.headers = this.socketIOConfig.getHeaders();
        }
    }
}