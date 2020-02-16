"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        // CONTRUCTOR
        function Start() {
            var _this = _super.call(this) || this;
            _this._messageBoard = new objects.Label(util.GAME_TITLE, "50px bold", "Verdana", "yellow", 480, 50, true);
            _this._startGameButton = new objects.Button(util.START_BUTTON_PATH, 500, 500, 250, 75, true);
            _this.Start();
            return _this;
        }
        // PUBLIC METHODS
        Start.prototype.Start = function () {
            this.addChild(this._messageBoard);
            this.addChild(this._startGameButton);
            this.Main();
        };
        Start.prototype.Update = function () { };
        Start.prototype.Main = function () {
            this._startGameButton.on('click', function () {
                config.GameConfig.SCENE_STATE = scenes.State.PLAY;
            });
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map