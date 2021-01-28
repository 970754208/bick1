export default {
    formateDate(time) {
        if(!time) return;
        function formate(data) {
            return data < 10 ? '0'+data : data;
        }
        let myDate = new Date(time),
            y = myDate.getFullYear(),
            mon = myDate.getMonth() + 1,
            date = myDate.getDate(),
            h = myDate.getHours(),
            min = myDate.getMinutes(),
            s = myDate.getSeconds();
        mon =  formate(mon);
        date = formate(date);
        h = formate(h);
        min = formate(min);
        s = formate(s);
        return y + '-' + mon + '-' + date + ' ' + h + ':' + min + ':' + s;
    }
}