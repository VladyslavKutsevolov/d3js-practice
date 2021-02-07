
//Smile face
const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const g = svg.append('g')
    .attr('transform', `translate(${width/2}, ${height/2})`)

const circle = g.append('circle')
    .attr('r', 200)
    .attr('fill', 'yellow')
    .attr('stroke', 'black');

const eyeSpacing = 100;
const eyeYOffset = - 40;
const eyeRadius = 30;
const eyeBrowWidth = 50;
const eyeBrowHeight = 15;
const eyeBrowYOffset = -45;


const eyeG = g.append('g')
    .attr('transform', `translate(0, ${eyeYOffset})`);

const eyeBrowG = eyeG
    .append('g')
        .attr('transform', `translate(0, ${eyeBrowYOffset})`);

eyeBrowG
    .transition().duration(2000)
        .attr('transform', `translate(0, ${eyeBrowYOffset - 50})`)
    .transition().duration(2000)
        .attr('transform', `translate(0, ${eyeBrowYOffset})`)



const leftEye = eyeG.append('circle')
    .attr('r', eyeRadius)
    .attr('cx', - eyeSpacing )
    .attr('cy', eyeYOffset)
    .transition().duration(2000)
        .attr('cx', eyeSpacing + 10 )
        .attr('cy', eyeYOffset + 20);

const rightEye = eyeG
    .append('circle')
        .attr('r', eyeRadius)
        .attr('cx', eyeSpacing )
        .attr('cy', eyeYOffset)
    .transition().duration(2000)
        .attr('cx', eyeSpacing - 50 )
        .attr('cy', eyeYOffset - 20)


const leftEyeBrow = eyeBrowG.append('rect')
    .attr('x', -eyeSpacing - eyeBrowWidth/2)
    .attr('y', eyeBrowYOffset)
    .attr('width', eyeBrowWidth)
    .attr('height', eyeBrowHeight)

const rightEyeBrow = eyeBrowG
    .append('rect')
        .attr('x', eyeSpacing - eyeBrowWidth/2)
        .attr('y', eyeBrowYOffset)
        .attr('width', eyeBrowWidth)
        .attr('height', eyeBrowHeight)




const mouth = g.append('path')
    .attr('d', d3.arc()({
        innerRadius: 150,
        outerRadius: 170,
        startAngle: Math.PI / 2,
        endAngle: Math.PI * 3/2
    }))
