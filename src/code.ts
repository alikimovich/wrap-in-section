import { addText, getStyle, fitSize, isItLight } from "./plugin-helpers/functions";

if (figma.command === 'relaunch') {
  let storedParams;
  figma.clientStorage.getAsync('params')
    .then((res) => {
      if (res) {
        storedParams = res;
        console.log('storedParams', storedParams)
        const selection = figma.currentPage.selection;
        const padding = storedParams.padding
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
            fitSize(innerSection, tempGroup, padding)
            figma.ungroup(tempGroup)
            figma.notify('✨ Fits perfectly!')
          }
        }
        figma.closePlugin()
      }
    })
    .catch((err) => figma.closePlugin());
} else {

  figma.showUI(__html__, { themeColors: true, width: 264, height: 324 });

  let isItLightMode = isItLight(figma.currentPage.backgrounds[0].color)
  figma.ui.postMessage({ pluginMessage: { type: 'isItLightMode', isItLightMode } });

  // getting previously used style
  getStyle();

  figma.on("documentchange", (event) => {
    for (const change of event.documentChanges) {
      switch (change.type) {
        case "PROPERTY_CHANGE":
          isItLightMode = isItLight(figma.currentPage.backgrounds[0].color)
          figma.ui.postMessage({ pluginMessage: { type: 'isItLightMode', isItLightMode } })
          break;
      }
    }

  })

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
            fitSize(innerSection, tempGroup, padding)
            innerSection.fills = [{ type: 'SOLID', color: isItLightMode ? style.fills : style.fillsDark, opacity: isItLightMode ? 1 : style.opacity }]
            figma.ungroup(tempGroup)
            figma.notify('✨ Fits perfectly!')
          }
        }

        // create section
        else if (filtered.length >= 1) {

          const section = figma.createSection()
          // find the first node with parent section, create a child section for it. if there is no parent section, just go further
          var hasParent = false;
          let i = 0
          while (filtered[i]) {
            if (filtered[i].parent?.type === 'SECTION') {
              filtered[i].parent.appendChild(section)
              hasParent = true
              break;
            }
            i++
          }

          // setting up the section
          section.name = msg.style.name
          section.fills = [{ type: 'SOLID', color: isItLightMode ? style.fills : style.fillsDark }]

          // grouping all the selected objects to find x, y, width and height
          figma.group(filtered, section, 0)
          const tempGroup = section.children[0]
          await addText(tempGroup, isItLightMode, textSettings);

          // add all the objects as children
          section.appendChild(tempGroup)

          fitSize(section, tempGroup, padding, isItLightMode, style)

          // ungrouping
          figma.ungroup(tempGroup)
          figma.currentPage.selection = [section]
          if (hasParent) {
            figma.notify(`🔳 The nested section has been created`)
          } else {
            figma.notify(`✅`)
          }
          // Pass an empty description to show only a button
          section.setRelaunchData({ relaunch: '' })

        } else {
          figma.notify(`Start by selecting some layers!`)
        }
        break;
    }
  }
}