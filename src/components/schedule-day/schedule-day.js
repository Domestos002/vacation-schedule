export default ({
    name: 'schedule-day',
    data() {
        return {

        }
    },

    props: {
        day: {
            type: Object,
            default: {},
        },
        item: {
            type: Function,
            default: () => {},
        },
    },

    methods: {
        mouseOver() {
            this.$emit('mouseOver', this.item);
        },
        mouseLeave() {
            this.$emit('mouseLeave', this.item);
        },
    }

});
