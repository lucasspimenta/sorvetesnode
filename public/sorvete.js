const modalCadastro = new bootstrap.Modal(document.getElementById('modalcadastro'));

function alterar(id) {
    fetch("http://127.0.0.1:3333/sorvete/" + id)
    .then(response => response.json())
    .then(dados => {
        document.getElementById('id').value = dados.id;
        document.getElementById('sabor').value = dados.sabor;
        document.getElementById('preco').value = dados.preco;
        document.getElementById('tipo').value = dados.tipo;
        document.getElementById('disponivel').value = dados.disponivel;
        document.getElementById('descricao').value = dados.descricao;
        modalCadastro.show();
    });
}

function excluir(id) {
    fetch("http://127.0.0.1:3333/sorvete/" + id, {
        method: "DELETE",
    }).then(() => listar());
}

function salvar() {
    let id = document.getElementById('id').value;
    let sabor = document.getElementById('sabor').value;
    let preco = document.getElementById('preco').value;
    let tipo = document.getElementById('tipo').value;
    let disponivel = document.getElementById('disponivel').value === "true";
    let descricao = document.getElementById('descricao').value;

    let sorvete = { sabor, preco, tipo, disponivel, descricao };

    const url = id 
        ? "http://127.0.0.1:3333/sorvete/" + id
        : "http://127.0.0.1:3333/sorvete";

    const metodo = id ? "PUT" : "POST";

    fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sorvete)
    }).then(() => {
        listar();
        modalCadastro.hide();
    });
}

function novo() {
    document.getElementById('id').value = '';
    document.getElementById('sabor').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('tipo').value = '';
    document.getElementById('disponivel').value = 'true';
    document.getElementById('descricao').value = '';
    modalCadastro.show();
}

function listar() {
    const lista = document.getElementById('lista');
    lista.innerHTML = " ";

    fetch('http://127.0.0.1:3333/sorvete')
     .then(response => response.json())
     .then(dados => mostrar(dados));
}

function mostrar(dados){
    const lista = document.getElementById('lista');
    lista.innerHTML = "";
    for (let s in dados) {
        lista.innerHTML += "<tr>"
            + "<td>" + dados[s].id + "</td>"
            + "<td>" + dados[s].sabor + "</td>"
            + "<td>R$ " + parseFloat(dados[s].preco).toFixed(2) + "</td>"
            + "<td>" + dados[s].tipo + "</td>"
            + "<td>" + (dados[s].disponivel ? 'Sim' : 'Não') + "</td>"
            + "<td>" + dados[s].descricao + "</td>"
            + "<td>"
            + "<button class='btn btn-primary' onclick='alterar(" + dados[s].id + ")'>Editar</button> "
            + "<button class='btn btn-danger' onclick='excluir(" + dados[s].id + ")'>Excluir</button>"
            + "</td></tr>";
    }
}

