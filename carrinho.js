import { listaProducts, salvarLocalStorage, lerLocalStorage } from "./utilidades";

const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};

function fecharCarrinho() {
    document.getElementById("carrinhoo").classList.remove("right-0");
    document.getElementById("carrinhoo").classList.add("right-[-360px]");
 };

 function abrirCarrinho() {
    document.getElementById("carrinhoo").classList.remove("right-[-360px]");
    document.getElementById("carrinhoo").classList.add("right-0");
    atualizarPrecoCarrinho()
 };

 function irParaCheckout(){
  if(Object.keys(idsProdutoCarrinhoComQuantidade).length === 0){
    return;
  }
  window.location.href = './checkout.html';
 }

 export function inicializarCarrinho() {

    const open = document.getElementById("abrircarrinho");
    const close = document.getElementById("fecharcarrinho");
    const botaofinish = document.getElementById('finalizar-compra');

    botaofinish.addEventListener('click',irParaCheckout);
    open.addEventListener('click', abrirCarrinho);
    close.addEventListener('click', fecharCarrinho);
 };

export function renderizarProdutosCarrinho(){
  const containerProdutosCarrinho = document.getElementById("produtos-carrinho");
  containerProdutosCarrinho.innerHTML = '';
  
  for (const idProduto in idsProdutoCarrinhoComQuantidade){
    desenharProdutoNoCarrinho(idProduto)
  }
}

function removerDoCarrinho(idProduto){
  delete idsProdutoCarrinhoComQuantidade[idProduto];
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  renderizarProdutosCarrinho();

}

 function incrementarProduto(idProduto){
   idsProdutoCarrinhoComQuantidade[idProduto]++;
   salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
   atualizarPrecoCarrinho();
   atualizarProduto(idProduto);
 }

 function decrementarProduto(idProduto){
    if(idsProdutoCarrinhoComQuantidade[idProduto] === 1){
      removerDoCarrinho(idProduto);
      return
    }
   idsProdutoCarrinhoComQuantidade[idProduto]--;
   salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
   atualizarPrecoCarrinho();
   atualizarProduto(idProduto);
 }

 function atualizarProduto(idProduto){
   document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutoCarrinhoComQuantidade[idProduto]
 }

 export function atualizarPrecoCarrinho() {
  const precoCarrinho = document.getElementById("total");
  let precoTotalCarrinho = 0;
  for (const idProduct in idsProdutoCarrinhoComQuantidade) {
    precoTotalCarrinho += listaProducts.find((p) => p.id === idProduct).preco * idsProdutoCarrinhoComQuantidade[idProduct];
  }
  precoCarrinho.innerText = `Total: R$${precoTotalCarrinho}`;
 }

 function desenharProdutoNoCarrinho(idProduto){
  const produto = listaProducts.find((p) => p.id === idProduto);
   const containerProdutosCarrinho = document.getElementById("produtos-carrinho");

   const elementoArticle = document.createElement("article");
   const articleClasses = ['bg-slate-100', 'rounded-lg', 'flex', 'p-1', 'relative', 'my-2'];

   for(const articleClasse of articleClasses){
    elementoArticle.classList.add(articleClasse)
   }

   const cartaoProdutoCarrinho = `
   <button id="excluir-produto-${produto.id}" class="absolute top-0 right-1" id="fecharproduto"><i class="fa-solid fa-circle-xmark text-slate-500 hover:text-slate-800"></i></button>
   <img src="./imagens/${produto.imagem}" alt="${produto.nome}" class="h-24 rounded-lg">
   <div class="p-2 flex flex-col justify-between"> 
     <p class="text-slate-900 text-sm">${produto.nome}</p>
     <p class="text-slate-400 text-xs">Tamanho: M</p>
     <p class="text-green-700 text-lg">R$${produto.preco}</p>
   </div>
   <div class="flex items-end text-slate-950 absolute bottom-0 right-6 gap-2 text-lg">   
      <button id="menos-${produto.id}">-</button>
      <p id="quantidade-${produto.id}">${idsProdutoCarrinhoComQuantidade[produto.id]}</p>
      <button id="mais-${produto.id}">+</button>
   </div> `;
   atualizarPrecoCarrinho();
  elementoArticle.innerHTML += cartaoProdutoCarrinho
 containerProdutosCarrinho.appendChild(elementoArticle)

 document.getElementById(`menos-${produto.id}`).addEventListener("click", () => decrementarProduto(produto.id));
 document.getElementById(`mais-${produto.id}`).addEventListener("click", () => incrementarProduto(produto.id));
 document.getElementById(`excluir-produto-${produto.id}`).addEventListener("click", () => removerDoCarrinho(produto.id));
 
 }
 
 export function adicionarAoCarrinho(idProduto) {
   if(idProduto in idsProdutoCarrinhoComQuantidade){
      incrementarProduto(idProduto);
      return;
   }
   idsProdutoCarrinhoComQuantidade[idProduto] =1;
   salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
   desenharProdutoNoCarrinho(idProduto);
   atualizarPrecoCarrinho();
 }

