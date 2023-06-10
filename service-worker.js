chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    "id": "scrapbox-summarizer-by-chatgpt",
    "title" : "Summarize by ChatGPT",
    "type"  : "normal",
    "contexts" : ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  //  取得した文字列を formatter.go でフォーマット

  // ChatGPTに送信

})