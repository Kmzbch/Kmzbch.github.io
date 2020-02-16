"use strict";
var scenes;
(function (scenes) {
    // enum for state machine
    var State;
    (function (State) {
        State[State["NO_SCENE"] = -1] = "NO_SCENE";
        State[State["START"] = 0] = "START";
        State[State["PLAY"] = 1] = "PLAY";
        State[State["END"] = 2] = "END";
    })(State = scenes.State || (scenes.State = {}));
})(scenes || (scenes = {}));
//# sourceMappingURL=State.js.map