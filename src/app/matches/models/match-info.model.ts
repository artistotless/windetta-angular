import { Guid, guid } from "guid-factory";
import { Player } from "../../shared/models/player.model";
import { FundsInfo } from "../../shared/models/funds-info.model";

export class OngoingMatch {
    matchId: guid = Guid.empty();
    gameId: guid = Guid.empty();
    players: Player[] = [];
    bet: FundsInfo = { currencyId: 0, amount: 0 };
    created: Date | undefined;
}