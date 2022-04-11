/* PERGUNTA A QUANTIDADE DE CARTAS */
let qntCartas = Number(
  prompt("Com quantas cartas queres jogar? (Inserir n° pares de 4 a 14!)")
);
/* COLOCA A LI DENTRO DA UL */
const todasAsCartas = document.querySelector(".allCards");
const porta = document.querySelector("#porta");
porta.play();
/* CONTADOR DE JOGADAS */
let carta1;
let carta2;
let contadorJogadas = 0;
let cooldown;

/* VERIFICAO */
while (
  Number.isNaN(qntCartas) ||
  !Number.isInteger(qntCartas) ||
  qntCartas % 2 === 1 ||
  qntCartas < 4 ||
  qntCartas > 14
) {
  alert("mt burro filho kkk");
  qntCartas = Number(
    prompt("Com quantas cartas queres jogar? (Inserir n° pares de 4 a 14!)")
  );
}

const arrayEmbaralhado = embaralharCartas(qntCartas);

/* INCREMENTA OS LI'S */
for (i = 0; i < qntCartas; i++) {
  /* CRIADOR DE LI COM ONCLICK */
  let cartaNVirada = document.createElement("li");
  cartaNVirada.classList.add("cartaDesvirada");
  cartaNVirada.setAttribute("onclick", `virarCarta(this)`);
  cartaNVirada.setAttribute("carta", arrayEmbaralhado[i]);

  /* CRIADOR DE IMG */
  let imagem = document.createElement("img");
  imagem.setAttribute("src", "assets/edchad.jpeg");
  cartaNVirada.appendChild(imagem);

  todasAsCartas.appendChild(cartaNVirada);
}

/* FUNCAO DE VIRAR CARTA */
function virarCarta(vira) {
  if (cooldown) {
    return;
  }

  if (vira.getAttribute("carta") === "assets/edtaliba.png" && !carta1) {
    const alahu = document.querySelector("#alahuCurto");
    alahu.play();
  }
  let clica = vira.firstChild;
  contadorJogadas++;
  vira.classList.toggle("viraCarta");
  vira.classList.toggle("cartaDesvirada");

  clica.setAttribute("src", vira.getAttribute("carta"));
  checarDupla(vira);
}

/* EMBARALHADOR */
function embaralharCartas(qntCartas) {
  const listaCartas = [
    "assets/edtaliba.png",
    "assets/edcowboy.jpeg",
    "assets/edestilo.png",
    "assets/edfamilia.jpg",
    "assets/edotaku.jpg",
    "assets/edrico.png",
    "assets/edsonecas.jpg",
  ];

  const listaEmbaralhada = [];

  for (i = 0; i < qntCartas / 2; i++) {
    listaEmbaralhada.push(listaCartas[i]);
    listaEmbaralhada.push(listaCartas[i]);
  }

  function comparador() {
    return Math.random() - 0.5;
  }
  listaEmbaralhada.sort(comparador);
  return listaEmbaralhada;
}

/* CHECAR CARTAS IGUAIS */
function checarDupla(cartaClicada) {
  if (!carta1) {
    carta1 = cartaClicada;
  } else {
    carta2 = cartaClicada;
  }
  if (carta2) {
    const carta1png = carta1.getAttribute("carta");
    const carta2png = carta2.getAttribute("carta");
    cooldown = true;
    if (carta1png === carta2png) {
      if (carta1png === "assets/edtaliba.png") {
        const alahu = document.querySelector("#alahuLongo");
        alahu.play();
      }
      carta1.setAttribute("onclick", "");
      carta2.setAttribute("onclick", "");
      cooldown = false;

      if (checarFim()) {
        setTimeout(() => {
          alert(`Você ganhou em ${contadorJogadas} jogadas!`);
        }, 1000);
      }
    } else {
      const cartaUm = carta1;
      const cartaDois = carta2;
      const carta1img = cartaUm.firstChild;
      const carta2img = cartaDois.firstChild;
      setTimeout(() => {
        carta1img.setAttribute("src", "assets/edchad.jpeg");
        carta2img.setAttribute("src", "assets/edchad.jpeg");
        cartaUm.classList.toggle("viraCarta");
        cartaDois.classList.toggle("viraCarta");
        cartaUm.classList.toggle("cartaDesvirada");
        cartaDois.classList.toggle("cartaDesvirada");
        cooldown = false;
      }, 1000);
    }
    // RESETA AS CARTAS
    carta1 = undefined;
    carta2 = undefined;
  }
}

function mudarClasse(carta1, carta2) {
  const carta1img = carta1.firstChild;
  const carta2img = carta2.firstChild;
  carta1img.setAttribute("src", "assets/front.png");
  carta2img.setAttribute("src", "assets/front.png");
  carta1png.classList.toggle("viraCarta");
  carta2png.classList.toggle("viraCarta");
  carta1png.classList.toggle("cartaDesvirada");
  carta2png.classList.toggle("cartaDesvirada");
}

/* CHEGAR SE O JOGO TERMINOU */
function checarFim() {
  const arrayLi = document.querySelectorAll("li");
  for (li of arrayLi) {
    const click = li.getAttribute("onclick");
    if (click) {
      return false;
    }
  }
  return true;
}
