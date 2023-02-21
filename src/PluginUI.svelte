<script>
  import { onMount } from "svelte";
  import { GlobalCSS } from "figma-plugin-ds-svelte";
  import {
    Label,
    Icon,
    IconHorizontalPadding,
    Checkbox,
  } from "figma-plugin-ds-svelte";
  import { Button, InputNumbers } from "./components/components";

  import { colors } from "./stores";
  import { normalizeColor } from "./ui-helpers/functions";

  let padding = 32;
  let style = $colors[0];

  let title = false;
  let subtitle = false;
  $: textSettings = { title, subtitle };
  let isItLightMode = true;

  function wrapIn(padding, style) {
    parent.postMessage(
      {
        pluginMessage: { type: "wrapIn", padding, style, textSettings },
      },
      "*"
    );
  }

  window.onmessage = async (event) => {
    const message = await event.data.pluginMessage;
    if (message.pluginMessage.type === "saved-params") {
      padding = message.pluginMessage.params.padding;
      style = message.pluginMessage.params.style;
      title = message.pluginMessage.params.textSettings.title;
      subtitle = message.pluginMessage.params.textSettings.subtitle;
    }
    if (message.pluginMessage.type === "isItLightMode") {
      isItLightMode = message.pluginMessage.isItLightMode;
    }
  };
</script>

<body>
  <Label>Text settings</Label>
  <Checkbox bind:checked={title}>Add a title</Checkbox>
  <Checkbox bind:checked={subtitle}>Add a subtitle</Checkbox>

  <Label>Padding</Label>
  <div class="container">
    <InputNumbers
      bind:value={padding}
      borders
      iconName={IconHorizontalPadding}
    />
  </div>
  <Label>Color</Label>
  <div class="color-grid container">
    {#each $colors as color}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="color-selector"
        class:selected={style.name === color.name}
        style="background:{isItLightMode
          ? normalizeColor(color.fills)
          : normalizeColor(color.fillsDark)}; border-color:{isItLightMode
          ? normalizeColor(color.stroke)
          : normalizeColor({ r: 0.99, g: 0.99, b: 0.99 })};"
        on:click={() => {
          style = color;
        }}
      />
    {/each}
  </div>
  <div class="container">
    <Button
      on:click={() => wrapIn(padding, style, textSettings)}
      variant="primary full-width">Wrap it!</Button
    >
  </div>
</body>

<style>
  body {
    overflow: hidden;
  }
  .container {
    margin: auto var(--size-xxsmall) var(--size-xxsmall) var(--size-xxsmall);
  }
  .color-grid {
    display: grid;
    grid-template-columns: repeat(7, var(--size-medium));
    gap: var(--size-xxxsmall);
    width: 100%;
    margin-bottom: var(--size-xsmall);
  }
  .color-selector {
    cursor: pointer;
    width: var(--size-medium);
    height: var(--size-medium);
    border-radius: 100%;
    border-width: 1px;
    border-style: solid;
  }
  .color-selector.selected {
    border-width: 3px;
  }
</style>
