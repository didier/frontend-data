<script>
  import { onMount } from 'svelte'
  import { csv, scaleLinear, select } from 'd3'

  export let width = 900
  export let height = 700

  // Reference to the wrapper element
  let wrapper

  onMount(async () => {
    const data = await fetch(
      'https://opendata.rdw.nl/resource/534e-5vdg.json?$limt=10'
    )
      .then((res) => res.text())
      .then((data) => data)

    const svg = select('svg')

    svg.style('background', 'red')

    const height = +svg.attr('height')
    const width = +svg.attr('width')

    const circle = svg
      .append('circle')
      .attr('r', 30)
      .attr('cx', width / 2)
      .attr('cy', height / 2)

    /**
     * Renders a visualisation based on the data it receives.
     *
     * @param {TariefDeel[]} data The data to render
     */
    function render(data) {
      console.log(data)
      const xScale = scaleLinear()

      svg
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', 30)
        .attr('height', 30)
    }

    // Grab CSV data from the API and parse it with `d3-dsv`
    csv(data)
      // Turn all numeric strings into numbers
      .then((data) => {
        return data.map((object) => ({
          AreaManagerId: +object['AreaManagerId'],
          FareCalculationCode: object['FareCalculationCode'],
          StartDateFarePart: +object['StartDateFarePart'],
          StartDurationFarePart: +object['StartDurationFarePart'],
          EndDurationFarePart: +object['EndDurationFarePart'],
          AmountFarePart: +object['AmountFarePart'],
          StepSizeFarePart: +object['StepSizeFarePart'],
          EndDateFarePart: +object['EndDateFarePart'],
          AmountCumulative: +object['AmountCumulative'],
        }))
      })
      // Render cleaned data
      .then(render)
  })
</script>

<style>
  .chart :global(div) {
    font: 10px sans-serif;
    background-color: steelblue;
    text-align: right;
    padding: 3px;
    margin: 1px;
    color: white;
  }
</style>

<svg {width} {height} bind:this={wrapper} class="chart">
  <!-- <slot /> -->
</svg>
