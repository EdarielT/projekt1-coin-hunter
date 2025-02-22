// toto budeš potřebovat později
/*
if (!( panacekX + panacekSirka < minceX || minceX + minceSirka < panacekX || panacekY + panacekVyska < minceY || minceY + minceVyska < panacekY)) {
	// panacek a mince se prekryvaji
}
*/


// sem začni psát svůj program

let player, playerWidth, playerHeight, playerX, playerY;
let coin, coinWidth, coinHeight, coinX, coinY;
let music, coinSound, winSound;
let points;

let pageLoading = () => {
	player = document.getElementById('panacek');
	coin = document.getElementById('mince');
	points = 0;
	
	//getting width and heights of the elements
	playerWidth = player.naturalWidth;
	playerHeight = player.naturalHeight;
	coinWidth = coin.naturalWidth;
	coinHeight = coin.naturalHeight;

	//player's initial position
	playerY = 0.5*window.innerHeight - 0.5*playerHeight;
	playerX = 0.5*window.innerWidth - 0.5*playerWidth;
	playersPosition();
	
	//coin's initial position
	coinsPosition();
}

//pleyer's position
let playersPosition = () => {
	player.style.top = playerY + 'px';
	player.style.left = playerX + 'px';
}

//coin's random position
let coinsPosition = () => {
	coinY = Math.floor(Math.random()*window.innerHeight);
	coinX = Math.floor(Math.random()*window.innerWidth);
	//making sure coin doesn't appear outside the viewport
	let windowBorderHeight = window.innerHeight-coinHeight;
	let windowBorderWidth = window.innerWidth-coinWidth;
	if (coinY <= windowBorderHeight && coinX <= windowBorderWidth) {
		coin.style.top = coinY + 'px';
		coin.style.left = coinX + 'px';
	} else {
		if (coinY > windowBorderHeight && coinX <= windowBorderWidth) {
			coin.style.top = coinY-coinHeight + 'px';
			coin.style.left = coinX + 'px';
		} else if (coinY <= windowBorderHeight && coinX > windowBorderWidth) {
			coin.style.top = coinY + 'px';
			coin.style.left = coinX-coinWidth + 'px';
		} else {
			coin.style.top = coinY-coinHeight + 'px';
			coin.style.left = coinX-coinWidth + 'px';
		}
	}
}

//players movements, arrow keys and WASD are allowed, the rest is ignored

function moving(event) {
	//music starts with the first movement
	music = document.getElementById('hudba');
	music.play();
	//saving playerX and playerY values from previous step for non-allowed range case, see if-else statement
	let historyPlayerX = playerX;
	let historyPlayerY = playerY;
	switch (event.key) {
		case 'ArrowUp':
		case 'w':
			player.src='obrazky/panacek-nahoru.png';
			playerY -= 5;	
			break;
		case 'ArrowDown':
		case 's':
			player.src='obrazky/panacek.png';	
			playerY += 5;
			break;
		case 'ArrowLeft':
		case 'a':
			player.src='obrazky/panacek-vlevo.png';	
			playerX -= 5;
			break;
		case 'ArrowRight':
		case 'd':
			player.src='obrazky/panacek-vpravo.png';
			playerX += 5;
			break;
		default:
			//do nothing				
	}

	//making sure the player doesn't go outside the window
	if (!(playerX <= 0 || playerX >= window.innerWidth-playerWidth ||
		playerY <= 0 || playerY >= window.innerHeight-playerHeight)) {
			playersPosition();
		} else {
			//stopping the movement and preventing of increasing of playerX and playerY values at non-allowed range
			playerX -= (playerX - historyPlayerX);
			playerY -= (playerY - historyPlayerY);
		}

		//checking if player got the coin
	catchTheCoin();
}

//catching the coin = > coin changes its position, points go up
let catchTheCoin = () => {
	coinSound = document.getElementById('zvukmince');

 	if (!(playerX + playerWidth < coinX || 
		coinX + coinWidth < playerX || 
		playerY + playerHeight < coinY || 
		coinY + coinHeight < playerY)) {

		points ++;
		document.getElementById('score').innerHTML = points;
		coinSound.play();
		//checking if won, getting the coin on the new position
		winning();
		coinsPosition();
	 }
 }

 //winning after catching 5 coins
 let winning = () => {
	 if (points === 5) {
		 //winning sound plays
		winSound = document.getElementById('zvukfanfara');
		winSound.play();
		//winning allert
		alert('You won!');
		//game starts over
		points = 0;
		document.getElementById('score').innerHTML = points;
	 }
 }
