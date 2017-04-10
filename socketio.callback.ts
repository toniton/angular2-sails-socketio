import { SocketIOResponse } from "app/core/utility/socketio/socketio.response";

export interface SocketIOCallback {
    done(res: SocketIOResponse): void;
}
