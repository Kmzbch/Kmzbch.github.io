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
        // constructor
        function Button(imagePath, x, y, width, height, isCentered) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, imagePath, x, y, isCentered) || this;
            // MEMBER VARIABLES
            _this._isDisabled = false;
            _super.prototype.CustomSize.call(_this, width, height, isCentered);
            // common events
            _this.on('mouseover', _this.HoverOver);
            _this.on('mouseout', _this.HoverOut);
            return _this;
        }
        // PUBLIC METHODS
        Button.prototype.Start = function () {
        };
        Button.prototype.Update = function () {
        };
        Button.prototype.Reset = function () {
        };
        Object.defineProperty(Button.prototype, "isDisabled", {
            // PROPERTIES
            get: function () {
                return this._isDisabled;
            },
            set: function (newState) {
                this._isDisabled = newState;
                if (newState) {
                    this.removeAllEventListeners();
                    this.alpha = 0.3;
                }
                else {
                    this.on('mouseover', this.HoverOver);
                    this.on('mouseout', this.HoverOut);
                    this.alpha = 1;
                }
            },
            enumerable: true,
            configurable: true
        });
        Button.prototype.HoverOver = function () {
            this.alpha = 0.7;
        };
        Button.prototype.HoverOut = function () {
            this.alpha = 1;
        };
        return Button;
    }(objects.GameObject));
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=Button.js.map