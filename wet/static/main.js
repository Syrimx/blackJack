karten = ["{{url_for('static', filename='queen_of_clubs.png')}}", "{{url_for('static', filename='8_of_spades.png')}}", 
			"{{url_for('static', filename='queen_of_spades.png')}}", "{{url_for('static', filename='king_of_diamonds.png')}}", 
			"{{url_for('static', filename='ten_of_clubs.png')}}", "{{url_for('static', filename='2_of_clubs.png')}}", 
			"{{url_for('static', filename='8_of_diamonds.png')}}", "{{url_for('static', filename='jack_of_hearts.png')}}", 
			"{{url_for('static', filename='9_of_diamonds.png')}}", "{{url_for('static', filename='6_of_hearts.png')}}", 
			"{{url_for('static', filename='ace_of_hearts.png')}}", "{{url_for('static', filename='8_of_hearts.png')}}", 
			"{{url_for('static', filename='king_of_clubs.png')}}", "{{url_for('static', filename='4_of_hearts.png')}}", 
			"{{url_for('static', filename='4_of_diamonds.png')}}", "{{url_for('static', filename='3_of_hearts.png')}}", 
			"{{url_for('static', filename='7_of_diamonds.png')}}", "{{url_for('static', filename='ten_of_diamonds.png')}}", 
			"{{url_for('static', filename='9_of_spades.png')}}", "{{url_for('static', filename='5_of_clubs.png')}}", 
			"{{url_for('static', filename='ace_of_spades.png')}}", "{{url_for('static', filename='3_of_spades.png')}}", 
			"{{url_for('static', filename='5_of_diamonds.png')}}", "{{url_for('static', filename='7_of_spades.png')}}", 
			"{{url_for('static', filename='4_of_spades.png')}}","{{url_for('static', filename='6_of_spades.png')}}",
			"{{url_for('static', filename='queen_of_hearts.png')}}", "{{url_for('static', filename='8_of_clubs.png')}}", 
			"{{url_for('static', filename='king_of_hearts.png')}}","{{url_for('static', filename='queen_of_diamonds.png')}}",
			"{{url_for('static', filename='jack_of_diamonds.png')}","{{url_for('static', filename='5_of_hearts.png')}}",
			"{{url_for('static', filename='3_of_diamonds.png')}}","{{url_for('static', filename='ten_of_spades.png')}}",
			"{{url_for('static', filename='4_of_clubs.png')}}", "{{url_for('static', filename='9_of_hearts.png')}}", 
			"{{url_for('static', filename='ace_of_clubs.png')}}", "{{url_for('static', filename='2_of_hearts.png')}}", 
			"{{url_for('static', filename='6_of_diamonds.png')}}", "{{url_for('static', filename='3_of_clubs.png')}}", 
			"{{url_for('static', filename='7_of_hearts.png')}", "{{url_for('static', filename='2_of_diamonds.png')}}", 
			"{{url_for('static', filename='2_of_spades.png')}}", "{{url_for('static', filename='jack_of_clubs.png')}}", 
			"{{url_for('static', filename='7_of_clubs.png')}}", "{{url_for('static', filename='ten_of_hearts.png')}}",
			"{{url_for('static', filename='king_of_spades.png')}}","{{url_for('static', filename='jack_of_spades.png')}}",
			"{{url_for('static', filename='6_of_clubs.png')}}", "{{url_for('static', filename='ace_of_diamonds.png')}}",
			"{{url_for('static', filename='9_of_clubs.png')}}", "{{url_for('static', filename='5_of_spades.png')}}"]


//wertigkeiten durch reguläre aussdrücke ? 
let runde = 1;
let eigeneKarten = [];
let eigeneWerte = []
let bankKarten = [];
let bankWerte = [];

//reguläre aussdrücke
//auf ziffern checken
let checkZahlen = /\d/;
let checkAss = /ace/;

const report 			= document.querySelector('.report');
const kartenSumme 		= document.querySelector('.kartenSumme');
const bankFeld			= document.querySelector('.bankKarten');
const eigenesFeld 		= document.querySelector('.eigeneKarten');
const ziehButton 		= document.querySelector('.ziehen');
const aufdeckenButton	= document.querySelector('.aufdecken')
const neuLaden			= document.querySelector('.neuladen')

/*------------------------------*/

//spielvorbereitungen
//Karten mischen
function shuffle() {
	for (let i = karten.length -1 ; i > 0; i--) {
		let j = Math.floor(Math.random() * (i+1));
		[karten[i], karten[j]] = [karten[j], karten[i]];
	}
}

//karten austeilen
function vorbereitung() {
	//eigenes Feld vorbereiten
	let karte = document.createElement('img');
	let k = karten[karten.length - runde];
	karte.src = k;
	eigenesFeld.appendChild(karte);
	//kartenwerte werden in jeweiliges array eingetragen 
	if (checkZahlen.test(k) == true) eigeneWerte.push(parseInt(checkZahlen.exec(k)));
	else {
		if (checkAss.test(k) == true) eigeneWerte.push(11);
		else eigeneWerte.push(10);
	}

	eigenesFeld.src = k;
	runde += 1;


	//bank feld erstellen
	let elementInvisible = document.createElement('img');
	let k2 = karten[karten.length - runde];
	elementInvisible.src = k2;
	elementInvisible.setAttribute('style', 'display:none');
	bankFeld.appendChild(elementInvisible);

	if (checkZahlen.test(k2) == true) bankWerte.push(parseInt(checkZahlen.exec(k2)));
	
	else {
		if (checkAss.test(k2) == true) bankWerte.push(11);
		else bankWerte.push(10);
	}

	runde += 1;

	//karten rücken positionieren
	let kartenRücken = document.createElement('img');
	kartenRücken.src = "media/cardBack.png"
	kartenRücken.setAttribute('display', 'display:block')
	bankFeld.appendChild(kartenRücken);

}

/*-----------------------------------------*/

//Spiellogik
//bank zieh Funktion
function ziehBank() {
	//vorausetzung defnieren 
		//zb kartensumme liegt nicht über 15
		// summe beziehen , zahlen beziehen 

	//karte wird gezogen 
	let k = karten[karten.length - runde]
	bankKarten.push = k;
	//gezogene Karte auf Zahl geprüft
		//wenn eine Zahl vorhanden ist wird gefundener Wert gepusht
		//wenn keine zahl vorhanden wird, wird nach 'ace' gesucht
			//und eine 11 gepusht
		//wenn kein ass gefunden wird, wird eine 10 gepusht
	if (checkZahlen.test(k) === true) bankWerte.push(parseInt(checkZahlen.exec(k)));

	else {
		if (checkAss.test(k) === true) bankWerte.push(11);
		else bankWerte.push(10);
	}

	//Karten Frontseite positionieren
	let elementInvisible = document.createElement('img');
	elementInvisible.src = k;
	elementInvisible.setAttribute('style', 'display:none');
	bankFeld.appendChild(elementInvisible);

	//Karten Rückseite positionieren
	let element = document.createElement('img');
	element.src = 'media/cardBack.png';
	element.setAttribute('style', 'display:block');
	bankFeld.appendChild(element);

	runde += 1
}


//spieler zieh funktion
function ziehSelbst() {

	k = karten[karten.length - runde]
	eigeneKarten.push = k;
		
	//werte ermittlung
	//werte werden gespeichert
	if (checkZahlen.test(k) === true) eigeneWerte.push(parseInt(checkZahlen.exec(k)));

	else {
		if (checkAss.test(k) === true) eigeneWerte.push(11);
		else eigeneWerte.push(10);
	}

	//Karte Positionieren
	let element = document.createElement('img');
	element.src = karten[karten.length - runde];
	eigenesFeld.appendChild(element);


	runde += 1;

	let result = 0;
	//check ob 21 nicht erreicht wird
	//wert wird angezeigt
	//wenn wert erreicht wird, hast man verloren
	for (let i = 0; i <= eigeneWerte.length; i++) {
		result += eigeneWerte[i];

		kartenSumme.innerText = `Wert ${result}`;

		if (result >= 21) {
			let element = document.createElement('p');
			element.innerText = `du hast verloren, da dein Wert ${result} ist`;
			report.appendChild(element);
		}

	}

	ziehBank();

}

/*--------------------------*/
function aufdecken() {
	//bank Karten aufdecken
	bankKartenChildren = bankFeld.childNodes;

	bankKartenChildren.forEach((element) =>  {
		if (element.nodeName != "#text") {
			if (element.style.display === 'none') element.style.display = 'block';
			else element.style.display = 'none';
		}
	});

	let resultBank = 0;
	let resultPlayer = 0;
	//checken, wer gewonnen hat
	//bankWerte || eigeneWerte

	for (let i = 0; i < bankWerte.length; i++) {
		resultBank = resultBank + bankWerte[i];
		console.log(bankWerte[i]);
	}

	//console.log(parseInt(resultBank));

	for (let i = 0; i <= eigeneWerte.length; i++) {
		resultPlayer += eigeneWerte[i];
	}

	//Sieger ausdrucken
	if (resultBank > resultPlayer && resultBank < 21 && resultPlayer < 21) kartenSumme.innerText = `Die Bank gewinnt!\nBank: ${resultBank} Sie: ${resultPlayer}`;
	else if (resultBank < resultPlayer && resultBank < 21 && resultPlayer < 21) kartenSumme.innerText = `Sie gewinnen!\nBank: ${resultBank} Sie: ${resultPlayer}`;
	else if (resultBank === resultPlayer && resultBank < 21 && resultPlayer < 21) kartenSumme.innerText = `Unentschieden!\nBank: ${resultBank} Sie: ${resultPlayer}`;

}

/*--------------------------*/
//BLACK JACK 
/*---------*/
//programm logic
//vorbereitung
shuffle();
vorbereitung();

//logic
//zieh button wird zugeordnet
ziehButton.addEventListener('click', () => {
	ziehSelbst();
})

//neuladen button
neuLaden.addEventListener('click', () => {
	location.reload();
})

//spielende
//aufdecken button
aufdeckenButton.addEventListener('click', () => {
	aufdecken();
})

/*-------------------------*/

