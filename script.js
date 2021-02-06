

const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const g = svg.append('g')
    .attr('transform', `translate(${width/2}, ${height/2})`)

const circle = g.append('circle')
    .attr('r', 200)
    .attr('fill', 'yellow')
    .attr('stroke', 'black');


const leftEye = g.append('circle')
    .attr('r', 30)
    .attr('cx', - 100 )
    .attr('cy', - 50)
    .attr('fill', 'black');


const rightEye = g.append('circle')
    .attr('r', 30)
    .attr('cx', 100 )
    .attr('cy', - 50)
    .attr('fill', 'black');




const mouth = g.append('path')
    .attr('d', d3.arc()({
        innerRadius: 150,
        outerRadius: 170,
        startAngle: Math.PI / 2,
        endAngle: Math.PI * 3/2
    }))
