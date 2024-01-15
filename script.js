let boxes=document.querySelectorAll(".box");
let win=document.querySelector(".win");
let msg=document.querySelector("#msg");
let msgContainer=document.querySelector(".msgContainer");
let resetBtn=document.querySelector("#resetGame");
let newGameBtn=document.querySelector(".newGame");
let count=0;
let turn0=true;
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        if(turn0 === true){
            box.innerText="O"; //turn0="O" so first O
            box.style.color="#9C8185";
            turn0=false;
        }else{
            box.innerText="X";
            turn0=true;
            box.style.color="#F71735";
        }
        box.disabled=true; //for disabling box after clicking
        checkWinner(); 
        count++;
        console.log(count);
        if(checkDraw(count)){
            msgContainer.classList.remove("hide");
        }
    })
})
const checkDraw = (count) =>{
    if (count === 9 && checkWinner() === false){
        msg.innerText="Game is Draw";
        return true;
    }
    return false;
}
const box_disabled = () =>{
    for (let box of boxes){
        box.disabled=true;
    }
}
const box_enabled = () =>{
    for (let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
    count=0;
}
const display_msg = (winner) =>{
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    box_disabled();
}
const checkWinner = () =>{
    for(let pattern of winPatterns){
        // console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]]);
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != "") {
            if(pos1val === pos2val && pos2val === pos3val){
                display_msg(pos1val); //pos1val
                console.log("winner",pos1val);
                return true;
            }
            
        }
    }
    return false;
    
}
const new_Game = () =>{
    turn0=true;
    box_enabled();
    msgContainer.classList.add("hide");
}
resetBtn.addEventListener("click",new_Game);
newGameBtn.addEventListener("click",new_Game);

