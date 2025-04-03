export class Image {
    id: number;
    image: number[] | null;
    imgSrc: string;

    constructor(){
        this.id = 0;
        this.image = null;
        this.imgSrc = '';
    }

    static convertNewImage(image: Image): Image{
        let newImage: Image = new Image();
        newImage.id = image.id;
        newImage.image = image.image;
        newImage.imgSrc = image.getImageSrc();
        return newImage;
    }

    getImageSrc(): string{
        if(this.image){
            return 'data:image/jpeg;base64,' + this.image;
        }
        return '';
    }
}
