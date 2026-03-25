function getGridColor() {
  return document.body.classList.contains("dark-mode")
    ? "rgba(87, 86, 86, 0.88)"
    : "rgba(131, 129, 129, 0.39)";
}

function getMonthsColor() {
  return document.body.classList.contains("dark-mode") ? "#b0b1b6" : "#3a3838";
}

function getLegendColor() {
  return document.body.classList.contains("dark-mode") ? "#e5e7eb" : "#374151";
}

const ctx = document.getElementById("spendingChart");

const months = [
  "Apr 25",
  "May 25",
  "Jun 25",
  "Jul 25",
  "Aug 25",
  "Sep 25",
  "Oct 25",
  "Nov 25",
  "Dec 25",
  "Jan 26",
  "Feb 26",
  "Mar 26",
];

const chart = new Chart(ctx, {
  type: "bar",

  data: {
    labels: months,

    datasets: [
      {
        label: "Income",
        data: new Array(12).fill(0),
        backgroundColor: "#10b981",
        borderRadius: 4,
        barThickness: 20,
      },
      {
        label: "Expense",
        data: new Array(12).fill(0),
        backgroundColor: "#ef4444",
        borderRadius: 4,
        barThickness: 20,
      },
    ],
  },

  options: {
    responsive: true,

    interaction: {
      mode: "index",
      intersect: false,
    },

    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: getLegendColor(),
          boxWidth: 12,
          boxHeight: 12,
          padding: 15,
        },
      },

      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#ffffff",
        titleColor: "#111",
        bodyColor: "#111",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        displayColors: false,
      },
    },

    scales: {
      x: {
        ticks: {
          color: getMonthsColor(),
        },
        grid: {
          color: getGridColor(),
          borderDash: [4, 4],
        },
      },

      y: {
        beginAtZero: true,
        ticks: {
          color: getMonthsColor(),
        },
        grid: {
          color: getGridColor(),
          borderDash: [4, 4],
        },
      },
    },
  },
});

function updateChartFromTransactions(transactions) {
  const incomeData = new Array(12).fill(0);
  const expenseData = new Array(12).fill(0);

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const month = date.getMonth();

    if (t.type === "income") {
      incomeData[month] += Number(t.amount);
    } else {
      expenseData[month] += Number(t.amount);
    }
  });

  chart.data.datasets[0].data = incomeData;
  chart.data.datasets[1].data = expenseData;

  chart.update();
}

function updatePieChartFromTransactions(transactions) {
  const expenseMap = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      if (!expenseMap[t.category]) {
        expenseMap[t.category] = 0;
      }
      expenseMap[t.category] += Number(t.amount);
    }
  });

  const labels = Object.keys(expenseMap);
  const data = Object.values(expenseMap);

  if (labels.length === 0) {
    pieChart.data.labels = ["No Expense"];
    pieChart.data.datasets[0].data = [1];
    pieChart.update();
    return;
  }

  pieChart.data.labels = labels;
  pieChart.data.datasets[0].data = data;

  pieChart.update();
}
const pieCtx = document.getElementById("expensePieChart");

const pieChart = new Chart(pieCtx, {
  type: "pie",
  data: {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#3b82f6",
          "#ef4444",
          "#f59e0b",
          "#10b981",
          "#8b5cf6",
          "#ec4899",
          "#14b8a6",
        ],
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: getLegendColor(),
          boxWidth: 13,
          boxHeight: 13,
        },
      },
    },
  },
});
