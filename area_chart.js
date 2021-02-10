const chart = d3.select('.area_chart');

const margin = { left: 150, top: 60, right: 20, bottom: 70 };

const chartWidth = +chart.attr('width') - margin.left - margin.right;
const chartHeight = +chart.attr('height') - margin.top - margin.bottom;


const render = data => {

    const title = 'Week in San Francisco';

    const xValue = d => d.timestamp;
    const xAxisLabel = 'Time';

    const yValue = d => d.temperature;
    const yAxisLabel = 'Temperature';


    const x = d3.scaleTime()
        .domain(d3.extent(data, xValue))
        .range([0, chartWidth]);

    const y = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([chartHeight, 0])
        .nice();

    const yAxis = d3.axisLeft(y)
        .tickSize(-chartWidth)
        .tickPadding(15);

    const xAxis = d3.axisBottom(x)
        .ticks(7)
        .tickSize(-chartHeight)
        .tickPadding(10);

    const gBar = chart.append('g')
        .attr('transform', `translate(${margin.left} ${margin.top})`)

    const yAxisG = gBar.append('g')
        .call(yAxis)

    yAxisG
        .selectAll('.domain')
        .remove();

    yAxisG.append('text')
        .attr('class', 'yaxis-label')
        .attr('y', -55)
        .attr('x', -chartHeight / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);

    const xAxisG = gBar.append('g')
        .call(xAxis)
        .attr('transform', `translate(0, ${chartHeight})`)

    xAxisG
        .select('.domain')
        .remove();

    xAxisG.append('text')
        .attr('class', 'xaxis-label')
        .attr('y', 55)
        .attr('x', chartWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel);

    const area = d3.area()
        .x(d => x(xValue(d)))
        .y0(chartHeight)
        .y1(d => y(yValue(d)))
        .curve(d3.curveBasis);


    gBar.append('path')
        .attr('fill', 'steelblue')
        .attr('d', area(data))


    gBar
        .append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .text(title)
}


d3.csv('https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv')
    .then(data => {
        data.forEach(d => {
            d.temperature = +d.temperature;
            d.timestamp = new Date(d.timestamp)
        });
        render(data);
    });
