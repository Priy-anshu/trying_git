const buttons=document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener("click" , () => {
        // to store the previous color
        const clicked=document.body.style.backgroundColor;

        // to change background color
        document.body.style.backgroundColor=button.id;

        // to display the message 
        document.getElementById("changes").innerHTML=
        "color is changed from " + clicked + " to " +
        document.body.style.backgroundColor;
    })
})

// for(let button of buttons){
//     button.addEventListener("click" , () => {
//         document.body.style.backgroundColor=button.id;
//     })
// }

// for(let button in buttons){
//     buttons[button].addEventListener("click" , () => {
//         document.body.style.backgroundColor=buttons[button].id;
//     })
// }
