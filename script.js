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
