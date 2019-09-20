import vacations from "../../vacations.json"
import scheduleday from "../schedule-day/schedule-day.vue"

export default ({
    name: 'schedule',
    data() {
        return {
            currentYear: '2019',
            data: vacations.data,
            finalData: [],
            popup: {
                name: '',
                visible: false,
                top: 0,
                left: 0,
                timer: {
                    running: false,
                    handler: null
                }
            },
        }
    },

    components: {
        'schedule-day': scheduleday,
    },

    mounted(){
        const filteredByYear = this.data.filter(el => el.year === this.currentYear);
        this.finalData = filteredByYear.map(el => {
            el.vacation = this.makeYearCalendar(el, this.currentYear);
            return el
        })
    },

    methods: {
        getDaysInMonth(month,year) {
            return new Date(year, month, 0).getDate()
        },
        getWeeksCount(days) {
            return Math.ceil(days/7);
        },
        makeYearCalendar(peoples, year) {
            let result = [];

            for(let monthNum=0; monthNum<= 11; monthNum++) {
                let daysCount = this.getDaysInMonth(monthNum, year);
                let weeksCount = this.getWeeksCount(daysCount);
                let currentDate = 1;
                let dateCount = 1;

                const monthNames = [
                    'Январь',
                    'Февраль',
                    'Март',
                    'Апрель',
                    'Май',
                    'Июнь',
                    'Июль',
                    'Август',
                    'Сентябрь',
                    'Октябрь',
                    'Ноябрь',
                    'Декабрь',
                ];

                const prependZeros = (val) => {
                    let result = '0' + val.toString();
                    return result.slice(-2)
                };

                const getWeekDayNum = (currentDate) => {
                    const day = new Date(year, monthNum, currentDate-1);
                    return day.getDay()
                };

                const getVacation = (resultDate) => {
                    let data = null;
                    const isFind = peoples.vacation.find(el => el === resultDate);
                    if(isFind) data = peoples;
                    return data
                };

                const getDays = () => {
                    let result = [];
                    const dayNum = getWeekDayNum(currentDate);
                    const notWeekend = dayNum !== 5 && dayNum !== 6;
                    for(let weekNum=0; weekNum<= 6 - dayNum; weekNum++) {
                        const resultDate = `${prependZeros(currentDate)}.${prependZeros(monthNum+1)}.${year}`;
                        if(daysCount >= 1 && notWeekend) {
                            result.push({
                                id: weekNum,
                                date: resultDate,
                                data: getVacation(resultDate),
                            });
                            dateCount++;
                        }
                        currentDate++;
                        daysCount--;
                    }
                    return result;
                };

                const getWeeks = () => {
                    let result = [];
                    for(let dayNum=0; dayNum<= weeksCount-1; dayNum++) {
                        result.push({
                            id: dayNum,
                            data: getDays()
                        })
                    }

                    return result;
                };

                const month = {
                    id: monthNum,
                    name: monthNames[monthNum],
                    weeks: getWeeks(),
                };

                result.push(month)
            }

            return result
        },
        popupStartTimer() {
            if(!this.popup.timer.running) {
                console.log("start");
                this.popup.timer.running = true;
                this.popup.visible = true;
                this.popup.timer.handler = setInterval( () => {
                    this.popupStopTimer();
                }, 3000);
            }
        },
        popupStopTimer() {
            if(this.popup.timer.running) {
                console.log("end");
                clearInterval(this.popup.timer.handler);
                this.popup.timer.running = false;
                this.popup.visible = false;
            }
        },
        dayMouseOver(item) {
            console.log(item)
            this.popup.name = item.name;

            if(!this.popup.visible) {
                this.popup.timer.running = true;
                this.popup.visible = true;
            }
        },
        dayMouseLeave() {
            this.popupStartTimer()
        },
        popupClick() {
            this.popupStopTimer();
        },
        mousePopupOver() {
            this.popupStopTimer();
        },
    },

});
