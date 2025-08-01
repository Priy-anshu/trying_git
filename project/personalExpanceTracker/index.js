// local storage file where the data is stored 
let file = JSON.parse(localStorage.getItem("data")) || [];
// here newly added product stored
let newProductNameList=JSON.parse(localStorage.getItem("product")) || [];
// adding product back to list on reload
window.onload = load;
function load (){
    newProductNameList.forEach(element => {
    newList(element);
    });
    allExpense(file);
}

const drop_down = document.getElementById("product");

// storing today date
const date = new Date().toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
});


// creating date into web page
let htmlDate=document.createElement("p");
htmlDate.id="date-style";
htmlDate.textContent=date;
// adding date into web page
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

    // making clone for products so can use at different places
    const cloneDropDown = drop_down.cloneNode(true);

    inputDiv.append(inputBox,cloneDropDown,addButton);

    document.getElementById("nav-bar").insertAdjacentElement("afterend",inputDiv);

    addButton.addEventListener("click" , () => {
        // only add the value there exist some value for both 
        if(inputBox.value && cloneDropDown.value){
            // check if amount is number or not
            // if it number all good
            let amount=parseInt(inputBox.value);
            if(Number.isInteger(amount)){
                addData(amount,cloneDropDown.value);
                allExpense();
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

// adding data into file after clicking add button if all data is correct
function addData (Amount,product){
    let newExpanse = {
        date , Amount ,product
    };
    file.push(newExpanse);
    updateLocalHost();
};

// updating local host 
function updateLocalHost () {
    localStorage.setItem("data",JSON.stringify(file));
};

// whenever you need to clear local storage
// localStorage.clear();


// if want to add new product in the list then

const productDropdown = document.getElementById("product");
const newProduct = document.getElementById("add-new");

newProduct.addEventListener("click", () => {
    const newProduct = prompt("Enter new Product You Want To Add");
    newList(newProduct);
});
// adding new product in list 
function newList (newProductName) {
    if (newProductName) {
        const newOption = document.createElement("option");
        newOption.value = newProductName;
        newOption.textContent = newProductName;

        // Insert new option at end of list
        const addNewOption = document.querySelector('#product option[value="add-new"]');
        productDropdown.appendChild(newOption);


        //   adding the product to local list 
        if (!newProductNameList.includes(newProductName)) {
            newProductNameList.push(newProductName);
            localStorage.setItem("product", JSON.stringify(newProductNameList));
        }
    } else {
        // Reset to the first option if user cancels
        productDropdown.selectedIndex = 0;
    }
};

// display all the expance with date amount and product form
const expenseList = document.getElementById("all-expense");
function allExpense (store) {
    expenseList.innerHTML="";
    store.forEach(item => {
        let temp=document.createElement("p");
        temp.textContent=`${item.date} | ₹${item.Amount} | ${item.product} ` ;
        expenseList.appendChild(temp);
    })
};

const buttonHTMl =document.getElementById("search-button");

buttonHTMl.addEventListener("click" , );

