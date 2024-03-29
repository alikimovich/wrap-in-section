var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// add text
export function addText(group, isItLightMode, textSettings) {
    return __awaiter(this, void 0, void 0, function* () {
        // set distance
        const subtitleFontSize = 40;
        const subtitleLineHeight = 48;
        const subtitleDistance = 152;
        const titleFontSize = 128;
        const titleLineHeight = 152;
        const titleLetterSpacingPercent = 2;
        const titleDistance = textSettings.subtitle ? (subtitleLineHeight + titleLineHeight) : (subtitleDistance - subtitleLineHeight + titleLineHeight);
        // add subtitle
        if (textSettings.subtitle) {
            // create text
            const subtitle = figma.createText();
            // set position
            subtitle.x = group.x;
            subtitle.y = group.y - subtitleDistance;
            // add to the group
            group.appendChild(subtitle);
            // load the font in the text node before setting the characters
            yield loadFont('Inter', 'Regular');
            subtitle.fontName = { family: 'Inter', style: 'Regular' };
            subtitle.characters = 'Subtitle goes here';
            // Set font size and color
            subtitle.fontSize = subtitleFontSize;
            subtitle.lineHeight = { value: subtitleLineHeight, unit: 'PIXELS' };
            subtitle.fills = [{ type: 'SOLID', color: isItLightMode ? { r: .15, g: .15, b: .15 } : { r: .99, g: .99, b: .99 } }];
        }
        // add title
        if (textSettings.title) {
            // create text
            const title = figma.createText();
            // set position
            title.x = group.x;
            title.y = group.y - titleDistance;
            // add to the group
            group.appendChild(title);
            // load the font in the text node before setting the characters
            yield loadFont('Inter', 'Black');
            title.fontName = { family: 'Inter', style: 'Black' };
            title.characters = 'Title goes here';
            // Set font size and color
            title.fontSize = titleFontSize;
            title.lineHeight = { value: titleLineHeight, unit: 'PIXELS' };
            title.letterSpacing = { value: titleLetterSpacingPercent, unit: 'PERCENT' };
            title.fills = [{ type: 'SOLID', color: isItLightMode ? { r: .15, g: .15, b: .15 } : { r: .99, g: .99, b: .99 } }];
        }
    });
}
// loading fonts
function loadFont(font, style) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield figma.loadFontAsync({ family: font, style: style });
        }
        catch (err) {
            console.log(`🖍️ loadFont error: ${err}`);
        }
    });
}
// get stored style
export function getStyle() {
    let params;
    figma.clientStorage.getAsync('params')
        .then((res) => {
        if (res) {
            params = res;
            figma.ui.postMessage({ pluginMessage: { type: 'saved-params', params } });
            return params;
        }
    })
        .catch((err) => console.log('🐞 getStyle error', err));
}
// fit size of a section to it's inner group
export function fitSize(section, group, padding) {
    // find content position relative to a parent node
    const relativeX = section.x + group.x;
    const relativeY = section.y + group.y;
    // find content position relative to a parent node
    section.x = relativeX - padding;
    section.y = relativeY - padding;
    section.resizeWithoutConstraints(group.absoluteBoundingBox.width + padding * 2, group.absoluteBoundingBox.height + padding * 2);
    // redefining position
    group.x = padding;
    group.y = padding;
}
export function isItLight(color) {
    // takes sRGB channels as 8 bit integers
    var Rlin = Math.pow(color.r, 2.218); // Convert int to decimal 0-1 and linearize
    var Glin = Math.pow(color.g, 2.218); // ** is the exponentiation operator, older JS needs Math.pow() instead
    var Blin = Math.pow(color.b, 2.218); // 2.218 Gamma for sRGB linearization. 2.218 sets unity with the piecewise sRGB at #777 .... 2.2 or 2.223 could be used instead
    var Ylum = Rlin * 0.2126 + Glin * 0.7156 + Blin * 0.0722; // convert to Luminance Y
    var lightness = Math.pow(Ylum, 0.43) * 100; // Convert to lightness (0 to 100)
    var lightMode = lightness > 21 ? true : false;
    return lightMode;
}
