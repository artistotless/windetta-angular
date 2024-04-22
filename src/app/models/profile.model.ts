
export class Profile {
    displayName: string | undefined;
    username: string | undefined;
    email: string | undefined;
    isAutheticated!: boolean;

    constructor(){
        this.displayName = "Loading...",
        this.email = "Loading...",
        this.username = "Loading...",
        this.isAutheticated = false;
    }
}