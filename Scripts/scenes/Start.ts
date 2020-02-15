module scenes {
    export class Start extends objects.Scene {
        // PRIVATE INSTANCE MEMEBERS
        messageBoard: objects.Label;
        startGameButton: objects.Button;

        // PUBLIC PROPERTIES

        // CONTRUCTOR
        constructor() {
            super();
            this.messageBoard = new objects.Label(util.GAME_TITLE, "50px bold", "Verdana", "yellow", 480, 50, true);
            this.startGameButton = new objects.Button(util.START_BUTTON_PATH, 500, 500, 100, 100, true);

            this.Start();
        }

        // PUBLIC METHODS
        public Start(): void {
            this.addChild(this.messageBoard);
            this.addChild(this.startGameButton);

            this.Main();
        }

        public Update(): void { }

        public Main(): void {
            this.startGameButton.on('click', () => {
                config.GameConfig.SCENE_STATE = scenes.State.PLAY;
            });
        }
    }
}





