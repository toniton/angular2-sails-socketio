import { SocketIOInterface } from "./socketio.interface";
import { SocketIOConfig } from "./socketio.config";
import { SocketIOQuery } from "./socketio.query";
import { Observable } from "rxjs";
import * as SocketIOClient from "socket.io-client";
import * as SailsIOClient from "sails.io.js";
import { Component, OnInit, Injectable } from "@angular/core";
import { Endpoint } from "./socketio.decorator";
import { SocketIO } from "./socketio";
import { SocketIOCallback } from "./socketio.callback";
import { SocketIOResponse } from "./socketio.response";
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