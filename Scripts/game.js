"use strict";
// Auther: Kei Mizubuchi
// Student Number: 300936630
// Creation Date: Feb 16, 2020
// Game App description:
//  Slot Machine game built on Creatjs.
//  Player can play slot-machine-like game on the browser
// Revision History:
// Feb 16, 2020 Version 0.1
// Feb 16, 2020 Version 1.0
var game = (function () {
    var canvas = document.getElementsByTagName('canvas')[0];
    var stage;
    var currentSceneState;
    var currentScene;
    var startScene;
    var playScene;
    var endScene;
    function Start() {
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        currentSceneState = scenes.State.NO_SCENE; // default state
        config.GameConfig.SCENE_STATE = scenes.State.START;
        Main();
    }
    function Update() {
        // only when switching from Scene A to Scene B
        if (currentSceneState != config.GameConfig.SCENE_STATE) {
            Main();
        }
        currentScene.Update();
        stage.update();
    }
    function Main() {
        console.log("%c Switching Scenes!", "color: green; font-size: 16px;");
        // when switching from Scene A to Scene B
        if (currentSceneState != scenes.State.NO_SCENE) {
            currentScene.removeAllChildren();
            stage.removeAllChildren();
        }
        // switch to the new scene
        switch (config.GameConfig.SCENE_STATE) {
            case scenes.State.START:
                startScene = new scenes.Start();
                currentScene = startScene;
                break;
            case scenes.State.PLAY:
                playScene = new scenes.Play();
                currentScene = playScene;
                break;
            case scenes.State.END:
                endScene = new scenes.End();
                currentScene = endScene;
                break;
        }
        stage.addChild(currentScene);
        currentSceneState = config.GameConfig.SCENE_STATE;
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=game.js.map