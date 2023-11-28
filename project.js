//deposit some money
//determine number of lines to bet on
//collect a bet amount 
//spin the slot machine
//check if the user won
//give the user their winnings
//play again

const prompt = require("prompt-sync")(); //get user input

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
    A:2,
    B:4,
    C:6,
    D:8
}

const SYMBOL_VALUES = {
    A:5,
    B:4,
    C:3,
    D:2
}

/**gets the deposit amount and stores it in a variable */
const deposit = () =>{
    while(true){
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberdepositAmount = parseFloat(depositAmount);

            if(isNaN(numberdepositAmount)|| numberdepositAmount<=0){
                console.log("Invalid deposit amount, Try Again");
            }
            else{
                return numberdepositAmount;
            }
    }
};

/**gets the number of lines they bet on */
const getNumberOfLines = () => {
    while(true){
        const lines = prompt("Enter the number of lines to bet on (1-3) ");
        const numberOfLines = parseFloat(lines);

            if(isNaN(numberOfLines)|| numberOfLines<=0 || numberOfLines > 3){
                console.log("Invalid line amount, Try Again");
            }
            else{
                return numberOfLines;
            }
    }
};

/**gets the number of bets, takes in an input of the balance amount and lines*/
const getBet = (balance ,lines) => {
    while(true){
        const bet = prompt("Enter the total bet: ");
        const numberOfBet = parseFloat(bet);

            if(isNaN(numberOfBet)|| numberOfBet<=0 || numberOfBet > balance / lines){
                console.log("Invalid bet amount, Try Again");
            }
            else{
                return numberOfBet;
            }
    }
};

/**spin function spins things */
const spin = () =>{
    /**generating an array for every symbol possible */
    const symbols = [];
    for(const [symbol , count ]  of Object.entries(SYMBOL_COUNT)){
        console.log(symbol , count);
        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }

    /**thid is to randomly select a bunch of symbols for each row */
    const reels = [];
        for(let i = 0; i < COLS; i++){
            reels.push([]);
            const reelSymbols = [...symbols]; 
            for(let j = 0; j < ROWS; j++){
                const ramdomIndex = Math.floor(Math.random() * reelSymbols.length);
                const selectedSymbol = reelSymbols[ramdomIndex];
                reels[i].push(selectedSymbol);
                reelSymbols.splice(ramdomIndex,1);
            }
        }

     return reels;
};


/**visual manipulation on powershell */


//transfer all of our coloumns to rows
const transpose = (reels) =>{
    const rows = [];
    

    for(let i = 0; i < ROWS; i++){
        rows.push([]);
        for(let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i])
        }
    }

    return rows;
};


//print rows with formatting
const printRows = (rows) =>{
    for(const row of rows){
        let rowString = "";
        for(const [i,symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length - 1){
                rowString += " | ";
            }
        }

        console.log(rowString);
    }
};



const getWinnings = (rows, bet, lines) =>{
    let winnings = 0;

    for(let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;


        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if(allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }

    return winnings;
};

const game = () => {
    let balance = deposit();

    while (true){
        console.log("you have a balance of $"+ balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance+= winnings;
        console.log("You won, $" + winnings.toString());

        if(balance <=0){
            console.log("you ran out of money");
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n)");

        if(playAgain != "y") break;
    }
}

game();


