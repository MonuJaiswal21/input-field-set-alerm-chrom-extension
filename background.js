
  chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === "reminder") {
        chrome.storage.local.get("alarmTime", function(data) {
            const notificationOptions = {
                type: "basic",
                iconUrl: "logo.png",
                title: "Reminder",
                message: `It's time! Alarm Successfully Created ! ${data.alarmTime}`
            };
            chrome.notifications.create(notificationOptions);
        });
    }
});
