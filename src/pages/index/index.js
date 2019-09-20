import Vue from 'vue'
import schedule from '../../components/schedule/schedule.vue'
import './index.sass'
const mountPoint = document.getElementById("schedule");

new Vue({
    render: h => h(schedule)
}).$mount(mountPoint);
