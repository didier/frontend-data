<script>
  // Imports
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { select } from 'd3'

  // Utils
  import { render } from '/src/modules/chart-utils'
  import { sortBy, getData } from '/src/modules/utils'

  // Constants
  import {
    TARIEFDEEL,
    SPECIFICATIES_PARKEERGEBIED,
    GEO_PARKEERGARAGES,
  } from './constants'

  // Components
  import Container from '../../atoms/Container.svelte'

  // Props
  let innerWidth = 1000
  let innerHeight = 1000

  onMount(async () => {
    // Select SVG element using `d3.select`
    const svg = select('svg')

    // Destructure width and height from the SVG attributes
    const [width, height] = [+svg.attr('width'), +svg.attr('height')]

    // Setup margins for the visualisation
    const margin = { top: 64, right: 0, bottom: 64, left: 0 }

    // Fetch the data from the RDW
    const data = await fetch(TARIEFDEEL)
      .then((res) => res.json())
      .then((data) => data)

    const [tarief, geo, specs] = await getData([
      TARIEFDEEL,
      GEO_PARKEERGARAGES,
      SPECIFICATIES_PARKEERGEBIED,
    ])

    // Remove unused data and clean up object key names
    const cleanData = await data
      .map((entry) => ({
        // Cost of parking for one hour.
        hourlyCost: (entry.amountfarepart / entry.stepsizefarepart) * 60,
        // The area ID of the parking zone.
        areaId: entry.areamanagerid,
      }))
      .filter((entry) => entry.hourlyCost <= 10)

    // Sort cost ascending
    sortBy(cleanData, 'hourlyCost')

    // render(svg, cleanData, margin)
    render(svg, cleanData, {
      margin,
      width,
      height,
    })
  })
</script>

<style>
  :global(rect) {
    fill: theme('colors.blue.800');
  }

  :global(text) {
    font-size: 2em;
  }
</style>

<Container>
  <svg transition:fade height={innerHeight} width={innerWidth} />
</Container>
