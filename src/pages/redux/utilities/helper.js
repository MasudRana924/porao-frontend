// exports.formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();

//     const timeDifference = now - date;
//     const secondsDifference = Math.floor(timeDifference / 1000);
//     const minutesDifference = Math.floor(secondsDifference / 60);
//     const hoursDifference = Math.floor(minutesDifference / 60);
//     const daysDifference = Math.floor(hoursDifference / 24);

//     if (daysDifference > 0) {
//         return `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`;
//     } else if (hoursDifference > 0) {
//         return `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
//     } else if (minutesDifference > 0) {
//         return `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago`;
//     } else {
//         return 'Just now';
//     }
// }
exports.formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const timeDifference = now - date;
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);

    const remainingHours = hoursDifference % 24;
    const remainingMinutes = minutesDifference % 60;
    const remainingSeconds = secondsDifference % 60;

    if (daysDifference > 0) {
        if (remainingHours > 0) {
            return `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} and ${remainingHours} ${remainingHours === 1 ? 'hour' : 'hours'} ago`;
        } else {
            return `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`;
        }
    } else if (hoursDifference > 0) {
        if (remainingMinutes > 0) {
            return `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} and ${remainingMinutes} ${remainingMinutes === 1 ? 'minute' : 'minutes'} ago`;
        } else {
            return `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
        }
    } else if (minutesDifference > 0) {
        if (remainingSeconds > 0) {
            return `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} and ${remainingSeconds} ${remainingSeconds === 1 ? 'second' : 'seconds'} ago`;
        } else {
            return `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago`;
        }
    } else {
        return `${secondsDifference} ${secondsDifference === 1 ? 'second' : 'seconds'} ago`;
    }
}
