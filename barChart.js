const bar = d3.select('.bar-chart');

const margin = { left: 100, top: 20, right: 20, bottom: 20 };

const barWidth = +bar.attr('width') - margin.left - margin.right;
const barHeight = +bar.attr('height') - margin.top - margin.bottom;


const render = data => {
    const xValue = d => d.population;
    const yValue = d => d.country;

    const x = d3.scaleLinear()
        .domain([0, d3.max(data, xValue)])
        .range([0, barWidth]);

    const y = d3.scaleBand()
        .domain(data.map(yValue))
        .range([0, barHeight])
        .padding(.1);

    const xAxisTicksFormat = num =>
        d3.format('.3s')(num)
            .replace('G', 'B')

    const yAxis = d3.axisLeft(y);
    const xAxis = d3.axisBottom(x).tickFormat(xAxisTicksFormat);

    const gBar = bar.append('g')
        .attr('transform', `translate(${margin.left} ${margin.top})`)

    gBar.append('g')
        .call(yAxis);

    gBar.append('g')
        .call(xAxis)
        .attr('transform', `translate(0, ${barHeight})`);



    gBar
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('y', d => y(yValue(d)))
        .attr('width', d => x(xValue(d)))
        .attr('height', d => y.bandwidth())
        .attr('fill', 'steelblue')
}


d3.csv('populationData.csv').then(data => {
    data.forEach(d => d.population = +d.population * 1000)
    render(data)
})

