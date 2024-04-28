import { RoomMember } from "./room-member.model";

export class Room {
    readonly members: RoomMember[] = [];
    readonly index!: number;
    readonly maxMembers!: number;
}
