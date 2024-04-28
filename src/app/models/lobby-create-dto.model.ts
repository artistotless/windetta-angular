import { FundsInfo } from "./funds-info.model";

export class CreateLobbyDto {
    readonly gameId!: string;
    readonly private: boolean = false;
    readonly bet!: FundsInfo;
    readonly properties?: Record<string, string>;
    readonly autoReadyStrategy?: any;
    readonly autoDisposeStrategy?: any;
    readonly joinFilters?: any[];
}