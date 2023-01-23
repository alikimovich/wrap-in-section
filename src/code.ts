figma.showUI(__html__, { themeColors: true, width: 264, height: 220 });

// getting previously used style
getStyle();

figma.ui.onmessage = msg => {
  switch (msg.type) {
    case 'wrapIn':
      const selection = figma.currentPage.selection;
      const padding = msg.padding
      const style = msg.style
      const params = { padding, style }

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
        const innerSection = filtered[0];
        if ("children" in innerSection) {
          figma.group(innerSection.findAll(), innerSection, 0);
          const tempGroup = innerSection.children[0]
          fitSize(innerSection, tempGroup, padding, style)
          figma.ungroup(tempGroup)
        }
      }

      // create section
      else if (filtered.length >= 1) {

        // create section
        const section = figma.createSection();
        section.name = msg.style.name
        section.fills = [{ type: 'SOLID', color: style.fills }];

        // grouping all the selected objects to find x, y, width and height
        figma.group(filtered, section, 0);
        const tempGroup = section.children[0];

        // add all the objects as children
        section.appendChild(tempGroup);

        fitSize(section, tempGroup, padding, style)

        // ungrouping
        figma.ungroup(tempGroup);
        figma.currentPage.selection = [section];

      }
      break;
  }
}

// fit size of a section to it's inner group
function fitSize(section, group, padding, style) {
  section.x = group.absoluteBoundingBox.x - padding;
  section.y = group.absoluteBoundingBox.y - padding;
  section.fills = [{ type: 'SOLID', color: style.fills }];
  section.resizeWithoutConstraints(
    group.absoluteBoundingBox.width + padding * 2,
    group.absoluteBoundingBox.height + padding * 2
  )
  // redefining position
  group.x = padding;
  group.y = padding;
}

// get stored style
function getStyle() {
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