// local storage file where the data is stored
let file = JSON.parse(localStorage.getItem("data")) || [];


const drop_down = document.getElementById("product");

// storing today date
const date = new Date().toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
});

let htmlDate=document.createElement("p");
htmlDate.id="date-style";
htmlDate.textContent=date;
document.getElementById("app_name").insertAdjacentElement("afterend",htmlDate);

function addProduct (product) {
    const listItem = document.createElement("option");
    listItem.textContent=product;
    drop_down.appendChild(listItem);
};

const newExpanseButton=document.getElementById("add");
// only create new input box if there exist none
newExpanseButton.addEventListener("click" , () => {
    if(!document.getElementById("input-div"))
        addInputDiv();
});


function addInputDiv(){
    const inputDiv = document.createElement("div");
    inputDiv.id= "input-div";


    const inputBox = document.createElement("input");
    inputBox.placeholder="Amount";
    
    const addButton = document.createElement("button");
    addButton.id="addButtonId";
    addButton.textContent="Add";

    const cloneDropDown = drop_down.cloneNode(true);

    inputDiv.append(inputBox,cloneDropDown,addButton);

    document.getElementById("nav-bar").insertAdjacentElement("afterend",inputDiv);

    addButton.addEventListener("click" , () => {
        // only add the value there exist some value for both 
        if(inputBox.value && cloneDropDown.value){
            // check if amount is number or not
            // if it number all good
            if(Number.isInteger(inputBox.value)){
                let amount=parseInt(inputBox.value);
                addData(amount,cloneDropDown.value);
            }
            // if is not just send an alert 
            else
                alert(inputBox.value + " is not a number, amount should be number");
        }
        // remove input box after button is 
        // clicked no matter data is added or not
        inputDiv.remove();
    } );

    
};

function addData (Amount,product){
    let newExpanse = {
        date , Amount ,product
    };
    file.push(newExpanse);
    updateLocalHost();
};

function updateLocalHost () {
    localStorage.setItem("data",JSON.stringify(file));
};
// whenever you need to clear local storage
// localStorage.clear();