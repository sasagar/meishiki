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
                    <td>{{monthtengan[calcMonth][calcYear % 10]}}</td>
                    <td>{{tengan[(calcYear - 1864) % 10]}}</td>
                </tr>
                <tr>
                    <th>地支</th>
                    <td v-if="!hourFlag">{{hourChishi}}</td>
                    <td>{{chishi[dayChishi]}}</td>
                    <td>{{chishi[monthChishi]}}</td>
                    <td>{{chishi[(calcYear - 1864) % 12]}}</td>
                </tr>
                <tr>
                    <th>蔵干</th>
                    <td v-if="!hourFlag">{{hourZoukan}}</td>
                    <td>{{dayZoukan}}</td>
                    <td>{{monthZoukan}}</td>
                    <td>{{yearZoukan}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { zoukanCalc } from '../modules/zoukanCalc';

export default {
    name: 'Second',
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
                this.hourChishi
            );
        },
        dayZoukan: function() {
            return zoukanCalc(
                this.year,
                this.month,
                this.date,
                this.chishi[this.dayChishi]
            );
        },
        monthZoukan: function() {
            return zoukanCalc(
                this.year,
                this.month,
                this.date,
                this.chishi[this.monthChishi]
            );
        },
        yearZoukan: function() {
            return zoukanCalc(
                this.year,
                this.month,
                this.date,
                this.chishi[(this.calcYear - 1864) % 12]
            );
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
</style>