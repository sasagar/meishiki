<template>
    <div id="app">
        <header>
            <h1>命式計算機</h1>
        </header>
        <main>
            <transition mode="out-in" :class="[this.currentView === 'first' ? 'first' : 'second']">
                <component
                    :is="currentView"
                    :year.sync="year"
                    :month.sync="month"
                    :date.sync="date"
                    :hour.sync="hour"
                    :hourFlag.sync="hourFlag"
                    :calcYear.sync="calcYear"
                    :calcMonth.sync="calcMonth"
                    :tempDate.sync="tempDate"
                    :risshunDate.sync="risshunDate"
                    :tengan="tengan"
                    :chishi="chishi"
                    :monthtengan="monthtengan"
                    :diffDays.sync="diffDays"
                    :diffHours.sync="diffHours"
                ></component>
            </transition>
            <div @click="viewChange" id="calcButton">
                <template v-if="currentView === 'first'">命式計算する</template>
                <template v-else>再設定</template>
            </div>
        </main>
        <footer></footer>
    </div>
</template>
<script>
import First from './first.vue';
import Second from './second.vue';

import tengan from '../../json/tengan.json';
import chishi from '../../json/chishi.json';
import monthtengan from '../../json/monthtengan.json';

export default {
    name: 'App',
    components: {
        First,
        Second,
    },
    data: () => {
        return {
            currentView: 'first',
            tengan: tengan,
            chishi: chishi,
            monthtengan: monthtengan,
            year: 1990,
            month: 1,
            date: 1,
            hour: 12,
            hourFlag: true,
            calcYear: 1989,
            calcMonth: 12,
            tempDate: '1990/1/1 12:00:00',
            risshunDate: 4,
            diffDays: 0,
            diffHours: 0,
        };
    },
    methods: {
        viewChange() {
            if (this.currentView == 'first') {
                this.currentView = 'second';
            } else {
                this.currentView = 'first';
            }
        },
        makeTempDate: function() {
            return (
                this.year +
                '/' +
                this.month +
                '/' +
                this.date +
                ' ' +
                this.hour +
                ':00:00'
            );
        },
    },
    watch: {
        year: function() {
            this.tempDate = this.makeTempDate();
        },
        month: function() {
            this.tempDate = this.makeTempDate();
        },
        date: function() {
            this.tempDate = this.makeTempDate();
        },
        hour: function() {
            this.tempDate = this.makeTempDate();
        },
        hourFlag: function() {
            this.tempDate = this.makeTempDate();
        },
    },
};
</script>
<style scoped lang="scss">
.v-enter {
    &#first {
        transform: translate(-100px, 0);
    }

    &#second {
        transform: translate(100px, 0);
    }

    opacity: 0;
}

.v-enter-to {
    opacity: 1;
}

.v-enter-active {
    transition: all 0.5s 0s ease;
}

.v-leave {
    transform: translate(0, 0);
    opacity: 1;
}

.v-leave-to {
    &#first {
        transform: translate(-100px, 0);
    }

    &#second {
        transform: translate(100px, 0);
    }

    opacity: 0;
}

.v-leave-active {
    transition: all 0.25s 0s ease;
}

#calcButton {
    display: block;
    width: 90%;
    margin: 1em auto;
    padding: 8px;
    text-align: center;
    background-color: #dde2ff;
    border: solid 1px #999;
    transition: all 0.25s ease;
}
</style>