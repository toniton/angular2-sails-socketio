
import { NgModule, ModuleWithProviders } from "@angular/core";
import { SocketIOConfig } from "./socketio.config";

@NgModule({})
export class SocketIOModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SocketIOModule,
            providers: [SocketIOConfig]
        }
    }
}