module scenes {
    export class End extends objects.Scene {
        // PRIVATE INSTANCE MEMEBERS
        private _messageBoard: objects.Label;
        private _startAgainButton: objects.Button;

        // CONTRUCTOR
        constructor() {
            super();
            this._messageBoard = new objects.Label(util.GAME_OVER, "50px bold", "Verdana", "yellow", 480, 50, true);
            this._startAgainButton = new objects.Button(util.START_AGAIN_BUTTON_PATH, 500, 500, 250, 75, true);

            this.Start();
        }

        // PUBLIC METHODS
        public Start(): void {
            this.addChild(this._messageBoard);
            this.addChild(this._startAgainButton);

            this.Main();
        }

        public Update(): void { }

        public Main(): void {
            this._startAgainButton.on('click', () => {
                config.GameConfig.SCENE_STATE = scenes.State.START;
            });
        }
    }
}





