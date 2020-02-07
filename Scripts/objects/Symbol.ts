module objects {
    export class Symbol extends createjs.Bitmap {
        constructor(imagePath: string, x: number, y: number, isCentered: boolean) {
            super(imagePath);

            if (isCentered) {
                // this.regX = 75;
                // this.regY = 25;
                this.regX = -150;
                this.regY = 25;
            }

            this.x = x;
            this.y = y;

            // common events
            this.on('mouseover', this.HoverOver);
            this.on('mouseout', this.HoverOut);
        }

        HoverOver(): void {
            this.alpha = 0.7;
        }

        HoverOut(): void {
            this.alpha = 1;
        }
    }
}
