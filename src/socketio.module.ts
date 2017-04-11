
import { NgModule, ModuleWithProviders } from "@angular/core";
import { SocketIOConfig } from "./socketio.config";
import { SocketIOModel } from "./socketio.model";
import { SocketIOAuthenticate } from "./socketio.authenticate";

@NgModule({})
export class SocketIOModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SocketIOModule,
            providers: [SocketIOConfig]
        }
    }
}