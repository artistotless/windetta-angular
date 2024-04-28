
export class Profile {
    id: string;
    displayName: string;
    username: string;
    email: string;
    isAutheticated!: boolean;

    constructor() {
        this.id = "a3b122ab-069e-4c02-9b5e-a8e7f150514d";
        this.displayName = "Loading...";
        this.email = "Loading...";
        this.username = "Loading...";
        this.isAutheticated = false;
    }
}