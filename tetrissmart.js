var contr =0;
var score =0;
var paus = 0; 
var hazard = 1;
var comte = 0;
var cns = document.getElementById("cns");
var ctx = cns.getContext("2d");
var matrice1 = new Array();
var vitesse = 2;
matrice1.length = 11;
for(var a = 0 ; a<11 ; a++){
	matrice1[a]= new Array();
	matrice1[a].length = 23;
}

var matrice = new Array();
matrice.length = 14;
for(var a =0; a<14 ; a++){
	matrice[a]= new Array();
	matrice[a].length = 23;
}
for(var colonne = 0; colonne < 14 ; colonne++){
	for(var ligne = 0; ligne < 23 ; ligne ++){
		matrice[colonne][ligne] = 0
	}
}
for(var colonne = 0 ; colonne < 690 ; colonne = colonne + 30){

	for(var ligne = 0 ; ligne < 330 ;ligne = ligne + 30){
		ctx.strokeStyle = '#000000';
		ctx.moveTo(0,colonne-1);
		ctx.lineTo(330,colonne-1);
		ctx.lineWidth= 1;
		ctx.stroke();
			
		ctx.strokeStyle = '#000000';
		ctx.moveTo(ligne-1,0);
		ctx.lineWidth='1';
		ctx.lineTo(ligne-1,690);
		ctx.stroke();
	}	
}

function zero(){
	score = 0;
	for(var ligne=0; ligne<=22;ligne++){
		for(var colonne=0 ; colonne<=10; colonne++){
			matrice[colonne][ligne] = 0;
		
		}
	}
}
function pause(){
	game.style.display = "none";
	pausev.style.display= "block";
	if(paus == 0){
		paus = 1;
	}
	else{
		paus =0;
	}
	var selectimg = document.getElementById("selectimage");
	setInterval(client,1000);
	/*function client(){
		var x = event.clientX;
		var y = event.clientY;
		if(50<x && 500<x){
			if(y>50 && y<55){
				selectimg.style.top = 50px;
			}
			if(y>60 && y<65){	
				selectimg.style.top = 60px;
			}
			if(y>70 && y<75){
				selectimg.style.top = 70px;
			}
		}
	}*/
	
}
function analyse(){
	document.getElementById("scor").innerHTML = "score: "+score;
	var color = "#000000";
	switch (hazard){
	case 1:
		color = "#FF0000";
	break;
	case 2:
		color = "#00FF00";
	break;
	case 3:
		color = "#0000FF";
	break;
	case 4:
		color = "#FFFF00";
	break;
	case 5:
		color = "#FF00FF"
	break;
	case 6:
		color = "#FFFF00";
	break;
	default:
		color = "#0000FF";
	break;
	}
	for(var abscisse = 0; abscisse <11 ; abscisse++ ){
		for(var ordonnee =0 ; ordonnee <23 ; ordonnee++){
			if (matrice[abscisse][ordonnee] === 1){
				ctx.fillStyle = color
				ctx.fillRect(abscisse*30,ordonnee*30,28,28)
			}
			if(matrice[abscisse][ordonnee] === 2){
				ctx.fillStyle = "#353535"
				ctx.fillRect(abscisse*30,ordonnee*30,28,28)
				if(ordonnee ==0){
					alert("game over");
					zero();
				}
			}
			if(matrice[abscisse][ordonnee] === 0){
			ctx.fillStyle = "#999999";
			ctx.clearRect(abscisse*30,ordonnee*30,28,28)
			}
		}
	}
}
function pop(){		game.style.display = "block";
	menu.style.display ="none";
	for (var ligne = 0; ligne<=22;ligne++){
		var somme = 0;
		var somme1 = 0
		for(var colonne = 0; colonne<=10;colonne++){
			somme = somme + matrice[colonne][ligne];
			if(ligne>=1){somme1 = somme1 + matrice[colonne][ligne-1]};
			if(somme == 22 && somme1 == 22){
				somme =0 ;
				var li = ligne;
				for(var c=0;c<=10;c++){
					matrice[c][li]=0;
					matrice[c][li-1]=0;
				}
				for(var l=li-2;l>=0;l--){
					for(var c =0;c<=10;c++){
					matrice[c][l]=matrice[c][l-2];
					}
					
				}
			}
			if(somme == 22){
				var li = ligne;
				for(var c=0;c<=10;c++){
					matrice[c][li]=0;
				}
				for(var l=li-1;l>=0;l--){
					for(var c =0;c<=10;c++){
					matrice[c][l+1]=matrice[c][l];
					}
					
				}
			}
		}
	}
	var lance = 1;
	hazard = Math.round(Math.random()*6)+1
	if(pause ==1){hazard =9;};
	switch (hazard){
		case 1:
			for(var a = 5;a<=8;a++){
				matrice[a][0] =1;
			}
		break;
		case 2:
			matrice[6][0] = 1;
			matrice[7][0] = 1;
			matrice[7][1] = 1;
			matrice[6][1] = 1;
		break;
		case 3:
			for(var a = 6;a<=8;a++){
				matrice[a][0] = 1;
			}
			matrice[8][1] = 1;
		break;
		case 4:
			matrice[6][0] = 1;
			matrice[7][0] = 1;
			matrice[7][1] = 1;
			matrice[8][1] = 1;
		break;
		case 5:
			for(var a = 6;a<=8;a++){
				matrice[a][0] = 1;
			}
			matrice[7][1] = 1;
		break;
		case 6:
			matrice[6][1] = 1;
			matrice[7][1] = 1;
			matrice[7][0] = 1;
			matrice[8][0] = 1;
		break;

		case 7:
		for(var a = 6;a<=8;a++){
				matrice[a][0] = 1;
			}
		matrice[6][1] = 1;
		break;
		default:
		matrice[0][0]=0;
	}
	
}
function chute(){

if(comte >= vitesse && paus ==0){
	var somme = 0
	for(var colonne = 0; colonne < 11 ; colonne++){
		for(var ligne = 0; ligne < 23 ; ligne ++){
			matrice1[colonne][ligne] = matrice[colonne][ligne];
			if(matrice[colonne][ligne] ==1 && matrice[colonne][ligne+1] !== 1 && ligne !== 22){
				somme = somme + matrice[colonne][ligne+1];
			}
			if(matrice[colonne][ligne] == 1 && ligne == 22){
				somme = 20;
			}
		}
	}
	for( var colonne = 0; colonne <= 10 ; colonne++){
		for(var ligne = 0; ligne <= 22; ligne++){
			if((matrice[colonne][ligne] == 1) && somme ===0){
				matrice1[colonne][ligne] = 0;
				matrice1[colonne][ligne+1] = 1;
				
				if( ligne !== 0 && matrice[colonne][ligne-1] == 1){
					matrice1[colonne][ligne] = 1;
				}
			}
			if(somme != 0 && matrice[colonne][ligne] == 1){
				matrice1[colonne][ligne] = 2;
			}
		}
	}
	for(var ligne = 0 ;ligne<=22 ;ligne++){
		for(var colonne = 0; colonne <= 10 ;colonne++){
			matrice[colonne][ligne] = matrice1[colonne][ligne];
		}
	}
	if(somme != 0){
		for(var colonne =0;colonne<=10;colonne++){
			if(matrice[colonne][1]==1){
				alert("game over");
				zero();
			}
		}
	pop();
	}
	comte = 0;
}

else if(paus == 0){
	comte++;
}
}

function get_contr(event){
	var value=event.key;
	contr=3;
	if (value=="ArrowRight"){
		contr=1;
	}
	if (value=="ArrowLeft"){
		contr=2;
	}
	if (value=="ArrowDown"){
		contr=4;
	}
	if (value=="t"){
		contr=3;
	}
	
	
}
var a=0;
function controls(){

	if (a=0){
		/*contr=0;*/
		a=1
	}
	else{
		a=0
	}
	for(var colonne = 0; colonne < 11 ; colonne++){
		for(var ligne = 0; ligne < 23 ; ligne ++){
			matrice1[colonne][ligne] = matrice[colonne][ligne];
		}
	}
	if(contr == 4){
		vitesse = 1;
		score ++;
	}else{
		vitesse = 5;   
	}
	if(contr == 1 || contr == 2){
	if(contr == 1){
		var decale =1;
	}
	if(contr == 2){
		var decale = -1;
	}
	var somme = 0;
	for(var colonne = 0; colonne < 11 ; colonne++){
		for(var ligne = 0; ligne < 23 ; ligne ++){
			if(matrice[colonne][ligne] == 1){
				if(0<=colonne+decale && colonne+decale<11 && matrice[colonne+decale][ligne] == 2 || colonne+decale == 11 || colonne+decale == -1){
					somme = 1;
				}
			}
		}
	}
	for(var ligne = 0 ;ligne<=22 ;ligne++){
		for(var colonne = 0; colonne <= 10 ;colonne++){
	
			if (matrice[colonne][ligne] == 1 && somme === 0 && colonne<22){
				matrice1[colonne][ligne] = 0;
				matrice1[colonne+decale][ligne] = 1;
					
				if( 0<= colonne-decale && colonne-decale <= 10 ){
					if(matrice[colonne-decale][ligne] ===1){
						matrice1[colonne][ligne] = 1;
					}
				}
			}
		}
	}
	}
	
	if (contr == 3){
	contr = 0;
	if(hazard == 1){
		for(var l = 0; l < 23 ; l++){
			for(var c = 0; c < 11 ; c++){
				if(matrice[c][l]==1 && c+1<=11 && l-3>=0 && l+1<=22 && matrice[c+1][l]==1){
					var somme = 0;
					for(var s = l-2;s<=l+1;s++){
						if(matrice[c][s]==2){somme = 1};	
					}
					if(somme == 0){
						for(var co = c;co<=c+3;co++){
							matrice[co][l]=0
							matrice1[co][l]=0
						}
						for(var li = l-2;li<=l+1;li++){
							matrice1[c+2][li]=1
						}
					}
				}
			}
		}
		for(var c = 0; c < 11 ; c++){
			for(var l = 0; l < 23 ; l++){
				if(matrice[c][l]==1 && c-2>=0 && l+3<=22 && c+1<=11 && matrice[c][l+1]==1){
					var somme = 0;
					for(var s = c-2;s<=c+1;s++){
						if(matrice[s][l]==2){somme = 1};	
					}
					if(somme == 0){
						for(var li = l;li<=l+3;li++){
							matrice[c][li]=0
							matrice1[c][li]=0
						}
						for(var co = c-2;co<=c+1;co++){
							matrice1[co][l]=1
						}
					}
				}
			}
		}
	}
	if(hazard ==3 || hazard == 7){
		var pass =1;
		var colonne = 0;
		var ligne =0;
		for(var li = 0;li <=22;li++){
			var somme = 0;
			for(var co = 0;co<=10;co++){
				if(matrice[co][li] ==1){somme = somme + matrice[co][li];}
				if(somme == 3){
					pass =5;
					somme=0;
					colonne = co;
					ligne =li;
				}
			}
		}
		if(pass == 5){
			if(colonne-2>=0 && ligne-2>=0 && ligne+1<=22 && colonne+1<=10){		
				for(var c = colonne-2;c<=colonne;c++){
					matrice1[c][ligne] = 0;
				}
			
				if(matrice[colonne][ligne+1]==1){
					matrice1[colonne][ligne+1] = 0;
					matrice1[colonne-1][ligne+1] = 1;
				}
				if(matrice[colonne-2][ligne+1]==1){
					matrice1[colonne-2][ligne+1] = 0;
					matrice1[colonne-1][ligne-1] = 1;
				}
				if(matrice[colonne][ligne-1]==1){
					matrice1[colonne][ligne-1] = 0;
					matrice1[colonne+1][ligne+1] = 1;
				}
				if(matrice[colonne-2][ligne-1]==1){
					matrice1[colonne-2][ligne-1] = 0;
					matrice1[colonne+1][ligne-1] = 1;
				}
				for(var l= ligne-1;l<=ligne+1;l++){
					matrice1[colonne][l] = 1;
				}
			}
		}
		else{
			for(var co = 0;co<=10;co++){
				var somme = 0;
				for(var li = 0;li <=22;li++){
					if(matrice[co][li]==1){
						somme = somme+1;
					}
					if(somme==3){
						colonne = co;
						ligne = li;
						somme=0;
					}
				}
			}
			for(var l = ligne-2;l<=ligne;l++){
				matrice1[colonne][l] = 0;
			}	
			if(matrice[colonne+1][ligne]==1){
				matrice1[colonne+1][ligne] = 0;
				matrice1[colonne-1][ligne] = 1;
			}
			if(matrice[colonne-1][ligne]==1){
				matrice1[colonne-1][ligne] = 0;
				matrice1[colonne-1][ligne-2] = 1;
			}
			if(matrice[colonne+1][ligne-2]==1){
				matrice1[colonne+1][ligne-2] = 0;
				matrice1[colonne+1][ligne] = 1;
			}
			if(matrice[colonne-1][ligne-2]==1){
				matrice1[colonne-1][ligne-2] = 0;
				matrice1[colonne+1][ligne-2] = 1;
			}
			for(var c= colonne-1;c<=colonne+1;c++){
				matrice1[c][ligne-1] = 1;
			}
		}
	}				
	
	if(hazard == 4 || hazard ==6){
		var pass = 0;
		for(var c =0; c<=10;c++){
			for(var l = 0; l<=22; l++){
				if(matrice[c][l]==1 && pass !=1){
					var ligne = l;
					var colonne = c;
					pass = 1;
				}
			}
		}
		if(matrice[colonne][ligne]==1){
			if(matrice[colonne+2][ligne+1]==1){
				matrice1[colonne+1][ligne+1]=0;
				matrice1[colonne+2][ligne+1]=0;
				matrice1[colonne][ligne+1]=1;
				matrice1[colonne+1][ligne]=1;
				matrice1[colonne+1][ligne-1]=1;
				matrice1[colonne][ligne]=1;
			}
			if(matrice[colonne+2][ligne-1]==1){
				matrice1[colonne+1][ligne-1]=0;
				matrice1[colonne+2][ligne-1]=0;
				matrice1[colonne][ligne-1]=1;
				matrice1[colonne+1][ligne]=1;
				matrice1[colonne+1][ligne+1]=1;
				matrice1[colonne][ligne]=1;
			}
			if(matrice[colonne+1][ligne+2]==1){
				matrice1[colonne][ligne+1]=0;
				matrice1[colonne+1][ligne+1]=0;
				matrice1[colonne+1][ligne+2]=0;
				matrice1[colonne+1][ligne]=1;
				matrice1[colonne+1][ligne-1]=1;
				matrice1[colonne+2][ligne-1]=1;
				matrice1[colonne][ligne]=1;
			}
			if(matrice[colonne][ligne+1]==1 && matrice[colonne+1][ligne-1]==1 ){
				matrice1[colonne][ligne+1]=0;
				matrice1[colonne+1][ligne-1]=0;
				matrice1[colonne+1][ligne+1]=1;
				matrice1[colonne+1][ligne]=1;
				matrice1[colonne+2][ligne+1]=1;
				matrice1[colonne][ligne]=1;
			}
		}
	}
	if(hazard == 5){
		var pass =0;
		for(var l =0; l<=22;l++){
			var somme = 0;
			for(var c=0; c<=10 ;c++){
				if(matrice[c][l]==1){
					somme = somme+1;
				}
				if(somme == 3){
					somme = 0;
					var colonne = c;
					var ligne = l;
					pass = 1;
				}
			}
		}
		for(var c=0; c<=10 ;c++){
			var somme = 0;
			for(var l =0; l<=22;l++){
				if(matrice[c][l]==1){
					somme = somme+1;
				}
				if(somme == 3){
					somme = 0;
					var colonne = c;
					var ligne = l;
					pass = 2;
				}
			}
		}
		if(pass == 1){
			for(var c = colonne-2;c<=colonne;c++){
				matrice1[c][ligne] = 0;
			}
			for(var l=ligne-1;l<=ligne+1;l++){
				matrice1[colonne][l]=1;
			}
			if(matrice[colonne-1][ligne-1]==1){
				matrice1[colonne-1][ligne-1] = 0;
				matrice1[colonne+1][ligne] = 1;
			}
			if(matrice[colonne-1][ligne+1]==1){
				matrice1[colonne-1][ligne+1] = 0;
				matrice1[colonne-1][ligne] = 1;
			}
		}
		if(pass == 2){
			for(var l = ligne-2;l<=ligne;l++){
				matrice1[colonne][l] = 0;
			}
			for(var c=colonne-1;c<=colonne+1;c++){
				matrice1[c][ligne]=1;
			}
			if(matrice[colonne-1][ligne-1]==1){
				matrice1[colonne-1][ligne-1] = 0;
				matrice1[colonne][ligne-1] = 1;
			}
			if(matrice[colonne+1][ligne-1]==1){
				matrice1[colonne+1][ligne-1] = 0;
				matrice1[colonne][ligne+1] = 1;
			}
		}
	}
	}
	var changement =1;
	for(var ligne = 0 ;ligne<=22 ;ligne++){
		for(var colonne = 0; colonne <= 10 ;colonne++){
			if(matrice1[colonne][ligne] ==1 && matrice[colonne][ligne] ==2){
				changement = 0;
			}
		}
	}
	if(changement == 1){
		for(var ligne = 0 ;ligne<=22 ;ligne++){
			for(var colonne = 0; colonne <= 10 ;colonne++){
				matrice[colonne][ligne] = matrice1[colonne][ligne];
			}
		}
	}
}

setInterval(controls,220);
setInterval(chute,30);
setInterval(analyse,1000/30);