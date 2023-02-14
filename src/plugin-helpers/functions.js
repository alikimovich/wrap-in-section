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
export function addText(group, textSettings) {
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
            subtitle.fills = [{ type: 'SOLID', color: { r: .15, g: .15, b: .15 } }];
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
            title.fills = [{ type: 'SOLID', color: { r: .15, g: .15, b: .15 } }];
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
            console.log(`❌ Error: ${err}`);
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
        }
    })
        .catch((error) => console.log('error', error));
}
// fit size of a section to it's inner group
export function fitSize(section, group, padding, style) {
    console.log(section, group, padding, style);
    // find content position relative to a parent node
    const relativeX = section.x + group.x;
    const relativeY = section.y + group.y;
    // find content position relative to a parent node
    section.x = relativeX - padding;
    section.y = relativeY - padding;
    section.fills = [{ type: 'SOLID', color: style.fills }];
    section.resizeWithoutConstraints(group.absoluteBoundingBox.width + padding * 2, group.absoluteBoundingBox.height + padding * 2);
    // redefining position
    group.x = padding;
    group.y = padding;
}
