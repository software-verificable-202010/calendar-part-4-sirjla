import moment from "moment";

function getCalendarDates(baseMoment: moment.Moment, numberOfDays: number): moment.Moment[] {
  return [...Array(numberOfDays).keys()]
    .map((dateNumber: number): number => ++dateNumber)
    .map(
      (dateNumber: number): moment.Moment =>
        baseMoment.clone().set({
          date: dateNumber
        })
    );
}

export {
  getCalendarDates
}