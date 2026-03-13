const darkToggle = document.querySelector(".navright-part i");

darkToggle.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    darkToggle.classList.replace("fa-moon", "fa-sun");

    localStorage.setItem("theme", "dark");
  } else {
    darkToggle.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  }

  chart.options.scales.x.grid.color = getGridColor();
  chart.options.scales.y.grid.color = getGridColor();
  chart.options.scales.x.ticks.color = getMonthsColor();
  chart.options.scales.y.ticks.color = getMonthsColor();
  chart.options.plugins.legend.labels.color = getLegendColor();
  chart.update();
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  darkToggle.classList.remove("fa-moon");
  darkToggle.classList.add("fa-sun");
}

const amountInput = document.getElementById("amount-input");
const categoryInput = document.getElementById("category-input");
const descriptionInput = document.getElementById("description-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-transaction-btn");
let transactions = [];
const savedData = localStorage.getItem("transactions");
if (savedData) {
  transactions = JSON.parse(savedData);
}

addBtn.addEventListener("click", () => {
  const amount = amountInput.value;
  const category = categoryInput.value;
  const description = descriptionInput.value;
  const date = dateInput.value;

  const transaction = {
    amount: amount,
    category: category,
    description: description,
    date: date,
  };
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  console.log(transactions);

  amountInput.value = "";
  categoryInput.value = "";
  descriptionInput.value = "";
  dateInput.value = "";
});
