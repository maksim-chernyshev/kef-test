export const formatDate = (date: string) => {
    const dateCopy = new Date(date);

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    };

    return dateCopy.toLocaleString("ru-RU", options);
};
