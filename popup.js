document.addEventListener('DOMContentLoaded', () => {
    const timeInput = document.getElementById('timeInput');
    const saveAlarmButton = document.getElementById('saveAlarmButton');
    const statusMessage = document.getElementById('statusMessage');

    // Load existing alarm time from storage
    chrome.storage.local.get('alarmTime', (data) => {
        if (data.alarmTime) {
            timeInput.value = data.alarmTime;
        }
    });

    saveAlarmButton.addEventListener('click', () => {
        const timeValue = timeInput.value.trim();
        if (validateTimeFormat(timeValue)) {
            const [hours, minutes] = timeValue.split(':').map(Number);
            const now = new Date();
            const alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);
            if (alarmTime < now) {
                alarmTime.setDate(alarmTime.getDate() + 1); // Set alarm for the next day if the time has already passed
            }
            const delay = alarmTime.getTime() - now.getTime();

            // Save the alarm time to storage and set the alarm
            chrome.storage.local.set({ alarmTime: timeValue }, () => {
                chrome.alarms.create('reminder', { when: Date.now() + delay });
                statusMessage.textContent = 'Alarm time saved and set!';
                statusMessage.style.color = 'green';
            });
        } else {
            statusMessage.textContent = 'Invalid time format. Please enter time as HH:MM.';
            statusMessage.style.color = 'red';
        }
    });
});

// Function to validate time format (HH:MM)
function validateTimeFormat(time) {
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timePattern.test(time);
}
