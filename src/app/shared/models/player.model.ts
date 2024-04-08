import { Guid, guid } from "guid-factory";

export class Player {
    id: guid = Guid.empty();
    name: string = "";
    index: number = 0;
}
