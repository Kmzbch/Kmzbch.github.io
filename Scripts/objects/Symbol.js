"use strict";
// module objects {
//     export class Symbol extends createjs.Bitmap {
//         constructor(imagePath: string, x: number, y: number, isCentered: boolean) {
//             super(imagePath);
//             if (isCentered) {
//                 this.regX = -150;
//                 this.regY = 25;
//             }
//             this.x = x;
//             this.y = y;
//         }
//     }
// }
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
        // constructor
        function Symbol(imagePath, x, y, width, height, isCentered) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, imagePath, x, y, isCentered) || this;
            _super.prototype.CustomSize.call(_this, width, height, isCentered);
            return _this;
            // this.Start();
        }
        Symbol.prototype.Start = function () {
            throw new Error("Method not implemented.");
        };
        Symbol.prototype.Update = function () {
            throw new Error("Method not implemented.");
        };
        Symbol.prototype.Reset = function () {
            throw new Error("Method not implemented.");
        };
        return Symbol;
    }(objects.GameObject));
    objects.Symbol = Symbol;
})(objects || (objects = {}));
//# sourceMappingURL=Symbol.js.map