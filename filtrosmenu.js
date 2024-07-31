const catalogoProdutos = document.getElementById('produtos');

function exibirTodos(){
    const produtosEscondidos = Array.from(catalogoProdutos.getElementsByClassName('hidden'))

    for(const produto of produtosEscondidos){
        produto.classList.remove("hidden");
    }
}

function esconderMasculinos(){
     exibirTodos();
     const produtosMasculinos = Array.from(catalogoProdutos.getElementsByClassName("masculino"));

     for(const produto of produtosMasculinos){
        produto.classList.add("hidden");
     }
}

function esconderFemininos(){
    exibirTodos();
    const produtosFemininos = Array.from(catalogoProdutos.getElementsByClassName("feminino"));

    for(const product of produtosFemininos){
       product.classList.add("hidden");
    }
}

export function inicializarFiltros(){
    document.getElementById("exibir-femininos").addEventListener("click",esconderMasculinos);

    document.getElementById("exibir-masculinos").addEventListener("click",esconderFemininos);

    document.getElementById("exibir-todos").addEventListener("click",exibirTodos);
}