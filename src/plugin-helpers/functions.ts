// add text
export async function addText(group, textSettings) {

    // set distance
    const subtitleFontSize = 40
    const subtitleLineHeight = 48
    const subtitleDistance = 152

    const titleFontSize = 128
    const titleLineHeight = 152
    const titleLetterSpacingPercent = 2

    const titleDistance = textSettings.subtitle ? (subtitleLineHeight + titleLineHeight) : (subtitleDistance - subtitleLineHeight + titleLineHeight)

    // add subtitle
    if (textSettings.subtitle) {

        // create text
        const subtitle = figma.createText()

        // set position
        subtitle.x = group.x
        subtitle.y = group.y - subtitleDistance

        // add to the group
        group.appendChild(subtitle)

        // load the font in the text node before setting the characters
        await loadFont('Inter', 'Regular')

        subtitle.fontName = { family: 'Inter', style: 'Regular' }
        subtitle.characters = 'Subtitle goes here'

        // Set font size and color
        subtitle.fontSize = subtitleFontSize
        subtitle.lineHeight = { value: subtitleLineHeight, unit: 'PIXELS' }
        subtitle.fills = [{ type: 'SOLID', color: { r: .15, g: .15, b: .15 } }]
    }

    // add title
    if (textSettings.title) {

        // create text
        const title = figma.createText()

        // set position
        title.x = group.x
        title.y = group.y - titleDistance

        // add to the group
        group.appendChild(title)

        // load the font in the text node before setting the characters
        await loadFont('Inter', 'Black')

        title.fontName = { family: 'Inter', style: 'Black' }
        title.characters = 'Title goes here'

        // Set font size and color
        title.fontSize = titleFontSize
        title.lineHeight = { value: titleLineHeight, unit: 'PIXELS' }
        title.letterSpacing = { value: titleLetterSpacingPercent, unit: 'PERCENT' }
        title.fills = [{ type: 'SOLID', color: { r: .15, g: .15, b: .15 } }]
    }
}

// loading fonts
async function loadFont(font: string, style: string) {
    try {
        await figma.loadFontAsync({ family: font, style: style });
    } catch (err) {
        console.log(`🖍️ loadFont error: ${err}`);
    }
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
        .catch((err) => console.log('🐞 getStyle error', err));
}

// fit size of a section to it's inner group
export function fitSize(section, group, padding, style) {
    // find content position relative to a parent node
    const relativeX = section.x + group.x
    const relativeY = section.y + group.y

    // find content position relative to a parent node
    section.x = relativeX - padding
    section.y = relativeY - padding
    section.fills = [{ type: 'SOLID', color: style.fills, opacity: style.opacity }]
    section.resizeWithoutConstraints(
        group.absoluteBoundingBox.width + padding * 2,
        group.absoluteBoundingBox.height + padding * 2
    )
    // redefining position
    group.x = padding
    group.y = padding
}