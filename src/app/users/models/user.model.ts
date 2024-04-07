import { guid, Guid } from 'guid-factory';

export class User {
    name: string = "";
    id: guid = Guid.empty();
    email: string = "";
}