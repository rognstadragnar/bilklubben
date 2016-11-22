import Moment from 'moment';
require('moment-range');

export const isAvailable = (newOrderStart, newOrderEnd, arrayOfObjects) => {
    const newOrderRange = Moment.range(new Moment(newOrderStart).format('YYYY-MM-DD'), new Moment(newOrderEnd).format('YYYY-MM-DD'));
    for (let i = 0; i < arrayOfObjects.length; i++) {
        const range = Moment.range(new Moment(arrayOfObjects[i].startDato).subtract(1, 'days'), new Moment(arrayOfObjects[i].sluttDato))
        if (newOrderRange.overlaps(range)) return false
    }
    return true;
}