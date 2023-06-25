try {
  importScripts("wasm_exec.js", "load_go.js");
} catch (e) {
  console.error(e);
}

const BASE_URL = "https://chat.openai.com/";
let selection;

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    "id": "scrapbox-summarizer-by-chatgpt",
    "title" : "Summarize by ChatGPT",
    "type"  : "normal",
    "contexts" : ["selection"],
  });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.selection !== '' && message.selection !== undefined) {
    selection = message.selection;
  }
  return true;
});

function setValue(formatted) {
  window.onload = () => {
    const elem = document.getElementById("prompt-textarea");
    if (elem) {
      // FIX: Deprecated, Rewrite it in a different way
      document.execCommand('insertText', false, formatted);
      // TODO: auto click button
      // const button = elem.nextElementSibling;
      // if (button && button.tagName === "BUTTON") {
      //   button.click();
      // }
    }
  }
}

chrome.contextMenus.onClicked.addListener(() => {
  let formatted = format(selection);
  chrome.tabs.create({ url: BASE_URL });
  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
    if (changeInfo.url === BASE_URL) {
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: setValue,
        args: [formatted]
      });
    }
  });
});