export class Image {
    id: number;
    name: string;
    uploadDate: string;
    userId: number;
    image: number[] | null;
    imgSrc: string;

    constructor(){
        this.id = 0;
        this.name = '';
        this.uploadDate = '';
        this.userId = 0;
        this.image = null;
        this.imgSrc = '';
    }

    static convertNewImage(image: Image): Image{
        let newImage: Image = new Image();
        newImage.id = image.id;
        newImage.name = image.name;
        newImage.uploadDate = image.uploadDate;
        newImage.userId = image.userId;
        newImage.image = image.image;
        newImage.imgSrc = newImage.getImageSrc();
        return newImage;
    }

    getImageSrc(): string{
        if(this.image){
            return 'data:image/jpeg;base64,' + this.image;
        }
        return '';
    }
}
