// Import required modules
import { scaleLinear, scaleBand, max, axisLeft, axisBottom } from 'd3'

/**
 * Sets up the X-scale and Y-scale based on X and Y values.
 *
 * @param {*} {xValue, yValue, innerWidth, innerHeight}
 * @param {object[]} data Data array of objects
 * @returns
 */
export function setupScales({
  xValue,
  yValue,
  innerWidth,
  innerHeight
}, data) {

  // X-axis domain + range
  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth])

  // Y-axis domain + range
  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])

  return { xScale, yScale }
}

/**
 * Renders a visualisation based on a given element, a dataset, and size properties.
 *
 * @param {Node} element The element to render the visualisation in. Usually an SVG.
 * @param {object[]} [data=[]] The array of objects (dataset) used to hydrate the visualisation
 * @param {object} options The size properties
 */
export function render(
  element,
  data,
  {
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
    width = 0,
    height
  }
) {

  // Calculate innerWidth to account for margins. Prevents overflow.
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  // Declare axis values to be reused throughout the flow.
  const [xValue, yValue] = [
    (data) => data.hourlyCost,
    (data) => data.description
    // (data) => data.areaManagerId
    // (data) => data.areaId
  ]

  const { xScale, yScale } = setupScales(
    {
      xValue,
      yValue,
      innerWidth,
      innerHeight,
    },
    data
  )

  // Create a new group element
  const g = element
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  // Append the yAxis labels to the group
  g.append('g').call(axisLeft(yScale))
  g.append('g').call(axisBottom(xScale))
    // Translate axis to the bottom
    .attr('transform', `translate(0, ${innerHeight})`)

  // Insert all data into the group
  g.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('y', (d) => yScale(d.description))
    .attr('width', (d) => xScale(d.hourlyCost))
    .attr('height', yScale.bandwidth())
}
