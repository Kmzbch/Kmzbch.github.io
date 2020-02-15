module scenes {
    export class Start extends objects.Scene {
        // PRIVATE INSTANCE MEMEBERS
        private _messageBoard: objects.Label;
        private _startGameButton: objects.Button;

        // CONTRUCTOR
        constructor() {
            super();
            this._messageBoard = new objects.Label(util.GAME_TITLE, "50px bold", "Verdana", "yellow", 480, 50, true);
            this._startGameButton = new objects.Button(util.START_BUTTON_PATH, 500, 500, 250, 75, true);

            this.Start();
        }

        // PUBLIC METHODS
        public Start(): void {
            this.addChild(this._messageBoard);
            this.addChild(this._startGameButton);

            this.Main();
        }

        public Update(): void { }

        public Main(): void {
            this._startGameButton.on('click', () => {
                config.GameConfig.SCENE_STATE = scenes.State.PLAY;
            });
        }
    }
}





