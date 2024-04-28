import { FundsInfo } from "./funds-info.model";
import { Player } from "./player.model";

export class OngoingMatch {
    matchId!: string;
    gameId!: string;
    players!: Player[];
    bet!: FundsInfo;
    created!: Date;
}