
import { NgModule, ModuleWithProviders } from "@angular/core";
import { SocketIOConfig } from "app/core/utility/socketio/socketio.config";
import { SocketIOModel } from "app/core/utility/socketio/socketio.model";
import { SocketIOAuthenticate } from "./socketio.authenticate";

@NgModule({})
export class SocketIOModule {
    static forRoot(): ModuleWithProviders {
        return {
            declarations: [SocketIOAuthenticate],
            ngModule: SocketIOModule,
            providers: [SocketIOConfig]
        }
    }
}