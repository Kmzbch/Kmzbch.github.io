let game = (() => {
    // canvas
    let canvas: HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage: createjs.Stage;

    // labels
    let messageBoard: objects.Label;
    let betTextLabel: objects.Label;
    let jackpotTextLabel: objects.Label;
    let moneyTextLabel: objects.Label
    let moneyLabel: objects.Label;
    let jackpotLabel: objects.Label;
    let betLabel: objects.Label;

    // symbols?
    let firstSymbol: objects.Symbol;
    let secondSymbol: objects.Symbol;
    let thirdSymbol: objects.Symbol;
    let spinResult: objects.Symbol[] = [];

    // buttons
    let startGameButton: objects.Button;
    let betOneButton: objects.Button;
    let betTenButton: objects.Button;
    let betHundredButton: objects.Button;
    let spinButton: objects.Button;
    let resetButton: objects.Button;
    let quitButton: objects.Button;

    // variables
    let playerMoney: number = util.PLAYER_MONEY;
    let jackpot: number = util.JACKPOT;
    let playerBet: number = 0;
    let blanks: number = 0;
    let grapes: number = 0;
    let bananas: number = 0;
    let oranges: number = 0;
    let cherries: number = 0;
    let bars: number = 0;
    let bells: number = 0;
    let sevens: number = 0;
    let winnings = 0;
    let cheatingForJackpot: boolean = false;

    function Start(): void {
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);

        Main();
    }

    function Update(): void {
        stage.update();
    }

    function Main(): void {
        startScreen();
    }

    function startScreen(): void {
        // clear stage objects
        stage.removeAllChildren();

        // create labels
        messageBoard = new objects.Label(util.GAME_TITLE, "50px bold", "Verdana", "yellow", 480, 50, true);
        startGameButton = new objects.Button(util.START_BUTTON_PATH, 500, 500, 100, 100, true);

        // add to stage
        stage.addChild(messageBoard);
        stage.addChild(startGameButton);

        // atach event
        startGameButton.on('click', () => {
            stage.removeAllChildren();
            playScreen();
            createjs.Ticker.on('tick', function monitorLabels() {
                jackpotLabel.text = padDigits(jackpot, 8);
                moneyLabel.text = padDigits(playerMoney, 8);
                betLabel.text = padDigits(playerBet, 8);
            });
        });
    }

    function playScreen(): void {
        // create labels
        messageBoard = new objects.Label(util.GAME_TITLE, "50px bold", "Verdana", "yellow", 480, 50, true);

        jackpotTextLabel = new objects.Label('JACKPOT ', "25px", "Verdana", "#FFFFFF", 250, 360, true);
        moneyTextLabel = new objects.Label('MONEY', "25px", "Verdana", "#FFFFFF", 480, 360, true);
        betTextLabel = new objects.Label('YOUR BET', "25px", "Verdana", "#FFFFFF", 710, 360, true);

        jackpotLabel = new objects.Label(padDigits(jackpot, 8), "33px", "Consolas", "orangered", 250, 400, true);
        moneyLabel = new objects.Label(padDigits(playerMoney, 8), "33px", "Consolas", "orangered", 480, 400, true);
        betLabel = new objects.Label(padDigits(playerBet, 8), "33px", "Consolas", "orangered", 710, 400, true);

        // add to stage
        stage.addChild(messageBoard);
        stage.addChild(jackpotTextLabel);
        stage.addChild(moneyLabel);
        stage.addChild(moneyTextLabel);
        stage.addChild(jackpotLabel);
        stage.addChild(betLabel);
        stage.addChild(betTextLabel);

        // create symbols
        firstSymbol = new objects.Symbol(util.BANANA_PATH, 260, 230, 200, 200, true);
        secondSymbol = new objects.Symbol(util.ORANGE_PATH, 480, 230, 200, 200, true);
        thirdSymbol = new objects.Symbol(util.CHERRY_PATH, 700, 230, 200, 200, true);

        // add to stage
        stage.addChild(firstSymbol);
        stage.addChild(secondSymbol);
        stage.addChild(thirdSymbol);

        // create buttons
        betOneButton = new objects.Button(util.BETONE_BUTTON_PATH, 200, 490, 100, 100, true);
        betTenButton = new objects.Button(util.BETTEN_BUTTON_PATH, 330, 490, 100, 100, true);
        betHundredButton = new objects.Button(util.BETHUNDRED_BUTTON_PATH, 460, 490, 100, 100, true);
        spinButton = new objects.Button(util.SPIN_BUTTON_PATH, 760, 490, 100, 100, true);
        resetButton = new objects.Button(util.REST_BUTTON_PATH, 840, 10, 50, 50, false);
        quitButton = new objects.Button(util.QUIT_BUTTON_PATH, 900, 10, 50, 50, false);

        // add objects
        stage.addChild(betOneButton);
        stage.addChild(betTenButton);
        stage.addChild(betHundredButton);
        stage.addChild(spinButton);
        stage.addChild(resetButton);
        stage.addChild(quitButton);

        // attach events
        betOneButton.on('click', () => {
            bet(1);
        });

        betTenButton.on('click', () => {
            bet(10);
        });

        betHundredButton.on('click', () => {
            bet(100);
        });

        resetButton.on('click', resetAll);
        quitButton.on('click', startScreen);

        //
        spinButton.isDisabled = true;

    }

    window.addEventListener("load", Start);

    function bet(amount: number = 1): void {
        if (playerMoney - amount >= 0) {
            playerBet += amount;
            playerMoney -= amount;

            // enable/disable spin button
            if (playerBet <= 0 || playerMoney <= 0 && playerBet <= 0) {
                spinButton.isDisabled = true;
                spinButton.off('click', pressSpin);
            } else {
                spinButton.isDisabled = false;
                spinButton.on('click', pressSpin);
            }
        }
    }

    function resetAll(): void {
        playerMoney = util.PLAYER_MONEY;
        jackpot = util.JACKPOT;
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

    /* Utility function to check if a value falls within a range of bounds */
    function checkRange(value: number, lowerBounds: number, upperBounds: number): number {
        return (value >= lowerBounds && value <= upperBounds) ? value : -1;
    }

    function spinReels(): objects.Symbol[] {
        // reset symbols
        stage.removeChild(firstSymbol);
        stage.removeChild(secondSymbol);
        stage.removeChild(thirdSymbol);


        let betLine: objects.Symbol[] = [];
        let outcome: number[] = [0, 0, 0];
        let symbol: objects.Symbol;

        for (let spin: number = 0; spin < 3; spin++) {
            outcome[spin] = Math.floor((Math.random() * 65) + 1);
            if (cheatingForJackpot) {
                outcome[spin] = 65;
            }
            switch (outcome[spin]) {
                case checkRange(outcome[spin], 1, 27): // 41.5% probability
                    symbol = new objects.Symbol(util.BLANK_PATH, 0, 230, 200, 200, true);
                    blanks++;
                    break;
                case checkRange(outcome[spin], 28, 37): // 15.4% probability
                    symbol = new objects.Symbol(util.GRAPE_PATH, 0, 230, 200, 200, true);
                    grapes++;
                    break;
                case checkRange(outcome[spin], 38, 46): // 13.8% probability
                    symbol = new objects.Symbol(util.BANANA_PATH, 0, 230, 200, 200, true);
                    bananas++;
                    break;
                case checkRange(outcome[spin], 47, 54): // 12.3% probability
                    symbol = new objects.Symbol(util.ORANGE_PATH, 0, 230, 200, 200, true);
                    oranges++;
                    break;
                case checkRange(outcome[spin], 55, 59): //  7.7% probability
                    symbol = new objects.Symbol(util.CHERRY_PATH, 0, 230, 200, 200, true);
                    cherries++;
                    break;
                case checkRange(outcome[spin], 60, 62): //  4.6% probability
                    symbol = new objects.Symbol(util.BAR_PATH, 0, 230, 200, 200, true);
                    bars++;
                    break;
                case checkRange(outcome[spin], 63, 64): //  3.1% probability
                    symbol = new objects.Symbol(util.BELL_PATH, 0, 230, 200, 200, true);
                    bells++;
                    break;
                case checkRange(outcome[spin], 65, 65): //  1.5% probability
                    symbol = new objects.Symbol(util.SEVEN_PATH, 0, 230, 200, 200, true);
                    sevens++;
                    break;
                default:
                    symbol = new objects.Symbol(util.BLANK_PATH, 0, 230, 200, 200, true);
            }
            betLine.push(symbol);
        }
        return betLine;
    }

    /* This function calculates the player's winnings, if any */
    function determineWinnings(): void {
        if (cheatingForJackpot) {
            showWinMessage();
        } else {
            if (blanks == 0) {
                if (grapes == 3) {
                    winnings = playerBet * 10;
                } else if (bananas == 3) {
                    winnings = playerBet * 20;
                } else if (oranges == 3) {
                    winnings = playerBet * 30;
                } else if (cherries == 3) {
                    winnings = playerBet * 40;
                } else if (bars == 3) {
                    winnings = playerBet * 50;
                } else if (bells == 3) {
                    winnings = playerBet * 75;
                } else if (sevens == 3) {
                    winnings = playerBet * 100;
                } else if (grapes == 2) {
                    winnings = playerBet * 2;
                } else if (bananas == 2) {
                    winnings = playerBet * 2;
                } else if (oranges == 2) {
                    winnings = playerBet * 3;
                } else if (cherries == 2) {
                    winnings = playerBet * 4;
                } else if (bars == 2) {
                    winnings = playerBet * 5;
                } else if (bells == 2) {
                    winnings = playerBet * 10;
                } else if (sevens == 2) {
                    winnings = playerBet * 20;
                } else if (sevens == 1) {
                    winnings = playerBet * 5;
                } else {
                    winnings = playerBet * 1;
                }
                // win
                showWinMessage();
            } else {
                // lose
                resetFruitTally();
            }
        }
        // reset player bet
        playerBet = 0;
    }

    /* Check to see if the player won the jackpot */
    function checkJackPot(): void {
        let jackPotTry: number = Math.floor(Math.random() * 51 + 1);
        let jackPotWin: number = Math.floor(Math.random() * 51 + 1);

        // cheat code for jackpot
        if (cheatingForJackpot) {
            messageBoard.text = "$WON $" + jackpot + "!!!$"
            playerMoney += jackpot;
            jackpot = 1000;
        } else {
            if (jackPotTry == jackPotWin) {
                messageBoard.text = "$JACKPOT! WON $" + jackpot + "!!!"
                playerMoney += jackpot;
                jackpot = 1000;
            }
        }
    }

    function pressSpin(): void {
        // reset message board
        messageBoard.text = util.GAME_TITLE;

        //
        spinResult = spinReels();

        firstSymbol = spinResult[0];
        firstSymbol.x = 260;
        secondSymbol = spinResult[1];
        secondSymbol.x = 480;
        thirdSymbol = spinResult[2];
        thirdSymbol.x = 700;


        stage.addChild(firstSymbol);
        stage.addChild(secondSymbol);
        stage.addChild(thirdSymbol);

        determineWinnings();

        //
        if (playerBet <= 0 || playerMoney <= 0 && playerBet <= 0) {
            spinButton.isDisabled = true;
            spinButton.off('click', pressSpin);
        } else {
            spinButton.isDisabled = false;
            spinButton.on('click', pressSpin);
        }

    }


    /* Utilities */
    /* Utility function to show a win message and increase player money */
    function showWinMessage(): void {
        playerMoney += winnings;
        messageBoard.text = "YOU WON $" + winnings + "!!!"
        resetFruitTally();
        checkJackPot();
    }

    function padDigits(number: number, digits: number): string {
        return Array(Math.max(digits - String(number).length + 1, 0)).join('0') + number;
    }

    function resetFruitTally(): void {
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
    window.addEventListener('keydown',
        function switchJackpotFlag(event: KeyboardEvent) {
            // switch with J Key
            if (event.keyCode === 74) {
                console.log('flag switched!');
                cheatingForJackpot = !cheatingForJackpot;
            }
        })

})();
