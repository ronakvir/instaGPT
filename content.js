function insertText(text) {
  const textarea = document.querySelector('textarea');

  if (textarea) {
    textarea.value = text;

    textarea.dispatchEvent(new Event('input', { bubbles: true }));
  } else {
    console.error("ChatGPT input box not found.");
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.text) {
    insertText(request.text);
    sendResponse({ status: "Text inserted successfully." });
  }
});
