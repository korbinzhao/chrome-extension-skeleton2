function captureVisibleTab() {
  chrome.tabs.captureVisibleTab(
    // @ts-ignore
    null,
    {
      format: "png",
      quality: 100,
    },
    function (data) {
      screenshot.data = data;

      screenshot.saveScreenshot();
    }
  );
}

function onMessage2(
  request: { name: string },
  sender: chrome.runtime.MessageSender,
  sendResponse: Function
) {
  console.log("service_worker: onMessage " + request.name);

  switch (request.name) {
    case "capture_screen":
      captureVisibleTab();
      sendResponse({ message: "success" });
      break;
  }

  return true;
}

console.log("service_worker.js onload", chrome.runtime.onMessage);
chrome.runtime.onMessage.addListener(onMessage2);
