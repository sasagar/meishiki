import { sekkiCalc } from './sekkiCalc';

const zoukanCalc = (year, month, day, chishi) => {
    // 入節前か判定して、計算用の年月を割り出す
    let nyusetsuDay = sekkiCalc(month, 'first', year);
    let calcYear = year;
    let calcMonth = month;
    if (day < nyusetsuDay) {
        if (calcMonth == 1) {
            calcYear -= 1;
            calcMonth = 12;
        } else {
            calcMonth -= 1;
        }
    }
    console.log(nyusetsuDay);

    // 対象月の入節日を計算
    // 計算用に入節日の前日を割り出す（これで入節日が1日目となる）
    // calcMonthとmonthが同じなら再計算不要
    let nyusetsuDate;
    if (calcMonth == month) {
        nyusetsuDate = new Date(
            calcYear,
            calcMonth - 1,
            nyusetsuDay - 1,
            0,
            0,
            0
        );
    } else {
        let calcNyusetsuDay = sekkiCalc(calcMonth, 'first', calcYear);
        nyusetsuDate = new Date(
            calcYear,
            calcMonth - 1,
            calcNyusetsuDay - 1,
            0,
            0,
            0
        );
    }

    // 該当月入節日からの日数を求める
    let calcDate = new Date(year, month - 1, day, 0, 0, 0);
    let diff = calcDate - nyusetsuDate;
    let diffDays = diff / (1000 * 60 * 60 * 24);
    console.log(nyusetsuDate);
    console.log(calcDate);
    console.log(diffDays);

    // ここから蔵干判定
    let res;
    if (chishi == '子') {
        if (diffDays <= 10) {
            res = '壬';
        } else {
            res = '癸';
        }
    } else if (chishi == '丑') {
        if (diffDays <= 9) {
            res = '癸';
        } else if (diffDays <= 12) {
            res = '辛';
        } else {
            res = '己';
        }
    } else if (chishi == '寅') {
        if (diffDays <= 7) {
            res = '戊';
        } else if (diffDays <= 14) {
            res = '丙';
        } else {
            res = '甲';
        }
    } else if (chishi == '卯') {
        if (diffDays <= 10) {
            res = '甲';
        } else {
            res = '乙';
        }
    } else if (chishi == '辰') {
        if (diffDays <= 9) {
            res = '乙';
        } else if (diffDays <= 12) {
            res = '癸';
        } else {
            res = '戊';
        }
    } else if (chishi == '巳') {
        if (diffDays <= 7) {
            res = '戊';
        } else if (diffDays <= 14) {
            res = '庚';
        } else {
            res = '丙';
        }
    } else if (chishi == '午') {
        if (diffDays <= 10) {
            res = '丙';
        } else if (diffDays <= 20) {
            res = '己';
        } else {
            res = '丁';
        }
    } else if (chishi == '未') {
        if (diffDays <= 9) {
            res = '丁';
        } else if (diffDays <= 12) {
            res = '乙';
        } else {
            res = '己';
        }
    } else if (chishi == '申') {
        if (diffDays <= 7) {
            res = '戊';
        } else if (diffDays <= 14) {
            res = '壬';
        } else {
            res = '庚';
        }
    } else if (chishi == '酉') {
        if (diffDays <= 10) {
            res = '庚';
        } else {
            res = '辛';
        }
    } else if (chishi == '戌') {
        if (diffDays <= 9) {
            res = '辛';
        } else if (diffDays <= 12) {
            res = '丁';
        } else {
            res = '戊';
        }
    } else if (chishi == '亥') {
        if (diffDays <= 7) {
            res = '戊';
        } else if (diffDays <= 14) {
            res = '甲';
        } else {
            res = '壬';
        }
    }
    return res;
};

export { zoukanCalc };
