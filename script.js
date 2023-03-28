//creating an array:
let KBC = new Array();

let styleElement;
let styleScore;
//initialize variables:
let quest_no = 0, time=20, score=0;
const btnArray = document.querySelectorAll(".link");
const contain = document.querySelector('.container');
const next_btn = document.querySelector('.next-btn');
const prev_btn = document.querySelector('.prev-btn');
const timer = document.querySelector('.time');
const myscore = document.querySelector('.score');
const options = document.querySelector('.options');
const inc = document.querySelector('.increase');

var q_inc = 1;

//fetch questions from API
let p = fetch("https://opentdb.com/api.php?amount=4&category=24&difficulty=easy&type=multiple");

p.then((response) => response.json())
.then ((data) => {

    //Iterate the results:
    let len = data.results.length;
    for(let i=0; i<len; i++){
        KBC.push({
            ques: data.results[i].question,
            options: [data.results[i].correct_answer, ...data.results[i].incorrect_answers],
            right_ans: data.results[i].correct_answer,
        });
    }
    // Display 1st question:
    var display__ques = display();
    Math.random(display__ques);


   
    // call event for next question:
    next_btn.addEventListener('click', () =>{
        document.querySelector(".progress-bar").style.width = `${25 * q_inc}%`;
        prev_btn.style.display = "block";
        next();
    });
    prev_btn.addEventListener('click', () =>{
        document.querySelector(".progress-bar").style.width = `${25 * q_inc-1}%`;
        if(quest_no>0)
        prev();
        if(quest_no<=0)
        prev_btn.style.display = "none";
     });
});

const array = [0,1,2,3];

function random__options(array){
    return array.sort(()=>
        Math.random()-0.5    
        );
}

//Function to display values:
function display(){
    //selecting all the required elements:
    const ques = document.querySelector('#ques');
    const option1 = document.querySelector('#option1');
    const option2 = document.querySelector('#option2');
    const option3 = document.querySelector('#option3');
    const option4 = document.querySelector('#option4');

    random__options(array);

    // putting the values in html:
    ques.innerHTML = KBC[quest_no].ques;
    option1.innerHTML = KBC[quest_no].options[array[0]];
    option2.innerHTML = KBC[quest_no].options[array[1]];
    option3.innerHTML = KBC[quest_no].options[array[2]];
    option4.innerHTML = KBC[quest_no].options[array[3]];
}



//Function to go to next question:
var isClick=false;
function next(){
    quest_no++;
    btnArray[quest_no].classList.add('active');
    q_inc++;
    inc.innerHTML = q_inc;
    isClick = false;
    display();
    time = 20;
    styleElement.style.backgroundColor = "rgba(0,0,0,0.9)";  
    styleScore.style.backgroundColor = "black"; 
}

function prev(){
    btnArray[quest_no].classList.remove('active');
    quest_no--;
    q_inc--;
    inc.innerHTML = q_inc;
    isClick = false;
    display();
    time = 20;
    styleElement.style.backgroundColor = "rgba(0,0,0,0.9)";  
    styleScore.style.backgroundColor = "black"; 
}

var selected;

options.addEventListener('click', (e) =>{
    if(!isClick){
        isClick=true;
    if(e.target.innerHTML == KBC[quest_no].right_ans){
        if(e.target.innerHTML!=selected){
            selected=e.target.innerHTML;
            e.target.style.backgroundColor = "green";
            score= score+5;
            myscore.innerHTML = "Score: "+ score;
            myscore.style.backgroundColor = "green";
        } 
    }
    else{
        e.target.style.backgroundColor = "red";
        myscore.style.backgroundColor = "red";
    }
    styleElement = e.target;
}
})

var time1 = setInterval( () =>{
    time--;
    if(quest_no == 4){
        clearInterval(time1);
        contain.innerHTML = "Thanks For giving quiz!!";
        prev_btn.style.display = "none";
        next_btn.style.display = "none";
        timer.style.display = "none";
    }   
    if(time<0){
        document.querySelector(".progress-bar").style.width = `${25 * q_inc}%`;
        prev_btn.style.display = "block";
        
        next();
        
    }
    timer.innerHTML = time;

} ,1000 )




