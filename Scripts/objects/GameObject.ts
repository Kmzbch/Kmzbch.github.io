module objects {
    export abstract class GameObject extends createjs.Bitmap {
        // MEMBER VARIABLES
        private _width: number = 0;
        private _height: number = 0;
        private _halfWidth: number = 0;
        private _halfHeight: number = 0;
        private _isCentered: boolean = false;
        private _position: Vector2 = new Vector2(0, 0);

        // PROPERTIES
        get width(): number {
            return this._width;
        }

        set width(newWidth: number) {
            this._width = newWidth;
        }

        get height(): number {
            return this._height;
        }

        set height(newHeight: number) {
            this._height = newHeight;
        }

        get halfWidth(): number {
            return this._halfWidth;
        }

        set halfWidth(newHalfWidth: number) {
            this._halfWidth = newHalfWidth;
        }

        get halfHeight(): number {
            return this._halfHeight;
        }

        set halfHeight(newHalfHeight: number) {
            this._halfHeight = newHalfHeight;
        }

        get isCentered(): boolean {
            return this._isCentered;
        }

        set isCentered(newState: boolean) {
            this._isCentered = newState;
            if (newState) {
                // set the anchor point to the center
                this.regX = this.halfWidth;
                this.regY = this.halfHeight;
            } else {
                this.regX = 0;
                this.regY = 0;
            }
        }
        get position(): Vector2 {
            return this._position;
        }

        set position(newPosition: Vector2) {
            this._position = newPosition;
            this.x = newPosition.x;
            this.y = newPosition.y;
        }

        // CONSTRUCTOR
        constructor(imagePath: string = './Assets/images/placeholder.png',
            x: number = 0, y: number = 0, centered: boolean = false) {
            super(imagePath);

            // // set the GameObject's position
            this.position = new Vector2(x, y);

            // wait for the image to load before calculating its width and height
            this.image.addEventListener('load', () => {
                this.width = this.getBounds().width;
                this.height = this.getBounds().height;
                this.halfWidth = this.width * 0.5;
                this.halfHeight = this.height * 0.5;
                console.log('image loaded');
                this.isCentered = centered;
            })

        }

        // PUBLIC METHODS
        public abstract Start(): void;

        public abstract Update(): void;

        public abstract Reset(): void;

        public CustomSize(width: number = this.getBounds().width, height: number = this.getBounds().height, isCentered: boolean = false): void {
            this.image.addEventListener('load', () => {
                this.scaleX = width / this.getBounds().width;
                this.scaleY = height / this.getBounds().height;
                this.isCentered = isCentered;
            });
        }

    }
}