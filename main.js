//Define variables
let earningsTotal = 0;
let expensesTotal = 0;
let netPosition = 0;
let transportTotal = 0;
let transportAverage = 0;
let householdTotal = 0;
let householdAverage = 0;
let personalTotal = 0;
let personalAverage = 0;
let transportEntries = [];
let householdEntries = [];
let personalEntries = [];


//Define Earnings Form Submit btn after loading DOM
document.addEventListener("DOMContentLoaded", function() { 
    let setEarningsBtn = document.querySelector('#set-earnings-btn');
    if (setEarningsBtn) { 
        //Add event listener to track when form is submitted
        setEarningsBtn.addEventListener('click', (e) => {
            let earningsInput = parseInt(document.getElementById("earnings-input").value);
            //Check if submission is empty/null
            if (earningsInput) {
                //Set earnings by calling the function and passing input
                setEarnings(earningsInput);
                //Update net position
                updateNetPosition();
            } else {
                //Prevent submission in case of null input
                e.preventDefault();
                alert("Earnings value can not be empty");
            }
        } );
    }
});

//Define Earnings Form Submit btn after loading DOM
document.addEventListener("DOMContentLoaded", function() { 
    let expensesForm = document.querySelector('#calculate-btn');
    if (expensesForm) { 
        //Add event listener to track when form is submitted
        expensesForm.addEventListener('click', (e) => {
            //Parse all form input fields into one array
            let inputFields = document.querySelectorAll(".input-field");

            //Store values of parsed fields into an array
            let expensesInputs = [];
            inputFields.forEach(field => {
                if (field.value) {
                    val = parseInt(field.value);
                    expensesInputs.push(val);
                }  else {
                    //Replace empty/null inputs with zero to avoid calculation errors
                    expensesInputs.push(0);
                }
            });
            
            //Add to calculate total expenses
            let totalExpenses = 0;
            expensesInputs.forEach(input => {
                //Check if input is empty/null
                if (input){
                    totalExpenses += input;
                } else {
                    //Prevent addition in case of null input
                    e.preventDefault();
                    // alert("Expenses Fields can not be empty. You can input 0 if required.");
                }
            });

            //Clear previous totals
            transportTotal = 0;
            householdTotal = 0;
            personalTotal = 0;

            //Call the calculate function and pass the Expenses Total
            calculate(totalExpenses);

            //Call the update sunnary function
            updateSummary(expensesInputs);

            //Call the update average function
            updateAverage();

            //Call the net position function
            updateNetPosition();
        } );
    }
});

//Set Total Earnings to input value
function setEarnings(earningsInput) {
    earningsTotal = earningsInput.toFixed(2);

    //Writing result to HTML
    let earningsResult = document.getElementById("earnings");
    earningsResult.innerText = "+     $" + earningsTotal;
}

//Calculate the changes total
function calculate (totalExpenses) {
    expensesTotal = totalExpenses.toFixed(2);

    //Writing results to HTML
    let expensesResult = document.getElementById("expenses");
    expensesResult.innerText = "-     $" + expensesTotal;

}

function updateSummary(expensesInputs) {
    
    //Populate expense inputs into individual category arrays to eleminate errors due to zero entries
    transportEntries = [expensesInputs[0], expensesInputs[1], expensesInputs[2]];
    householdEntries = [expensesInputs[3], expensesInputs[4], expensesInputs[5]];
    personalEntries = [expensesInputs[6], expensesInputs[7], expensesInputs[8]];

    //Claculate totals by category
    transportEntries.forEach(entry => {
        transportTotal += entry;
    });

    householdEntries.forEach(entry => {
        householdTotal += entry;
    });

    personalEntries.forEach(entry => {
        personalTotal += entry;
    });

    document.getElementById("transport-total").innerText = "Transport ............ $" + transportTotal.toFixed(2);

    document.getElementById("household-total").innerText = "Household .......... $" + householdTotal.toFixed(2);

    document.getElementById("personal-total").innerText = "Personal .............. $" + personalTotal.toFixed(2);

}

function updateAverage() {
    
    //elimenate Zero values from average calculation
    let transportItems = 0;
    let householdItems = 0;
    let personalItems = 0;

    transportEntries.forEach(entry => {
        if(entry != 0) {
            transportItems+= 1;
        }
    });

    householdEntries.forEach(entry => {
        if(entry != 0) {
            householdItems+= 1;
        }
    });

    personalEntries.forEach(entry => {
        if(entry != 0) {
            personalItems+= 1;
        }
    });

    //Calculate average based on new value count
    if (transportItems > 0){
        transportAverage = transportTotal / transportItems;
    } else {transportAverage = 0;}

    if (householdItems > 0){
        householdAverage = householdTotal / householdItems;
    } else {householdAverage = 0;}

    if (personalItems > 0){
        personalAverage = personalTotal / personalItems;
    } else {personalAverage = 0;}
    
    document.getElementById("transport-average").innerText = "Transport ............ $" + transportAverage.toFixed(2);

    document.getElementById("household-average").innerText = "Household .......... $" + householdAverage.toFixed(2);

    document.getElementById("personal-average").innerText = "Personal .............. $" + personalAverage.toFixed(2);


}

function updateNetPosition() {
    netPosition = earningsTotal - expensesTotal;

    //Display net position.
    document.getElementById("final-position").innerText = "$" + netPosition.toFixed(2);

    //Check the net position and display success or faliure image accordingly.
    if (netPosition < 0) {
        document.getElementById("green-check").style.visibility = "hidden";
        document.getElementById("red-error").style.visibility = "visible";
        document.getElementById("red-error").style.transform = "translateY(-200px)";
    } else {
        document.getElementById("red-error").style.visibility = "hidden";
        document.getElementById("green-check").style.visibility = "visible";
    }
    
}