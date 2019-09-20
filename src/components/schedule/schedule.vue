<template>
    <div class="schedule">
        <div class="schedule__inner container">
            <div class="schedule__head">
                <h2 class="schedule__title">График отпусков</h2>
                <div class="schedule__year">
                    <span class="schedule__prev"></span>
                    2019
                    <span class="schedule__next"></span>
                </div>
            </div>
            <div class="schedule__table-wrapper">
                <table class="schedule__table">
                    <thead>
                        <tr>
                            <th>Фамилия, Имя</th>
                            <th>дней</th>
                            <th>Янв</th>
                            <th>Фев</th>
                            <th>Мар</th>
                            <th>Апр</th>
                            <th>Май</th>
                            <th>Июн</th>
                            <th>Июл</th>
                            <th>Авг</th>
                            <th>Сен</th>
                            <th>Окт</th>
                            <th>Ноя</th>
                            <th>Дек</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in finalData" v-bind:key="item.id">
                        <td>
                            <div class="schedule__person-card">
                                <span class="schedule__person-img"></span>
                                {{ item.name }}
                            </div>
                        </td>
                        <td>{{ item.total }}</td>
                        <td v-for="month in item.vacation" v-bind:key="month.id">
                            <div class="schedule__week-list">
                                <div class="schedule__week"
                                     v-for="week in month.weeks" v-bind:key="week.id">
                                    <schedule-day
                                        v-for="day in week.data" v-bind:key="day.id"
                                        :day="day"
                                        @mouseOver="dayMouseOver"
                                        @mouseLeave="dayMouseLeave"
                                    ></schedule-day>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="schedule__popup" ref="popup"
                     @mouseover="mousePopupOver()"
                     @click="popupClick()"
                     v-bind:style="{
                        top: popup.top + 'px',
                        left: popup.left + 'px',
                     }"
                     v-if="popup.visible">
                    <div class="schedule__popup-person">
                        <span class="schedule__popup-person-img"></span>
                        <p class="schedule__popup-person-name">{{ popup.name }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style src="./schedule.sass" lang="sass"></style>
<script src="./schedule.js"></script>
