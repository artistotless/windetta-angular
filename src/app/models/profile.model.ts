import { guid, Guid } from "guid-factory";

export class Profile {
    id: guid;
    displayName: string;
    username: string;
    email: string;
    isAutheticated!: boolean;

    constructor() {
        this.id = Guid.empty();
        this.displayName = "Loading...";
        this.email = "Loading...";
        this.username = "Loading...";
        this.isAutheticated = false;
    }
}