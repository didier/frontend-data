<script>
  // Imports
  import { onMount } from 'svelte'
  import { select, scaleLinear, max, scaleBand, axisLeft, axisBottom } from 'd3'

  // Components
  import Container from '../../atoms/Container.svelte'

  // Props
  let innerWidth, innerHeight

  // Constants
  import { TARIEFDEEL_API } from './constants'

  onMount(async () => {
    /**
     * Renders a visualisation based on a given element and dataset.
     *
     * @param {NodeList} element - The (usually) SVG element to append the graph to
     * @param {Array} data - the dataset with which to hydrate the visualisation
     */
    function render(element, data) {
      // Declare axis values to be reused throughout the flow.
      const [xValue, yValue] = [(d) => d.hourlyCost, (d) => d.areaId]
      const [width, height] = [+element.attr('width'), +element.attr('height')]

      // Apply margins to the visualisation
      const margin = { top: 200, right: 200, bottom: 200, left: 200 }

      // Calculate innerWidth to account for margins. Prevents overflow.
      const innerWidth = width - margin.left - margin.right
      const innerHeight = height - margin.top - margin.bottom

      // X-axis domain + range
      const xScale = scaleLinear()
        .domain([0, max(data, xValue)])
        .range([0, innerWidth])

      // Y-axis domain + range
      const yScale = scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])

      // Create a new group element
      const g = element
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

      // Append the yAxis labels to the group
      g.append('g').call(axisLeft(yScale))
      g.append('g').call(axisBottom(xScale))

      // Insert all data into the group
      g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('y', (d) => yScale(d.areaId))
        .attr('width', (d) => xScale(d.hourlyCost))
        .attr('height', yScale.bandwidth())
    }

    // Fetch the data from the RDW
    const data = await fetch(TARIEFDEEL_API)
      .then((res) => res.json())
      .then((data) => data)

    // Remove unused data and clean up object key names
    const cleanData = await data
      .map((entry) => {
        return {
          // Cost of parking for one hour.
          hourlyCost: (entry.amountfarepart / entry.stepsizefarepart) * 60,
          // The area ID of the parking zone.
          areaId: entry.areamanagerid,
        }
      })
      // Sort cost ascending
      .sort((a, z) => a.hourlyCost - z.hourlyCost)

    const svg = select('svg')
    render(svg, cleanData)
  })
</script>

<svelte:window bind:innerWidth bind:innerHeight />
<Container bind:innerWidth bind:innerHeight>
  {#key (innerHeight, innerWidth)}
    <svg height={innerHeight} width={innerWidth} />
  {/key}
</Container>
