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
    constructor(private socketIOConfig: SocketIOConfig) { }

    private connected(): boolean {
        return window.io.socketpoint.isConnected() || false;
    }

    public connect(): SocketIOClient {
        let that = this;
        if (window.io == undefined) {
            window.io = SailsIOClient(SocketIOClient);
            window.io.sails.autoConnect = this.socketIOConfig.getAutoConnect();
            window.io.sails.url = this.socketIOConfig.getWebsocketUrl();
            window.io.sails.transports = this.socketIOConfig.getTransports();
            window.io.sails.useCORSRouteToGetCookie = this.socketIOConfig.getUseCORSRouteToGetCookie();
            window.io.sails.headers = this.socketIOConfig.getHeaders();
            window.io.sails.timeout = this.socketIOConfig.getTimeOut();
            window.io.socketpoint = (window.io.sails && window.io.sails.connect || window.io.connect)(window.io.sails.url);
            window.io.socketpoint.on('connect', function () {
                if (that.socketIOConfig.getOnConnectCallback !== null) {
                    that.socketIOConfig.getOnConnectCallback();
                }
            });
            window.io.socketpoint.on('disconnect', function () {
                if (that.socketIOConfig.getOnDisconnectCallback !== null) {
                    that.socketIOConfig.getOnDisconnectCallback();
                }
            });
        } else if (window.io.socketpoint._raw.disconnected) {
            window.io.socketpoint.reconnect();
        }
        window.io.socketpoint.headers = this.socketIOConfig.getHeaders();
        return window.io.socketpoint;
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
        let socket = this.connect();
        socket.get(url, {}, (response) => {
            callback.done(new SocketIOResponse(response));
        });
    }

    public post(url: string, data: object, callback: SocketIOCallback): void {
        let socket = this.connect();
        socket.post(url, data, (response) => {
            callback.done(new SocketIOResponse(response));
        });
    }

    public put(url: string, data: object, callback: SocketIOCallback): void {
        let socket = this.connect();
        socket.put(url, data, (response) => {
            callback.done(new SocketIOResponse(response));
        });
    }

    public delete(url: string, callback: SocketIOCallback): void {
        let socket = this.connect();
        socket.delete(url, {}, (response) => {
            callback.done(new SocketIOResponse(response));
        });
    }

    public on(eventName: string, callback: SocketIOCallback): any {
        window.io.socketpoint.on(eventName, (response) => {
            callback.done(new SocketIOResponse(response));
        });
    }

    public off(eventName: string, callback: SocketIOCallback): SocketIO {
        return window.io.socketpoint.off(eventName, (response) => {
            callback.done(new SocketIOResponse(response));
        });
    }
}