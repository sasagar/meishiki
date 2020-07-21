import sekkicalcbase from '../../json/sekkicalcbase.json';

// calc based on http://addinbox.sakura.ne.jp/sekki24_topic.htm

const sekkiCalc = (monthVal, section, year) => {
    let d = Number(sekkicalcbase[monthVal][section]['D']);
    let a = Number(sekkicalcbase[monthVal][section]['A']);
    let res =
        parseInt(d + a * (year - 1901), 10) - parseInt((year - 1901) / 4, 10);
    return res;
};
export { sekkiCalc };
