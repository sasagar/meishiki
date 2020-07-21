import juniun from '../../json/juniun.json';

const juniunCalc = (tengan, chishi) => {
    let res = juniun[tengan][chishi];
    return res;
};

export { juniunCalc };
