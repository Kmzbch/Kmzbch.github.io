"use strict";
var game = (function () {
    var canvas = document.getElementsByTagName('canvas')[0];
    var stage;
    var currentSceneState;
    var currentScene;
    var startScene;
    var playScene;
    function Start() {
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        //
        currentSceneState = scenes.State.NO_SCENE;
        config.GameConfig.SCENE_STATE = scenes.State.START;
        Main();
    }
    function Update() {
        if (currentSceneState != config.GameConfig.SCENE_STATE) {
            Main();
        }
        currentScene.Update();
        stage.update();
    }
    function Main() {
        console.log("%c Switching Scenes!", "color: green; font-size: 16px;");
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
//# sourceMappingURL=game.js.map