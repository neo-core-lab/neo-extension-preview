// popup.js — Neo Core 3.0 packs + settings (with harmFilter toggle)

const DEFAULTS = {
    enableAffirmations: true,
    enableMicrofacts: true,
    enableAutomationBadge: true,
    autoTag: "#auto",
    rescanMs: 1500,
    activePack: "core",
    harmFilterEnabled: true
};

function $(id) {
    return document.getElementById(id);
}

function setStatus(text, timeoutMs = 1200) {
    const el = $("status");
    if (!el) return;
    el.textContent = text || "";
    if (timeoutMs > 0) {
        setTimeout(() => {
            if (el.textContent === text) {
                el.textContent = "";
            }
        }, timeoutMs);
    }
}

function loadOptions() {
    chrome.storage.sync.get(DEFAULTS, (settings) => {
        settings = Object.assign({}, DEFAULTS, settings || {});

        if ($("enableAffirmations")) {
            $("enableAffirmations").checked = !!settings.enableAffirmations;
        }
        if ($("enableMicrofacts")) {
            $("enableMicrofacts").checked = !!settings.enableMicrofacts;
        }
        if ($("enableAutomationBadge")) {
            $("enableAutomationBadge").checked = !!settings.enableAutomationBadge;
        }
        if ($("autoTag")) {
            $("autoTag").value = settings.autoTag || "#auto";
        }
        if ($("rescanMs")) {
            $("rescanMs").value = settings.rescanMs || 1500;
        }
        if ($("harmFilterEnabled")) {
            $("harmFilterEnabled").checked = settings.harmFilterEnabled !== false;
        }

        const active = (settings.activePack || "core")
            .split(",")
            .map(s => s.trim())
            .filter(Boolean);

        const packBoxes = document.querySelectorAll("[data-pack]");
        packBoxes.forEach(cb => {
            const id = cb.getAttribute("data-pack");
            cb.checked = active.includes(id);
        });
    });
}

function saveOptions() {
    const settings = {};

    if ($("enableAffirmations")) {
        settings.enableAffirmations = $("enableAffirmations").checked;
    }
    if ($("enableMicrofacts")) {
        settings.enableMicrofacts = $("enableMicrofacts").checked;
    }
    if ($("enableAutomationBadge")) {
        settings.enableAutomationBadge = $("enableAutomationBadge").checked;
    }
    if ($("autoTag")) {
        settings.autoTag = $("autoTag").value || "#auto";
    }
    if ($("rescanMs")) {
        const val = parseInt($("rescanMs").value, 10);
        settings.rescanMs = isNaN(val) ? 1500 : Math.max(300, val);
    }
    if ($("harmFilterEnabled")) {
        settings.harmFilterEnabled = $("harmFilterEnabled").checked;
    }

    const packBoxes = document.querySelectorAll("[data-pack]");
    const selected = [];
    packBoxes.forEach(cb => {
        if (cb.checked) {
            const id = cb.getAttribute("data-pack");
            if (id) selected.push(id);
        }
    });

    settings.activePack = selected.length ? selected.join(",") : "core";

    chrome.storage.sync.set(settings, () => {
        setStatus("Saved.", 1000);
    });
}

function triggerRescan() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs && tabs[0];
        if (!tab || !tab.id) return;

        try {
            chrome.tabs.sendMessage(
                tab.id,
                { action: "shimmerScan" },
                () => { }
            );
        } catch (e) {
            console.warn("NEO popup shimmerScan error:", e);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadOptions();

    if ($("saveBtn")) {
        $("saveBtn").addEventListener("click", (e) => {
            e.preventDefault();
            saveOptions();
        });
    }

    if ($("rescanBtn")) {
        $("rescanBtn").addEventListener("click", (e) => {
            e.preventDefault();
            triggerRescan();
            setStatus("Rescan requested.", 800);
        });
    }
});
