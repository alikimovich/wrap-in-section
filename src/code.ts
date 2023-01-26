import { addText, getStyle, fitSize } from "./plugin-helpers/functions";

figma.showUI(__html__, { themeColors: true, width: 264, height: 324 });

// getting previously used style
getStyle();

figma.ui.onmessage = async (msg) => {
  switch (msg.type) {
    case 'wrapIn':
      const selection = figma.currentPage.selection;
      const padding = msg.padding
      const style = msg.style
      const textSettings = msg.textSettings
      const params = { padding, style, textSettings }

      // save received style for the next time
      figma.clientStorage.setAsync('params', params)

      const filtered = []
      // filter layers
      for (const i in selection) {
        if (selection[i].type !== 'SLICE') {
          filtered.push(selection[i])
        }
      }

      // fit size or create section
      if (filtered.length === 1 && filtered[0].type === 'SECTION') {
        const innerSection = filtered[0]
        if ("children" in innerSection) {
          const children = innerSection.findChildren(n => n.type !== 'SLICE')
          figma.group(children, innerSection, 0)
          const tempGroup = innerSection.children[0]
          fitSize(innerSection, tempGroup, padding, style)
          figma.ungroup(tempGroup)
          figma.notify('✨ Fits perfectly!')
        }
      }

      // create section
      else if (filtered.length >= 1) {

        const section = figma.createSection()
        section.name = msg.style.name
        section.fills = [{ type: 'SOLID', color: style.fills }]

        // grouping all the selected objects to find x, y, width and height
        figma.group(filtered, section, 0)
        const tempGroup = section.children[0]
        await addText(tempGroup, textSettings);

        // add all the objects as children
        section.appendChild(tempGroup)

        fitSize(section, tempGroup, padding, style)

        // ungrouping
        figma.ungroup(tempGroup)
        figma.currentPage.selection = [section]
        figma.notify(`✅`)
      } else {
        figma.notify(`Start by selecting some layers!`)
      }
      break;
  }
}