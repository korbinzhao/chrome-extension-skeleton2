function commonSendMessage(message: { name: string }) {
  // manifest v3 请求发送方式
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tabId = tabs[0].id;

    console.log('--- tabId ---', tabId);

    if(!tabId) return;

    chrome.tabs.sendMessage(tabId, message, function (response) {
      if (!response) {
        console.log("Empty response!!!");
        return;
      }
      console.log("CS: response message = " + response.message);
    });
  });
}

var skeletonBtn = document.querySelector("#skeleton-btn");
var captureBtn = document.querySelector("#capture-btn");

skeletonBtn?.addEventListener("click", function () {
  commonSendMessage({ name: "get_skeleton" });
});

captureBtn?.addEventListener("click", function () {
  commonSendMessage({ name: "capture_screen" });
});
