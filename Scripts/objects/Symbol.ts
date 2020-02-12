module objects {
    export class Symbol extends createjs.Bitmap {
        constructor(imagePath: string, x: number, y: number, isCentered: boolean) {
            super(imagePath);
            if (isCentered) {
                this.regX = -150;
                this.regY = 25;
            }
            this.x = x;
            this.y = y;
        }
    }
}