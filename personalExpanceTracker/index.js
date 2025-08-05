// local storage file where the data is stored 
let file = JSON.parse(localStorage.getItem("data")) || [];

// here newly added product stored
let newProductNameList=JSON.parse(localStorage.getItem("product")) || [];

// calender month days
const calenderMonth = [31,28,31,30,31,30,31,31,30,31,30,31];


// adding product back to list on reload
window.onload = load;
function load (){
    newProductNameList.forEach(element => {
    newList(element);
    });
    allExpense(file);
    totalExpenses(file);
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
    allExpense(file);
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
    totalExpenses(store);
};

const themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // store user preference in localStorage of theme
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// On page load, apply saved theme
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
});


// showing expenses for time bound date
const buttonHTMl =document.getElementById("search-button");

buttonHTMl.addEventListener("click" , searchItem);

// all those item which should be shown is adding in an array 
// function searchItem () {
//     const productaName = document.getElementById("product").value;
//     const timeDuration = document.getElementById("duration").value;
//     timeDuration = number(timeDuration);
//     let resultOfSearch = [];
//     let checkDate=date;
//     for (let len=file.length;(timeDuration>0 && len>0);timeDuration--){
//         file.forEach(item => {
//             if(item.date==checkDate && item.product==productaName){
//                 resultOfSearch.push(item);
//                 len--;
//             }
//         });
//         let day=checkDate.slice(0,2);
//         if(day>1){
//             checkDate= (day-1) + checkDate.slice(2);
//         }
//         else {
//             let month=checkDate.slice(3,5);
//             day=calenderMonth[Number(month)-1];
//             if(month>1){
//                 checkDate = day +"/" + (month -1) + checkDate.slice(6);
//             }
//             else {
//                 let year=checkDate.slice(6);
//                 checkDate= "31/12/" + (year-1);
//             }
//         }
//     };
//     allExpense(resultOfSearch);
// };

function searchItem() {
    const productName = document.getElementById("product").value;
    const duration = document.getElementById("duration").value;

    let resultOfSearch = [];

    // Get today's date
    const today = new Date();

    // Calculate starting date based on duration
    let startDate = new Date(today); // default = today

    if (duration === "yesterday") {
        startDate.setDate(today.getDate() - 1);
    } else if (duration === "week") {
        startDate.setDate(today.getDate() - 7);
    } else if (duration === "month") {
        startDate.setMonth(today.getMonth() - 1);
    } else if (duration === "year") {
        startDate.setFullYear(today.getFullYear() - 1);
    }

    // Format function to match your saved format "dd/mm/yyyy"
    function formatDate(dateObj) {
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const fromDate = formatDate(startDate);
    const toDate = formatDate(today);

    resultOfSearch = file.filter(item => {
        const itemDate = item.date;
        // Check product match
        const productMatch = (productName === "all") || (item.product === productName);
        // Check date range match
        return productMatch && itemDate >= fromDate && itemDate <= toDate;
    });

    allExpense(resultOfSearch);
}

// show total expences

function totalExpenses (expanceFile) {
    const textArea = document.getElementById("total-expences");
    textArea.innerHTML="";
    let expanceFileData = [];
    expanceFile.forEach(item => {
        let index=expanceFileData.findIndex(data => data.product === item.product);
        if(index!=-1){
            expanceFileData[index].amount +=Number(item.Amount);
        }
        else{
            let temp= {
                product : item.product,
                amount : Number(item.Amount)
            };
            expanceFileData.push(temp);
        }
    })
    for(let i=0;i<expanceFileData.length;i++){
        let paragraph = document.createElement("p");
        paragraph.textContent=`${expanceFileData[i].product} : ${expanceFileData[i].amount}`;
        textArea.insertAdjacentElement("afterbegin",paragraph);
    }
}
