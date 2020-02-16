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
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // CONTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            _this._spinResult = [];
            // variables
            _this._playerMoney = util.PLAYER_MONEY;
            _this._jackpot = util.JACKPOT;
            _this._playerBet = 0;
            _this._blanks = 0;
            _this._grapes = 0;
            _this._bananas = 0;
            _this._oranges = 0;
            _this._cherries = 0;
            _this._bars = 0;
            _this._bells = 0;
            _this._sevens = 0;
            _this._winnings = 0;
            _this._cheatingForJackpot = false;
            // create labels
            _this._messageBoard = new objects.Label(util.GAME_TITLE, "50px bold", "Verdana", "#FFFF00", 480, 50, true);
            _this._jackpotTextLabel = new objects.Label('JACKPOT ', "25px", "Verdana", "#FFFFFF", 250, 360, true);
            _this._moneyTextLabel = new objects.Label('MONEY', "25px", "Verdana", "#FFFFFF", 480, 360, true);
            _this._betTextLabel = new objects.Label('YOUR BET', "25px", "Verdana", "#FFFFFF", 710, 360, true);
            _this._jackpotLabel = new objects.Label(_this._padDigits(_this._jackpot, 8), "33px", "Consolas", "orangered", 250, 400, true);
            _this._moneyLabel = new objects.Label(_this._padDigits(_this._playerMoney, 8), "33px", "Consolas", "orangered", 480, 400, true);
            _this._betLabel = new objects.Label(_this._padDigits(_this._playerBet, 8), "33px", "Consolas", "orangered", 710, 400, true);
            // create symbols
            _this._firstSymbol = new objects.Symbol(util.DOLLAR_PATH, 130, 230, 150, 150, true);
            _this._secondSymbol = new objects.Symbol(util.DOLLAR_PATH, 305, 230, 150, 150, true);
            _this._thirdSymbol = new objects.Symbol(util.DOLLAR_PATH, 480, 230, 150, 150, true);
            _this._fourthSymbol = new objects.Symbol(util.DOLLAR_PATH, 655, 230, 150, 150, true);
            _this._fifthSymbol = new objects.Symbol(util.DOLLAR_PATH, 830, 230, 150, 150, true);
            // create buttons
            _this._betOneButton = new objects.Button(util.BETONE_BUTTON_PATH, 200, 490, 100, 100, true);
            _this._betTenButton = new objects.Button(util.BETTEN_BUTTON_PATH, 330, 490, 100, 100, true);
            _this._betHundredButton = new objects.Button(util.BETHUNDRED_BUTTON_PATH, 460, 490, 100, 100, true);
            _this._spinButton = new objects.Button(util.SPIN_BUTTON_PATH, 760, 490, 100, 100, true);
            _this._resetButton = new objects.Button(util.REST_BUTTON_PATH, 840, 10, 50, 50, false);
            _this._quitButton = new objects.Button(util.QUIT_BUTTON_PATH, 900, 10, 50, 50, false);
            // attach cheat code
            window.addEventListener('keydown', function (event) {
                // switch with J Key
                if (event.keyCode === 74) {
                    console.log('Jackpot flag switched!');
                    _this._cheatingForJackpot = !_this._cheatingForJackpot;
                }
            });
            _this.Start();
            return _this;
        }
        // PUBLIC METHODS
        Play.prototype.Start = function () {
            // add to stage
            this.addChild(this._messageBoard);
            this.addChild(this._jackpotTextLabel);
            this.addChild(this._moneyLabel);
            this.addChild(this._moneyTextLabel);
            this.addChild(this._jackpotLabel);
            this.addChild(this._betLabel);
            this.addChild(this._betTextLabel);
            // add to stage
            this.addChild(this._firstSymbol);
            this.addChild(this._secondSymbol);
            this.addChild(this._thirdSymbol);
            this.addChild(this._fourthSymbol);
            this.addChild(this._fifthSymbol);
            // add objects
            this.addChild(this._betOneButton);
            this.addChild(this._betTenButton);
            this.addChild(this._betHundredButton);
            this.addChild(this._spinButton);
            this.addChild(this._resetButton);
            this.addChild(this._quitButton);
            this.Main();
        };
        Play.prototype.Update = function () {
            // digital numbers
            this._betLabel.text = this._padDigits(this._playerBet, 8);
            this._jackpotLabel.text = this._padDigits(this._jackpot, 8);
            this._moneyLabel.text = this._padDigits(this._playerMoney, 8);
        };
        Play.prototype.Main = function () {
            var _this = this;
            // attach events
            this._betOneButton.on('click', function () {
                _this.bet(1);
            });
            this._betTenButton.on('click', function () {
                _this.bet(10);
            });
            this._betHundredButton.on('click', function () {
                _this.bet(100);
            });
            this._resetButton.on('click', function () {
                _this.resetAll();
            });
            this._quitButton.on('click', function () {
                config.GameConfig.SCENE_STATE = scenes.State.END;
            });
            //
            this._spinButton.isDisabled = true;
        };
        // PRIVATE METHODS
        Play.prototype.bet = function (amount) {
            var _this = this;
            if (amount === void 0) { amount = 1; }
            if (this._playerMoney - amount >= 0) {
                this._playerBet += amount;
                this._playerMoney -= amount;
                // enable/disable spin button
                if (this._playerBet <= 0 || this._playerMoney <= 0 && this._playerBet <= 0) {
                    this._spinButton.isDisabled = true;
                    this._spinButton.off('click', function () {
                        _this._pressSpin();
                    });
                }
                else {
                    this._spinButton.isDisabled = false;
                    this._spinButton.on('click', function () {
                        _this._pressSpin();
                    });
                }
            }
        };
        /* Utility function to check if a value falls within a range of bounds */
        Play.prototype._checkRange = function (value, lowerBounds, upperBounds) {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        };
        Play.prototype._spinReels = function () {
            // reset symbols
            this.removeChild(this._firstSymbol);
            this.removeChild(this._secondSymbol);
            this.removeChild(this._thirdSymbol);
            this.removeChild(this._fourthSymbol);
            this.removeChild(this._fifthSymbol);
            var betLine = [];
            var outcome = [0, 0, 0];
            var symbol;
            var symbolPositionXs = [130, 305, 480, 655, 830];
            // for (let spin: number = 0; spin < 3; spin++) {
            for (var spin = 0; spin < 5; spin++) {
                outcome[spin] = Math.floor((Math.random() * 65) + 1);
                if (this._cheatingForJackpot) {
                    // seven is assigned with cheat code
                    outcome[spin] = 65;
                }
                // determine symbols
                switch (outcome[spin]) {
                    case this._checkRange(outcome[spin], 1, 27): // 41.5% probability
                        symbol = new objects.Symbol(util.BLANK_PATH, symbolPositionXs[spin], 230, 150, 150, true);
                        this._blanks++;
                        break;
                    case this._checkRange(outcome[spin], 28, 37): // 15.4% probability
                        symbol = new objects.Symbol(util.GRAPE_PATH, symbolPositionXs[spin], 230, 150, 150, true);
                        this._grapes++;
                        break;
                    case this._checkRange(outcome[spin], 38, 46): // 13.8% probability
                        symbol = new objects.Symbol(util.BANANA_PATH, symbolPositionXs[spin], 230, 150, 150, true);
                        this._bananas++;
                        break;
                    case this._checkRange(outcome[spin], 47, 54): // 12.3% probability
                        symbol = new objects.Symbol(util.ORANGE_PATH, symbolPositionXs[spin], 230, 150, 150, true);
                        this._oranges++;
                        break;
                    case this._checkRange(outcome[spin], 55, 59): //  7.7% probability
                        symbol = new objects.Symbol(util.CHERRY_PATH, symbolPositionXs[spin], 230, 150, 150, true);
                        this._cherries++;
                        break;
                    case this._checkRange(outcome[spin], 60, 62): //  4.6% probability
                        symbol = new objects.Symbol(util.BAR_PATH, symbolPositionXs[spin], 230, 150, 150, true);
                        this._bars++;
                        break;
                    case this._checkRange(outcome[spin], 63, 64): //  3.1% probability
                        symbol = new objects.Symbol(util.BELL_PATH, symbolPositionXs[spin], 230, 150, 150, true);
                        this._bells++;
                        break;
                    case this._checkRange(outcome[spin], 65, 65): //  1.5% probability
                        symbol = new objects.Symbol(util.SEVEN_PATH, symbolPositionXs[spin], 230, 150, 150, true);
                        this._sevens++;
                        break;
                    default:
                        symbol = new objects.Symbol(util.BLANK_PATH, symbolPositionXs[spin], 230, 150, 150, true);
                }
                betLine.push(symbol);
            }
            return betLine;
        };
        /* This function calculates the player's winnings, if any */
        Play.prototype._determineWinnings = function () {
            if (this._cheatingForJackpot) {
                this._showWinMessage();
            }
            else {
                if (this._blanks == 0) {
                    if (this._grapes == 5) {
                        this._winnings = this._playerBet * 30;
                    }
                    else if (this._bananas == 5) {
                        this._winnings = this._playerBet * 40;
                    }
                    else if (this._oranges == 5) {
                        this._winnings = this._playerBet * 70;
                    }
                    else if (this._cherries == 5) {
                        this._winnings = this._playerBet * 80;
                    }
                    else if (this._bars == 5) {
                        this._winnings = this._playerBet * 100;
                    }
                    else if (this._bells == 5) {
                        this._winnings = this._playerBet * 150;
                    }
                    else if (this._sevens == 5) {
                        this._winnings = this._playerBet * 200;
                    }
                    else if (this._grapes == 4) {
                        this._winnings = this._playerBet * 20;
                    }
                    else if (this._bananas == 4) {
                        this._winnings = this._playerBet * 30;
                    }
                    else if (this._oranges == 4) {
                        this._winnings = this._playerBet * 40;
                    }
                    else if (this._cherries == 4) {
                        this._winnings = this._playerBet * 60;
                    }
                    else if (this._bars == 4) {
                        this._winnings = this._playerBet * 75;
                    }
                    else if (this._bells == 4) {
                        this._winnings = this._playerBet * 105;
                    }
                    else if (this._sevens == 4) {
                        this._winnings = this._playerBet * 150;
                    }
                    else if (this._grapes == 3) {
                        this._winnings = this._playerBet * 10;
                    }
                    else if (this._bananas == 3) {
                        this._winnings = this._playerBet * 20;
                    }
                    else if (this._oranges == 3) {
                        this._winnings = this._playerBet * 30;
                    }
                    else if (this._cherries == 3) {
                        this._winnings = this._playerBet * 40;
                    }
                    else if (this._bars == 3) {
                        this._winnings = this._playerBet * 50;
                    }
                    else if (this._bells == 3) {
                        this._winnings = this._playerBet * 75;
                    }
                    else if (this._sevens == 3) {
                        this._winnings = this._playerBet * 100;
                    }
                    else if (this._grapes == 2) {
                        this._winnings = this._playerBet * 2;
                    }
                    else if (this._bananas == 2) {
                        this._winnings = this._playerBet * 2;
                    }
                    else if (this._oranges == 2) {
                        this._winnings = this._playerBet * 3;
                    }
                    else if (this._cherries == 2) {
                        this._winnings = this._playerBet * 4;
                    }
                    else if (this._bars == 2) {
                        this._winnings = this._playerBet * 5;
                    }
                    else if (this._bells == 2) {
                        this._winnings = this._playerBet * 10;
                    }
                    else if (this._sevens == 2) {
                        this._winnings = this._playerBet * 20;
                    }
                    else if (this._sevens == 1) {
                        this._winnings = this._playerBet * 5;
                    }
                    else {
                        this._winnings = this._playerBet * 1;
                    }
                    // win
                    this._showWinMessage();
                }
                else {
                    // lose
                    this._resetFruitTally();
                }
            }
            // reset player bet
            this._playerBet = 0;
        };
        /* Check to see if the player won the jackpot */
        Play.prototype._checkJackPot = function () {
            var jackPotTry = Math.floor(Math.random() * 51 + 1);
            var jackPotWin = Math.floor(Math.random() * 51 + 1);
            // cheat code for jackpot
            if (this._cheatingForJackpot) {
                this._messageBoard.text = "$WON $" + this._jackpot + "!!!$";
                this._playerMoney += this._jackpot;
                this._jackpot = 1000;
            }
            else {
                if (jackPotTry == jackPotWin) {
                    this._messageBoard.text = "$JACKPOT! WON $" + this._jackpot + "!!!";
                    this._playerMoney += this._jackpot;
                    this._jackpot = 1000;
                }
            }
        };
        Play.prototype._pressSpin = function () {
            var _this = this;
            this._messageBoard.text = util.GAME_TITLE;
            // spin
            this._spinResult = this._spinReels();
            // set resutls
            this._firstSymbol = this._spinResult[0];
            this._secondSymbol = this._spinResult[1];
            this._thirdSymbol = this._spinResult[2];
            this._fourthSymbol = this._spinResult[3];
            this._fifthSymbol = this._spinResult[4];
            this.stage.addChild(this._firstSymbol);
            this.stage.addChild(this._secondSymbol);
            this.stage.addChild(this._thirdSymbol);
            this.stage.addChild(this._fourthSymbol);
            this.stage.addChild(this._fifthSymbol);
            this._determineWinnings();
            // switch spinBUttons on/off
            if (this._playerBet <= 0 || this._playerMoney <= 0 && this._playerBet <= 0) {
                this._spinButton.isDisabled = true;
                this._spinButton.off('click', function () {
                    _this._pressSpin();
                });
            }
            else {
                this._spinButton.isDisabled = false;
                this._spinButton.on('click', function () {
                    _this._pressSpin();
                });
            }
        };
        /* Utility function to show a win message and increase player money */
        Play.prototype._showWinMessage = function () {
            this._playerMoney += this._winnings;
            this._messageBoard.text = "YOU WON $" + this._winnings + "!!!";
            this._resetFruitTally();
            this._checkJackPot();
        };
        Play.prototype._padDigits = function (number, digits) {
            return Array(Math.max(digits - String(number).length + 1, 0)).join('0') + number;
        };
        Play.prototype._resetFruitTally = function () {
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._blanks = 0;
        };
        Play.prototype.resetAll = function () {
            // reset member variables
            this._playerMoney = util.PLAYER_MONEY;
            this._jackpot = util.JACKPOT;
            this._playerBet = 0;
            this._spinResult = [];
            this._blanks = 0;
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._winnings = 0;
            this._cheatingForJackpot = false;
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map