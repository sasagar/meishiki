// 太陽の黄経を求める
const Mdays = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
// const Gm3199 = 552648;
// const Jm3199 = 552622;

// position
const sla = new Array(
    36000.7695,
    280.4659,
    1.9147,
    0.02,
    -0.0048,
    0.002,
    0.0018,
    0.0018,
    0.0015,
    0.0013,
    0.0007,
    0.0007,
    0.0007,
    0.0006,
    0.0005,
    0.0005,
    0.0004,
    0.0004
);
const slb = new Array(
    0,
    0,
    35999.05,
    71998.1,
    35999,
    32964,
    19,
    445267,
    45038,
    22519,
    65929,
    3035,
    9038,
    33718,
    155,
    2281,
    29930,
    31557
);
const slc = new Array(
    0,
    0,
    267.52,
    265.1,
    268,
    158,
    159,
    208,
    254,
    352,
    45,
    110,
    64,
    316,
    118,
    221,
    48,
    161
);

const deltaT = year => {
    return 58 + 0.44 * (year - 1990);
};

const Ymd2Jd = (yy, mm, dd) => {
    var days, yym1;
    yym1 = yy - 1;
    days = 1721422;
    Mdays[1] = 28;
    if (yy % 4 == 0) {
        Mdays[1] = 29;
        if (yy > 1582) {
            if (yy % 100 == 0) {
                Mdays[1] = 28;
                if (yy % 400 == 0) {
                    Mdays[1] = 29;
                }
            }
        }
    }
    days += Math.floor(365.25 * yym1 + 0.1);
    for (let m = 0; m < mm - 1; m++) {
        days += Mdays[m];
    }
    days += dd;
    if (days >= 2299160) days -= 10;
    if (yym1 >= 1600) {
        days -= Math.floor((yym1 - 1600 + 0.1) / 100);
        days += Math.floor((yym1 - 1600 + 0.1) / 400);
    }
    return days;
};

// const Jd2Ymd = jd => {
//     if (jd >= 2299160.0) {
//         return Jd2Gymd(jd);
//     } else {
//         return Jd2Jymd(jd);
//     }
// };

// const Jd2Jymd = jd => {
//     let jdi, jdf, yy, tjd, mm;
//     jdi = Math.floor(jd);
//     jdf = jd - jdi;
//     yy = Math.floor((jdi - Jm3199) / 365.25) - 3199;
//     tjd = Jymd2Jd(yy, 1, 1);
//     while (tjd <= jdi) {
//         yy++;
//         tjd = Jymd2Jd(yy, 1, 1);
//     }
//     while (jdi < tjd) {
//         yy--;
//         tjd = Jymd2Jd(yy, 1, 1);
//     }
//     tjd -= 1;
//     Mdays[1] = 28 + UruuCheck(yy, 'J');
//     for (mm = 0; mm < 12; mm++) {
//         tjd += Mdays[mm];
//         if (tjd >= jdi) {
//             tjd -= Mdays[mm];
//             break;
//         }
//     }
//     jd = Math.abs(yy) * 10000.0 + (mm + 1) * 100.0 + jdi - tjd + jdf;
//     if (yy < 0) jd = -jd;
//     return jd;
// };

// const Jd2Gymd = jd => {
//     var jdi, jdf, yy, tjd, mm;
//     jdi = Math.floor(jd);
//     jdf = jd - jdi;
//     yy = Math.floor((jdi - Gm3199) / 365.2425) - 3199;
//     tjd = Gymd2Jd(yy, 1, 1);
//     while (tjd <= jdi) {
//         yy++;
//         tjd = Gymd2Jd(yy, 1, 1);
//     }
//     while (jdi < tjd) {
//         yy--;
//         tjd = Gymd2Jd(yy, 1, 1);
//     }
//     tjd -= 1;
//     Mdays[1] = 28 + UruuCheck(yy, 'G');
//     for (mm = 0; mm < 12; mm++) {
//         tjd += Mdays[mm];
//         if (tjd >= jdi) {
//             tjd -= Mdays[mm];
//             break;
//         }
//     }
//     jd = Math.abs(yy) * 10000.0 + (mm + 1) * 100.0 + jdi - tjd + jdf;
//     if (yy < 0) jd = -jd;
//     return jd;
// };

// const Jymd2Jd = (yy, mm, dd) => {
//     dd = GetYearDays(1995 + UruuCheck(yy, 'J'), mm, dd);
//     yy += 3199;
//     dd += yy * 365;
//     dd += Math.floor((yy + 0.1) / 4.0);
//     dd += Jm3199;
//     return dd;
// };

// const Gymd2Jd = (yy, mm, dd) => {
//     dd = GetYearDays(1995 + UruuCheck(yy, 'G'), mm, dd);
//     yy += 3199;
//     dd += yy * 365;
//     dd += Math.floor((yy + 0.1) / 4.0);
//     dd -= Math.floor((yy + 0.1) / 100.0);
//     dd += Math.floor((yy + 0.1) / 400.0);
//     dd += Gm3199;
//     return dd;
// };

// const UruuCheck = (yy, GJflag) => {
//     if (GJflag == 'J' || GJflag == 'j') {
//         return yy % 4 == 0 ? 1 : 0;
//     } else {
//         var uf = 0;
//         uf = yy % 4 == 0 ? 1 : uf;
//         uf = yy % 100 == 0 ? 0 : uf;
//         uf = yy % 400 == 0 ? 1 : uf;
//         return uf;
//     }
// };

// const GetYearDays = (yy, mm, dd) => {
//     var m, days;
//     days = dd;
//     m = GetMonthDays(yy, mm);
//     for (m = 0; m < mm - 1; m++) days += Mdays[m];
//     return days;
// };

// const GetMonthDays = (yy, mm) => {
//     if (yy % 4 == 0) {
//         Mdays[1] = 29;
//         if (yy > 1582) {
//             if (yy % 100 == 0) Mdays[1] = 28;
//             if (yy % 400 == 0) Mdays[1] = 29;
//         }
//     } else Mdays[1] = 28;
//     return Mdays[mm - 1];
// };

const SunLong = T => {
    var d2r, ans, dans;
    d2r = Math.PI / 180.0;
    dans = -0.0057 + 0.0048 * Math.cos(((1934 * T) / 36525.0 + 145) * d2r);
    ans = SunMLong(T);
    ans += dans;
    while (ans < 0.0) ans += 360.0;
    while (ans >= 360.0) ans -= 360.0;
    return ans;
};

const SunMLong = T => {
    var d2r, kaku, i, ans;
    d2r = Math.PI / 180.0;
    T /= 36525.0;
    ans = 0.0;
    for (i = 17; i >= 0; i--) {
        kaku = (slb[i] * T + slc[i]) * d2r;
        if (i == 0 || i == 4) ans += sla[i] * T * Math.cos(kaku);
        else ans += sla[i] * Math.cos(kaku);
    }
    ans = ans - Math.floor(ans / 360.0) * 360.0;
    return ans;
};

// 視黄経計算
// yearは西暦
// longは角度
// 結果は24時間制の日本時間で時間のみ返す
const LongMCmp = (year, long) => {
    var yy, hhstd, dt, tds, tde, kaku, hours;

    yy = year;
    hhstd = 9; // 時差
    kaku = long;

    dt = deltaT(yy);
    dt = dt / 86400.0 - hhstd / 24.0;
    tde = Ymd2Jd(2000, 1, 1.5);
    tds = Ymd2Jd(yy, 1, 1) - tde;
    tde = Ymd2Jd(yy + 1, 1, 1) - tde;

    hours = LongMCmpSB(kaku, tds, tde, dt); // 指定角になる瞬間を調べる

    // console.log(hours);
    return hours;
};

// 指定角になる瞬間を求めて、回数を返す
const LongMCmpSB = (kaku, tds, tde, dt) => {
    let hh, mi, ltmp, ttmp, tdtmp;
    let i, j, base2000;

    let l0 = new Array(5);
    let l1 = new Array(5);
    let t0 = new Array(5);
    let t1 = new Array(5);

    base2000 = Ymd2Jd(2000, 1, 1.5);
    for (i = 0; i < 5; i++) {
        t0[i] = tds + ((tde - tds) / 4) * i + dt;

        l0[i] = SunLong(t0[i]);
        ltmp = 360.0 / 365.25; // 太陽の公転周期

        if (i > 0) {
            // 角度連続可処理
            ltmp = l0[i - 1] + ltmp * (t0[i] - t0[i - 1]);
            j = l0[i] - ltmp;
            while (j < -180) {
                l0[i] += 360.0;
                j = l0[i] - ltmp;
            }
        }
    }
    ltmp = kaku;
    while (ltmp < l0[0]) {
        ltmp += 360.0;
    }
    while (ltmp <= l0[4]) {
        ttmp = rLag(l0, t0, ltmp);
        for (i = 0; i < 5; i++) {
            t1[i] = ttmp - 2.0 + i;

            // 太陽視黄経
            l1[i] = SunLong(t1[i]);

            if (l1[i] > kaku + 180) {
                // 連続化と正規化
                l1[i] -= 360.0;
            }
        }
        tdtmp = rLag(l1, t1, kaku);
        ttmp = tdtmp - dt + base2000;

        hh = Math.floor((ttmp - Math.floor(ttmp)) * 1440.0);
        mi = hh % 60;
        hh = Math.floor((hh - mi) / 60 + 0.0001);
        // dd = Jd2Ymd(Math.floor(ttmp));
        // yy = Math.floor(dd / 10000);
        // dd -= yy * 10000;
        // mm = Math.floor(dd / 100);
        // dd -= mm * 100;

        // ans = yy + '/' + mm + '/' + dd;
        // ans = ans + ' ' + hh + 'h' + mi + 'm';

        // console.log(hh);
        return hh;

        // ltmp += 360.0;
    }
    // return hh;
};

// ラグランジュ補間
function rLag(x0, y0, targetx) {
    var ysum, ans, i, j, ie;

    ie = x0.length;
    ans = 0.0;
    for (i = 0; i < ie; i++) {
        ysum = y0[i];
        for (j = 0; j < ie; j++) {
            if (j != i) {
                ysum *= (targetx - x0[j]) / (x0[i] - x0[j]);
            }
        }
        ans += ysum;
    }
    return ans;
}

export { LongMCmp };
