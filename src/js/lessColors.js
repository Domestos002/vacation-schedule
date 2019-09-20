import less from "less";

const lighten = less.functions.functionRegistry.get('lighten');
const darken = less.functions.functionRegistry.get('darken');
const saturate = less.functions.functionRegistry.get('saturate');
const desaturate = less.functions.functionRegistry.get('desaturate');

export default (color, amount) =>  {
    const color2 =  new (less.tree.Color)(color);
    const amount2 = new(less.tree.Dimension)(amount, '%');
    return {
        lighten: () => lighten(color2, amount2).toRGB(),
        darken: () => darken(color2, amount2).toRGB(),
        saturate: () => saturate(color2, amount2).toRGB(),
        desaturate: () => desaturate(color2, amount2).toRGB()
    }
};

