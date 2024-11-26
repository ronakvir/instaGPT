chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "sendToGPT",
      title: "Send to GPT",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "sendToGPT") {
      const selectedText = info.selectionText;
  
      chrome.tabs.create({ url: "https://chat.openai.com/" }, (newTab) => {
        
        const onTabUpdated = (tabId, changeInfo, updatedTab) => {
          if (tabId === newTab.id && changeInfo.status === 'complete') {
            chrome.tabs.onUpdated.removeListener(onTabUpdated);
            
            chrome.tabs.sendMessage(newTab.id, { text: selectedText }, (response) => {
              if (chrome.runtime.lastError) {
                console.error("Error sending message:", chrome.runtime.lastError);
              } else {
                console.log("Message sent successfully:", response);
              }
            });
          }
        };
  
        chrome.tabs.onUpdated.addListener(onTabUpdated);
      });
    }
  });
  