//Define variables
let earningsTotal;
let expensesTotal;
let netPosition;
let transportTotal;
let transportAverage;
let householdTotal;
let householdAverage;
let personalTotal;
let personalAverage;


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
            //Parse all form input fields in one step
            let inputFields = document.querySelectorAll(".input-field");

            //Store values of parsed fields into an array
            let expensesInputs = [];
            inputFields.forEach(field => {
                if (field) {
                    val = parseInt(field.value);
                    expensesInputs.push(val);
                    console.log(val);
                }  else {console.log('Inputs are not parsed!!!!!!');}
            });
            
            //Add to calculate total expenses
            let totalExpenses = 0;
            expensesInputs.forEach(input => {
                console.log(input);
                //Check if input is empty/null
                if (input){
                    totalExpenses += input;
                } else {
                    //Prevent addition in case of null input
                    e.preventDefault();
                    alert("Expenses Fields can not be empty. You can input 0 if required.");
                }
            });

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

    alert('Earnings Set Success!');
}

//Calculate the changes total
function calculate (totalExpenses) {
    console.log(totalExpenses);
    expensesTotal = totalExpenses.toFixed(2);

    //Writing results to HTML
    let expensesResult = document.getElementById("expenses");
    expensesResult.innerText = "-     $" + expensesTotal;

}

function updateSummary(expensesInputs) {
    transportTotal = expensesInputs[0] + expensesInputs[1] + expensesInputs[2];
    householdTotal = expensesInputs[3] + expensesInputs[4] + expensesInputs[5];
    personalTotal = expensesInputs[6] + expensesInputs[7] + expensesInputs[8];

    document.getElementById("transport-total").innerText = "Transport ............ $" + transportTotal.toFixed(2);

    document.getElementById("household-total").innerText = "Household .......... $" + householdTotal.toFixed(2);

    document.getElementById("personal-total").innerText = "Personal .............. $" + personalTotal.toFixed(2);

}

function updateAverage() {
    // transportTotal = expensesInputs[0] + expensesInputs[1] + expensesInputs[2];
    // householdTotal = expensesInputs[3] + expensesInputs[4] + expensesInputs[5];
    // personalTotal = expensesInputs[6] + expensesInputs[7] + expensesInputs[8];

    transportAverage = transportTotal / 3;
    householdAverage = householdTotal / 3;
    personalAverage = personalTotal / 3;

    document.getElementById("transport-average").innerText = "Transport ............ $" + transportAverage.toFixed(2);

    document.getElementById("household-average").innerText = "Household .......... $" + householdAverage.toFixed(2);

    document.getElementById("personal-average").innerText = "Personal .............. $" + personalAverage.toFixed(2);


}

function updateNetPosition() {
    netPosition = earningsTotal - expensesTotal;

    document.getElementById("final-position").innerText = "$" + netPosition.toFixed(2);
}