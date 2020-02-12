"use strict";
var game = (function () {
    // canvas
    var canvas = document.getElementsByTagName('canvas')[0];
    var stage;
    // lables
    var gameTitle;
    var betTextLabel;
    var jackpotTextLabel;
    var moneyTextLabel;
    var moneyLabel;
    var jackpotLabel;
    var betLabel;
    // buttons
    var startGameButton;
    var betOneButton;
    var betTenButton;
    var betHundredButton;
    var spinButton;
    var resetButton;
    var quitButton;
    // symbols?
    var firstSymbol;
    var secondSymbol;
    var thirdSymbol;
    // variables
    var playerMoney = 1000;
    var jackpot = 5000;
    var playerBet = 0;
    // let spinResult: String[] = [];
    var spinResult = [];
    var blanks = 0;
    var grapes = 0;
    var bananas = 0;
    var oranges = 0;
    var cherries = 0;
    var bars = 0;
    var bells = 0;
    var sevens = 0;
    var winnings = 0;
    var isSpinning = false;
    //
    var cheatingForJackpot = false;
    function Start() {
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        Main();
    }
    function Update() {
        stage.update();
    }
    function Main() {
        startScreen();
    }
    function startScreen() {
        // create labels
        gameTitle = new objects.Label('$ SUPER SLOT $', "50px bold", "Verdana", "yellow", 480, 50, true);
        startGameButton = new objects.Button('/Assets/images/startButton.png', 480, 450, true);
        stage.addChild(gameTitle);
        stage.addChild(startGameButton);
        startGameButton.on('click', function () {
            stage.removeAllChildren();
            playScreen();
            createjs.Ticker.on('tick', monitorLabels);
        });
    }
    function monitorLabels() {
        jackpotLabel.text = padDigits(jackpot, 8);
        moneyLabel.text = padDigits(playerMoney, 8);
        betLabel.text = padDigits(playerBet, 8);
    }
    function playScreen() {
        // create labels
        gameTitle = new objects.Label('$ SUPER SLOT $', "50px bold", "Verdana", "yellow", 480, 50, true);
        jackpotTextLabel = new objects.Label('JACKPOT ', "25px", "Verdana", "#FFFFFF", 250, 360, true);
        moneyTextLabel = new objects.Label('MONEY', "25px", "Verdana", "#FFFFFF", 480, 360, true);
        betTextLabel = new objects.Label('YOUR BET', "25px", "Verdana", "#FFFFFF", 710, 360, true);
        jackpotLabel = new objects.Label(padDigits(jackpot, 8), "33px", "Consolas", "orangered", 250, 400, true);
        moneyLabel = new objects.Label(padDigits(playerMoney, 8), "33px", "Consolas", "orangered", 480, 400, true);
        betLabel = new objects.Label(padDigits(playerBet, 8), "33px", "Consolas", "orangered", 710, 400, true);
        stage.addChild(gameTitle);
        stage.addChild(jackpotTextLabel);
        stage.addChild(moneyLabel);
        stage.addChild(moneyTextLabel);
        stage.addChild(jackpotLabel);
        stage.addChild(betLabel);
        stage.addChild(betTextLabel);
        // create symbols
        firstSymbol = new objects.Symbol('../Assets/images/banana.jpg', 0, 150, true);
        secondSymbol = new objects.Symbol('../Assets/images/orange.jpg', 230, 150, true);
        thirdSymbol = new objects.Symbol('../Assets/images/cherry.jpg', 460, 150, true);
        stage.addChild(firstSymbol);
        stage.addChild(secondSymbol);
        stage.addChild(thirdSymbol);
        // create buttons
        betOneButton = new objects.Button('../Assets/images/betOneButton.png', 100, 490, true);
        betTenButton = new objects.Button('../Assets/images/betTenButton.png', 230, 490, true);
        betHundredButton = new objects.Button('../Assets/images/betHundredButton.png', 360, 490, true);
        spinButton = new objects.Button('../Assets/images/spinButton.png', 630, 490, true);
        resetButton = new objects.Button('../Assets/images/resetButton.png', 850, 0, false);
        resetButton.scaleX = 0.5;
        resetButton.scaleY = 0.5;
        resetButton.on('click', resetAll);
        quitButton = new objects.Button('../Assets/images/quitButton.png', 910, 0, false);
        quitButton.scaleX = 0.5;
        quitButton.scaleY = 0.5;
        quitButton.on('click', function () {
            stage.removeAllChildren();
            startScreen();
        });
        betOneButton.scaleX = 0.5;
        betOneButton.scaleY = 0.5;
        betTenButton.scaleX = 0.5;
        betTenButton.scaleY = 0.5;
        betHundredButton.scaleX = 0.5;
        betHundredButton.scaleY = 0.5;
        spinButton.scaleX = 0.5;
        spinButton.scaleY = 0.5;
        betOneButton.on('click', function () {
            bet(1);
        });
        betTenButton.on('click', function () {
            bet(10);
        });
        betHundredButton.on('click', function () {
            bet(100);
        });
        // spinButton.on('click', pressSpin)
        spinButton.isDisabled = true;
        // add objects
        stage.addChild(betOneButton);
        stage.addChild(betTenButton);
        stage.addChild(betHundredButton);
        stage.addChild(spinButton);
        stage.addChild(resetButton);
        stage.addChild(quitButton);
        // add events
        // resetButton.on('click', resetAll)
        // quitButton.on('click', quit)
    }
    window.addEventListener("load", Start);
    function bet(amount) {
        if (amount === void 0) { amount = 1; }
        if (playerMoney - amount < 0) {
        }
        else {
            playerBet += amount;
            playerMoney -= amount;
            if (playerBet <= 0 || playerMoney <= 0 && playerBet <= 0) {
                spinButton.isDisabled = true;
                spinButton.off('click', pressSpin);
            }
            else {
                spinButton.isDisabled = false;
                spinButton.on('click', pressSpin);
            }
        }
    }
    // resources
    // reset button
    // https://www.searchpng.com/2019/02/12/reload-blue-icon-transparent-png-free-download/
    // quit button
    // https://www.searchpng.com/2019/12/15/close-icon-png-image-free-download-2/
    // resources
    // banana
    // http://www.freestockphotos.biz/stockphoto/15909
    // cherry
    // https://www.pinclipart.com/pindetail/hxhox_cherry-clipart-cartoon-cherries-shower-curtain-png-download/
    // bell
    // http://clipart-library.com/clip-art/238-2386036_bell-emoji-icon-emoji-sino.htm
    // grape
    // https://webstockreview.net/pict/getfirst
    // orange
    // https://webstockreview.net/pict/getfirst
    // seven
    // https://www.nicepng.com/ourpic/u2q8u2u2t4w7u2e6_clip-art-lucky-clip-art-slot-machine-7-png/#
    // bar
    // https://www.pinclipart.com/pindetail/iJmJTo_slot-machine-games-graphic-design-clipart/
    function resetAll() {
        playerMoney = 1000;
        jackpot = 5000;
        playerBet = 0;
        spinResult = [];
        blanks = 0;
        grapes = 0;
        bananas = 0;
        oranges = 0;
        cherries = 0;
        bars = 0;
        bells = 0;
        sevens = 0;
        winnings = 0;
        cheatingForJackpot = false;
    }
    function quit() {
        alert('quit!');
    }
    /* Utility function to check if a value falls within a range of bounds */
    function checkRange(value, lowerBounds, upperBounds) {
        if (value >= lowerBounds && value <= upperBounds) {
            return value;
        }
        else {
            return -1;
        }
    }
    function spinReels() {
        var betLine = [];
        var outcome = [0, 0, 0];
        var symbol;
        for (var spin = 0; spin < 3; spin++) {
            outcome[spin] = Math.floor((Math.random() * 65) + 1);
            if (cheatingForJackpot) {
                outcome[spin] = 65;
            }
            switch (outcome[spin]) {
                case checkRange(outcome[spin], 1, 27): // 41.5% probability
                    symbol = new objects.Button('../Assets/images/blank.jpg', 0, 150, true);
                    blanks++;
                    break;
                case checkRange(outcome[spin], 28, 37): // 15.4% probability
                    symbol = new objects.Button('../Assets/images/grape.jpg', 0, 150, true);
                    grapes++;
                    break;
                case checkRange(outcome[spin], 38, 46): // 13.8% probability
                    symbol = new objects.Button('../Assets/images/banana.jpg', 0, 150, true);
                    bananas++;
                    break;
                case checkRange(outcome[spin], 47, 54): // 12.3% probability
                    symbol = new objects.Button('../Assets/images/orange.jpg', 0, 150, true);
                    oranges++;
                    break;
                case checkRange(outcome[spin], 55, 59): //  7.7% probability
                    symbol = new objects.Button('../Assets/images/cherry.jpg', 0, 150, true);
                    cherries++;
                    break;
                case checkRange(outcome[spin], 60, 62): //  4.6% probability
                    symbol = new objects.Button('../Assets/images/bar.jpg', 0, 150, true);
                    bars++;
                    break;
                case checkRange(outcome[spin], 63, 64): //  3.1% probability
                    symbol = new objects.Button('../Assets/images/bell.jpg', 0, 150, true);
                    bells++;
                    break;
                case checkRange(outcome[spin], 65, 65): //  1.5% probability
                    symbol = new objects.Button('../Assets/images/seven.jpg', 0, 150, true);
                    sevens++;
                    break;
                default:
                    symbol = new objects.Button('../Asssets/images/blank.jpg', 0, 150, true);
            }
            betLine.push(symbol);
        }
        return betLine;
    }
    /* This function calculates the player's winnings, if any */
    function determineWinnings() {
        if (cheatingForJackpot) {
            showWinMessage();
        }
        else {
            if (blanks == 0) {
                if (grapes == 3) {
                    winnings = playerBet * 10;
                }
                else if (bananas == 3) {
                    winnings = playerBet * 20;
                }
                else if (oranges == 3) {
                    winnings = playerBet * 30;
                }
                else if (cherries == 3) {
                    winnings = playerBet * 40;
                }
                else if (bars == 3) {
                    winnings = playerBet * 50;
                }
                else if (bells == 3) {
                    winnings = playerBet * 75;
                }
                else if (sevens == 3) {
                    winnings = playerBet * 100;
                }
                else if (grapes == 2) {
                    winnings = playerBet * 2;
                }
                else if (bananas == 2) {
                    winnings = playerBet * 2;
                }
                else if (oranges == 2) {
                    winnings = playerBet * 3;
                }
                else if (cherries == 2) {
                    winnings = playerBet * 4;
                }
                else if (bars == 2) {
                    winnings = playerBet * 5;
                }
                else if (bells == 2) {
                    winnings = playerBet * 10;
                }
                else if (sevens == 2) {
                    winnings = playerBet * 20;
                }
                else if (sevens == 1) {
                    winnings = playerBet * 5;
                }
                else {
                    winnings = playerBet * 1;
                }
                showWinMessage();
            }
            else {
                showLossMessage();
            }
        }
        playerBet = 0;
    }
    /* Check to see if the player won the jackpot */
    function checkJackPot() {
        /* compare two random values */
        var jackPotTry = Math.floor(Math.random() * 51 + 1);
        var jackPotWin = Math.floor(Math.random() * 51 + 1);
        // cheat code for jackpot
        if (cheatingForJackpot) {
            //            alert("You Won the $" + jackpot + " Jackpot!!");
            gameTitle.text = "$WON $" + jackpot + "!!!$";
            playerMoney += jackpot;
            jackpot = 1000;
        }
        else {
            if (jackPotTry == jackPotWin) {
                //                alert("You Won the $" + jackpot + " Jackpot!!");
                gameTitle.text = "$JACKPOT! WON $" + jackpot + "!!!";
                playerMoney += jackpot;
                jackpot = 1000;
            }
        }
    }
    /* Utility function to show a win message and increase player money */
    function showWinMessage() {
        playerMoney += winnings;
        gameTitle.text = "YOU WON $" + winnings + "!!!";
        resetFruitTally();
        checkJackPot();
    }
    /* Utility function to show a loss message and reduce player money */
    function showLossMessage() {
        // playerMoney -= playerBet;
        // alert("You Lost!");
        resetFruitTally();
    }
    function pressSpin() {
        gameTitle.text = "$ SUPER SLOT $";
        isSpinning = true;
        spinResult = spinReels();
        // alert("spinned!: " + spinResult.join(' - '));
        stage.removeChild(firstSymbol);
        firstSymbol = spinResult[0];
        firstSymbol.x = 0;
        stage.addChild(firstSymbol);
        stage.removeChild(secondSymbol);
        secondSymbol = spinResult[1];
        secondSymbol.x = 230;
        stage.addChild(secondSymbol);
        stage.removeChild(thirdSymbol);
        thirdSymbol = spinResult[2];
        thirdSymbol.x = 460;
        stage.addChild(thirdSymbol);
        determineWinnings();
        if (playerBet <= 0 || playerMoney <= 0 && playerBet <= 0) {
            spinButton.isDisabled = true;
            spinButton.off('click', pressSpin);
        }
        else {
            spinButton.isDisabled = false;
            spinButton.on('click', pressSpin);
        }
    }
    // utilities
    function padDigits(number, digits) {
        return Array(Math.max(digits - String(number).length + 1, 0)).join('0') + number;
    }
    function resetFruitTally() {
        grapes = 0;
        bananas = 0;
        oranges = 0;
        cherries = 0;
        bars = 0;
        bells = 0;
        sevens = 0;
        blanks = 0;
    }
    // cheat code
    window.addEventListener('keydown', function switchJackpotFlag(event) {
        // switch with J Key
        if (event.keyCode === 74) {
            console.log('flag switched!');
            cheatingForJackpot = !cheatingForJackpot;
        }
    });
})();
//# sourceMappingURL=game.js.map