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
var objects;
(function (objects) {
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button(imagePath, x, y, isCentered) {
            var _this = _super.call(this, imagePath) || this;
            if (isCentered) {
                // this.regX = 75;
                // this.regY = 25;
                _this.regX = -150;
                _this.regY = 25;
            }
            _this.x = x;
            _this.y = y;
            // common events
            _this.on('mouseover', _this.HoverOver);
            _this.on('mouseout', _this.HoverOut);
            return _this;
        }
        Button.prototype.HoverOver = function () {
            this.alpha = 0.7;
        };
        Button.prototype.HoverOut = function () {
            this.alpha = 1;
        };
        return Button;
    }(createjs.Bitmap));
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=Button.js.map