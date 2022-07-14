import moment from "moment";

export const convertPm = (time) => {
    if (time) {
        const hours = Number(time.slice(0, 2));
        const minutes = time.slice(3, 5);
        if (hours < 12 && hours > 0) return `${time} am`;
        else if (hours == 0) return `12:${minutes} am`
        else return ` ${hours - 12}:${minutes} pm`
    }
    else return null;
}

export const dateFormating = (date) => {
    const monthArr = ['Jan', 'Feb', "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    return date.substr(0, 2) + " " + monthArr[moment(date, 'dd/MM/YYYY').month()];
}


export const orderTasks = (tasklist) => {


}