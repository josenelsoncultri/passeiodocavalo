var casaCavalo = "";
var casaInicial = "a1";
var cavaloHtml = '<img src="cavalo.png" class="cavalo" />';
var casaJaPercorridaHtml = '<img src="casa_ja_percorrida.png" class="cavalo" />';
var casaJaPercorridaBadgeHtml = '<span class="indicador-casa indicador-casa-visitada">{0}</span>';
var casaAtualBadgeHtml = '<span class="indicador-casa indicador-casa-atual">{0}</span>';
var mapeamentoLetraCasa = { "a": 1, "b": 2, "c": 3, "d": 4, "e": 5, "f": 6, "g": 7, "h": 8 };
var casasJaPercorridas = [];

document.addEventListener("DOMContentLoaded", function(){
    iniciarPasseio();

    document.querySelectorAll(".clara, .escura").forEach(function(e) {
        e.addEventListener("click", function(){
            if (casaCavalo != "") {
                moverCavalo(casaCavalo, e.getAttribute("id"));
            } else {
                if (temCavaloNaCasa(e.getAttribute("id"))) {
                    casaCavalo = e.getAttribute("id");
                }
            }
        }, false);
    });    
});

function moverCavalo(casaAtual, novaCasa) {
    if (podeMover(casaAtual, novaCasa)) {
        var atual = document.querySelector("#" + casaAtual);
        var nova = document.querySelector("#" + novaCasa);

        atual.innerHTML = "";
        nova.innerHTML = cavaloHtml;

        casaCavalo = novaCasa;

        casasJaPercorridas.push(casaAtual);
        preencherCasasPercorridas(novaCasa);

        document.querySelector("#qtde-casas-percorridas").innerHTML = (casasJaPercorridas.length + 1).toString();
    }
}

function temCavaloNaCasa(casa) {
    var atual = document.querySelector("#" + casa);
    console.log(atual.hasChildNodes());
    return atual.hasChildNodes();
}

function podeMover(casaAtual, novaCasa) {
    var linhaNova = parseInt(novaCasa.substring(1));
    var colunaNova = parseInt(mapeamentoLetraCasa[novaCasa.substring(0, 1)]);
    var linhaAtual = parseInt(casaAtual.substring(1));
    var colunaAtual = parseInt(mapeamentoLetraCasa[casaAtual.substring(0, 1)]);

    if (
    (
        (linhaNova == (linhaAtual + 2)) && ((colunaNova == (colunaAtual + 1)) || (colunaNova == (colunaAtual - 1))) ||
        (linhaNova == (linhaAtual - 2)) && ((colunaNova == (colunaAtual + 1)) || (colunaNova == (colunaAtual - 1))) ||
        (colunaNova == (colunaAtual + 2)) && ((linhaNova == (linhaAtual + 1)) || (linhaNova == (linhaAtual - 1))) ||
        (colunaNova == (colunaAtual - 2)) && ((linhaNova == (linhaAtual + 1)) || (linhaNova == (linhaAtual - 1)))
    ) && (linhaNova >= 1 && linhaNova <= 8 && colunaNova >= 1 && colunaNova <= 8)
        && (casasJaPercorridas.indexOf(novaCasa) == -1)
    ) {
        return true;
    }

    return false;
}

function preencherCasasPercorridas(novaCasa) {
    document.querySelector("#casas-percorridas").innerHTML = "";

    casasJaPercorridas.forEach(function(e) {
        document.querySelector("#" + e).innerHTML = "";
        document.querySelector("#" + e).innerHTML = casaJaPercorridaHtml;

        document.querySelector("#casas-percorridas").innerHTML += casaJaPercorridaBadgeHtml.replace("{0}", e);
    });

    document.querySelector("#casas-percorridas").innerHTML += casaAtualBadgeHtml.replace("{0}", novaCasa);
}

function reiniciarPasseio() {
    casasJaPercorridas = [];
    
    document.querySelectorAll(".clara, .escura").forEach(function(e) {
        e.innerHTML = "";
    });

    document.querySelector("#casas-percorridas").innerHTML = "";

    iniciarPasseio();
}

function iniciarPasseio() {
    casaCavalo = casaInicial;
    document.querySelector("#" + casaInicial).innerHTML = cavaloHtml;
    document.querySelector("#casa-inicial-atual").innerHTML = casaInicial;
    document.querySelector("#qtde-casas-percorridas").innerHTML = (casasJaPercorridas.length + 1).toString();
    document.querySelector("#casas-percorridas").innerHTML = casaAtualBadgeHtml.replace("{0}", casaInicial);
}

function redefinirCasaInicial() {
    casaInicial = prompt("Digite a nova casa inicial: ");
    reiniciarPasseio();
}