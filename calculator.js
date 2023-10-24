let runnningTotal=0;
let buffer="0";
let previousOperator;
const screen=document.querySelector(".screen");
//value is the number 0-9
//parseInt is been used to diffrentiates the clicked value from numbers and viceversa
//parseInt ;isNaN means is not a number and is been used to determine whether the value clicked was number or a symbol.

function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    }else{
        handleNumber(value)
    }
    rerender();
}
//function that handles numbers 
function handleNumber(value){
    if(buffer==="0"){
        buffer=value;
    }else{
        buffer+= value;
        //same as buffer = buffer + number 
    }
}

function handleMath(value){
    if(buffer==="0"){
        //do nothing
        return
    }

const intBuffer = parseInt(buffer);
if(runnningTotal===0){
    runnningTotal = intBuffer
}else{
    flushOperation(intBuffer);
}

previousOperator = value;
buffer = "0";
}
//math operation : * sign for multiplication while / sign for divsion in js.
function flushOperation(intBuffer){
    if(previousOperator === "+" ){
        runnningTotal += intBuffer;
    }else if (previousOperator === "-"){
        runnningTotal -= intBuffer;
    }else if(previousOperator === "×"){
        runnningTotal *= intBuffer;
    }else{
        runnningTotal /= intBuffer;
    }
}
//function that handles symbols
//at the end of each case close with break;
function handleSymbol(value){
    switch (value){
        case "C":
        buffer = "0";
        runnningTotal = 0;
        break;

        case "=":
            if (previousOperator === null){
                //need two numbers to do math
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            // buffer= "" + running total keeps everything as string
            buffer =+ runnningTotal;
            runnningTotal = 0;
            break;

            case "←":
                if (buffer.length === 1){
                    buffer = "0";
                }else{
                    buffer = buffer.substring(0, buffer.length - 1)
                }
                break;
                case "+":
                    case "-":
                        case "×":
                            case "÷":
                            handleMath(value);
                            break;
            }
    }

    function rerender(){
        screen.innerText =  buffer;
    }
//function init must be closed at init();
    function  init(){
        document
        .querySelector(".calc-buttons")//buttons allow the use of tabs
        .addEventListener("click", function (event){
            buttonClick (event.target.innerText);
        });
    }
init();
