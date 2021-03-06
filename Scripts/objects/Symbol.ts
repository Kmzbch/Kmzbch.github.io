module objects {
    export class Symbol extends GameObject {
        // CONSTRUCTOR
        constructor(
            imagePath: string,
            x: number = 0,
            y: number = 0,
            width: number = 0,
            height: number = 0,
            isCentered: boolean = false) {
            super(imagePath, x, y, isCentered);
            super.CustomSize(width, height, isCentered);
        }

        // PUBLIC METHODS
        public Start(): void {

        }

        public Update(): void {

        }

        public Reset(): void {

        }

    }
}
