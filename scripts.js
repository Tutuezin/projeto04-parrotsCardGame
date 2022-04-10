/* PERGUNTA A QUANTIDADE DE CARTAS */
const qntCartas = Number(
  prompt("Com quantas cartas queres jogar? (Inserir n° pares de 4 a 14!)")
);
/* COLOCA A LI DENTRO DA UL */
const todasAsCartas = document.querySelector(".allCards");

let carta1;
let carta2;
let contadorJogadas = 0;

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
  cartaNVirada.setAttribute("onclick", `virarCarta(this)`);
  cartaNVirada.setAttribute("carta", arrayEmbaralhado[i]);

  /* CRIADOR DE IMG */
  let imagem = document.createElement("img");
  imagem.setAttribute("src", "assets/front.png");
  cartaNVirada.appendChild(imagem);

  todasAsCartas.appendChild(cartaNVirada);
}

/* FUNCAO DE VIRAR CARTA */
function virarCarta(vira) {
  let clica = vira.firstChild;

  clica.setAttribute("src", vira.getAttribute("carta"));
  checarDupla(vira);
}

/* EMBARALHADOR */
function embaralharCartas(qntCartas) {
  const listaCartas = [
    "assets/bobrossparrot.gif",
    "assets/explodyparrot.gif",
    "assets/fiestaparrot.gif",
    "assets/metalparrot.gif",
    "assets/revertitparrot.gif",
    "assets/tripletsparrot.gif",
    "assets/unicornparrot.gif",
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

function checarDupla(cartaClicada) {
  contadorJogadas++;
  if (!carta1) {
    carta1 = cartaClicada;
  } else {
    carta2 = cartaClicada;
  }
  if (carta2) {
    const carta1png = carta1.getAttribute("carta");
    const carta2png = carta2.getAttribute("carta");
    if (carta1png === carta2png) {
      carta1.setAttribute("onclick", "");
      carta2.setAttribute("onclick", "");
      carta1.style.cursor = "auto";
      carta2.style.cursor = "auto";

      if (checarFim()) {
        alert(`Você ganhou em ${contadorJogadas} jogadas!`);
      }
    } else {
      const carta1img = carta1.firstChild;
      const carta2img = carta2.firstChild;
      setTimeout(function () {
        carta1img.setAttribute("src", "assets/front.png");
        carta2img.setAttribute("src", "assets/front.png");
      }, 1000);
    }
    carta1 = undefined;
    carta2 = undefined;
  }
}

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
