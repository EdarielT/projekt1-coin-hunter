// toto budeš potřebovat později
/*
if (!( panacekX + panacekSirka < minceX || minceX + minceSirka < panacekX || panacekY + panacekVyska < minceY || minceY + minceVyska < panacekY)) {
	// panacek a mince se prekryvaji
}
*/


// sem začni psát svůj program

let player, playerWidth, playerHeight, playerX, playerY;
let coin, coinWidth, coinHeight, coinX, coinY;

let pageLoading = () => {
	player = document.getElementById('panacek');
	coin = document.getElementById('mince');
	
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
	coinY = Math.floor(Math.random()*window.innerHeight+0.5*coinHeight);
	coinX = Math.floor(Math.random()*window.innerWidth+0.5*coinWidth);
	//making sure coin doesn't appear outside the viewport
	let windowBorderHeight = window.innerHeight-0.5*coinHeight;
	let windowBorderWidth = window.innerWidth-0.5*coinWidth;
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

	playersPosition();
}

