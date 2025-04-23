let saldo = 0;
let gastos = [];

function atualizarTela() {
  document.getElementById("saldo").innerText = saldo.toFixed(2);
  const lista = document.getElementById("gastos");
  lista.innerHTML = '';
  gastos.forEach(g => {
    lista.innerHTML += `<div class='entry'>R$ ${g.valor.toFixed(2)} - ${g.descricao}</div>`;
  });
}

function salvarNoFirebase() {
  db.ref("financeiro").set({
    saldo,
    gastos
  });
}

function carregarDoFirebase() {
  db.ref("financeiro").on("value", snapshot => {
    const data = snapshot.val();
    if (data) {
      saldo = data.saldo || 0;
      gastos = data.gastos || [];
      atualizarTela();
    }
  });
}

function adicionarEntrada() {
  const valor = parseFloat(document.getElementById("entrada").value);
  if (!isNaN(valor)) {
    saldo += valor;
    document.getElementById("entrada").value = '';
    salvarNoFirebase();
    atualizarTela();
  }
}

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

function fechamentoMes() {
  if (saldo < 500) {
    alert("Não há saldo suficiente para reservar R$500.");
    return;
  }
  const distribuivel = saldo - 500;
  const porPessoa = (distribuivel / 3).toFixed(2);
  saldo = 500;
  salvarNoFirebase();
  atualizarTela();
  document.getElementById("distribuicao").innerText = `R$${porPessoa} para cada pessoa.`;
}

carregarDoFirebase();
