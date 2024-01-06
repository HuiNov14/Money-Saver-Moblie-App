
export function incrementMonth(startDate) {
    const dateArray = startDate.split('/');
    const year = parseInt(dateArray[0], 10);
    const month = parseInt(dateArray[1], 10) - 1;
    const currentDate = new Date(year, month);

    currentDate.setMonth(currentDate.getMonth() + 1);

    const newYear = currentDate.getFullYear();
    const newMonth = currentDate.getMonth() + 1;

    const newStartDate = `${newYear}/${newMonth.toString().padStart(2, '0')}`;

    return newStartDate;
}

export function decrementMonth(startDate) {
    const dateArray = startDate.split('/');
    const year = parseInt(dateArray[0], 10);
    const month = parseInt(dateArray[1], 10) - 1;
    const currentDate = new Date(year, month);

    currentDate.setMonth(currentDate.getMonth() - 1);

    const newYear = currentDate.getFullYear();
    const newMonth = currentDate.getMonth() + 1;

    const newStartDate = `${newYear}/${newMonth.toString().padStart(2, '0')}`;

    return newStartDate;
}