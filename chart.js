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

const incomeData = [0, 0, 0, 500, 0, 0, 0, 0, 0, 0, 0, 1000];
const expenseData = [0, 0, 0, 2000, 0, 0, 0, 0, 0, 0, 0, 100];

new Chart(ctx, {
  type: "bar",

  data: {
    labels: months,

    datasets: [
      {
        label: "income",
        data: incomeData,
        backgroundColor: "#10b981",
        borderRadius: 4,
        barThickness: 20,
      },

      {
        label: "expense",
        data: expenseData,
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
        grid: {
          color: "#e5e7eb",
          borderDash: [4, 4],
        },
      },

      y: {
        beginAtZero: true,
        grid: {
          color: "#e5e7eb",
          borderDash: [4, 4],
        },
      },
    },
  },
});
