import { SocketIOResponse } from "./socketio.response";

export interface SocketIOCallback {
    done(res: SocketIOResponse): void;
}
