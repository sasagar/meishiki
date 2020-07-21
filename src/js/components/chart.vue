<script>
import { Radar } from 'vue-chartjs';

export default {
    extends: Radar,
    data() {
        return {
            data: {
                labels: ['木', '火', '土', '金', '水'],
                datasets: [
                    {
                        label: '五行',
                        backgroundColor: 'rgba(180, 127, 255, 0.5)',
                        data: [2, 1, 5, 2, 2],
                    },
                    {
                        label: '蔵干含む',
                        backgroundColor: 'rgba(255, 127, 180, 0.5)',
                        data: [3, 1, 7, 2, 3],
                    },
                ],
            },
            options: {
                legend: {
                    position: 'bottom',
                },
                scale: {
                    ticks: {
                        beginAtZero: true,
                        min: 0,
                        stepSize: 2,
                    },
                },
            },
        };
    },
    mounted() {
        this.renderChart(this.data, this.options);
    },
};
</script>