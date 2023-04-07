//chaallenge one
function ageindays(){
    let age=prompt("what  is your age?");
    let ageindayss= 365*age;
    h1 = document.createElement("h1");
    answer= document.createTextNode('You are '+ageindayss+' days old');
    h1.setAttribute('id','agess');
    h1.appendChild(answer);
    document.getElementById("flex_result").appendChild(h1);
}
function reset(){
    document.getElementById("agess").remove();
}
//challenge 2
function catgen(){
    let image=document.createElement('img');
    let div=document.getElementById("flex_cat_gen");
    image.src="rpsimages/my image.jpg";
    div.appendChild(image);
}
//challenge 3
function rpsGame(yourchoice){
    let humanchoice,botchoice;
    humanchoice=yourchoice.id;
    botchoice=randombotchoice(randombotnumber());
    console.log('computer choice:'+botchoice);

    console.log(humanchoice,botchoice);

     result=decidewinner(humanchoice,botchoice);

    message=finalmessage(result);

    console.log(result,message);
    frntend(humanchoice,botchoice,message);
}
function randombotnumber(){
    return Math.floor(Math.random()*3) ; 
}
function randombotchoice(number){
    return["rock","paper","scissors"][number];
}
function decidewinner(yourchoice,computerchoice){
    var rpsdatabase={
        'rock':{'rock':0.5,'paper':0,'scissors':1},
        'paper':{'rock':1,'paper':0.5,'scissors':0},
        'scissors':{'rock':0,'paper':1,'scissors':0.5},
    }
    var yourscore=rpsdatabase[yourchoice][computerchoice];;
    var computerscore=rpsdatabase[computerchoice][yourchoice]
    return[yourscore,computerscore];
}
function finalmessage([yourscore,computerscore]){
    if(yourscore===0){
        return{'message':'You lost','color':'red'};
    }
     else if(yourscore===0.5){
        return{'message':'You tied','color':'yellow'};
    }
    else{
        return{'message':'You won','color':'green'};
    }
}
function frntend(humanimagechoice,botimagechoice,finalmessage){
    var imagedisplay={
    'rock':document.getElementById('rock').src,
    'paper':document.getElementById("paper").src,
    'scissors':document.getElementById('scissors').src,
    }
    //romving image 
    document.getElementById("rock").remove();
    document.getElementById("paper").remove();
    document.getElementById("scissors").remove();
    var humandiv=document.createElement('div');
    var botdiv=document.createElement('div');
    var messagediv=document.createElement('div');
    humandiv.innerHTML="<img src='"+imagedisplay[humanimagechoice]+"'>";
    document.getElementById('flex_box_container3').appendChild(humandiv);
    messagediv.innerHTML="<h2 style='color:"+finalmessage['color']+"'>"+finalmessage['message']+"</h2>";
    document.getElementById('flex_box_container3').appendChild(messagediv);
    botdiv.innerHTML="<img src='"+imagedisplay[botimagechoice]+"' style>";
    document.getElementById('flex_box_container3').appendChild(botdiv); 
}
//challenge 4
var all_button=document.getElementsByTagName('button');
var copybutton=[];
for(let i=0;i<all_button.length;i++){
    copybutton.push(all_button[i].classList[1]);
}
let random=Math.floor(Math.random()*4);
function buttoncolorchange(optionchoice){
    if(optionchoice.value==='red'){
        redbuttonscolor();
    }  
    else if(optionchoice.value==='green'){
        greenbuttonscolor();
    }
    else if(optionchoice.value==='reset'){
        resetbuttonscolor();
    }
    else if(optionchoice.value==='random'){
        randombuttonscolor();
    }
}
function redbuttonscolor(){
    for(let i=0;i<all_button.length;i++){
        all_button[i].classList.remove(all_button[i].classList[1]);
        all_button[i].classList.add('btn-danger');
    }
}
function greenbuttonscolor(){
    for(let i=0;i<all_button.length;i++){
        all_button[i].classList.remove(all_button[i].classList[1]);
        all_button[i].classList.add('btn-success');
    }
}
function resetbuttonscolor(){
    for(let i=0;i<all_button.length;i++){
        all_button[i].classList.remove(all_button[i].classList[1]);
        all_button[i].classList.add(copybutton[i]);
    }
}
function randombuttonscolor(){
    for(let i=0;i<all_button.length;i++){
        all_button[i].classList.remove(all_button[i].classList[1]);
        all_button[i].classList.add(copybutton[Math.floor(Math.random()*4)]);
    }
}
//challenge 5:Blackjack Game
let BlackjackGame={
    'you':{'scorespan':'#yourscore','div':'#yourdiv','score':0},
    'dealer':{'scorespan':'#dealerscore','div':'#dealersdiv','score':0},
    'cards':['2.png','3.png','4.png','5.png','6.png','7.png','8.png','9.png','10.png','J.png','Q.png','K.png','A.png'],
    'cardmap':{'2.png':2,'3.png':3,'4.png':4,'5.png':5,'6.png':6,'7.png':7,'8.png':8,'9.png':9,'10.png':10,'J.png':10,'Q.png':10,'K.png':10,'A.png':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnsOver':false,
}
const you=BlackjackGame['you'];
const dealer=BlackjackGame['dealer'];
document.querySelector('#blackjack_hit').addEventListener('click',blackjackhit);
document.querySelector('#blackjack_deal').addEventListener('click',blackjackdeal);
document.querySelector('#blackjack_deal').addEventListener('click',blackjackdealerbox);
document.querySelector('#blackjack_stand').addEventListener('click',dealerlogic);
//main function
function blackjackhit(){
    if(BlackjackGame['isStand']===false){
        let card=randomcard();
        showcard(you,card);
        updatescore(you,card);
        showscore(you);
        console.log(you['score']);
    }
}
function sleep(ms){
    return new Promise(resolve=> setTimeout(resolve, ms));
}

 async function dealerlogic(){
    while(dealer['score']<16 && BlackjackGame['isStand']=== true){
        let card=randomcard();
        showcard(dealer,card);
        updatescore(dealer,card);
        showscore(dealer);
        await sleep(1000)
    }

    if(dealer['score']>15){
        let winner=computewinner();
        showresult(winner);
        BlackjackGame['turnsOver']=true;
    }
    BlackjackGame['isStand']=true;
}

function showcard(activeplayer,card){
    if(activeplayer['score']<=21){
    let cardimge=document.createElement('img');
    cardimge.src=`blackjack_image/${card}`;
    document.querySelector(activeplayer['div']).appendChild(cardimge);
    } 

}
function blackjackdeal(){
    if(BlackjackGame['turnsOver']===true){
        let yourimage=document.querySelector('#yourdiv').querySelectorAll('img');
        for(i=0;i<yourimage.length;i++){
            yourimage[i].remove();
        }  
        you['score']=0;
        dealer['score']=0;
        document.querySelector('#yourscore').textContent=0;
        document.querySelector('#yourscore').style.color='white';
        document.querySelector('#dealerscore').textContent=0
        document.querySelector('#dealerscore').style.color='white';
        document.querySelector('#resultspan').textContent="Let's play";
        document.querySelector('#resultspan').style.color='black';
        BlackjackGame['isStand']=false;
    }
}
function blackjackdealerbox(){
    if(BlackjackGame['turnsOver']===true){
        let dealersimage=document.querySelector('#dealersdiv').querySelectorAll('img');
        for(i=0;i<dealersimage.length;i++){
        dealersimage[i].remove();
        }  
    }    
}

function randomcard(){
    let randomindex=Math.floor(Math.random()*13);
    return BlackjackGame['cards'][randomindex];
}
function updatescore(activeplayer,card){
    if(card==='A.png'){
        if(activeplayer['score']+BlackjackGame['cardmap'][card][1]<=21){
           return activeplayer['score']+=BlackjackGame['cardmap'][card][1];
        }
        else{
           return activeplayer['score']+=BlackjackGame['cardmap'][card][0];
        }
    }
    else{
       return activeplayer['score'] += BlackjackGame['cardmap'][card];
    }
}
function showscore(activeplayer){
    if(activeplayer['score']>21){
        document.querySelector(activeplayer['scorespan']).textContent='Bust!';
        document.querySelector(activeplayer['scorespan']).style.color='red';
    }
    else{
    document.querySelector(activeplayer['scorespan']).textContent= activeplayer['score'];
    }
}   
function computewinner(){
    let winner;
    if(you['score']<=21){
        if(you['score'] > dealer['score'] || dealer['score'] > 21){
            BlackjackGame['wins']++;
            winner=you;
        }
        else if(you['score'] < dealer['score']){
            BlackjackGame['losses']++;
            winner=dealer;
        }
        
        else if(you['score'] ===  dealer['score']){
            BlackjackGame['draws']++;
        }    
    }
    else  if(you['score'] > 21 && dealer['score'] <= 21){
        console.log('You lost');
        BlackjackGame['losses']++;
        winner=dealer;
    }
    else if(you['score'] > 21 && dealer['score'] > 21){
        console.log('You drew');
        BlackjackGame['draws']++;

    }
    console.log(BlackjackGame)
    console.log(winner);
    return winner;
}
function showresult(winner){
    let message,messagecolor;
    if(winner===you) {
        document.querySelector('#winsbox').textContent=BlackjackGame['wins'];
        message='Your won!';
        messagecolor='green';
    }  
    else if( winner===dealer){
        document.querySelector('#lossesbox').textContent=BlackjackGame['losses'];
        message ='You lost!';
        messagecolor='red';
    }
    else{
        document.querySelector('#drawsbox').textContent=BlackjackGame['draws'];
        message='You drew!';
        messagecolor='brown';
    }
    document.querySelector('#resultspan').textContent= message;
    document.querySelector('#resultspan').style.color= messagecolor;
}