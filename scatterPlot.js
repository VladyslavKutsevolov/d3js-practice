const bar = d3.select('.bar-chart');

const margin = { left: 150, top: 60, right: 20, bottom: 70 };

const barWidth = +bar.attr('width') - margin.left - margin.right;
const barHeight = +bar.attr('height') - margin.top - margin.bottom;


const render = data => {

    const title = 'Cars: Horsepower vs. Weight';

    const xValue = d => d.horsepower;
    const xAxisLabel = 'Horsepower';

    const yValue = d => d.acceleration;
    const circleRadius = 10;
    const yAxisLabel = 'Acceleration';


    const x = d3.scaleLinear()
        .domain(d3.extent(data, xValue))
        .range([0, barWidth])
        .nice();

    const y = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([barHeight, 0])
        .nice();

    const yAxis = d3.axisLeft(y)
        .tickSize(-barWidth)
        .tickPadding(15);

    const xAxis = d3.axisBottom(x)
        .tickSize(-barHeight)
        .tickPadding(10);

    const gBar = bar.append('g')
        .attr('transform', `translate(${margin.left} ${margin.top})`)

  const yAxisG = gBar.append('g')
        .call(yAxis)

      yAxisG
        .selectAll('.domain')
        .remove();

    yAxisG.append('text')
        .attr('class', 'yaxis-label')
        .attr('y', -55)
        .attr('x', -barHeight / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);

    const xAxisG = gBar.append('g')
        .call(xAxis)
        .attr('transform', `translate(0, ${barHeight})`)

    xAxisG
        .select('.domain')
        .remove();

    xAxisG.append('text')
        .attr('class', 'xaxis-label')
        .attr('y', 55)
        .attr('x', barWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel)



    gBar
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cy', d => y(yValue(d)))
        .attr('cx', d => x(xValue(d)))
        .attr('r', d => circleRadius)
        .attr('fill', 'steelblue')
        .attr('opacity', '.5');

    gBar
        .append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .text(title)
}


d3.csv('https://vizhub.com/curran/datasets/auto-mpg.csv')
    .then(data => {
        data.forEach(d => {
            d.mpg = +d.mpg;
            d.cylinders = +d.cylinders;
            d.displacement = +d.displacement;
            d.horsepower = +d.horsepower;
            d.weight = +d.weight;
            d.acceleration = +d.acceleration;
            d.year = +d.year;
        });
        render(data);
    });
