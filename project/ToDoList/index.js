// creating an array to store object {work,competed/not} and getting it from local host
let file= JSON.parse(localStorage.getItem("data")) || [];

// setting current date 

const todayDate=document.getElementById("date") ;
function setTime(){
    const nowInKolkata = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    todayDate.innerHTML=nowInKolkata;
}
setInterval(setTime,1000);
setTime();


// it will run every time the web page will laod
window.onload= localToWebPage;


// adding new taks
const addNewList=document.getElementById("add");

addNewList.addEventListener("click" , showInputField);


// function to create and show input field so it can take input
function showInputField() {
    // if input box is already open and 
    // you are clicking on add new list again
    // so just return
    if(document.querySelector("#takingInput"))
        return ;


    let input=document.createElement("input");
    input.placeholder="Insert new Task";
    input.id="takingInput";

    let inputConfirm=document.createElement("button");
    inputConfirm.textContent="add";

    // todayDate.insertAdjacentElement("beforebegin",input );
    // todayDate.insertAdjacentElement("beforebegin",inputConfirm );
    todayDate.before(input,inputConfirm);

    // data if filled and want to add into list
    inputConfirm.addEventListener("click", () => addTask(input,inputConfirm));
    
};



//function if data is filled and want to add into list
function addTask(input,inputConfirm) {
    const justHolding=input.value.trim();

    // if input area is empty dont create any thing
    if(!justHolding) {
        input.remove();
        inputConfirm.remove();
        return;
    }

    createTaskElement(justHolding,false);

    // remove input area and button once task is added
    input.remove();
    inputConfirm.remove();
};





// function to create the formate in which the tasks will be shown
function createTaskElement(justHolding,completed) {
    const item= document.createElement("p");
    item.textContent=justHolding;

    const taskComplete=document.createElement("input");
    taskComplete.type="checkbox";
    taskComplete.checked=completed;
    item.style.textDecoration = taskComplete.checked ? "line-through" : "none";
    

    const taskDelete=document.createElement("button");
    taskDelete.textContent="delete";
    
    const newList=document.createElement("li");

    // add into list first for better reach while deletion
    newList.append(item,taskDelete,taskComplete);

    // add on the wabsite
    document.getElementById("taskList").append(newList);

    // want to delete the added task

    taskDelete.addEventListener("click", () => {
        // finding object in array which we want to delete
        const index = file.findIndex(f => f.text === justHolding);
        // removing that object and updating local storage
        if (index !== -1) {
            file.splice(index, 1);
            updateLocalHost();
        }
        //to delete the closest li tag from where the button was clicked
        taskDelete.closest("li").remove();
    });

    taskComplete.addEventListener("change", () => {
        // finding object in array which we want to change it (completed or not)
        const index = file.findIndex(f => f.text === justHolding);
        // changing that object and updating local storage
        if (index !== -1) {
            file[index].completed = taskComplete.checked;
            updateLocalHost();
        }
        // marking cross over the task as i complete it
        item.style.textDecoration = taskComplete.checked ? "line-through" : "none";
    });

    // add task and its competion every time you enter a new task
    if (!file.some(f => f.text === justHolding)) {
        file.push({ text: justHolding, completed: completed });
        updateLocalHost();
    }
};

// to call all the objects stored in array to reload on the web page
function localToWebPage() {
    file.forEach(element => {
        createTaskElement(element.text,element.completed);
    });
};


// updating local storage
function updateLocalHost() {
    localStorage.setItem("data",JSON.stringify(file));
}