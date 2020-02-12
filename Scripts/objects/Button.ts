module objects {
    export class Button extends createjs.Bitmap {
        private _isDisabled: boolean = false;

        get isDisabled() {
            return this._isDisabled;
        }

        set isDisabled(newState: boolean) {
            this._isDisabled = newState;

            console.log(newState);

            if (newState) {
                this.removeAllEventListeners();
                this.alpha = 0.3;
            } else {
                this.on('mouseover', this.HoverOver);
                this.on('mouseout', this.HoverOut);
                this.alpha = 1;
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
