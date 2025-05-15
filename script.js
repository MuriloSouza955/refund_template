// Seleciona os elementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

const expenseList = document.querySelector("ul");

amount.oninput = function () {
  let value = amount.value.replace(/\D/g, "");

  value = Number(value) / 100;

  amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return value;
}

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
    const expenseRenmove = document.createElement("img");
    expenseRenmove.setAttribute("src", "img/remove.svg");
    expenseRenmove.setAttribute("alt", "remover");
    expenseRenmove.classList.add("remove-icon");

    expenseItem.append(expenseIcon); // Adiciona as informações da despesa
    expenseList.append(expenseItem); // Adiciona a despesa na lista
    expenseItem.append(expenseInfo); // Adiciona a div de informações da despesa
    expenseInfo.append(expenseName, expenseCategory); // Adiciona o nome da despesa e a categoria
    expenseItem.append(expenseAmount, expenseRenmove); // Adiciona o valor da despesa e o botão de remover
  } catch (error) {
    alert("Erro ao adicionar despesa");
    console.log(error);
  }
}
