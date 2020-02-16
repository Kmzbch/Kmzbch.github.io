module objects {
    export class Label extends createjs.Text {
        // CONSTRUCTORS
        constructor(
            labelString: string,
            fontSize: string,
            fontFamily: string,
            fontColour: string,
            x: number, y: number, isCentered: boolean) {
            super(labelString, fontSize + " " + fontFamily, fontColour);

            if (isCentered) {
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getMeasuredLineHeight() * 0.5;
            }
            this.x = x;
            this.y = y;
        }
    }
}