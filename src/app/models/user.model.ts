import { guid } from 'guid-factory';

export class User {
    id!: guid;
    name: string = `Player#${this.id}`;
    email!: string;
}