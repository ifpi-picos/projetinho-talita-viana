function menu() {
  while (true) {
    const opcao = prompt(`
            Escolha uma opção:
            1. Adicionar item
            2. Listar itens
            3. Editar item
            4. Remover item
            5. Marcar item como comprado
            6. Resumo da lista
            7. Sair
        `);

    switch (opcao) {
      case "1":
        adicionarItem();
        break;
      case "2":
        listarItens();
        break;
      case "3":
        editarItem();
        break;
      case "4":
        removerItem();
        break;
      case "5":
        marcarItem();
        break;
      case "6":
        resumoLista();
        break;
      case "7":
        console.log("Programa encerrado!");
        return;
      default:
        console.log("Opção inválida!");
    }
  }
}

const listaCompras = [];

function adicionarItem() {
  const nome = prompt("Digite o nome do item: ");
  const quantidade = Number(prompt("Digite a quantidade: "));
  const categoria = prompt("Digite a categoria: ");

  if (!nome || !quantidade || !categoria) {
    alert("Todos os campos são obrigatórios!");
    return;
  }

  const novoItem = {
    nome: nome,
    quantidade: quantidade,
    categoria: categoria,
    status: "não comprado" 
  };

  listaCompras.push(novoItem);
  console.log("Item adicionado com sucesso!");
}

function listarItens() {
  const opcaoOrdenacao = prompt("Ordenar por: (1) alfabética, (2) categoria, (3) quantidade");
  let listaOrdenada = listaCompras.slice(); 

  if (opcaoOrdenacao === "2") {
    listaOrdenada.sort((a, b) => a.categoria.localeCompare(b.categoria));
  } else if (opcaoOrdenacao === "3") {
    listaOrdenada.sort((a, b) => a.quantidade - b.quantidade);
  } else {
    listaOrdenada.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  const opcaoFiltro = prompt("Filtrar por: (1) todas, (2) categoria, (3) status");
  
  if (opcaoFiltro === "2") {
    const categoria = prompt("Digite a categoria: ");
    listaOrdenada = listaOrdenada.filter((item) => item.categoria.toLowerCase() === categoria.toLowerCase());
  } else if (opcaoFiltro === "3") {
    const status = prompt("Digite o status (comprado/não comprado):").toLowerCase();
    listaOrdenada = listaOrdenada.filter((item) => item.status.toLowerCase() === status);
  }

  console.log("Lista de compras:");
  listaOrdenada.forEach((item) => console.log(item));
}

function editarItem() {
  const itemEditar = prompt("Digite o item a ser editado:");
  const index = listaCompras.findIndex((item) => item.nome === itemEditar);

  if (index !== -1) {
    const novoNome = prompt("Novo nome: ");
    const novaQuantidade = prompt("Nova quantidade: ");
    const novaCategoria = prompt("Nova categoria: ");

    listaCompras[index] = {
      nome: novoNome || listaCompras[index].nome,
      quantidade: novaQuantidade || listaCompras[index].quantidade,
      categoria: novaCategoria || listaCompras[index].categoria,
      status: listaCompras[index].status 
    };

    console.log("Item editado com sucesso!");
  } else {
    console.log("Item não encontrado!");
  }
}

function removerItem() {
  const item = prompt("Digite o item a ser removido: ");
  const index = listaCompras.findIndex((i) => i.nome === item);

  if (index !== -1) {
    const confirmacao = confirm(`Tem certeza que deseja remover o item "${item}"?`);
    if (confirmacao) {
      listaCompras.splice(index, 1);
      console.log(`Item "${item}" removido com sucesso!`);
    }
  } else {
    console.log("Item não encontrado na lista.");
  }
}

function marcarItem() {
  const itemMarcar = prompt("Digite o item a ser marcado: ");
  const index = listaCompras.findIndex((item) => item.nome === itemMarcar);

  if (index !== -1) {
    listaCompras[index].status = listaCompras[index].status === "comprado" ? "não comprado" : "comprado";
    console.log(`Status do item "${itemMarcar}" alterado para "${listaCompras[index].status}" com sucesso!`);
  } else {
    console.log("Item não encontrado.");
  }
}

function resumoLista() {
  const totalItens = listaCompras.length;
  const itensPorCategoria = listaCompras.reduce((acc, item) => {
    acc[item.categoria] = (acc[item.categoria] || 0) + 1;
    return acc;
  }, {});
  const itensComprados = listaCompras.filter((item) => item.status === "comprado").length;
  const itensNaoComprados = totalItens - itensComprados;

  console.log("Resumo da lista de compras:");
  console.log(`Total de itens: ${totalItens}`);
  console.log("Itens por categoria:", itensPorCategoria);
  console.log(`Itens comprados: ${itensComprados}`);
  console.log(`Itens não comprados: ${itensNaoComprados}`);
}

menu();
