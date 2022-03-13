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

	//player's position
	playerX = 0.5*window.innerHeight - 0.5*playerHeight;
	playerY = 0.5*window.innerWidth - 0.5*playerWidth;
	player.style.top = playerX + 'px';
	player.style.left = playerY + 'px';
	

	//coin's position
	//random position
	coinX = Math.floor(Math.random()*window.innerHeight+0.5*coinHeight);
	coinY = Math.floor(Math.random()*window.innerWidth+0.5*coinWidth);
	//making sure coin doesn't appear outside the viewport
	let windowBorderHeight = window.innerHeight-0.5*coinHeight;
	let windowBorderWidth = window.innerWidth-0.5*coinWidth;
	if (coinX <= windowBorderHeight && coinY <= windowBorderWidth) {
		coin.style.top = coinX + 'px';
		coin.style.left = coinY + 'px';
	} else {
		if (coinX > windowBorderHeight && coinY <= windowBorderWidth) {
			coin.style.top = coinX-coinHeight + 'px';
			coin.style.left = coinY + 'px';
		} else if (coinX <= windowBorderHeight && coinY > windowBorderWidth) {
			coin.style.top = coinX + 'px';
			coin.style.left = coinY-coinWidth + 'px';
		} else {
			coin.style.top = coinX-coinHeight + 'px';
			coin.style.left = coinY-coinWidth + 'px';
		}
	}
}
