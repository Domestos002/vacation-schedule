import style from "./index.sass";
import lessColors from "../../js/lessColors";
import $ from 'jquery'

const $input = $(".js-input");
const $inputColor = $(".js-input-color");
const $inputAmount = $(".js-input-amount");

const appendColor = (container, color, amount) => {
    $(`#${container} .color__list`).append("<div class='color'><span class='color__bg' style='background: " + color + "'></span><p class='color__text'>" + amount + "%<br>" + color + "</p></div>");
};

const appendTemplate = (container) => {
    $(`#${container}`).append("<h3 class='color__title'>" + container + "</h3><div class='color__inner'><div class='color__list'></div></div>");
};

const clear = () => {
    $(`#lighten`).html("");
    $(`#darken`).html("");
    $(`#saturate`).html("");
    $(`#desaturate`).html("");
};

function run() {
    let color = $inputColor.val();
    let percent = parseInt($inputAmount.val());

    let prevLighten = null;
    let prevDarken = null;
    let prevSaturate = null;
    let prevDesaturate = null;

    if (color.length === 6 && percent) {

        clear();

        appendTemplate('lighten');
        appendTemplate('darken');
        appendTemplate('saturate');
        appendTemplate('desaturate');

        for (let i = 0; i < 100; i = i + percent) {

            let lighten = lessColors(`${color}`, i).lighten();
            let darken = lessColors(`${color}`, i).darken();
            let saturate = lessColors(`${color}`, i).saturate();
            let desaturate = lessColors(`${color}`, i).desaturate();


            if (prevLighten !== lighten) {
                appendColor('lighten', lighten, i);
                prevLighten = lighten;
            }

            if (prevDarken !== darken) {
                appendColor('darken', darken, i);
                prevDarken = darken;
            }

            if (prevSaturate !== saturate){
                appendColor('saturate', saturate, i);
                prevSaturate = saturate;
            }

            if (prevDesaturate !== desaturate) {
                appendColor('desaturate', desaturate, i);
                prevDesaturate = desaturate;
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", $input.change(() => run()));
