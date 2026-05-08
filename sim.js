const canvas = document.getElementById("world");
const ctx = canvas.getContext("2d");

const gridSize = 5;
const cellSize = 80;
const offsetX = 60; // Slightly more compact offset
const offsetY = 60;

const actions = ["up","down","left","right"];

let agent = {x:0,y:0};
let food = {x:4,y:4};

let Q = {};

let alpha = 0.1;
let gamma = 0.9;
let epsilon = 0.2;



function getState(){
return agent.x + "," + agent.y;
}



function getQ(state,action){

if(!Q[state]){
Q[state] = {};
}

if(Q[state][action] === undefined){
Q[state][action] = 0;
}

return Q[state][action];

}



function chooseAction(state){

if(Math.random() < epsilon){
return actions[Math.floor(Math.random()*actions.length)];
}

let bestAction = actions[0];
let bestValue = getQ(state,bestAction);

for(let action of actions){

let value = getQ(state,action);

if(value > bestValue){
bestValue = value;
bestAction = action;
}

}

return bestAction;

}



function move(action){

if(action==="up" && agent.y>0){
agent.y--;
}

if(action==="down" && agent.y<gridSize-1){
agent.y++;
}

if(action==="left" && agent.x>0){
agent.x--;
}

if(action==="right" && agent.x<gridSize-1){
agent.x++;
}

}



function getReward(){

if(agent.x===food.x && agent.y===food.y){
return 10;
}

return -1;

}



function updateQ(state,action,reward,nextState){

let currentQ = getQ(state,action);

let maxNextQ = Math.max(
getQ(nextState,"up"),
getQ(nextState,"down"),
getQ(nextState,"left"),
getQ(nextState,"right")
);

Q[state][action] =
currentQ + alpha * (reward + gamma*maxNextQ - currentQ);

}

function drawGrid(){
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.strokeStyle = "#333";
ctx.lineWidth = 2;

for(let i=0;i<gridSize;i++){
for(let j=0;j<gridSize;j++){
ctx.strokeRect(offsetX + i*cellSize, offsetY + j*cellSize, cellSize, cellSize);
}
}
}

function drawObjects(){
ctx.fillStyle="blue";
ctx.fillRect(offsetX + agent.x*cellSize+20, offsetY + agent.y*cellSize+20, 40, 40);

ctx.fillStyle="green";
ctx.fillRect(offsetX + food.x*cellSize+10, offsetY + food.y*cellSize+10, 60, 60);
}

function drawAnnotations() {
    ctx.fillStyle = "#555";
    ctx.strokeStyle = "#555";
    ctx.font = "italic 20px 'Comic Sans MS', cursive, sans-serif";
    
    // Start Label
    ctx.fillText("Start here!", offsetX - 50, offsetY - 30);
    // Arrow to Start
    ctx.beginPath();
    ctx.moveTo(offsetX - 10, offsetY - 25);
    ctx.lineTo(offsetX + 10, offsetY + 10);
    ctx.stroke();

    // Goal Label
    const goalX = offsetX + (gridSize * cellSize);
    const goalY = offsetY + (gridSize * cellSize);
    ctx.fillText("The Goal!", goalX - 40, goalY + 40);
    // Arrow to Goal
    ctx.beginPath();
    ctx.moveTo(goalX - 10, goalY + 20);
    ctx.lineTo(goalX - 20, goalY - 15);
    ctx.stroke();
}

function draw(){
drawGrid();
drawObjects();
drawAnnotations();
}


function step(){

let state = getState();

let action = chooseAction(state);

move(action);

let reward = getReward();

let nextState = getState();

updateQ(state,action,reward,nextState);

if(agent.x===food.x && agent.y===food.y){

console.log("Food reached");

agent.x = 0;
agent.y = 0;

}

draw();

}



setInterval(step,200);