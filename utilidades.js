export const listaProducts = [
    {
        id: "1",
        nome: "Bermuda Preta",
        preco: 40,
        imagem: "bermuda preta.jpg",
        loja: "Adidas",
        feminino: false,
        },
        {
        id: "2",
        nome: "Cachecol",
        preco: 60,
        imagem: "cachecol.jpeg",
        loja: "Adidas",
        feminino: true,
        },
        {
        id: "3",
        nome: "Calça",
        preco: 100,
        imagem: "calça.jpeg",
        loja: "Adidas",
        feminino: true,
        },
        {
        id: "4",
        nome: "Camisa Preta",
        preco: 60,
        imagem: "Camisa preta.jpg",
        loja: "Adidas",
        feminino: false,
        },
        {
        id: "5",
        nome: "Casaco Azul",
        preco: 150,
        imagem: "casaco azul.jpg",
        loja: "Adidas",
        feminino: false,
        },
        {
        id: "6",
        nome: "Meias Adidas",
        preco: 60,
        imagem: "meias adidas.jpg",
        loja: "Adidas",
        feminino: true,
        masculino: true,
        },
        {
        id: "7",
        nome: "Tênis Preto",
        preco: 150,
        imagem: "tenis preto.jpg",
        loja: "Adidas",
        feminino: false,
        },
        {
        id: "8",
        nome: "Boné Preto",
        preco: 70,
        imagem: "bone preto.jpeg",
        loja: "Adidas",
        feminino: false,
        },
];

export function salvarLocalStorage(chave, informacao) {
    localStorage.setItem(chave, JSON.stringify(informacao));
}

export function lerLocalStorage(chave) {
    return JSON.parse(localStorage.getItem(chave));
}

export function apagarDoLocalStorage(chave){
    localStorage.removeItem(chave);
}

export function desenharProdutoNoCarrinhoSimples(idProduto, idContainerHtml, quantidadeProduto){
    const produto = listaProducts.find((p) => p.id === idProduto);
     const containerProdutosCarrinho = document.getElementById(idContainerHtml);
  
     const elementoArticle = document.createElement("article");
     const articleClasses = ['bg-stone-200', 'rounded-lg', 'flex', 'p-1', 'relative', 'mb-2'];
  
     for(const articleClasse of articleClasses){
      elementoArticle.classList.add(articleClasse)
     }
  
     const cartaoProdutoCarrinho = `
     <img src="./imagens/${produto.imagem}" alt="${produto.nome}" class="h-24 rounded-lg">
     <div class="p-2 flex flex-col justify-between"> 
       <p class="text-slate-900 text-sm">${produto.nome}</p>
       <p class="text-slate-400 text-xs">Tamanho: M</p>
       <p class="text-green-700 text-lg">R$${produto.preco}</p>
     </div>
     <div class="flex items-end text-slate-950 absolute bottom-0 right-6 gap-2 text-lg">   
        <p id="quantidade-${produto.id}">x${quantidadeProduto}</p>
     </div> `;
    elementoArticle.innerHTML += cartaoProdutoCarrinho
   containerProdutosCarrinho.appendChild(elementoArticle) 
   }