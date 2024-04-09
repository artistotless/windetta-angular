import { guid } from "guid-factory";
import { FundsInfo } from "./funds-info.model";

export class CreateLobbyDto {
    readonly gameId!: guid;
    readonly private: boolean = false;
    readonly bet!: FundsInfo;
    readonly properties: Record<string, string> | undefined;
    readonly autoReadyStrategy: any | undefined;
    readonly autoDisposeStrategy: any | undefined;
    readonly joinFilters: any[] | undefined;
}