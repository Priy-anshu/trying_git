const buttons = document.querySelectorAll("button");
const input= document.getElementById("input");
let sign;
buttons.forEach(button => {
    button.addEventListener("click", () =>{
        const value=button.innerText;

        switch(value){
            case 'ac' :
                input.innerHTML = "";
                break;
            case '<-' :
                input.innerHTML = input.innerHTML.slice(0,-1);
                break;
            case '=' :
                const index=input.innerHTML.indexOf(sign);
                const firstNumber=parseFloat(input.innerHTML.slice(0,index));
                const secondNumber=parseFloat(input.innerHTML.slice(index+1));
                switch (sign){
                    case '+' :
                        input.innerHTML = firstNumber + secondNumber;
                        break;
                    case '-' :
                        input.innerHTML = firstNumber - secondNumber;
                        break;
                    case '*' :
                        input.innerHTML = firstNumber * secondNumber;
                        break;
                    case '/' :
                        input.innerHTML = firstNumber / secondNumber;
                        break;
                    case '%' :
                        input.innerHTML = firstNumber % secondNumber;
                        break;
                    case '^' :
                        input.innerHTML = firstNumber ** secondNumber;
                        break;
                    default :
                        break;
                }
                break;
            case '+' :
            case '-' :
            case '*' :
            case '/' :
            case '%' :
            case '^' :
                sign=value;
                input.innerHTML +=value;
                break;
            default :
                input.innerHTML +=value;
                break;
        }
    });
});