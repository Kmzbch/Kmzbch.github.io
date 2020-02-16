module objects {
    export class Button extends GameObject {
        // MEMBER VARIABLES
        private _isDisabled: boolean = false;

        // PUBLIC METHODS
        public Start(): void {

        }
        public Update(): void {

        }
        public Reset(): void {

        }

        // PROPERTIES
        get isDisabled() {
            return this._isDisabled;
        }

        set isDisabled(newState: boolean) {
            this._isDisabled = newState;

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
