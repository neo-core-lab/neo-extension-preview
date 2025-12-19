/*
   NEO Core 4.0 — Background Service Worker
   © 2023–2025 Luciana Fisher. All Rights Reserved.
   Zero-Log Architecture: no telemetry, no storage of user text, no external calls.
*/

const DEFAULT_SETTINGS = {
  enableVeil: true,
  enableHover: true,
  rescanMs: 1500
};

/* ---------- 1. Install / Update ---------- */
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(DEFAULT_SETTINGS);
  chrome.action.setBadgeText({ text: '' });
});

/* ---------- 2. Keyboard Shortcuts ---------- */
chrome.commands.onCommand.addListener(async cmd => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;

  switch (cmd) {
    case 'rescan':
      chrome.tabs.sendMessage(tab.id, { action: 'rescan' });
      break;
    case 'toggle-veil':
      const { enableVeil } = await chrome.storage.sync.get('enableVeil');
      const next = !enableVeil;
      await chrome.storage.sync.set({ enableVeil: next });
      chrome.tabs.sendMessage(tab.id, { action: 'updateSettings', settings: { enableVeil: next } });
      break;
  }
});

/* ---------- 3. Badge Toggle (Debug) ---------- */
chrome.action.onClicked.addListener(async () => {
  const { neoDebug } = await chrome.storage.local.get({ neoDebug: 'off' });
  const next = neoDebug === 'on' ? 'off' : 'on';
  await chrome.storage.local.set({ neoDebug: next });
  chrome.action.setBadgeText({ text: next === 'on' ? 'DBG' : '' });
});