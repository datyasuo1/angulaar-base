export const addZero = (n: number) => {
    if (n < 10) return '0' + n;
    else return n;
};

export const convertToDateFormat = (
    date: string | Date,
    sep: string = '/',
    reverse: boolean = false,
) => {
    const convertedDate = new Date(date);
    const d = addZero(convertedDate.getDate());
    const m = addZero(convertedDate.getMonth() + 1);
    const y = convertedDate.getFullYear();
    const res = reverse ? y + sep + m + sep + d : d + sep + m + sep + y;
    return res;
};

export const convertToDateTimeFormat = (
    date: string,
    dateSep: string = '/',
    timeSep: string = ':',
) => {
    const convertedDate = new Date(date);
    const d = addZero(convertedDate.getDate());
    const m = addZero(convertedDate.getMonth() + 1);
    const y = convertedDate.getFullYear();
    const s = addZero(convertedDate.getSeconds());
    const M = addZero(convertedDate.getMinutes());
    const h = addZero(convertedDate.getHours());
    return d + dateSep + m + dateSep + y + ' ' + h + timeSep + M + timeSep + s;
};

export const convertToTimeFormat = (date: string, timeSep: string = ':') => {
    const convertedDate = new Date(date);
    const s = addZero(convertedDate.getSeconds());
    const M = addZero(convertedDate.getMinutes());
    const h = addZero(convertedDate.getHours());
    return h + timeSep + M + timeSep + s;
};

export const timeFromNow = (date: string) => {
    const now = new Date().getTime();
    const timeInput = new Date(date).getTime();
    const m = (now - timeInput) / 1000;
    if (m < 60) {
        return 'Vừa xong';
    }
    if (m >= 60 && m < 3600) {
        return `${Math.floor(m / 60)} phút trước`;
    }
    if (m >= 3600 && m < 86400) {
        return `${Math.floor(m / 3600)} giờ trước`;
    }
    if (m >= 86400 && m < 2592000) {
        return `${Math.floor(m / 86400)} ngày trước`;
    }
    if (m >= 2592000 && m < 31536000) {
        return `${Math.floor(m / 2592000)} tháng trước`;
    }
    if (m >= 31536000) {
        return `${Math.floor(m / 31536000)} năm trước`;
    }
    return '';
};
