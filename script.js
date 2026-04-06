/* ======================================================
   GLOBAL VARIABLES
====================================================== */
let lastSpeed; // stores current test speed

/* ======================================================
   SPEED TEST FUNCTION (speed-test.html)
====================================================== */
function startTest() {
  const result = document.getElementById("result");
  if (!result) return;

  result.innerHTML = "Testing... ⏳";

  const startTime = new Date().getTime();
  const image = new Image();

  // Prevent caching
  image.src = "https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg?cache=" + Math.random();

  image.onload = function () {
    const endTime = new Date().getTime();
    const duration = (endTime - startTime) / 1000;

    const fileSize = 5; // MB
    const speed = (fileSize * 8) / duration; // Mbps

    lastSpeed = speed;
    localStorage.setItem("lastSpeed", speed);

    let message = "";
    if (speed < 2) {
      message = "😢 Very Slow - Only basic browsing";
    } else if (speed < 5) {
      message = "📱 Okay for WhatsApp & light browsing";
    } else if (speed < 10) {
      message = "🎬 Good for streaming";
    } else if (speed < 20) {
      message = "🎮 Good for gaming & streaming";
    } else {
      message = "🚀 Excellent! Perfect for everything";
    }

    result.innerHTML = `
      Your Speed: ${speed.toFixed(2)} Mbps <br><br>
      ${message}
    `;

    const networkResult = document.getElementById("network-result");
    if (networkResult) networkResult.innerHTML = "";
  };

  image.onerror = function () {
    result.innerHTML = "⚠️ Error: Could not complete the test.";
  };
}

/* ======================================================
   NETWORK RECOMMENDATION (data.html)
====================================================== */
function recommendNetwork() {
  const networkResult = document.getElementById("network-result");
  if (!networkResult) return;

  const storedSpeed = localStorage.getItem("lastSpeed");
  if (!storedSpeed) {
    networkResult.innerHTML = "⚠️ Please run the Speed Test first!";
    return;
  }

  const speed = parseFloat(storedSpeed);
  let message = "";

  if (speed < 2) {
    message = "😢 Very slow. Try Airtel or GLO.";
  } else if (speed < 5) {
    message = "📱 Okay network. MTN or 9mobile may be better.";
  } else if (speed < 10) {
    message = "🎬 Good for streaming. All networks are fine.";
  } else if (speed < 20) {
    message = "🎮 Great for gaming. MTN or GLO recommended.";
  } else {
    message = "🚀 Excellent! Any network will perform well.";
  }

  networkResult.innerHTML = message;
}

/* ======================================================
   CLEAR SPEED / RESET
====================================================== */
function clearSpeed() {
  lastSpeed = undefined;
  localStorage.removeItem("lastSpeed");

  const result = document.getElementById("result");
  if (result) result.innerHTML = "";

  const networkResult = document.getElementById("network-result");
  if (networkResult) {
    networkResult.innerHTML = "⚠️ Recommendation reset. Run test again!";
  }
}

/* ======================================================
   GAME DATA CALCULATOR (data.html)
====================================================== */
function calculateData() {
  const gameSelect = document.getElementById("game-select");
  const result = document.getElementById("data-result");
  if (!gameSelect || !result) return;

  const game = gameSelect.value;
  if (!game) {
    result.style.color = "red";
    result.textContent = "⚠️ Please select a game!";
    return;
  }

  const usage = {
    COD: 100,
    FreeFire: 50,
    PUBG: 150,
    Efootball: 70
  };

  result.style.color = "#22c55e";
  result.textContent = `🎮 ${game} uses roughly ${usage[game]} MB per hour.`;
}

/* ======================================================
   EMULATOR & BEST GAMES RECOMMENDATION (gaming.html)
====================================================== */
function recommendEmulator() {
  const ram = document.getElementById("ram").value;
  const cpu = document.getElementById("cpu").value;
  const storage = document.getElementById("storage").value;
  const usage = document.getElementById("usage").value;
  const result = document.getElementById("emulator-result");
  const bestGamesDiv = document.getElementById("best-games");

  if (!ram || !cpu || !storage || !usage) {
    result.style.color = "red";
    result.textContent = "⚠️ Please select all options!";
    bestGamesDiv.textContent = "";
    return;
  }

  let emulator = "";
  let reason = "";
  let score = "";
  let bestGames = [];

  // 🔻 LOW-END
  if (ram == "4" || cpu == "i3") {
    emulator = "LDPlayer";
    reason = "Lightweight and perfect for low-end laptops.";
    score = "Performance Score: ⭐⭐⭐☆☆ (3/5)";
    bestGames = ["Free Fire", "COD Mobile (Low Graphics)", "eFootball"];
  }

  // 🔸 MID-RANGE
  else if (ram == "8" && cpu == "i5") {
    if (usage === "heavy") {
      emulator = "GameLoop";
      reason = "Optimized for heavy games like COD & PUBG.";
      score = "Performance Score: ⭐⭐⭐⭐☆ (4/5)";
      bestGames = ["COD Mobile", "PUBG Mobile", "Free Fire"];
    } else {
      emulator = "BlueStacks";
      reason = "Balanced performance and features.";
      score = "Performance Score: ⭐⭐⭐⭐☆ (4/5)";
      bestGames = ["Free Fire", "COD Mobile (Medium Graphics)", "eFootball"];
    }
  }

  // 🔺 HIGH-END
  else if (ram == "16" || cpu == "i7") {
    emulator = "BlueStacks (High Performance Mode)";
    reason = "Best for high graphics and multitasking.";
    score = "Performance Score: ⭐⭐⭐⭐⭐ (5/5)";
    bestGames = ["COD Mobile (High Graphics)", "PUBG Mobile", "Free Fire", "eFootball"];
  }

  // 💾 STORAGE TIP
  let storageTip = storage === "hdd"
    ? "⚠️ Tip: SSD will greatly improve performance."
    : "✅ SSD detected — smooth performance expected.";

  // Display recommendation
  result.style.color = "#22c55e";
  result.innerHTML = `
    🎯 <strong>${emulator}</strong><br><br>
    💡 ${reason}<br><br>
    📊 ${score}<br><br>
    ${storageTip}
  `;

  // Display best games separately
  bestGamesDiv.style.color = "#22c55e";
  bestGamesDiv.innerHTML = `
    🕹️ <strong>Best Games for Your Setup:</strong><br>
    ${bestGames.join(", ")}
  `;
}

/* ======================================================
   DARK MODE TOGGLE
====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Attach Get Recommendation button listener
  const button = document.getElementById("get-recommendation");
  if (button) {
    button.addEventListener("click", recommendEmulator);
  }

  // Dark mode toggle
  const toggle = document.getElementById("dark-mode-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      toggle.textContent = document.body.classList.contains("dark-mode")
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
    });
  }
});