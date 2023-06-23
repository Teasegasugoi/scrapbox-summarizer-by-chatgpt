try {
  importScripts("wasm_exec.js", "load_go.js");
} catch (e) {
  console.error(e);
}

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
  if (message.selection !== '') {
    selection = message.selection;
  }
  return true;
});

// chrome.contextMenus.onClicked.addListener(() => {
//   let formatted = format(selection);
//   console.log(formatted);
// });