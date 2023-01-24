# Wrap in a Section

A tiny Figma plugin.
Wrap a new section around layers you've selected, or adjust the size of an existing section.
The section's padding and color can be customized.

Special thanks to [Tom Lowry](https://github.com/thomas-lowry) for [Figsvelte](https://github.com/thomas-lowry/figsvelte)!

---

## To get started

```bash
npx degit alikimovich/wrap-in-section wrap-in-section
cd wrap-in-section
npm install
```

_Note that you will need to have [Node.js](https://nodejs.org/) installed._

## Connecting your plugin to Figma

Connecting your plugin to Figma
After installing, go to **Plugins / Development / New Plugin** in the Figma desktop app for Mac OS or Windows and choose the option **"Link existing plugin"**.

_You also can just type "New Plugin" in Figma global search to go there_

From there you need to link a **manifest.json** file located at **public** folder in your directory:

```bash
/wrap-in-section/public/manifest.json
```

Now edit this file to give a new name for your plugin, and you will be able call it from Figma: **Plugins / Development / Your Plugin Name**

## Development

During development, watch your project for changes with the following command.

```bash
npm run dev
```

Start building your plugin UI in `'src/Plugin.svelte'`.

## Build

When ready to package up your final Figma Plugin:

```bash
npm run build
```
