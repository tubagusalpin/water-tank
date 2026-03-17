let level = 50;
let suhu = 28;
let hum = 60;
let pump = 0;

// CHART
let ctx = document.getElementById("chart").getContext("2d");
let chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      { label: "Level", data: [], borderColor: "cyan" },
      { label: "Suhu", data: [], borderColor: "orange" },
      { label: "Hum", data: [], borderColor: "lime" }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});

// GAUGE INIT
let gaugeTemp = new Chart(document.getElementById("gaugeTemp"), {
  type: "doughnut",
  data: { datasets: [{ data: [0, 50] }] }
});

let gaugeHum = new Chart(document.getElementById("gaugeHum"), {
  type: "doughnut",
  data: { datasets: [{ data: [0, 100] }] }
});

// UPDATE UI
function updateUI() {

  document.getElementById("water").style.height = level + "%";
  document.getElementById("levelText").innerText = Math.round(level) + "%";

  // PUMP LOGIC
  if (level < 30) pump = 1;
  if (level > 80) pump = 0;

  if (pump) {
    fan.classList.add("spin");
    pumpStatus.innerText = "ON";
  } else {
    fan.classList.remove("spin");
    pumpStatus.innerText = "OFF";
  }

  // ALARM
  let alarm = document.getElementById("alarm");
  if (level < 20) {
    alarm.innerText = "AIR HAMPIR HABIS!";
    alarm.classList.add("danger");
  } else {
    alarm.innerText = "NORMAL";
    alarm.classList.remove("danger");
  }

  // UPDATE CHART
  chart.data.labels.push("");
  chart.data.datasets[0].data.push(level);
  chart.data.datasets[1].data.push(suhu);
  chart.data.datasets[2].data.push(hum);

  if (chart.data.labels.length > 20) {
    chart.data.labels.shift();
    chart.data.datasets.forEach(d => d.data.shift());
  }

  chart.update();

  // UPDATE GAUGE (tidak recreate!)
  gaugeTemp.data.datasets[0].data = [suhu, 50 - suhu];
  gaugeHum.data.datasets[0].data = [hum, 100 - hum];

  gaugeTemp.update();
  gaugeHum.update();
}

// SIMULASI
setInterval(() => {
  level += Math.random()*10 - 5;
  suhu += Math.random()*2 - 1;
  hum += Math.random()*4 - 2;

  level = Math.max(0, Math.min(100, level));

  updateUI();
}, 2000);
