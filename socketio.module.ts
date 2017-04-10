
import { NgModule, ModuleWithProviders } from "@angular/core";
import { SocketIOConfig } from "app/core/utility/socketio/socketio.config";
import { SocketIOModel } from "app/core/utility/socketio/socketio.model";

@NgModule({})
export class SocketIOModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SocketIOModule,
            providers: [SocketIOConfig]
        }
    }
}