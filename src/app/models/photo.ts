export class Photo{
    id: number;
    name: string;
    uploadDate: Date;
    userId: number;
    image: number[];

    constructor(){
        this.id = -1
        this.name = ""
        this.uploadDate = new Date()
        this.userId = -1
        this.image = []
    }
}