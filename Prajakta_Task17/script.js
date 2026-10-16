function divide(firstNumber, secondNumber) {
    return new Promise(function(resolve, reject) {
        if (secondNumber === 0) {
            reject("Division by zero is not allowed.");
        } else {
            resolve(firstNumber / secondNumber);
        }
    });
}

function showResult(firstNumber, secondNumber) {
    var resultBox = document.getElementById("result");
    resultBox.innerHTML = "Dividing " + firstNumber + " by " + secondNumber + "...";

    divide(firstNumber, secondNumber)
        .then(function(result) {
            resultBox.innerHTML += "<br>Result: " + result;
        })
        .catch(function(error) {
            resultBox.innerHTML += "<br>Error: " + error;
        });
}

function divideNumbers() {
    var firstNumber = Number(document.getElementById("firstNumber").value);
    var secondNumber = Number(document.getElementById("secondNumber").value);

    if (document.getElementById("firstNumber").value === "" || document.getElementById("secondNumber").value === "") {
        document.getElementById("result").innerHTML = "Please enter both numbers.";
        return;
    }

    showResult(firstNumber, secondNumber);
}

function runTest(firstNumber, secondNumber) {
    document.getElementById("firstNumber").value = firstNumber;
    document.getElementById("secondNumber").value = secondNumber;
    showResult(firstNumber, secondNumber);
}
