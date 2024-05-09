import { FundsInfo } from "./funds-info.model";

export class CreateLobbyDto {
    gameId!: string;
    private: boolean = false;
    bet!: FundsInfo;
    properties?: Record<string, string>;
    autoReadyStrategy?: any;
    autoDisposeStrategy?: any;
    joinFilters?: any[];
}