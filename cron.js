const cron  = require("node-cron");
const morning = "Goodmorning {groupName} have a nice day!";
cron.schedule('*/2 * * * *', function() {
    api.getThreadList(100, null, ["INBOX"])
      .then(function(threadList) {
        threadList.forEach(function(thread) {
          if (thread.isGroup){
          const threadName = thread.name || "Unnamed Group";
          const greeting = morning.replace("{groupName}", threadName);
          api.sendMessage(greeting, thread.threadID);
          }
        });
      })
      .catch(function(error) {
        console.error('Failed to get Thread List:', error);
      });
  }, {
    scheduled: true,
    timezone: "Asia/Manila"
  });