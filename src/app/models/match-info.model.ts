import { guid } from "guid-factory";
import { FundsInfo } from "./funds-info.model";
import { Player } from "./player.model";

export class OngoingMatch {
    matchId!: guid;
    gameId!: guid;
    players!: Player[];
    bet!: FundsInfo;
    created!: Date;
}