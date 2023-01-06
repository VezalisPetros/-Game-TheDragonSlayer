

let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let invetory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
    {
        name:"stick",
        power:5
    },
    {
        name:"dagger",
        power:30
    },
    {
        name:"claw hammer",
        power:50
    },
    {
        name:"sword",
        power:100
    }
];

const monsters=[
    {
       name:"slime",
       level:2,
       health:15
    },
    {
        name:"fanged beast",
        level:8,
        health:60
    },
    {
        name:"dragon",
        level:20,
        health:200
    }
];



const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square you see a sign that says \"store\" "
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
},
{
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
},
{
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
},
{
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. ☠️"
},
{
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
}

];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display="none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;

}



function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
 update(locations[2]);
}

function fightDragon() {

}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  }
  else {
    text.innerText = "You dont have enough gold to buy healt."
  }
}

function buyWeapon() {
    if(currentWeapon<weapons.length-1){
        if(gold>=30){
            gold-=30;
            currentWeapon++;
            goldText.innerText=gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText="Now you have a "+newWeapon+".";
            invetory.push=(newWeapon);
            text.innerText+=" In your invetory you have "+invetory;
        }
        else{
            text.innerText="You dont have enought money to buy a weapon";
        }
    }
    else{
        text.innerText="You already have the most powerful weapon!"
        button2.innerText="Sell weapon for 15 gold";
        button2.onclick=sellWeapon;
    }

}

function sellWeapon(){
    if(invetory.length>1){
        gold+=15;
        goldText.innerText=gold;
        let currentWeapon=invetory.shift();
        text.innerText="You sold a "+currentWeapon+".";
        text.innerText+="In your inventory you have "+invetory;
    }else{
        text.innerText="Dont sell your only weapon!";
    }

}

function fightSlime() {
    fighting=0;
    goFight();
}

function fightBeast() {
    fighting=1;
    goFight();

}

function fightDragon() {
    fighting=2;
    goFight();
}

function goFight() {
    update(locations[3]);
    monsterHealth=monsters[fighting].health;
    monsterStats.style.display="block";
    monsterNameText.innerText=monsters[fighting].name;
    monsterHealthText.innerText=monsterHealth;


}

function attack() {
    text.innerText="The "+monsters[fighting].name+" attacks.";
    text.innerText+=" You attack it with your "+weapons[currentWeapon].name+".";
    health-=monsters[fighting].level;
    monsterHealth-=weapons[currentWeapon].power +Math.floor(Math.random()*xp)+1;
    healthText.innerText=health;
    monsterHealthText.innerText=monsterHealth;
    if(health<=0){
     
        lose();
    }else if(monsterHealth<=0){
        if(fighting==2){
            WinGame();
        }else{
          defeatMonster();
        }
        
    }

}

function dodge() {
    text.innerText="You doge the attack from the "+monsters[fighting].name+".";

}

function lose() {
    update(locations[5]);
}

function WinGame(){
    update(locations[6]);
}


function defeatMonster(){
    gold+=Math.floor(monsters[fighting].level*6.7);
    xp+=monsters[fighting].level;
    goldText.innerText=gold;
    xpText.innerText=xp;
    update(locations[4]);


}

function restart() {
	xp = 0;
	health = 100;
	gold = 50;
	currentWeapon = 0;
	invetory = ["stick"];
	goldText.innerText = gold;
	healthText.innerText = health;
	xpText.innerText = xp;
	goTown();
}








