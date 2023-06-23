document.addEventListener("selectionchange", () => {
  chrome.runtime.sendMessage({ selection: window.getSelection().toString() });
});