const display = document.querySelector('.calculator-input');
const keys =  document.querySelector('.calculator-keys');

let displayValue = '0';
let operator = null ;
let firstValue = null;
let waitingForSecondValue = false ;

updateValue();

function updateValue(){
    display.value = displayValue;
};

keys.addEventListener('click',function(e){
    let element = e.target;
    if(!element.matches('button')) return;

    if(element.classList.contains('operator')){
        // console.log('operator',element.value);
        handleOperator(element.value);
        updateValue();
        return;
    }
    if(element.classList.contains('decimal')){
        // console.log('decimal',element.value);
        inputdecimal();
        updateValue();        
        return;
    }
    if(element.classList.contains('clear')){
        // console.log('clear',element.value);
        inputclear();
        updateValue();
        return;
    }
      
    // console.log('number',element.value);
    inputnum(element.value);  
    updateValue();
});
function handleOperator(nextOperator){
    const value = parseFloat(displayValue);
    if(operator && waitingForSecondValue){
        operator = nextOperator;
        return;
    }
    if(firstValue === null){
        firstValue = value;
    }else if(operator){
        const result = calculate(firstValue, value , operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }
    waitingForSecondValue = true;
    operator = nextOperator;
    console.log(displayValue,firstValue,operator,waitingForSecondValue);
}
function calculate(first , second , operator){
    if(operator === '+'){
        return first + second;
    }else if(operator === '-'){
        return first - second;
    }else if(operator === '/'){
        return first / second;
    }else if(operator === '*'){
        return first * second;
    }
    return second;
}
function inputnum(num){
    if(waitingForSecondValue){
        displayValue = num;
        waitingForSecondValue = false
    }else{
        displayValue = displayValue === '0' ? num : displayValue + num;
    }
    console.log(displayValue,firstValue,operator,waitingForSecondValue);
}
function inputdecimal (){
    if(!displayValue.includes('.')){
        displayValue += '.'
    }
}
function inputclear(){
    displayValue = '0';
}