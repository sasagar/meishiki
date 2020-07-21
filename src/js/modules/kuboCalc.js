const kuboCalc = (kan, shi) => {
    let you, inn;

    switch (kan) {
        case '甲':
            switch (shi) {
                case '子':
                    you = '戌';
                    inn = '亥';
                    break;
                case '寅':
                    you = '子';
                    inn = '丑';
                    break;
                case '辰':
                    you = '寅';
                    inn = '卯';
                    break;
                case '午':
                    you = '辰';
                    inn = '巳';
                    break;
                case '申':
                    you = '午';
                    inn = '未';
                    break;
                case '戌':
                    you = '申';
                    inn = '酉';
                    break;
            }
            break;
        case '乙':
            switch (shi) {
                case '丑':
                    you = '戌';
                    inn = '亥';
                    break;
                case '卯':
                    you = '子';
                    inn = '丑';
                    break;
                case '巳':
                    you = '寅';
                    inn = '卯';
                    break;
                case '未':
                    you = '辰';
                    inn = '巳';
                    break;
                case '酉':
                    you = '午';
                    inn = '未';
                    break;
                case '亥':
                    you = '申';
                    inn = '酉';
                    break;
            }
            break;
        case '丙':
            switch (shi) {
                case '寅':
                    you = '戌';
                    inn = '亥';
                    break;
                case '辰':
                    you = '子';
                    inn = '丑';
                    break;
                case '午':
                    you = '寅';
                    inn = '卯';
                    break;
                case '申':
                    you = '辰';
                    inn = '巳';
                    break;
                case '戌':
                    you = '午';
                    inn = '未';
                    break;
                case '子':
                    you = '申';
                    inn = '酉';
                    break;
            }
            break;
        case '丁':
            switch (shi) {
                case '卯':
                    you = '戌';
                    inn = '亥';
                    break;
                case '巳':
                    you = '子';
                    inn = '丑';
                    break;
                case '未':
                    you = '寅';
                    inn = '卯';
                    break;
                case '酉':
                    you = '辰';
                    inn = '巳';
                    break;
                case '亥':
                    you = '午';
                    inn = '未';
                    break;
                case '丑':
                    you = '申';
                    inn = '酉';
                    break;
            }
            break;
        case '戊':
            switch (shi) {
                case '辰':
                    you = '戌';
                    inn = '亥';
                    break;
                case '午':
                    you = '子';
                    inn = '丑';
                    break;
                case '申':
                    you = '寅';
                    inn = '卯';
                    break;
                case '戌':
                    you = '辰';
                    inn = '巳';
                    break;
                case '子':
                    you = '午';
                    inn = '未';
                    break;
                case '寅':
                    you = '申';
                    inn = '酉';
                    break;
            }
            break;
        case '己':
            switch (shi) {
                case '巳':
                    you = '戌';
                    inn = '亥';
                    break;
                case '未':
                    you = '子';
                    inn = '丑';
                    break;
                case '酉':
                    you = '寅';
                    inn = '卯';
                    break;
                case '亥':
                    you = '辰';
                    inn = '巳';
                    break;
                case '丑':
                    you = '午';
                    inn = '未';
                    break;
                case '卯':
                    you = '申';
                    inn = '酉';
                    break;
            }
            break;
        case '庚':
            switch (shi) {
                case '午':
                    you = '戌';
                    inn = '亥';
                    break;
                case '申':
                    you = '子';
                    inn = '丑';
                    break;
                case '戌':
                    you = '寅';
                    inn = '卯';
                    break;
                case '子':
                    you = '辰';
                    inn = '巳';
                    break;
                case '寅':
                    you = '午';
                    inn = '未';
                    break;
                case '辰':
                    you = '申';
                    inn = '酉';
                    break;
            }
            break;
        case '辛':
            switch (shi) {
                case '未':
                    you = '戌';
                    inn = '亥';
                    break;
                case '酉':
                    you = '子';
                    inn = '丑';
                    break;
                case '亥':
                    you = '寅';
                    inn = '卯';
                    break;
                case '丑':
                    you = '辰';
                    inn = '巳';
                    break;
                case '卯':
                    you = '午';
                    inn = '未';
                    break;
                case '巳':
                    you = '申';
                    inn = '酉';
                    break;
            }
            break;
        case '壬':
            switch (shi) {
                case '申':
                    you = '戌';
                    inn = '亥';
                    break;
                case '戌':
                    you = '子';
                    inn = '丑';
                    break;
                case '子':
                    you = '寅';
                    inn = '卯';
                    break;
                case '寅':
                    you = '辰';
                    inn = '巳';
                    break;
                case '辰':
                    you = '午';
                    inn = '未';
                    break;
                case '午':
                    you = '申';
                    inn = '酉';
                    break;
            }
            break;
        case '癸':
            switch (shi) {
                case '酉':
                    you = '戌';
                    inn = '亥';
                    break;
                case '亥':
                    you = '子';
                    inn = '丑';
                    break;
                case '丑':
                    you = '寅';
                    inn = '卯';
                    break;
                case '卯':
                    you = '辰';
                    inn = '巳';
                    break;
                case '巳':
                    you = '午';
                    inn = '未';
                    break;
                case '未':
                    you = '申';
                    inn = '酉';
                    break;
            }
            break;
    }
    return {
        you: you,
        inn: inn,
    };
};

export { kuboCalc };
