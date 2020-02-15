module scenes {
    export class Play extends objects.Scene {
        // PRIVATE INSTANCE MEMEBERS
        // labels
        messageBoard: objects.Label;
        betTextLabel: objects.Label;
        jackpotTextLabel: objects.Label;
        moneyTextLabel: objects.Label
        moneyLabel: objects.Label;
        jackpotLabel: objects.Label;
        betLabel: objects.Label;
        // symbols?
        firstSymbol: objects.Symbol;
        secondSymbol: objects.Symbol;
        thirdSymbol: objects.Symbol;
        spinResult: objects.Symbol[] = [];
        // buttons
        betOneButton: objects.Button;
        betTenButton: objects.Button;
        betHundredButton: objects.Button;
        spinButton: objects.Button;
        resetButton: objects.Button;
        quitButton: objects.Button;

        // variables
        public playerMoney: number = util.PLAYER_MONEY;
        public jackpot: number = util.JACKPOT;
        public playerBet: number = 0;
        public blanks: number = 0;
        public grapes: number = 0;
        public bananas: number = 0;
        public oranges: number = 0;
        public cherries: number = 0;
        public bars: number = 0;
        public bells: number = 0;
        public sevens: number = 0;
        public winnings = 0;

        private cheatingForJackpot: boolean = false;

        // CONTRUCTOR
        constructor() {
            super();
            // create labels
            this.messageBoard = new objects.Label(util.GAME_TITLE, "50px bold", "Verdana", "yellow", 480, 50, true);
            this.jackpotTextLabel = new objects.Label('JACKPOT ', "25px", "Verdana", "#FFFFFF", 250, 360, true);
            this.moneyTextLabel = new objects.Label('MONEY', "25px", "Verdana", "#FFFFFF", 480, 360, true);
            this.betTextLabel = new objects.Label('YOUR BET', "25px", "Verdana", "#FFFFFF", 710, 360, true);


            this.jackpotLabel = new objects.Label(this.padDigits(this.jackpot, 8), "33px", "Consolas", "orangered", 250, 400, true);
            this.moneyLabel = new objects.Label(this.padDigits(this.playerMoney, 8), "33px", "Consolas", "orangered", 480, 400, true);
            this.betLabel = new objects.Label(this.padDigits(this.playerBet, 8), "33px", "Consolas", "orangered", 710, 400, true);

            // create symbols
            this.firstSymbol = new objects.Symbol(util.BANANA_PATH, 260, 230, 200, 200, true);
            this.secondSymbol = new objects.Symbol(util.ORANGE_PATH, 480, 230, 200, 200, true);
            this.thirdSymbol = new objects.Symbol(util.CHERRY_PATH, 700, 230, 200, 200, true);


            // create buttons
            this.betOneButton = new objects.Button(util.BETONE_BUTTON_PATH, 200, 490, 100, 100, true);
            this.betTenButton = new objects.Button(util.BETTEN_BUTTON_PATH, 330, 490, 100, 100, true);
            this.betHundredButton = new objects.Button(util.BETHUNDRED_BUTTON_PATH, 460, 490, 100, 100, true);
            this.spinButton = new objects.Button(util.SPIN_BUTTON_PATH, 760, 490, 100, 100, true);
            this.resetButton = new objects.Button(util.REST_BUTTON_PATH, 840, 10, 50, 50, false);
            this.quitButton = new objects.Button(util.QUIT_BUTTON_PATH, 900, 10, 50, 50, false);


            // cheat code
            window.addEventListener('keydown', (event: KeyboardEvent) => {
                // switch with J Key
                if (event.keyCode === 74) {
                    console.log('flag switched!');
                    this.cheatingForJackpot = !this.cheatingForJackpot;
                }

            }
            )

            this.Start();

        }

        // PUBLIC METHODS
        public Start(): void {
            // add to stage
            this.addChild(this.messageBoard);
            this.addChild(this.jackpotTextLabel);
            this.addChild(this.moneyLabel);
            this.addChild(this.moneyTextLabel);
            this.addChild(this.jackpotLabel);
            this.addChild(this.betLabel);
            this.addChild(this.betTextLabel);
            // add to stage
            this.addChild(this.firstSymbol);
            this.addChild(this.secondSymbol);
            this.addChild(this.thirdSymbol);
            // add objects
            this.addChild(this.betOneButton);
            this.addChild(this.betTenButton);
            this.addChild(this.betHundredButton);
            this.addChild(this.spinButton);
            this.addChild(this.resetButton);
            this.addChild(this.quitButton);

            this.Main();
        }

        public Update(): void {
            this.betLabel.text = this.padDigits(this.playerBet, 8);
            this.jackpotLabel.text = this.padDigits(this.jackpot, 8);
            this.moneyLabel.text = this.padDigits(this.playerMoney, 8);

        }

        public Main(): void {
            // attach events
            this.betOneButton.on('click', () => {
                this.bet(1);
            });

            this.betTenButton.on('click', () => {
                this.bet(10);
            });

            this.betHundredButton.on('click', () => {
                this.bet(100);
            });

            this.resetButton.on('click', () => { this.resetAll() });
            this.quitButton.on('click', () => {
                config.GameConfig.SCENE_STATE = scenes.State.START;
            });

            //
            this.spinButton.isDisabled = true;

        }



        public bet(amount: number = 1): void {

            if (this.playerMoney - amount >= 0) {
                this.playerBet += amount;
                this.playerMoney -= amount;

                // enable/disable spin button
                if (this.playerBet <= 0 || this.playerMoney <= 0 && this.playerBet <= 0) {
                    this.spinButton.isDisabled = true;
                    this.spinButton.off('click', () => {
                        this.pressSpin()
                    });
                } else {
                    this.spinButton.isDisabled = false;
                    this.spinButton.on('click', () => {
                        this.pressSpin()
                    });
                }
            }
        }

        public resetAll(): void {
            this.playerMoney = util.PLAYER_MONEY;
            this.jackpot = util.JACKPOT;
            this.playerBet = 0;
            this.spinResult = [];
            this.blanks = 0;
            this.grapes = 0;
            this.bananas = 0;
            this.oranges = 0;
            this.cherries = 0;
            this.bars = 0;
            this.bells = 0;
            this.sevens = 0;
            this.winnings = 0;
            this.cheatingForJackpot = false;
        }

        /* Utility function to check if a value falls within a range of bounds */
        public checkRange(value: number, lowerBounds: number, upperBounds: number): number {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        }

        public spinReels(): objects.Symbol[] {
            // reset symbols
            this.removeChild(this.firstSymbol);
            this.removeChild(this.secondSymbol);
            this.removeChild(this.thirdSymbol);


            let betLine: objects.Symbol[] = [];
            let outcome: number[] = [0, 0, 0];
            let symbol: objects.Symbol;

            for (let spin: number = 0; spin < 3; spin++) {
                outcome[spin] = Math.floor((Math.random() * 65) + 1);
                if (this.cheatingForJackpot) {
                    outcome[spin] = 65;
                }
                switch (outcome[spin]) {
                    case this.checkRange(outcome[spin], 1, 27): // 41.5% probability
                        symbol = new objects.Symbol(util.BLANK_PATH, 0, 230, 200, 200, true);
                        this.blanks++;
                        break;
                    case this.checkRange(outcome[spin], 28, 37): // 15.4% probability
                        symbol = new objects.Symbol(util.GRAPE_PATH, 0, 230, 200, 200, true);
                        this.grapes++;
                        break;
                    case this.checkRange(outcome[spin], 38, 46): // 13.8% probability
                        symbol = new objects.Symbol(util.BANANA_PATH, 0, 230, 200, 200, true);
                        this.bananas++;
                        break;
                    case this.checkRange(outcome[spin], 47, 54): // 12.3% probability
                        symbol = new objects.Symbol(util.ORANGE_PATH, 0, 230, 200, 200, true);
                        this.oranges++;
                        break;
                    case this.checkRange(outcome[spin], 55, 59): //  7.7% probability
                        symbol = new objects.Symbol(util.CHERRY_PATH, 0, 230, 200, 200, true);
                        this.cherries++;
                        break;
                    case this.checkRange(outcome[spin], 60, 62): //  4.6% probability
                        symbol = new objects.Symbol(util.BAR_PATH, 0, 230, 200, 200, true);
                        this.bars++;
                        break;
                    case this.checkRange(outcome[spin], 63, 64): //  3.1% probability
                        symbol = new objects.Symbol(util.BELL_PATH, 0, 230, 200, 200, true);
                        this.bells++;
                        break;
                    case this.checkRange(outcome[spin], 65, 65): //  1.5% probability
                        symbol = new objects.Symbol(util.SEVEN_PATH, 0, 230, 200, 200, true);
                        this.sevens++;
                        break;
                    default:
                        symbol = new objects.Symbol(util.BLANK_PATH, 0, 230, 200, 200, true);
                }
                betLine.push(symbol);
            }
            return betLine;
        }

        /* This function calculates the player's winnings, if any */
        public determineWinnings(): void {
            if (this.cheatingForJackpot) {
                this.showWinMessage();
            } else {
                if (this.blanks == 0) {
                    if (this.grapes == 3) {
                        this.winnings = this.playerBet * 10;
                    } else if (this.bananas == 3) {
                        this.winnings = this.playerBet * 20;
                    } else if (this.oranges == 3) {
                        this.winnings = this.playerBet * 30;
                    } else if (this.cherries == 3) {
                        this.winnings = this.playerBet * 40;
                    } else if (this.bars == 3) {
                        this.winnings = this.playerBet * 50;
                    } else if (this.bells == 3) {
                        this.winnings = this.playerBet * 75;
                    } else if (this.sevens == 3) {
                        this.winnings = this.playerBet * 100;
                    } else if (this.grapes == 2) {
                        this.winnings = this.playerBet * 2;
                    } else if (this.bananas == 2) {
                        this.winnings = this.playerBet * 2;
                    } else if (this.oranges == 2) {
                        this.winnings = this.playerBet * 3;
                    } else if (this.cherries == 2) {
                        this.winnings = this.playerBet * 4;
                    } else if (this.bars == 2) {
                        this.winnings = this.playerBet * 5;
                    } else if (this.bells == 2) {
                        this.winnings = this.playerBet * 10;
                    } else if (this.sevens == 2) {
                        this.winnings = this.playerBet * 20;
                    } else if (this.sevens == 1) {
                        this.winnings = this.playerBet * 5;
                    } else {
                        this.winnings = this.playerBet * 1;
                    }
                    // win
                    this.showWinMessage();
                } else {
                    // lose
                    this.resetFruitTally();
                }
            }
            // reset player bet
            this.playerBet = 0;
        }

        /* Check to see if the player won the jackpot */
        public checkJackPot(): void {
            let jackPotTry: number = Math.floor(Math.random() * 51 + 1);
            let jackPotWin: number = Math.floor(Math.random() * 51 + 1);

            // cheat code for jackpot
            if (this.cheatingForJackpot) {
                this.messageBoard.text = "$WON $" + this.jackpot + "!!!$"
                this.playerMoney += this.jackpot;
                this.jackpot = 1000;
            } else {
                if (jackPotTry == jackPotWin) {
                    this.messageBoard.text = "$JACKPOT! WON $" + this.jackpot + "!!!"
                    this.playerMoney += this.jackpot;
                    this.jackpot = 1000;
                }
            }
        }

        public pressSpin(): void {
            console.log(this.messageBoard.text);

            // reset message board
            console.log(this.messageBoard);
            this.messageBoard.text = util.GAME_TITLE;

            //
            this.spinResult = this.spinReels();

            this.firstSymbol = this.spinResult[0];
            this.firstSymbol.x = 260;
            this.secondSymbol = this.spinResult[1];
            this.secondSymbol.x = 480;
            this.thirdSymbol = this.spinResult[2];
            this.thirdSymbol.x = 700;


            this.stage.addChild(this.firstSymbol);
            this.stage.addChild(this.secondSymbol);
            this.stage.addChild(this.thirdSymbol);

            this.determineWinnings();

            //
            if (this.playerBet <= 0 || this.playerMoney <= 0 && this.playerBet <= 0) {
                this.spinButton.isDisabled = true;
                this.spinButton.off('click', () => {
                    this.pressSpin()
                });

            } else {
                this.spinButton.isDisabled = false;
                this.spinButton.on('click', () => {
                    this.pressSpin()
                });

            }

        }


        /* Utilities */
        /* Utility function to show a win message and increase player money */
        public showWinMessage(): void {

            this.playerMoney += this.winnings;
            this.messageBoard.text = "YOU WON $" + this.winnings + "!!!"
            this.resetFruitTally();
            this.checkJackPot();
        }

        public padDigits(number: number, digits: number): string {
            return Array(Math.max(digits - String(number).length + 1, 0)).join('0') + number;
        }

        public resetFruitTally(): void {
            this.grapes = 0;
            this.bananas = 0;
            this.oranges = 0;
            this.cherries = 0;
            this.bars = 0;
            this.bells = 0;
            this.sevens = 0;
            this.blanks = 0;
        }


    }



}
