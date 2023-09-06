import moment from "moment";

export default function formatUnixDate(unixTimestamp) {
    const now = moment();
    const date = moment.unix(unixTimestamp);

    const diffInHours = now.diff(date, 'hours');
    const diffInDays = now.diff(date, 'days');

    if (diffInHours < 1) {
        return diffInDays < 1
            ? diffInDays < 1
                ? 'A few seconds ago'
                : 'A few minutes ago'
            : 'A few hours ago';
    } else if (date.isSame(now, 'day')) {
        return `Today at ${date.format('hh:mm A')}`;
    } else if (date.isSame(now.clone().subtract(1, 'day'), 'day')) {
        return 'Yesterday';
    } else if (date.isSame(now, 'week')) {
        return 'This Week';
    } else if (date.isSame(now.clone().subtract(1, 'week'), 'week')) {
        return 'Last Week';
    } else if (date.year() === now.year()) {
        return date.format('DD:MM');
    } else {
        return date.format('DD MMM YYYY');
    }
}

export function timeFromX(time) {
    const start = moment.unix(time).toArray()
    const now = moment().toArray()
    const end = moment(now)

    return moment(start).fromNow(true);
}