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
    var Symbol = /** @class */ (function (_super) {
        __extends(Symbol, _super);
        function Symbol(imagePath, x, y, isCentered) {
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
        Symbol.prototype.HoverOver = function () {
            this.alpha = 0.7;
        };
        Symbol.prototype.HoverOut = function () {
            this.alpha = 1;
        };
        return Symbol;
    }(createjs.Bitmap));
    objects.Symbol = Symbol;
})(objects || (objects = {}));
//# sourceMappingURL=Symbol.js.map