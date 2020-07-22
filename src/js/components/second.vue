<template>
    <div id="second">
        <h2>
            {{year}}年{{month}}月{{date}}日
            <span v-if="!hourFlag">{{hour}}時</span> 生まれ
        </h2>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th v-if="!hourFlag">時柱</th>
                    <th>日柱</th>
                    <th>月柱</th>
                    <th>年柱</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>天干</th>
                    <td v-if="!hourFlag">{{tengan[hourTengan]}}</td>
                    <td>{{tengan[dayTengan]}}</td>
                    <td>{{monthTengan}}</td>
                    <td>{{tengan[yearTengan]}}</td>
                </tr>
                <tr>
                    <th>地支</th>
                    <td v-if="!hourFlag">{{hourChishi}}</td>
                    <td>{{chishi[dayChishi]}}</td>
                    <td>{{chishi[monthChishi]}}</td>
                    <td>{{chishi[(calcYear - 1864) % 12]}}</td>
                </tr>
                <tr>
                    <th>通変星</th>
                    <td v-if="!hourFlag">{{hourTsuhensei}}</td>
                    <td></td>
                    <td>{{monthTsuhensei}}</td>
                    <td>{{yearTsuhensei}}</td>
                </tr>
                <tr>
                    <th>十二運</th>
                    <td v-if="!hourFlag">{{hourJuniun}}</td>
                    <td>{{dayJuniun}}</td>
                    <td>{{monthJuniun}}</td>
                    <td>{{yearJuniun}}</td>
                </tr>
                <tr>
                    <th>蔵干</th>
                    <td v-if="!hourFlag">{{hourZoukan}}</td>
                    <td>{{dayZoukan}}</td>
                    <td>{{monthZoukan}}</td>
                    <td>{{yearZoukan}}</td>
                </tr>
                <tr>
                    <th>蔵干通変星</th>
                    <td v-if="!hourFlag">{{hourTsuhensei2}}</td>
                    <td>{{dayTsuhensei2}}</td>
                    <td>{{monthTsuhensei2}}</td>
                    <td>{{yearTsuhensei2}}</td>
                </tr>
                <tr>
                    <th>空亡</th>
                    <td v-if="!hourFlag">{{hourKubo}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <chart id="chart"></chart>
    </div>
</template>
<script>
import { zoukanCalc } from '../modules/zoukanCalc';
import { tsuhenseiCalc } from '../modules/tsuhenseiCalc';
import { juniunCalc } from '../modules/juniunCalc';
import { kuboCalc } from '../modules/kuboCalc';
import { youkaninkanCalc } from '../modules/youkaninkanCalc';

import Chart from './chart.vue';

export default {
    name: 'Second',
    components: {
        Chart,
    },
    props: {
        year: Number,
        month: Number,
        date: Number,
        hour: Number,
        hourFlag: Boolean,
        calcYear: Number,
        calcMonth: Number,
        tengan: Array,
        chishi: Array,
        monthtengan: Object,
        diffDays: Number,
        diffHours: Number,
    },
    methods: {
        kuboReturn: function(dayTengan, dayChishi, chkChishi) {
            let youinn = kuboCalc(dayTengan, dayChishi);

            if (youkaninkanCalc(dayTengan)) {
                if (youinn['you'] == chkChishi) {
                    return '真空';
                } else if (youinn['inn'] == chkChishi) {
                    return '半空';
                }
            } else {
                if (youinn['you'] == chkChishi) {
                    return '半空';
                } else if (youinn['inn'] == chkChishi) {
                    return '真空';
                }
            }
            return '';
        },
    },
    computed: {
        dayTengan: function() {
            let diffDaysTengan = this.diffDays % 10;
            if (diffDaysTengan < 0) {
                return diffDaysTengan + 10;
            } else {
                return diffDaysTengan;
            }
        },
        hourTengan: function() {
            let diffHoursTengan = Math.floor(this.diffHours / 2) % 10;
            if (diffHoursTengan < 0) {
                return diffHoursTengan + 10;
            } else {
                return diffHoursTengan;
            }
        },
        monthTengan: function() {
            return this.monthtengan[this.calcMonth][this.calcYear % 10];
        },
        yearTengan: function() {
            return (this.calcYear - 1864) % 10;
        },
        dayChishi: function() {
            let diffDaysChishi = this.diffDays % 12;
            if (diffDaysChishi < 0) {
                return diffDaysChishi + 12;
            } else {
                return diffDaysChishi;
            }
        },
        monthChishi: function() {
            if (this.calcMonth >= 12) {
                return this.calcMonth - 12;
            } else {
                return this.calcMonth;
            }
        },
        hourChishi: function() {
            if (!this.hourFlag) {
                let tmpCalcHour = Math.floor((this.hour + 1) / 2);
                if (tmpCalcHour == 12) {
                    tmpCalcHour = 0;
                }
                return this.chishi[tmpCalcHour];
            } else {
                return '';
            }
        },
        hourZoukan: function() {
            return zoukanCalc(
                this.year,
                this.month,
                this.date,
                this.hour,
                this.hourChishi
            );
        },
        dayZoukan: function() {
            return zoukanCalc(
                this.year,
                this.month,
                this.date,
                this.hour,
                this.chishi[this.dayChishi]
            );
        },
        monthZoukan: function() {
            return zoukanCalc(
                this.year,
                this.month,
                this.date,
                this.hour,
                this.chishi[this.monthChishi]
            );
        },
        yearZoukan: function() {
            return zoukanCalc(
                this.year,
                this.month,
                this.date,
                this.hour,
                this.chishi[(this.calcYear - 1864) % 12]
            );
        },
        hourTsuhensei: function() {
            return tsuhenseiCalc(
                this.tengan[this.dayTengan],
                this.tengan[this.hourTengan]
            );
        },
        monthTsuhensei: function() {
            return tsuhenseiCalc(this.tengan[this.dayTengan], this.monthTengan);
        },
        yearTsuhensei: function() {
            return tsuhenseiCalc(
                this.tengan[this.dayTengan],
                this.tengan[this.yearTengan]
            );
        },
        hourTsuhensei2: function() {
            return tsuhenseiCalc(this.tengan[this.dayTengan], this.hourZoukan);
        },
        dayTsuhensei2: function() {
            return tsuhenseiCalc(this.tengan[this.dayTengan], this.dayZoukan);
        },
        monthTsuhensei2: function() {
            return tsuhenseiCalc(this.tengan[this.dayTengan], this.monthZoukan);
        },
        yearTsuhensei2: function() {
            return tsuhenseiCalc(this.tengan[this.dayTengan], this.yearZoukan);
        },
        hourJuniun: function() {
            return juniunCalc(this.tengan[this.dayTengan], this.hourChishi);
        },
        dayJuniun: function() {
            return juniunCalc(
                this.tengan[this.dayTengan],
                this.chishi[this.dayChishi]
            );
        },
        monthJuniun: function() {
            return juniunCalc(
                this.tengan[this.dayTengan],
                this.chishi[this.monthChishi]
            );
        },
        yearJuniun: function() {
            return juniunCalc(
                this.tengan[this.dayTengan],
                this.chishi[(this.calcYear - 1864) % 12]
            );
        },
        hourKubo: function() {
            const res = this.kuboReturn(
                this.tengan[this.dayTengan],
                this.chishi[this.dayChishi],
                this.hourChishi
            );
            return res;
        },
        monthKubo: function() {
            const res = this.kuboReturn(
                this.tengan[this.dayTengan],
                this.chishi[this.dayChishi],
                this.chishi[this.monthChishi]
            );
            return res;
        },
        yearKubo: function() {
            const res = this.kuboReturn(
                this.tengan[this.dayTengan],
                this.chishi[this.dayChishi],
                this.chishi[(this.calcYear - 1864) % 12]
            );
            return res;
        },
    },
};
</script>
<style scoped lang="scss">
table {
    border-collapse: collapse;

    th,
    td {
        border: solid 1px #666;
    }
}

#chart {
    max-width: 640px;
    background-color: #fff;
}
</style>