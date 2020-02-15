let game = (() => {
    let canvas: HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage: createjs.Stage;

    let currentSceneState: scenes.State;
    let currentScene: objects.Scene;
    let startScene: objects.Scene;
    let playScene: objects.Scene;

    function Start(): void {
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);

        currentSceneState = scenes.State.NO_SCENE; // default state
        config.GameConfig.SCENE_STATE = scenes.State.START;

        Main();
    }

    function Update(): void {
        // only when switching from Scene A to Scene B
        if (currentSceneState != config.GameConfig.SCENE_STATE) {
            Main();
        }
        currentScene.Update();
        stage.update();
    }

    function Main(): void {
        console.log(`%c Switching Scenes!`, "color: green; font-size: 16px;");

        // when switching from Scene A to Scene B
        if (currentSceneState != scenes.State.NO_SCENE) {
            currentScene.removeAllChildren();
            stage.removeAllChildren();
        }

        switch (config.GameConfig.SCENE_STATE) {
            case scenes.State.START:
                startScene = new scenes.Start();
                currentScene = startScene;
                break;
            case scenes.State.PLAY:
                playScene = new scenes.Play();
                currentScene = playScene;
                break;

        }
        stage.addChild(currentScene);
        currentSceneState = config.GameConfig.SCENE_STATE;
    }

    window.addEventListener("load", Start);

})();
