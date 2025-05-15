// Seleciona os elementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

const expenseList = document.querySelector("ul");
const expenseQuantity = document.querySelector("aside header p span")

// Captura o evento de input no campo de valor
amount.oninput = function () {
  let value = amount.value.replace(/\D/g, "");

  value = Number(value) / 100;

  amount.value = formatCurrencyBRL(value);
};

// Formata o valor da despesa para o formato do Brasil
function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return value;
}

// Captura o evento de submit do formulário para obter os valores
form.onsubmit = (event) => {
  event.preventDefault();

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };
  expenseAdd(newExpense); // Chama a função que adiciona a despesa na lista
};

// Adiciona a despesa na lista
function expenseAdd(newExpense) {
  try {
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);
    expenseIcon.setAttribute("title", newExpense.category_name);

    const expenseInfo = document.createElement("div"); //adiciopma uma div com a class de info
    expenseInfo.classList.add("expense-info");
    const expenseName = document.createElement("strong"); //adiciona um strong com o nome da despesa
    expenseName.textContent = newExpense.expense;
    const expenseCategory = document.createElement("span"); //adiciona um span com a categoria da despesa
    expenseCategory.textContent = newExpense.category_name;
    const expenseAmount = document.createElement("span"); //adiciona um span com o valor da despesa
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.replace(
      "R$",
      ""
    )}`;
    const removeIcom = document.createElement("img");
    removeIcom.classList.add("remove-icon");
    removeIcom.setAttribute("alt", "remover");
    removeIcom.setAttribute("src", "img/remove.svg");

    expenseItem.append(expenseIcon); // Adiciona as informações da despesa
    expenseList.append(expenseItem); // Adiciona a despesa na lista
    expenseItem.append(expenseInfo); // Adiciona a div de informações da despesa
    expenseInfo.append(expenseName, expenseCategory); // Adiciona o nome da despesa e a categoria
    expenseItem.append(expenseAmount, removeIcom); // Adiciona o valor da despesa e o botão de remover

    //Atualiza os totais
    updateTotals();
  } catch (error) {
    alert("Erro ao adicionar despesa");
    console.log(error);
  }
}

// Adiciona o evento de clique no botão de remover
expenseList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-icon")) {
    const expenseItem = event.target.closest(".expense");
    expenseItem.remove();
    updateTotals(); // Atualiza os totais
  }
});

// Atualiza a quantidade de despesas e o valor total
function updateTotals() {
  try {
    const qtde_items = expenseList.children.length; // Pega a quantidade de filhos da lista
    expenseQuantity.textContent = `${qtde_items} ${qtde_items > 1 ? "despesas" : "despesa"}`; // Atualiza o valor da quantidade de despesas
  } catch (error) {
    alert("Erro ao atualizar totais");
    console.log(error);
  }
}
