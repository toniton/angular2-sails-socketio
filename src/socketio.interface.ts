
import { SocketIOQuery } from "app/core/utility/socketio/socketio.query";

export interface SocketIOInterface {
    save(): void;
    update(): void;
    remove(): void;
    findAll(): any;
    findById(id: string): any;
    find(query?: SocketIOQuery): any;
    castResponseToModel(response:any):any;
}