<script>
  // Props
  export let type = 'text'
  export let id = ''
  export let label = ''

  // Local variables
  let invalid = false
  let value = ''
</script>

<style>
  input,
  textarea {
    appearance: none;
  }

  textarea {
    box-shadow: 0px 2px 12px -4px rgba(0, 0, 0, 0.25);
  }

  .invalid {
    border-color: red;
  }
</style>

<label for={id}>
  <p>{label}</p>
</label>

{#if type === 'textarea'}
  <textarea {id} bind:value />
{:else}<input {id} type="text" bind:value class:invalid />{/if}
