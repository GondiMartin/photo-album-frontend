import {Photo} from "./photo";

export class User {
    id: number;
    email: string;
    name: string;
    photos: Photo[]

    constructor(){
        this.id = -1
        this.email = ""
        this.name = ""
        this.photos = []
    }
}