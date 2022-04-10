const div = document.querySelector(".carta");
let img1;
let img2 = "Imagem 2";

div.addEventListener("click", ({ target }) => {
  const p = target.firstElementChild;
  target.classList.toggle("cartaDesvirada");
  target.classList.toggle("cartaVirada");
  console.dir(target);
  if (img1) {
    p.textContent = img1;
    img2 = "Imagem 2";
    img1 = undefined;
  } else {
    p.textContent = img2;
    img1 = "Imagem 1";
    img2 = undefined;
  }
});
