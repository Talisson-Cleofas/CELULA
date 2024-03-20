let perguntaAtual = 0;

let perguntas = [
	{
		titulo:
			"Em algum momento da sua vida você já se sentiu sozinho e que ninguém te via ou conhecia, mesmo estando no meio de pessoas?",
		video: "assets/video_madalena.mp4",
	},
	{
		titulo: "Já criou expectativas com algo ou alguém e se decepcionou?",
		video: "assets/video_paralitico.mp4",
	},
	{
		titulo:
			"Já se sentiu julgado ou deprezado por conta de algum erro ou decisão que tomou?",
		video: "assets/video_samaritana.mp4",
	},
];

//////////////////////////////////

let elementoPergunta = document.querySelector(".pergunta");
let tituloPergunta = elementoPergunta.querySelector(".titulo-pergunta");
let respostaPergunta = elementoPergunta.querySelector(".resposta-pergunta");

let containerVideoPosPergunta = document.querySelector(".video-pos-pergunta");
let videoPosPergunta = containerVideoPosPergunta.querySelector("video");
let origemVideoPosPergunta = videoPosPergunta.querySelector("source");

let elementoConvite = document.querySelector(".convite");

let botaoAvancar = document.querySelector(".botao-avancar");

//////////////////////////////////

function init() {
	alterarPergunta(perguntas[0]);
}

init();

//////////////////////////////////

function alterarPergunta(pergunta) {
	tituloPergunta.innerText = pergunta.titulo;
	respostaPergunta.checked = false;
	alterarOrigemVideo(pergunta.video);
}

function alterarOrigemVideo(origem) {
	origemVideoPosPergunta.setAttribute("src", origem);
	videoPosPergunta.load();
}

function isVideoSendoApresentado() {
	return !isElementoEscondido(containerVideoPosPergunta);
}

function isElementoEscondido(elemento) {
	return elemento.classList.contains("dont-display");
}

function esconderElemento(elemento) {
	return elemento.classList.add("dont-display");
}

function revelarElemento(elemento) {
	return elemento.classList.remove("dont-display");
}
function assistirVideo() {
	videoPosPergunta.play();
	videoPosPergunta.addEventListener("ended", function() {
			// Não avança automaticamente para a próxima pergunta
			// O usuário deve clicar no botão de avanço para passar para a próxima pergunta
	});
}


function avancarSlide() {
	videoPosPergunta.pause();

	if (perguntaAtual == perguntas.length - 1 && isVideoSendoApresentado()) {
			esconderElemento(elementoPergunta);
			esconderElemento(containerVideoPosPergunta);
			esconderElemento(botaoAvancar);

			return revelarConvite();
	}

	if (!isVideoSendoApresentado()) {
			esconderElemento(elementoPergunta);
			revelarElemento(containerVideoPosPergunta);
			return assistirVideo(); // Inicia o vídeo e define o evento "ended"
	}

	esconderElemento(containerVideoPosPergunta);
	revelarElemento(elementoPergunta);
	return avancarPergunta();
}

function avancarPergunta() {
	alterarPergunta(perguntas[(perguntaAtual += 1)]);
}

function revelarConvite() {
	return revelarElemento(elementoConvite);
}
