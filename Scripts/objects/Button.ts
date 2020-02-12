module objects {
    export class Button extends createjs.Bitmap {
        private _isDisabled: boolean = false;

        get isDisabled() {
            return this._isDisabled;
        }

        set isDisabled(newState: boolean) {
            this._isDisabled = newState;

            if (newState) {
                this.off('mouseover', this.HoverOver);
                this.off('mouseout', this.HoverOut);
            } else {
                this.on('mouseover', this.HoverOver);
                this.on('mouseout', this.HoverOut);
            }
        }

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
