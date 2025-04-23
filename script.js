let saldo = 0;
let entradas = [];
let gastos = [];

// Atualiza os valores na interface
function atualizarTela() {
  document.getElementById("saldo").innerText = saldo.toFixed(2);

  const listaEntradas = entradas.map(e =>
    `<div class='entry'>+ R$ ${e.valor.toFixed(2)} - ${e.descricao}</div>`).join("");

  const listaGastos = gastos.map(g =>
    `<div class='entry'>- R$ ${g.valor.toFixed(2)} - ${g.descricao}</div>`).join("");

  document.getElementById("gastos").innerHTML =
    `<h3>Entradas</h3>${listaEntradas}<h3>Gastos</h3>${listaGastos}`;
}

// Salva no Firebase
function salvarNoFirebase() {
  db.ref("financeiro").set({
    saldo,
    entradas,
    gastos
  });
}

// Carrega do Firebase ao iniciar
function carregarDoFirebase() {
  db.ref("financeiro").on("value", snapshot => {
    const data = snapshot.val();
    if (data) {
      saldo = data.saldo || 0;
      entradas = data.entradas || [];
      gastos = data.gastos || [];
      atualizarTela();
    }
  });
}

// Adiciona uma nova entrada
function adicionarEntrada() {
  const valor = parseFloat(document.getElementById("entrada").value);
  const descricao = document.getElementById("entrada-descricao").value;

  if (!isNaN(valor) && descricao) {
    entradas.push({ valor, descricao });
    saldo += valor;

    document.getElementById("entrada").value = '';
    document.getElementById("entrada-descricao").value = '';

    salvarNoFirebase();
    atualizarTela();
  }
}

// Adiciona um novo gasto
function adicionarGasto() {
  const valor = parseFloat(document.getElementById("gasto").value);
  const descricao = document.getElementById("descricao").value;

  if (!isNaN(valor) && descricao) {
    gastos.push({ valor, descricao });
    saldo -= valor;

    document.getElementById("gasto").value = '';
    document.getElementById("descricao").value = '';

    salvarNoFirebase();
    atualizarTela();
  }
}

// Fecha o mês: zera históricos e mantém R$500 de caixa
function fechamentoMes() {
  if (saldo < 500) {
    alert("Não há saldo suficiente para reservar R$500.");
    return;
  }

  const distribuivel = saldo - 500;
  const porPessoa = (distribuivel / 3).toFixed(2);
  saldo = 500;

  // Limpa entradas e gastos
  entradas = [];
  gastos = [];

  salvarNoFirebase();
  atualizarTela();

  document.getElementById("distribuicao").innerText =
    `Distribuição realizada: R$${porPessoa} para cada pessoa. Saldo de caixa mantido: R$500.`;
}

// Carrega os dados ao abrir a página
carregarDoFirebase();
