<script>
  const world = 'postcss' // edit world and save to see hmr update
</script>

<style>
  h1 {
    color: orangered;
  }
</style>

<h1 class="border border-current rounded p-4 m-4">
  <!-- tailwind classes in svelte template -->
  Hello
  <span class="world">{world}</span>
</h1>
