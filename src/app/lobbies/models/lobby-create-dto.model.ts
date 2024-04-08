import { Guid, guid } from "guid-factory";

export class CreateLobbyDto {
    readonly gameId: guid = Guid.empty();
    readonly private: boolean = false;
    readonly bet: any;
    readonly properties: Record<string, string> | undefined;
    readonly autoReadyStrategy: any | undefined;
    readonly autoDisposeStrategy: any | undefined;
    readonly joinFilters: any[] | undefined;
}