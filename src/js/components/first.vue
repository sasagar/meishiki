<template>
    <div id="first">
        <h2>計算情報</h2>
        <div class="yearSelect selector">
            <select name="selectYear" v-model="localYear">
                <option
                    v-for="n in yearSpan"
                    v-bind:value="n + 1868"
                    v-bind:key="n + 1868"
                >{{n + 1868}}年</option>
            </select>
        </div>
        <div class="monthSelect selector">
            <select name="selectMonth" v-model="localMonth">
                <option v-for="n in 12" v-bind:value="n" v-bind:key="n">{{n}}月</option>
            </select>
        </div>
        <div class="dateSelect selector">
            <select name="selectDate" v-model="localDate">
                <template v-if="[1, 3, 5, 7, 8, 10, 12].includes(this.month)">
                    <option v-for="n in 31" v-bind:value="n" v-bind:key="n">{{n}}日</option>
                </template>
                <template v-else-if="[4, 6, 9, 11].includes(this.month)">
                    <option v-for="n in 30" v-bind:value="n" v-bind:key="n">{{n}}日</option>
                </template>
                <template v-else>
                    <template v-if="this.year % 4 == 0">
                        <template v-if="this.year % 100 == 0">
                            <template v-if="this.year % 400 == 0">
                                <option v-for="n in 29" v-bind:value="n" v-bind:key="n">{{n}}日</option>
                            </template>
                            <template v-else>
                                <option v-for="n in 28" v-bind:value="n" v-bind:key="n">{{n}}日</option>
                            </template>
                        </template>
                        <template v-else>
                            <option v-for="n in 29" v-bind:value="n" v-bind:key="n">{{n}}日</option>
                        </template>
                    </template>
                    <template v-else>
                        <option v-for="n in 28" v-bind:value="n" v-bind:key="n">{{n}}日</option>
                    </template>
                </template>
            </select>
        </div>
        <div class="hourFlag">
            <div class="hourFlagContainer">
                <input type="checkbox" name="hourFlagCheck" id="hourFlagCheck" v-model="localFlag" />
                <label for="hourFlagCheck">時間が不明</label>
            </div>
        </div>
        <div class="hourSelect selector" v-if="!hourFlag">
            <select name="selectHour" v-model="localHour">
                <option v-for="n in 24" v-bind:value="n - 1" v-bind:key="n - 1">{{n - 1}}時</option>
            </select>
        </div>
    </div>
</template>
<script>
import { sekkiCalc } from '../modules/sekkiCalc';

export default {
    name: 'First',
    props: {
        year: Number,
        month: Number,
        date: Number,
        hour: Number,
        hourFlag: Boolean,
        calcYear: Number,
        calcMonth: Number,
        tempDate: String,
        risshunDate: Number,
        diffDays: Number,
        diffHours: Number,
    },
    computed: {
        localYear: {
            get: function() {
                return this.year;
            },
            set: function(value) {
                this.$emit('update:year', value);
            },
        },
        localMonth: {
            get: function() {
                return this.month;
            },
            set: function(value) {
                this.$emit('update:month', value);
            },
        },
        localDate: {
            get: function() {
                return this.date;
            },
            set: function(value) {
                this.$emit('update:date', value);
            },
        },
        localHour: {
            get: function() {
                return this.hour;
            },
            set: function(value) {
                this.$emit('update:hour', value);
            },
        },
        localFlag: {
            get: function() {
                return this.hourFlag;
            },
            set: function(value) {
                this.$emit('update:hourFlag', value);
            },
        },
    },
    methods: {
        diffDaysCalc: function() {
            // 日付ごとの天干地支
            // 基準は甲子の2020/07/20
            let baseDate = new Date('2020/07/20 00:00:00');
            let destDate = new Date(
                this.localYear,
                this.localMonth - 1,
                this.localDate,
                0,
                0,
                0
            );
            let diffTimeDays = destDate - baseDate;
            let diffDays = diffTimeDays / (1000 * 60 * 60 * 24);

            this.$emit('update:diffDays', diffDays);
        },
        diffHoursCalc: function() {
            // 日付ごとの天干
            // 基準は甲子の2020/07/19 23時
            let baseHour = new Date(2020, 6, 19, 23, 0, 0);
            let destHour = new Date(this.tempDate);

            let diffTimeHour = destHour - baseHour;
            let diffHours = diffTimeHour / (1000 * 60 * 60);

            this.$emit('update:diffHours', diffHours);
        },
    },
    watch: {
        tempDate: function(newDate, oldDate) {
            // 立春以前は前年で計算
            let tempRisshunDate = sekkiCalc(2, 'first', this.localYear);
            this.$emit('update:risshunDate', tempRisshunDate);

            if (this.localMonth == 2) {
                if (this.risshunDate > this.localDate) {
                    this.$emit('update:calcYear', this.localYear - 1);
                } else {
                    this.$emit('update:calcYear', this.localYear);
                }
            } else if (this.localMonth == 1) {
                this.$emit('update:calcYear', this.localYear - 1);
            } else {
                this.$emit('update:calcYear', this.localYear);
            }

            // 入節までは前月扱い
            let tempNyusetsuDate = sekkiCalc(
                this.localMonth,
                'first',
                this.localYear
            );
            if (this.localDate < tempNyusetsuDate) {
                this.$emit(
                    'update:calcMonth',
                    this.localMonth == 1 ? 12 : this.localMonth - 1
                );
            } else {
                this.$emit('update:calcMonth', this.localMonth);
            }

            this.diffDaysCalc();

            if (!this.hourFlag) {
                this.diffHoursCalc();
            }
        },
        hourFlag: function() {
            if (!this.hourFlag) {
                this.diffHoursCalc();
            }
        },
    },
    mounted: function() {
        this.diffDaysCalc();
    },
    data: () => {
        const now = new Date();
        return {
            today: {
                year: now.getFullYear(),
                month: now.getMonth(),
                date: now.getDate(),
            },
            yearSpan: now.getFullYear() - 1868,
        };
    },
};
</script>
<style scoped lang="scss">
.yearSelect,
.monthSelect,
.dateSelect,
.hourSelect {
    width: 90%;
    margin: 1em auto;
    overflow: hidden;
    text-align: center;

    select {
        width: 100%;
        padding-right: 1em;
        text-indent: 0.01px;
        text-overflow: ellipsis;
        background: transparent;
        background-image: none;
        border: none;
        outline: none;
        box-shadow: none;
        cursor: pointer;
        -webkit-appearance: none;
        appearance: none;

        &::-ms-expand {
            display: none;
        }
    }

    &.selector {
        position: relative;
        background: #fff;
        border: 1px solid #bbb;
        border-radius: 502px;

        &::before {
            position: absolute;
            top: 0.8em;
            right: 0.9em;
            width: 0;
            height: 0;
            padding: 0;
            border-top: 6px solid #666;
            border-right: 6px solid transparent;
            border-left: 6px solid transparent;
            content: '';
            pointer-events: none;
        }

        &::after {
            position: absolute;
            top: 0;
            right: 2.5em;
            bottom: 0;
            width: 1px;
            border-left: 1px solid #bbb;
            content: '';
        }

        select {
            padding: 8px 38px 8px 15px;
            color: #666;
        }
    }
}

.hourFlagContainer {
    width: 90%;
    margin: 0 auto;
}

/* Checkboxes styles */
input[type='checkbox'] {
    display: none;

    & + label {
        position: relative;
        display: block;
        margin-bottom: 20px;
        padding-left: 35px;
        color: #555;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;

        &:last-child {
            margin-bottom: 0;
        }

        &::before {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 20px;
            height: 20px;
            border: 1px solid #555;
            opacity: 0.6;
            -webkit-transition: all 0.12s, border-color 0.08s;
            transition: all 0.12s, border-color 0.08s;
            content: '';
        }
    }

    &:checked {
        & + label {
            &::before {
                top: -5px;
                left: 5px;
                width: 10px;
                border-top-color: transparent;
                border-left-color: transparent;
                border-radius: 0;
                -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
                opacity: 1;
            }
        }
    }
}
</style>