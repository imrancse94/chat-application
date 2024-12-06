import { parseISO } from "date-fns";
import { setFormatDate } from "./date-format";


export class DateTimeUtils {

    #date = null;
    #foramtedDate = null;

    constructor(date = null) {
        if (!date) {
            date = new Date()
        }

        this.#date = date
        
    }

    getCurrentDateTime(){
        this.#foramtedDate =  this.#date;

        return this;
    }

    addDays(days) {

        this.#foramtedDate =  this.#date.setDate(this.#date.getDate() + days);

        return this;
    }

    addHours(hours) {
        this.#foramtedDate =  new Date(this.#date.getTime() + hours * 60 * 60 * 1000);
        return this;
    }

    addMinutes(minutes) {
        this.#foramtedDate =  new Date(this.#date.getTime() + minutes * 60000);
        return this;
    }

    getCustomFormat(format) {
        if(!this.#foramtedDate) throw new Error('Invalid date')

        return setFormatDate(this.#foramtedDate, format)
    }

    getParseISOFormat() {
        if(!this.#foramtedDate) throw new Error('Invalid date')
        //console.log('vbvbv',parseISO(setFormatDate(this.#foramtedDate)),this.#foramtedDate.toString())
        return parseISO(setFormatDate(this.#foramtedDate));
    }

}