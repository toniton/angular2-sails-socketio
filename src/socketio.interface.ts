
import { SocketIOQuery } from "./socketio.query";
import { METHOD, SocketIOModel } from "./socketio.model";
import { SocketIOResponse } from "./socketio.response";

export interface SocketIOInterface {
    save(model: SocketIOModel): void;
    update(model: SocketIOModel): void;
    remove(model: SocketIOModel): void;
    findAll(): any;
    findById(id: string): any;
    find(query?: SocketIOQuery): any;
    action(path: string, method: METHOD, data?: any): Promise<any>
}