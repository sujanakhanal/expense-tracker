const darkToggle = document.querySelector(".navright-part i");

const amountInput = document.getElementById("amount-input");
const categoryInput = document.getElementById("category-input");
const descriptionInput = document.getElementById("description-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-transaction-btn");

const incomeBtn = document.getElementById("income-btn");
const expenseBtn = document.getElementById("expense-btn");

const selectedCategory = document.getElementById("selected-category");
const optionsContainer = document.getElementById("category-options");
const customSelect = document.getElementById("category-select");
const cancelBtn = document.getElementById("cancel-edit-btn");
let editMode = false;
let editId = null;

const categoryIcons = {
  Salary: "💼",
  Bonus: "🎁",
  Freelance: "💻",
  Investment: "📈",
  Food: "🍔",
  Transport: "🚗",
  Shopping: "🛍️",
  Entertainment: "🎬",
  Utilities: "💡",
  HealthCare: "🏥",
  Other: "📦",
};

let selectedCategoryValue = "";

const incomeCategories = [
  "Salary",
  "Bonus",
  "Freelance",
  "Investment",
  "Other",
];
const expenseCategories = [
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Utilities",
  "HealthCare",
  "Other",
];

let transactionType = "income";

function updateButtonStyles() {
  if (transactionType === "income") {
    incomeBtn.style.background = "#31c23d";
    incomeBtn.style.color = "white";
    addBtn.style.background = "#31c23d";
    addBtn.style.color = "white";

    expenseBtn.style.background = "#d1d5db";
    expenseBtn.style.color = "black";
  } else {
    expenseBtn.style.background = "#f53f3f";
    expenseBtn.style.color = "white";
    addBtn.style.background = "#f53f3f";
    addBtn.style.color = "white";

    incomeBtn.style.background = "#d1d5db";
    incomeBtn.style.color = "black";
  }
}

function updateCategoryOptions(type) {
  optionsContainer.innerHTML = "";

  const categories = type === "income" ? incomeCategories : expenseCategories;

  categories.forEach((category) => {
    const option = document.createElement("div");
    option.classList.add("option");
    option.textContent = category;

    option.addEventListener("click", () => {
      selectedCategory.textContent = category;
      selectedCategoryValue = category;
      customSelect.classList.remove("active");
    });

    optionsContainer.appendChild(option);
  });

  selectedCategory.textContent = categories[0];
  selectedCategoryValue = categories[0];
}

selectedCategory.addEventListener("click", () => {
  customSelect.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!customSelect.contains(e.target)) {
    customSelect.classList.remove("active");
  }
});

incomeBtn.addEventListener("click", () => {
  transactionType = "income";
  localStorage.setItem("transactionType", "income");

  incomeBtn.style.background = "#31c23d";
  incomeBtn.style.color = "white";
  addBtn.style.background = "#31c23d";
  addBtn.style.color = "white";

  expenseBtn.style.background = "#d1d5db";
  expenseBtn.style.color = "black";
  updateCategoryOptions("income");
});

expenseBtn.addEventListener("click", () => {
  transactionType = "expense";
  localStorage.setItem("transactionType", "expense");

  expenseBtn.style.background = "#f53f3f";
  expenseBtn.style.color = "white";
  addBtn.style.background = "#f53f3f";
  addBtn.style.color = "white";

  incomeBtn.style.background = "#d1d5db";
  incomeBtn.style.color = "black";
  updateCategoryOptions("expense");
});

const transactionList = document.getElementById("transaction-list");

let transactions = [];

const savedData = localStorage.getItem("transactions");
if (savedData) {
  transactions = JSON.parse(savedData);
}

function renderTransactions() {
  transactionList.innerHTML = "";

  if (transactions.length === 0) {
    transactionList.innerHTML =
      "<p class='no-transaction'>No transaction yet. Add one to get started!</p>";
    return;
  }

  transactionList.innerHTML =
    "<h1 class='recent-transaction' > Recent Transaction </h1>";

  transactions.forEach((t) => {
    const item = document.createElement("div");
    item.classList.add("transaction-item");

    const icon = categoryIcons[t.category] || "📦";
    const sign = t.type === "income" ? "+" : "-";
    const amountColor = t.type === "income" ? "green" : "red";

    item.innerHTML = `
      <div class="left">
        <div class="icon">${icon}</div>
        <div class="info">
          <h4>${t.category}</h4>
          <p>${t.date}</p>
        </div>
      </div>

      <div class="right">
        <span style="color:${amountColor}">
          ${sign} Rs ${t.amount.toFixed(2)}
        </span>

        <span class="action-icons">

          <i class="fa-solid fa-pen edit-btn" data-id="${t.id}"></i>
          <i class="fa-solid fa-trash delete-btn" data-id="${t.id}"></i>
        </span>
      </div>
    `;

    transactionList.appendChild(item);
  });
}

transactionList.addEventListener("click", function (e) {
  const id = Number(e.target.dataset.id);

  if (e.target.classList.contains("delete-btn")) {
    transactions = transactions.filter((t) => t.id !== id);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateBalance();
    renderTransactions();
    updateChartFromTransactions(transactions);
  }

  if (e.target.classList.contains("edit-btn")) {
    const transaction = transactions.find((t) => t.id === id);

    amountInput.value = transaction.amount;
    descriptionInput.value = transaction.description;
    dateInput.value = transaction.date;

    transactionType = transaction.type;
    updateButtonStyles();
    updateCategoryOptions(transaction.type);

    selectedCategoryValue = transaction.category;
    selectedCategory.textContent = transaction.category;

    editMode = true;
    editId = id;

    addBtn.textContent = "+ Update";
    addBtn.style.background = "#16a34a";
    cancelBtn.style.display = "block";
  }
});

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

addBtn.addEventListener("click", () => {
  const amount = amountInput.value;
  const category = selectedCategoryValue;
  const description = descriptionInput.value;
  const date = dateInput.value;

  if (!amount || !category || !date) {
    alert("Please fill all fields");
    return;
  }

  if (editMode) {
    transactions = transactions.map((t) =>
      t.id === editId
        ? {
            ...t,
            amount: Number(amount),
            category,
            description,
            date,
            type: transactionType,
          }
        : t,
    );

    editMode = false;
    editId = null;

    addBtn.textContent = "+ Add";
    addBtn.style.background =
      transactionType === "income" ? "#31c23d" : "#f53f3f";
    cancelBtn.style.display = "none";
  } else {
    const transaction = {
      id: Date.now(),
      type: transactionType,
      amount: Number(amount),
      category,
      description,
      date,
    };

    transactions.push(transaction);
  }

  localStorage.setItem("transactions", JSON.stringify(transactions));

  updateBalance();
  renderTransactions();
  updateChartFromTransactions(transactions);

  amountInput.value = "";
  descriptionInput.value = "";
  dateInput.value = "";
});

cancelBtn.addEventListener("click", () => {
  editMode = false;
  editId = null;

  amountInput.value = "";
  descriptionInput.value = "";
  dateInput.value = "";

  addBtn.textContent = "+ Add";
  addBtn.style.background =
    transactionType === "income" ? "#31c23d" : "#f53f3f";
  cancelBtn.style.display = "none";
});

const savedType = localStorage.getItem("transactionType");
if (savedType) {
  transactionType = savedType;
} else {
  transactionType = "income";
}
updateCategoryOptions(transactionType);
updateButtonStyles();

document.addEventListener("DOMContentLoaded", () => {
  const datePicker = flatpickr("#date-input", {
    dateFormat: "m/d/Y",
    defaultDate: new Date(),
  });

  document.querySelector(".calendar-icon").addEventListener("click", () => {
    datePicker.open();
  });
});

function updateBalance() {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((t) => {
    if (t.type === "income") {
      totalIncome += Number(t.amount);
    }

    if (t.type === "expense") {
      totalExpense += Number(t.amount);
    }
  });

  const balance = totalIncome - totalExpense;

  document.getElementById("income-amount").textContent =
    "Rs " + totalIncome.toFixed(2);

  document.getElementById("expense-amount").textContent =
    "Rs " + totalExpense.toFixed(2);

  document.getElementById("balance-amount").textContent =
    "Rs " + balance.toFixed(2);
}

window.addEventListener("load", () => {
  updateBalance();
  renderTransactions();

  if (typeof updateChartFromTransactions === "function") {
    updateChartFromTransactions(transactions);
  }
});
