import moment from 'moment'

export default function getGreetingMessage() {
    const currentTime = moment();
    const currentHour = currentTime.hour();
    let greetingMessage;

    if (currentHour >= 5 && currentHour < 12) {
        greetingMessage = 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
        greetingMessage = 'Good Afternoon';
    } else {
        greetingMessage = 'Good Evening';
    }

    return greetingMessage;
}