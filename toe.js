let boxes= document.querySelectorAll(".box");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newgame");

let turnO=true;
let count=0;
let gameOver = false;

const winPatterns = [ 
[0, 1, 2],
[0, 3, 6],
[0, 4, 8],
[1, 4, 7],
[2, 5, 8],
[2, 4, 6],
[3, 4, 5],
[6, 7, 8],
];

const resetGame=()=>{
    turnO=true;
    count=0;
    gameOver = false;
    enableBoxes();
    msg.innerText = "";
    msgContainer.classList.add('hide');
}


boxes.forEach(

    (box)=>{
        box.addEventListener("click",()=>{
           if (gameOver || box.textContent !== "") return;
            box.textContent= turnO ? "O":"X";
            turnO=!turnO;
            box.disabled=true;
            count++;

            let isWinner= checkWinner();
            if (count === 9 && !isWinner) {
             gameDraw();
    }
        })
    }
)

const gameDraw = () => {
msg.innerText = "Game was a Draw.";
msgContainer.classList.remove('hide');
disableBoxes();
};


const checkWinner = () => {
  for(let pattern of winPatterns){
    let [a, b, c] = pattern;
    let val1 = boxes[a].textContent;
    let val2 = boxes[b].textContent;
    let val3 = boxes[c].textContent;

    if(val1 !== "" && val1 === val2 && val2 === val3){
      showWinner(val1);
      return true;
    }
  }
  return false;
}

const showWinner=(winner)=>{
    msg.innerText=`Congrats, winner : ${winner}  `;
    msgContainer.classList.remove('hide');
     gameOver = true;
    disableBoxes();

}
const disableBoxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};


function enableBoxes() {
boxes.forEach(box => {
    box.disabled = false;
    box.textContent = "";
});
}

resetBtn.addEventListener("click",resetGame)
newGameBtn.addEventListener("click", resetGame);