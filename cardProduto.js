import { listaProducts } from "./utilidades";
import { adicionarAoCarrinho } from "./carrinho";

export function renderizarlista() {
    for (const produto of listaProducts) {
        const adapthtml = `<div id="product" class="border-solid shadow-xl shadow-slate-400 rounded-lg w-[190px]   bg-gray-100 m-1.5 flex flex-col p-2 justify-between group ${produto.feminino ? 'feminino' : 'masculino'}">
        <img class="group-hover:scale-110 duration-300 my-3 rounded-lg" src="./imagens/${produto.imagem}" 
        alt="Produto-${produto.id}" id="produtor${produto.id}">
        <p class="text-sm">${produto.loja}</p>
        <p class="text-sm">${produto.nome}</p>
        <p class="text-sm" >R$${produto.preco}</p>
        <button id="addcart-${produto.id}" class="bg-slate-950 hover:bg-slate-700"><i class="fa-solid fa-cart-plus text-slate-50"></i></button>
        </div>`
        document.getElementById("produtos").innerHTML += adapthtml;
    }
    for (const produto of listaProducts) {
        document.getElementById(`addcart-${produto.id}`).addEventListener("click", () => adicionarAoCarrinho(produto.id));
    }
}                 