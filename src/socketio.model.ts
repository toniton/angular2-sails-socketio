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

export enum METHOD {
    POST,
    GET
}

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

    public setConfig(_socketIOConfig: SocketIOConfig) {
        this.socketIOConfig = _socketIOConfig;
        return this;
    }

    find(query?: SocketIOQuery, populate?: Array<string>): Promise<this> {
        if (!this.socketIOConfig) {
            throw new Error('You need to set a config to be able to perform this action');
        }
        const promise = new Promise((resolve, reject) => {
            let url = "/";
            if (!_.isEmpty(this.socketIOConfig.getPrefix())) {
                url += this.socketIOConfig.getPrefix() + '/';
            }
            url += _.toLower(this.getEndPoint());
            if (query) {
                url += query.buildQuery();
            }
            if (populate) {
                if (url.includes("?")) {
                    url += '&populate=[' + _.join(populate, ',') + ']';
                } else {
                    url += '?populate=[' + _.join(populate, ',') + ']';
                }
            }
            let that = this;
            (new SocketIO(this.socketIOConfig)).get(url, <SocketIOCallback>{
                done(res: SocketIOResponse): void {
                    that.socketInterceptor(res);
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

    findById(id: string, populate?: Array<string>): Promise<this> {
        if (!this.socketIOConfig) {
            throw new Error('You need to set a config to be able to perform this action');
        }
        const promise = new Promise((resolve, reject) => {
            let url = "/";
            if (!_.isEmpty(this.socketIOConfig.getPrefix())) {
                url += this.socketIOConfig.getPrefix() + '/';
            }
            url += _.toLower(this.getEndPoint());
            url += '/'.concat(id);
            if (populate) {
                if (url.includes("?")) {
                    url += '&populate=[' + _.join(populate, ',') + ']';
                } else {
                    url += '?populate=[' + _.join(populate, ',') + ']';
                }
            }
            let that = this;
            (new SocketIO(this.socketIOConfig)).get(url, <SocketIOCallback>{
                done(res: SocketIOResponse): void {
                    that.socketInterceptor(res);
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

    findAll(populate?: Array<string>): Promise<this> {
        if (!this.socketIOConfig) {
            throw new Error('You need to set a config to be able to perform this action');
        }
        const promise = new Promise((resolve, reject) => {
            let url = "/";
            if (!_.isEmpty(this.socketIOConfig.getPrefix())) {
                url += this.socketIOConfig.getPrefix() + '/';
            }
            url += _.toLower(this.getEndPoint());
            if (populate) {
                if (url.includes("?")) {
                    url += '&populate=[' + _.join(populate, ',') + ']';
                } else {
                    url += '?populate=[' + _.join(populate, ',') + ']';
                }
            }
            let that = this;
            (new SocketIO(this.socketIOConfig)).get(url, <SocketIOCallback>{
                done(res: SocketIOResponse): void {
                    that.socketInterceptor(res);
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
        if (!this.socketIOConfig) {
            throw new Error('You need to set a config to be able to perform this action');
        }
        const promise = new Promise((resolve, reject) => {
            let url = "/";
            if (!_.isEmpty(this.socketIOConfig.getPrefix())) {
                url += this.socketIOConfig.getPrefix() + '/';
            }
            url += _.toLower(this.getEndPoint());
            let data: this = this;
            let that = this;
            (new SocketIO(this.socketIOConfig)).post(url, data, <SocketIOCallback>{
                done(res: SocketIOResponse): void {
                    that.socketInterceptor(res);
                    if (res.getCode() == "CREATED") {
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
        if (!this.socketIOConfig) {
            throw new Error('You need to set a config to be able to perform this action');
        }
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
                    that.socketInterceptor(res);
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
        if (!this.socketIOConfig) {
            throw new Error('You need to set a config to be able to perform this action');
        }
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
                    that.socketInterceptor(res);
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

    action(path: string, method: METHOD, data?: any | SocketIOQuery): Promise<this> {
        if (!this.socketIOConfig) {
            throw new Error('You need to set a config to be able to perform this action');
        }
        let url = "/";
        if (!_.isEmpty(this.socketIOConfig.getPrefix())) {
            url += this.socketIOConfig.getPrefix() + '/';
        }
        url += _.toLower(this.getEndPoint());
        url += '/'.concat(path);
        let that = this;
        const promise = new Promise((resolve, reject) => {
            if (method == METHOD.POST) {
                (new SocketIO(this.socketIOConfig)).post(url, data || {}, <SocketIOCallback>{
                    done(res: SocketIOResponse): void {
                        that.socketInterceptor(res);
                        if (res.getCode() == "OK") {
                            let results = that.castResponseToModel(res.getData());
                            resolve(results);
                        }
                        reject(res);
                    }
                });
            } else {
                if (data instanceof SocketIOQuery) {
                    url += data.buildQuery();
                }
                (new SocketIO(this.socketIOConfig)).get(url, <SocketIOCallback>{
                    done(res: SocketIOResponse): void {
                        that.socketInterceptor(res);
                        if (res.getCode() == "OK") {
                            let results = that.castResponseToModel(res.getData());
                            resolve(results);
                        }
                        reject(res);
                    }
                });
            }
        });
        return promise;
    }

    on(): Promise<this> {
        if (!this.socketIOConfig) {
            throw new Error('You need to set a config to be able to perform this action');
        }
        const promise = new Promise((resolve, reject) => {
            let eventName = _.toLower(this.getEndPoint());
            let that = this;
            (new SocketIO(this.socketIOConfig)).on(eventName, <SocketIOCallback>{
                done(res: SocketIOResponse): void {
                    that.socketInterceptor(res);
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

    private castResponseToModel(response: any): any {
        let singleR = this;
        let results = null;
        if (_.isArray(response)) {
            results = _.map(response, function (_item, index) {
                let item = _.clone(singleR);
                delete item.socketIOConfig;
                Object.assign(item, _item);
                return item;
            });
        } else if (_.isObject(response)) {
            let item = _.clone(singleR);
            delete item.socketIOConfig;
            Object.assign(item, response);
            results = item;
        }
        return results;
    }

    private socketInterceptor(response: SocketIOResponse): any {
        let interceptor = this.socketIOConfig.getSocketInterceptor();
        if (_.isFunction(interceptor)) {
            interceptor(response);
        }
    }

    // console.log(`Connected to "${this.modelIdentity}"`);
}