<script>
  // Imports
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { select } from 'd3'

  // Utils
  import { render } from '/src/modules/chart-utils'
  import cleanData from '/src/modules/data.js'

  // Components
  import Container from '../atoms/Container.svelte'

  // Props
  let svgWidth = 1000
  let svgHeight = 1000

  onMount(async () => {
    // Select SVG element using `d3.select`
    const svg = select('svg')

    // Destructure width and height from the SVG attributes
    const [width, height] = [+svg.attr('width'), +svg.attr('height')]

    // Setup margins for the visualisation
    const margin = { top: 64, right: 64, bottom: 64, left: 128 }

    // Fetch the data from the RDW
    const data = await cleanData()
    console.log(data[0])

    render(svg, data, {
      margin,
      width,
      height,
    })
  })
</script>

<style>
  .wrapper {
    width: 100%;
    height: 100%;
  }

  :global(rect) {
    fill: theme('colors.blue.800');
    margin-top: 800px;
  }

  :global(text) {
    /* font-size: 2em; */
    padding-top: 800px;
  }

  svg {
    margin: 0 auto;
  }
</style>

<svelte:window bind:innerHeight={svgHeight} bind:innerWidth={svgWidth} />
<!-- <Container> -->
<!-- <div class="wrapper"> -->
<svg transition:fade height={svgHeight} width={svgWidth} />
<!-- </div> -->
<!-- </Container> -->
