  
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

addNewList.addEventListener("click" , () => {
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
    inputConfirm.addEventListener("click", () => {
        let item= document.createElement("p");
        const justHolding=input.value.trim();
        item.textContent=justHolding;

// if input area is empty dont create any thing
        if(!justHolding) {
            input.remove();
            inputConfirm.remove();
            return;
        }

        let taskComplete=document.createElement("input");
        taskComplete.type="checkbox";

        

        let taskDelete=document.createElement("button");
        taskDelete.textContent="delete";
        
        
        let newList=document.createElement("li");

// add into list first for better reach while deletion
        newList.append(item,taskDelete,taskComplete);

// add on the wabsite
        document.getElementById("taskList").append(newList);
        
// want to delete the added task
        taskDelete.addEventListener("click" , () => {

// to delete the closest li tag from where the button was clicked
            taskDelete.closest("li").remove();
        });

// remove input area and button once task is added
        input.remove();
        inputConfirm.remove();
    });
    
});