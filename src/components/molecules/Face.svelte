<script>
  // Packages
  import { onMount } from 'svelte'
  import { select, arc } from 'd3'
  onMo
  const EYE_SPACING = 100
  const EYE_RADIUS = 40
  const Y_OFFSET = -70
  const STROKE_WIDTH = 4
  const EYEBROW_WIDTH = 70
  const EYEBROW_HEIGHT = 15

  onMount(() => {
    const svg = select('svg')

    const width = +svg.attr('width')
    const height = +svg.attr('height')

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

    const head = g
      .append('circle')
      .attr('r', height / 2)
      .attr('fill', 'yellow')
      .attr('stroke', 'black')
      .attr('stroke-width', STROKE_WIDTH)

    const eyes = g.append('g').attr('transform', `translate(0, ${Y_OFFSET})`)

    const eyebrows = eyes
      .append('g')
      .attr('transform', `translate(0, ${Y_OFFSET})`)

    eyebrows
      .transition()
      .duration(1500)
      .attr('transform', `translate(0, ${Y_OFFSET - 25})`)
      .transition()
      .duration(1500)
      .attr('transform', `translate(0, ${Y_OFFSET})`)

    const leftEye = eyes
      .append('circle')
      .attr('r', EYE_RADIUS)
      .attr('cx', -EYE_SPACING)

    const leftEyebrow = eyebrows
      .append('rect')
      .attr('x', -EYE_SPACING - EYEBROW_WIDTH / 2)
      .attr('width', EYEBROW_WIDTH)
      .attr('height', EYEBROW_HEIGHT)

    const rightEyebrow = eyebrows
      .append('rect')
      .attr('x', EYE_SPACING - EYEBROW_WIDTH / 2)
      .attr('width', EYEBROW_WIDTH)
      .attr('height', EYEBROW_HEIGHT)

    const rightEye = eyes
      .append('circle')
      .attr('r', EYE_RADIUS)
      .attr('cx', EYE_SPACING)

    const mouthProperties = {
      innerRadius: EYE_RADIUS * 3,
      outerRadius: EYE_RADIUS * 4,
      startAngle: Math.PI / 2,
      endAngle: (Math.PI * 3) / 2,
    }

    const mouth = g.append('path').attr('d', arc()(mouthProperties))
  })
</script>

<svg width="700" height="500" />
