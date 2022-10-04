let gameOn = true;
let jogador = "X";
let boxJogo = ["", "", "", "", "", "", "", "", ""];
const statusDisplay = document.querySelector('.status');
const ganhador = () => `O jogador ${jogador} venceu!`;
const deuVelha = () => `Ih, deu velha. Ninguém ganhou !`;
const vezJogador = () => `É a vez do "${jogador}" jogar`;
const condicaoGanhar = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

statusDisplay.innerHTML = vezJogador();
function jogadaFeita() {

}
function trocaJogador() {

}
function jogadaValida() {

}
function verificaClick() {

}
function restartGame() {

}
/* Botão para reiniciar o jogo
*/
document.querySelectorAll('.celula').forEach(cell => cell.addEventListener('click', verificaClick));
document.querySelector('.restart').addEventListener('click', restartGame);

/* Verifica se já houve clique na célula escolhida, se não tiver sido clicada o jogo seguirá o fluxo.
*/
function verificaClick(verificaClickEvent) {

	const celulaEscolhida = verificaClickEvent.target;
	const clickCelulaIndex = parseInt(
		celulaEscolhida.getAttribute('data-cell-index')
	);
	if (boxJogo[clickCelulaIndex] !== "" || !gameOn) {
		return;
	}

	jogadaFeita(celulaEscolhida, clickCelulaIndex);
	jogadaValida();
}
/* Atualização do estado do jogo. Marcação da celula clicada para que não seja possível clicá-la novamente.
*/
function jogadaFeita(celulaEscolhida, clickCelulaIndex) {
	boxJogo[clickCelulaIndex] = jogador;
	celulaEscolhida.innerHTML = jogador;
	if (jogador == "X") {
		document.querySelectorAll('.celula')[clickCelulaIndex].style.color = "red";
	} else {
		document.querySelectorAll('.celula')[clickCelulaIndex].style.color = "black";
	}
}
/* Muda o jogador atual
*/
function trocaJogador() {
	jogador = jogador === "X" ? "O" : "X";
	statusDisplay.innerHTML = vezJogador();
}

/* Valida o resultado. Verifica se o jogo terminou em Vitória, Empate ou se ainda faltam jogadas.
*/
function jogadaValida() {
	let rodadaJogo = false;
	for (let i = 0; i <= 7; i++) {
		const condicao = condicaoGanhar[i];
		let a = boxJogo[condicao[0]];
		let b = boxJogo[condicao[1]];
		let c = boxJogo[condicao[2]];
		if (a === '' || b === '' || c === '') {
			continue;
		}
		if (a === b && b === c) {
			rodadaJogo = true;
			break
		}
	}
	if (rodadaJogo) {
		statusDisplay.innerHTML = ganhador();
		gameOn = false;
		return;
	}
	let roundDraw = !boxJogo.includes("");
	if (roundDraw) {
		statusDisplay.innerHTML = deuVelha();
		gameOn = false;
		return;
	}
	trocaJogador();
}


/* Faz com que o jogo seja reiniciado.
*/
function restartGame() {
	gameOn = true;
	jogador = "X";
	boxJogo = ["", "", "", "", "", "", "", "", ""];
	statusDisplay.innerHTML = vezJogador();
	document.querySelectorAll('.celula')
		.forEach(cell => cell.innerHTML = "");
}