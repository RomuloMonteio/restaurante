            /*script para quando eu clicar em qualquer lugar com o menu hamburger aberto ele ele fecha sozinho */
document.addEventListener("DOMContentLoaded", function () {

const menu = document.getElementById("menu");
const toggler = document.querySelector(".navbar-toggler");

document.addEventListener("click", function (e) {

const clicouNoMenu = menu.contains(e.target);
const clicouNoBotao = toggler.contains(e.target);

const aberto = menu.classList.contains("show");

if (aberto && !clicouNoMenu && !clicouNoBotao) {

const bsCollapse = bootstrap.Collapse.getInstance(menu) 
|| new bootstrap.Collapse(menu, {toggle:false});

bsCollapse.hide();

}

});

});

