import { desenharProdutoNoCarrinhoSimples, lerLocalStorage, apagarDoLocalStorage, salvarLocalStorage, listaProducts } from "./utilidades";

function desenharProdutosCheckout(){
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};
    for(const idProduto in idsProdutoCarrinhoComQuantidade){
        desenharProdutoNoCarrinhoSimples(idProduto, "container-Produtos-Checkout", idsProdutoCarrinhoComQuantidade[idProduto]);
    }
}

function atualizarPrecoCompra() {
    const precoCompra = document.getElementById("total-compra");
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};
    let precoTotalCompra = 0;
    for (const idProduct in idsProdutoCarrinhoComQuantidade) {
      precoTotalCompra += listaProducts.find((p) => p.id === idProduct).preco * idsProdutoCarrinhoComQuantidade[idProduct];
    }
    precoCompra.innerText = `Total: R$${precoTotalCompra}`;
   }

function finalizarCompra(evento){
    evento.preventDefault();
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};
    if(Object.keys(idsProdutoCarrinhoComQuantidade).length === 0){
        return;
    }
    const dataAtual = new Date();
    const pedidoFeito = {
        dataPedido: dataAtual,
        pedido: idsProdutoCarrinhoComQuantidade
    }
    const historicoDePedidos = lerLocalStorage('historico') ?? [];
    const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];

    salvarLocalStorage('historico', historicoDePedidosAtualizado)
    apagarDoLocalStorage('carrinho');
    window.location.href = './pedidos.html';
}

desenharProdutosCheckout();
atualizarPrecoCompra();

document.addEventListener('submit', (evt) => finalizarCompra(evt))