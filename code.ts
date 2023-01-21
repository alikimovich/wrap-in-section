const selection = figma.currentPage.selection;

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
    fitSize(innerSection, tempGroup)
    figma.ungroup(tempGroup)
  }
  console.log(innerSection)  
}
  
// create section
else if (filtered.length >= 1) {

  // create section
  const section = figma.createSection();
  section.name = 'Hello World'
  section.fills = [{type: 'SOLID', color: {r: 0.99, g: 0.99, b: 0.99}}];

  // grouping all the selected objects to find x, y, width and height
  figma.group(filtered, section, 0);
  const tempGroup = section.children[0];
    
  // add all the objects as children
  section.appendChild(tempGroup);

  fitSize(section, tempGroup)

  // ungrouping
  figma.ungroup(tempGroup);
  
}

// fit size of a section to it's inner group
function fitSize(section, group) {
const padding = 64;

  section.x = group.absoluteBoundingBox.x - padding;
  section.y = group.absoluteBoundingBox.y - padding;
  section.resizeWithoutConstraints(
    group.absoluteBoundingBox.width + padding * 2, 
    group.absoluteBoundingBox.height + padding * 2
  )
  // redefining position
  group.x = padding;
  group.y = padding;
}

// close
figma.closePlugin()