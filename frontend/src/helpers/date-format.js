import { DateTimeUtils } from "./date-time-utils";

export const setFormatDate = (date, format = 'Y-m-d H:i:s') => {

    if (!date) {
        return "";
    }

    const formatDate = (dateString, format) => {
        const date = new Date(dateString);

        if (isNaN(date)) {
            return "Invalid Date";
        }

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        let ampm = "AM";

        if (hours >= 12) {
            ampm = "PM";
            if (hours > 12) {
                hours -= 12;
            }
        }

        if (hours === 0) {
            hours = 12;
        }

        return format
            .replace('Y', year)
            .replace('m', String(month).padStart(2, '0'))
            .replace('d', String(day).padStart(2, '0'))
            .replace('H', String(date.getHours()).padStart(2, '0'))
            .replace('i', String(minutes).padStart(2, '0'))
            .replace('s', String(seconds).padStart(2, '0'))
            .replace('h', String(hours).padStart(2, '0'))
            .replace('A', ampm)
            .replace('a', ampm.toLowerCase());

    }

    return formatDate(date, format);
}


 export const getCurrentParseISODateTime = () => (new DateTimeUtils).getCurrentDateTime().getParseISOFormat();

 export const addDaysParseISODateTime = (date,days) => (new DateTimeUtils(date)).addDays(days).getParseISOFormat()