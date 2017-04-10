import { SocketIOInterface } from "app/core/utility/socketio/socketio.interface";
import { SocketIOConfig } from "app/core/utility/socketio/socketio.config";
import { SocketIOQuery } from "app/core/utility/socketio/socketio.query";
import { Observable } from "rxjs";
import * as SocketIOClient from "socket.io-client";
import * as SailsIOClient from "sails.io.js";
import { Component, OnInit, Injectable } from "@angular/core";
import { Endpoint } from "app/core/utility/socketio/socketio.decorator";
import { SocketIO } from "app/core/utility/socketio/socketio";
import { SocketIOCallback } from "app/core/utility/socketio/socketio.callback";
import { SocketIOResponse } from "app/core/utility/socketio/socketio.response";
import * as _ from "lodash";

@Component({
    providers: [SocketIOConfig]
})

@Endpoint("socketioauthenticate")
export class SocketIOAuthenticate {
    private socketIOConfig: SocketIOConfig;
    [name: string]: any;
    constructor(_socketIOConfig?: SocketIOConfig) {
        this.socketIOConfig = _socketIOConfig;
    }

    authorize(data:any): Promise<SocketIOResponse> {
        const promise = new Promise((resolve, reject) => {
            let url = "/";
            if (!_.isEmpty(this.socketIOConfig.getPrefix())) {
                url += this.socketIOConfig.getPrefix() + '/';
            }
            url += _.toLower(this.getEndPoint());
            (new SocketIO(this.socketIOConfig)).post(url, data, <SocketIOCallback>{
                done(res: SocketIOResponse): void {
                    console.log(res);
                    if (res.getCode() == "OK") {
                        let results = res.getData();
                        resolve(results);
                    }
                    reject(res);
                }
            });
        });
        return promise;
    }
}