
import { SocketIOQuery } from "./socketio.query";
import { METHOD } from "./socketio.model";

export interface SocketIOInterface {
    save(): void;
    update(): void;
    remove(): void;
    findAll(): any;
    findById(id: string): any;
    find(query?: SocketIOQuery): any;
    castResponseToModel(response:any):any;
    action(path: string, method: METHOD, data?: any): Promise<any>
}