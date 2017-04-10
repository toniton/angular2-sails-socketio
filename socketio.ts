import { SocketIOInterface } from "app/core/utility/socketio/socketio.interface";
import { SocketIOConfig } from "app/core/utility/socketio/socketio.config";
import { SocketIOQuery } from "app/core/utility/socketio/socketio.query";
import { Observable } from "rxjs";
import * as SocketIOClient from "socket.io-client";
import * as SailsIOClient from "sails.io.js";
import { Component, OnInit } from "@angular/core";
import { SocketIOCallback } from "app/core/utility/socketio/socketio.callback";
import { SocketIOResponse } from "app/core/utility/socketio/socketio.response";

export var io: any;

@Component({
    providers: [SocketIOConfig]
})
export class SocketIO {
    private socket: any = null;
    constructor(private socketIOConfig: SocketIOConfig) {
        if (!io) {
            io = SailsIOClient(SocketIOClient);
            io.sails.autoConnect = socketIOConfig.getAutoConnect();
            io.sails.url = socketIOConfig.getWebsocketUrl();
            io.sails.transports = socketIOConfig.getTransports();
            io.sails.useCORSRouteToGetCookie = socketIOConfig.getUseCORSRouteToGetCookie();
            io.sails.headers = socketIOConfig.getHeaders();
        }
        io.socket = io.sails.connect(io.sails.url);
    }

    public connected(): boolean {
        return io.socket.connected();
    }

    public connect(): SocketIO {
        if (!io.connected()) {
            io.socket.connect();
        }
        return this;
    }

    public disconnect(): SocketIO {
        if (io.connected()) {
            io.socket.disconnect();
        }
        return this;
    }

    public get(url: string, callback: SocketIOCallback): SocketIO {
        return io.socket.get(url, {}, (response) => {
            callback.done(new SocketIOResponse(response));
        });
    }

    public post(url: string, data: object, callback: SocketIOCallback): SocketIO {
        return io.socket.post(url, data, (response) => {
            callback.done(new SocketIOResponse(response));
        });
    }

    public put(url: string, data: object, callback: SocketIOCallback): SocketIO {
        return io.socket.put(url, data, (response) => {
            callback.done(new SocketIOResponse(response));
        });
    }

    public delete(url: string, callback: SocketIOCallback): SocketIO {
        return io.socket.delete(url, {}, (response) => {
            callback.done(new SocketIOResponse(response));
        });
    }
}