module objects {
    export class Button extends GameObject {

        public Start(): void {
            throw new Error("Method not implemented.");
        }
        public Update(): void {
            throw new Error("Method not implemented.");
        }
        public Reset(): void {
            throw new Error("Method not implemented.");
        }


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

        // constructor
        constructor(imagePath: string, x: number = 0, y: number = 0, width: number = 0, height: number = 0, isCentered: boolean = false) {
            super(imagePath, x, y, isCentered);
            super.CustomSize(width, height, isCentered);
            // this.Start();

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
