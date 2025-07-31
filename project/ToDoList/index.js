  
// setting current date 

const todayDate=document.getElementById("date");
function setTime(){
    const nowInKolkata = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    todayDate.innerHTML=nowInKolkata;
}
setInterval(setTime,1000);
setTime();


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

    createTaskElement(justHolding);

    // remove input area and button once task is added
    input.remove();
    inputConfirm.remove();
};


//function to delete the closest li tag from where the button was clicked
function deleteTask (taskDelete){
    taskDelete.closest("li").remove();
};


// function to create the formate in which the tasks will be shown
function createTaskElement(justHolding) {
    const item= document.createElement("p");
    item.textContent=justHolding;

    const taskComplete=document.createElement("input");
    taskComplete.type="checkbox";

    const taskDelete=document.createElement("button");
    taskDelete.textContent="delete";
    
    const newList=document.createElement("li");

    // add into list first for better reach while deletion
    newList.append(item,taskDelete,taskComplete);

    // add on the wabsite
    document.getElementById("taskList").append(newList);

    // want to delete the added task
    taskDelete.addEventListener("click" , () => deleteTask(taskDelete)) ;
};