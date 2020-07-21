import tsuhensei from '../../json/tsuhensei.json';

const tsuhenseiCalc = (day, dest) => {
    const res = tsuhensei[day][dest];
    return res;
};

export { tsuhenseiCalc };
