//Namespace de l'application 

var MONSTER = {
	modules : {}
};


//var ui = MONSTER.modules.ui;
MONSTER.modules.ui = (function(){

	function _log(message) {
		var box = document.getElementById("actionbox");

		var paragraphe = document.createElement('p');

		var text = document.createTextNode(message);

		paragraphe.appendChild(text);
		box.insertBefore(paragraphe,box.firstChild);

	}

	function _displayStatus(name,life,money,awake){
		var status = document.getElementById("status");
		if (awake==true){
			etat = "Éveillé";
		}else{
			etat = "Dort";
		}
		while(status.firstChild){
			status.removeChild(status.firstChild);
		};

		var li1 = document.createElement("li");
		var li2 = document.createElement("li");
		var li3 = document.createElement("li");
		var li4 = document.createElement("li");
		
		status.appendChild(li1);
		let chaine = document.createTextNode("Name : "+name+" ");
		li1.appendChild(chaine);

		status.appendChild(li2);
		let chaine2 = document.createTextNode("Life : "+life+" ");
		li2.appendChild(chaine2);

		status.appendChild(li3);
		let chaine3 = document.createTextNode("Argent : "+money+" ");
		li3.appendChild(chaine3);


		status.appendChild(li4);
		let chaine4 = document.createTextNode("Etat : "+etat+"");
		li4.appendChild(chaine4);


		if(life <= 20){
			monster.style.background = "green";
		}if(life < 15){
			monster.style.background = "blue";
		}if(life < 10 ){
			monster.style.background = "orange";
		}if(life < 5){
			monster.style.background = "red";
		}

	};
	return {

		log : _log,
		displayStatus : _displayStatus
	}

}) ();


//Premier module : le module dédié aux actions 

MONSTER.modules.actions = (function(){
	var ui = MONSTER.modules.ui;
	var name, life, money, awake,alive, lifeMax, etat, kill, newlife;



	var _showme = function(){
		alert('Nom : '+name+"\n"
			+'point de vie: '+life+"\n"+
			'monnaie: '+money+"\n"+
			'etat: '+awake);

	}

	var _alive = function(){
		if(alive == true){
			etat = "En vie";
		}else{
			etat = "Mort";
		}
	}

	var _init = function(nom,vie,argent,eveil){
		name = nom;
		life = vie;
		lifeMax = vie;
		money = argent;
		awake = eveil;
		ui.displayStatus(name,life,money,awake);		
	};

	var _run = function(){
		if (awake) {
			if(life > 0) {
				life -= 1;
				ui.log("Le monstre perd 1 point de vie");
				ui.displayStatus(name,life,money,awake);
			}
		}
		else if(life === 0){
			ui.log("Le monstre est mort");
			awake = false;
			ui.displayStatus(name,life,money,awake);
		}
	};

	var _fight = function(){
		if(awake){
			if(life - 3 >= 0) {
				life -= 3;
				ui.log("Le monstre perd 3 points de vie");
				ui.displayStatus(name,life,money,awake);
			}
			else if(life - 3 <= 0){
				life = 0;
				awake = false;
				ui.log("Le monstre est mort");
				ui.displayStatus(name,life,money,awake);
			}
		}else{
			ui.log("Je suis en plein REVE DE COMBAT");
		}
	};
	var _work = function(){
		if (awake) {
			if(life > 0) {
				life -= 1;
				money +=2;
				ui.log("-1 point de vie / +2 d'argent");
				ui.displayStatus(name,life,money,awake);
			}
			else if(life <= 0){
				life = 0;
				awake = false;
				ui.log("Le monstre est mort");
				ui.displayStatus(name,life,money,awake);
			}
		}else{
			ui.log("Le monstre ne peut pas travailler, il est mort");
		}
	};
	var _eat = function(){
		if(awake){
			if(life > 0 && life < 20 && money > 3){
				life += 2;
				money -= 3;
				ui.log("MIAM MIAM je mange ! +2 vie /-3 d'argent");
				ui.displayStatus(name,life,money,awake);
			}
			else if(money >=0 && money <=3){
				money = 0;
				ui.log("Le monstre est ruiné, pas d'argent !!");
				ui.displayStatus(name,life,money,awake);
			}
		}else{
			ui.log("Le monstre dort donc ne mange pas");
			ui.displayStatus(name,life,money,awake);
		}
	};
	var _sleep = function(){
		if(awake){
			if(life <= lifeMax-3){
				if (life > 0) {
					life +=3;
					awake = false;
					setTimeout(function(){
						awake = true;
						life+=1;
						ui.log("zzzzz ..... HEIN QUOI Je suis reveillé !");
					},3000);
					ui.log("Il fait dodo");
					ui.displayStatus(name,life,money,awake);
				}
			}
			else if(life + 1 >= lifeMax){ 	
				life = lifeMax;
				ui.log("Je suis reposé pas besoin de DODO");
				ui.displayStatus(name,life,money,awake);
			}else if(life == 0 && lifeMax == 0){
				awake = false;
				ul.log("Le monstre est mort");
				ui.displayStatus(name,life,money,awake);
			}
		}else{
			ui.log("Fait deja dodo");
			ui.displayStatus(name,life,money,awake);
		}
	};

	var _kill = function(){
		if(awake && life >=0){
			life = 0;
			awake = false;
			alive = false;
			_interdiction();
			ui.log("Le monstre est mort fatalement");
			ui.displayStatus(name,life,money,alive);
		}
	};

	var _interdiction = function(){


		let bRun = document.getElementById("b2");
		bRun.style.background = "red";
		bRun.disabled = true;

		let bFight = document.getElementById("b3");
		bFight.style.background = "red";
		bFight.disabled = true;

		let bEat = document.getElementById("b5");
		bEat.style.background = "red";
		bEat.disabled = true;

		let bWork = document.getElementById("b7");
		bWork.style.background = "red";
		bWork.disabled = true;

		let bSleep = document.getElementById("b4");
		bSleep.style.background = "red";
		bSleep.disabled = true;

	};

	var _autorisation = function(){


		let bRun = document.getElementById("b2");
		bRun.style.background = "deepskyblue";
		bRun.disabled = false;

		let bFight = document.getElementById("b3");
		bFight.style.background = "deepskyblue";
		bFight.disabled = false;

		let bEat = document.getElementById("b5");
		bEat.style.background = "deepskyblue";
		bEat.disabled = false;

		let bWork = document.getElementById("b7");
		bWork.style.background = "deepskyblue";
		bWork.disabled = false;


		let bSleep = document.getElementById("b4");
		bSleep.style.background = "deepskyblue";
		bSleep.disabled = false;

	}; 



	var _newLife = function(){
		if(!awake && life === 0){
			life = lifeMax;
			awake = true;
			alive = true;
			_autorisation();
			ui.log("Je revis c'est incroyable !");
			ui.displayStatus(name,life,money,alive);
		}
	};

	
	setInterval(function(){
		if (life > 0) {
			life-=1;
			let actionsTab=[];
			actionsTab.push(_run);
			actionsTab.push(_fight);
			actionsTab.push(_work);
			actionsTab.push(_sleep);
			actionsTab.push(_eat);
			let randomize = Math.round(Math.random()*4);
			actionsTab[randomize]();
		console.log(name,life,money,awake);
		ui.displayStatus(name,life,money,awake);
	}
	},2000);


	//API publique du module action
	return {
		show : _showme,
		init : _init,
		run : _run,
		sleep : _sleep,
		fight : _fight,
		work : _work,
		eat : _eat,
		kill : _kill,
		newLife : _newLife,

	} 
}) ();

MONSTER.modules.app = (function(){
	var bRun = document.getElementById('b2');
	var bFight = document.getElementById('b3');
	var bSleep = document.getElementById('b4');
	var bEat = document.getElementById('b5');
	var bShow = document.getElementById("b6");
	var bWork = document.getElementById('b7');
	var bNewLife = document.getElementById('b1');
	var bKill = document.getElementById('k');
	let actions = MONSTER.modules.actions;
	let ui = MONSTER.modules.ui;


	var _start = function(){
		actions.init("Baltazar",20,20,true);
		bShow.onclick = actions.show;
		bRun.onclick = actions.run;
		bFight.onclick = actions.fight;
		bSleep.onclick = actions.sleep;
		bEat.onclick = actions.eat;
		bWork.onclick = actions.work;
		bEat.onclick = actions.eat;
		bWork.onclick = actions.work;
		bNewLife.onclick = actions.newLife;
		bKill.onclick = actions.kill;
	};


	//API publique du module action 

	return {
		start : _start
	}
}) ();




window.onload = MONSTER.modules.app.start;
