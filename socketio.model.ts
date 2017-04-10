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

@Endpoint("socketiomodel")
export class SocketIOModel implements SocketIOInterface {
    private socketIOConfig: SocketIOConfig;
    [name: string]: any;
    constructor(_socketIOConfig?: SocketIOConfig) {
        this.socketIOConfig = _socketIOConfig;
    }

    id;
    createdAt;
    updatedAt;

    find(query?: SocketIOQuery): Promise<this> {
        const promise = new Promise((resolve, reject) => {
            let url = "/";
            if (!_.isEmpty(this.socketIOConfig.getPrefix())) {
                url += this.socketIOConfig.getPrefix() + '/';
            }
            url += _.toLower(this.getEndPoint());
            if (query) {
                url += query.buildQuery();
            }
            let that = this;
            (new SocketIO(this.socketIOConfig)).get(url, <SocketIOCallback>{
                done(res: SocketIOResponse): void {
                    if (res.getCode() == "OK") {
                        let results = that.castResponseToModel(res.getData());
                        resolve(results);
                    }
                    reject(res);
                }
            })
        });
        return promise;
    }

    findById(id: string): Promise<this> {
        const promise = new Promise((resolve, reject) => {
            let url = "/";
            if (!_.isEmpty(this.socketIOConfig.getPrefix())) {
                url += this.socketIOConfig.getPrefix() + '/';
            }
            url += _.toLower(this.getEndPoint());
            url += '/'.concat(this.id);
            let that = this;
            (new SocketIO(this.socketIOConfig)).get(url, <SocketIOCallback>{
                done(res: SocketIOResponse): void {
                    if (res.getCode() == "OK") {
                        let results = that.castResponseToModel(res.getData());
                        resolve(results);
                    }
                    reject(res);
                }
            });
        });
        return promise;
    }

    findAll(): Promise<this> {
        const promise = new Promise((resolve, reject) => {
            let url = "/";
            if (!_.isEmpty(this.socketIOConfig.getPrefix())) {
                url += this.socketIOConfig.getPrefix() + '/';
            }
            url += _.toLower(this.getEndPoint());
            let that = this;
            (new SocketIO(this.socketIOConfig)).get(url, <SocketIOCallback>{
                done(res: SocketIOResponse): void {
                    if (res.getCode() == "OK") {
                        let results = that.castResponseToModel(res.getData());
                        resolve(results);
                    }
                    reject(res);
                }
            });
        });
        return promise;
    }

    save(): Promise<this> {
        const promise = new Promise((resolve, reject) => {
            let url = "/";
            if (!_.isEmpty(this.socketIOConfig.getPrefix())) {
                url += this.socketIOConfig.getPrefix() + '/';
            }
            url += _.toLower(this.getEndPoint());
            let data: this = this;
            delete data.socketIOConfig;
            let that = this;
            (new SocketIO(this.socketIOConfig)).post(url, data, <SocketIOCallback>{
                done(res: SocketIOResponse): void {
                    if (res.getCode() == "OK") {
                        let results = that.castResponseToModel(res.getData());
                        resolve(results);
                    }
                    reject(res);
                }
            });
        });
        return promise;
    }

    update(): Promise<this> {
        const promise = new Promise((resolve, reject) => {
            let url = "/";
            if (!_.isEmpty(this.socketIOConfig.getPrefix())) {
                url += this.socketIOConfig.getPrefix() + '/';
            }
            url += _.toLower(this.getEndPoint());
            url += '/'.concat(this.id);
            let data: this = this;
            delete data.socketIOConfig;
            delete data.createdAt;
            delete data.updatedAt;
            let that = this;
            (new SocketIO(this.socketIOConfig)).put(url, data, <SocketIOCallback>{
                done(res: SocketIOResponse): void {
                    if (res.getCode() == "OK") {
                        let results = that.castResponseToModel(res.getData());
                        resolve(results);
                    }
                    reject(res);
                }
            });
        });
        return promise;
    }

    remove(): Promise<this> {
        const promise = new Promise((resolve, reject) => {
            let url = "/";
            if (!_.isEmpty(this.socketIOConfig.getPrefix())) {
                url += this.socketIOConfig.getPrefix() + '/';
            }
            url += _.toLower(this.getEndPoint());
            url += '/'.concat(this.id);
            let that = this;
            (new SocketIO(this.socketIOConfig)).delete(url, <SocketIOCallback>{
                done(res: SocketIOResponse): void {
                    if (res.getCode() == "OK") {
                        let results = that.castResponseToModel(res.getData());
                        resolve(results);
                    }
                    reject(res);
                }
            });
        });
        return promise;
    }

    castResponseToModel(response: any): any {
        let singleR = this;
        let results = null;
        if (_.isArray(response)) {
            results = _.map(response, function (_item) {
                let item = singleR;
                delete item.socketIOConfig;
                Object.assign(item, _item);
                return item;
            })
        } else if (_.isObject(response)) {
            let item = singleR;
            delete item.socketIOConfig;
            Object.assign(item, response);
            results = item;
        }
        return results;
    }

    // console.log(`Connected to "${this.modelIdentity}"`);
}