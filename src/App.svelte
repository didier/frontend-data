<script>
  import Button from './components/atoms/Button.svelte'
  import D3Wrapper from './components/molecules/D3Wrapper.svelte'
  import Face from './components/molecules/Face.svelte'

  let isFaceShown = false
</script>

<h1>Hello</h1>
<Button on:click={() => (isFaceShown = !isFaceShown)} />

{#if isFaceShown}
  <Face />
{/if}

<D3Wrapper />
