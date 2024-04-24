import { guid } from "guid-factory";
import { RoomMember } from "./room-member.model";

export class Room {
    readonly index!: number;
    readonly maxMembers!: number;

    private _members!: RoomMember[];

    public get membersCount() {
        return this._members.length;
    }

    public get members(): RoomMember[] {
        return { ...this._members };
    }

    constructor(_index: number, _members: RoomMember[], _maxMembers: number) {
        this._members = _members;
        this.maxMembers = _maxMembers;
        this.index = _index;
    }

    addMember(member: RoomMember): Room {
        if (this.membersCount < this.maxMembers) {

            let clone: Room = new Room(this.index, this._members, this.maxMembers);
            clone._members.push(member);
            return clone;
        }
        else
            return this;
    }

    removeMember(memberId: guid): Room {
        let clone: Room = new Room(this.index, this._members, this.maxMembers);
        clone._members = clone._members.filter((member, index) => member.id !== memberId)
        return clone;
    }
}
