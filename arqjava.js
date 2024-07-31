import { renderizarlista } from "./cardProduto";
import { inicializarCarrinho, atualizarPrecoCarrinho, renderizarProdutosCarrinho} from "./carrinho";
import { inicializarFiltros } from "./filtrosmenu";




renderizarlista();
inicializarCarrinho();
atualizarPrecoCarrinho();
renderizarProdutosCarrinho();
inicializarFiltros();
