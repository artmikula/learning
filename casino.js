const randomNumber = function(min,max) {
    let nb = min + (max-min+1)*Math.random();
    return Math.floor(nb);
}

const casino = function() {
    let money = parseInt(prompt("Enter the amount of money you want to play with"));
    let continuePlaying = false;
    console.log(`Please choose a table and take a seat`);
    console.log(`Player takes a seat with ${money}`);

    do {
        let playerNumber, betAmount;
        do {
            playerNumber = parseInt(prompt(`Please choose a number between 0 and 36`));
        } while(isNaN(playerNumber) || playerNumber<0 || playerNumber>36);

        do {
            betAmount = parseInt(prompt(`Select the amount of money you would like to play with ? ${money} Max`));
        } while(isNaN(betAmount) || betAmount<0 || betAmount>money);

        console.log(`Your number is : ${playerNumber} and bet amount is : ${betAmount}`);
        let winningNumber = randomNumber(0,36);
        console.log(`Winning number is : ${winningNumber}`);

        let win;
        if (playerNumber == winningNumber) {
            win = betAmount * 35;
            console.log(`You won ${win}`);
            money += win;
        } else if (playerNumber%2 == winningNumber%2) {
            win = betAmount;
            console.log(`You won ${win}`);
            money += win;
        } else {
            console.log(`Loser!`)
            money -= betAmount;
        }
        console.log(`Your current balance is ${money}`);
    
        continuePlaying = confirm(`Would you like to continue?`);
        if(money<=0) {
            console.log("You don't have enough money to play");
            continuePlaying = false;
        }
    } while(continuePlaying);
}

casino();