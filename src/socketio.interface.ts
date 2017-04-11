
import { SocketIOQuery } from "./socketio.query";

export interface SocketIOInterface {
    save(): void;
    update(): void;
    remove(): void;
    findAll(): any;
    findById(id: string): any;
    find(query?: SocketIOQuery): any;
    castResponseToModel(response:any):any;
}