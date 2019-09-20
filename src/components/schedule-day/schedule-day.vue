<template>
    <div class="schedule__day"
         :class="{ 'schedule__day--active': day.data !== null }"
         @mouseover="day.data !== null ? mouseOver($event, item) : null"
         @mouseleave="day.data !== null ? mouseLeave(item) : null">
    </div>
</template>
<style src="./schedule-day.sass" lang="sass"></style>
<script src="./schedule-day.js"></script>
