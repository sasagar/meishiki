const youkaninkanCalc = kan => {
    let res;
    switch (kan) {
        case '甲':
        case '丙':
        case '戊':
        case '庚':
        case '壬':
            res = true;
            break;

        default:
            res = false;
    }
    return res;
}

export { youkaninkanCalc };
