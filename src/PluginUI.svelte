<script>
  import { onMount } from "svelte";
  import { GlobalCSS } from "figma-plugin-ds-svelte";
  import { Label, Icon, IconHorizontalPadding } from "figma-plugin-ds-svelte";
  import { Button, InputNumbers } from "./components/components";

  import { colors } from "./stores";
  import { normalizeColor } from "./ui-helpers/functions";

  let padding = 32;
  let style = $colors[0];

  function wrapIn(padding, style) {
    parent.postMessage(
      { pluginMessage: { type: "wrapIn", padding, style } },
      "*"
    );
  }

  window.onmessage = async (event) => {
    const message = await event.data.pluginMessage;
    if (message.pluginMessage.type === "saved-params") {
      padding = message.pluginMessage.params.padding;
      style = message.pluginMessage.params.style;
    }
  };
</script>

<Label>Paddings</Label>
<div class="container">
  <InputNumbers bind:value={padding} borders iconName={IconHorizontalPadding} />
</div>
<Label>Color</Label>
<div class="color-grid container">
  {#each $colors as color}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="color-selector"
      class:selected={style.name === color.name}
      style="background:{normalizeColor(
        color.fills
      )}; border-color:{normalizeColor(color.stroke)};"
      on:click={() => {
        style = color;
      }}
    />
  {/each}
</div>
<div class="container">
  <Button on:click={() => wrapIn(padding, style)} variant="primary full-width"
    >Wrap in section!</Button
  >
</div>

<style>
  .container {
    margin: auto var(--size-xxsmall) var(--size-xxsmall) var(--size-xxsmall);
  }
  .color-grid {
    display: grid;
    grid-template-columns: repeat(7, var(--size-medium));
    gap: var(--size-xxxsmall);
    width: 100%;
    margin-bottom: var(--size-xxsmall);
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
    border-width: 2px;
  }
</style>
