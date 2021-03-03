const colorLegend = (selection, props) => {
    const {
        colorScale,
        circleRadius,
        spacing,
        textOffset,
        backgroundRectWidth
    } = props;

    const backgroundRect = selection.selectAll('rect')
        .data([null]);
    const n = colorScale.domain().length;
    backgroundRect.enter().append('rect')
        .merge(backgroundRect)
        .attr('x', -circleRadius * 2)
        .attr('y', -circleRadius * 2)
        .attr('rx', circleRadius * 2)
        .attr('width', backgroundRectWidth)
        .attr('height', spacing * n + circleRadius * 2)
        .attr('fill', 'white')
        .attr('opacity', 0.8);


    const groups = selection.selectAll('.tick')
        .data(colorScale.domain());
    const groupsEnter = groups
        .enter().append('g')
        .attr('class', 'tick');
    groupsEnter
        .merge(groups)
        .attr('transform', (d, i) =>
            `translate(0, ${i * spacing})`
        );
    groups.exit().remove();
    //comment

    groupsEnter.append('circle')
        .merge(groups.select('circle'))
        .attr('r', circleRadius)
        .attr('fill', colorScale);

    groupsEnter.append('text')
        .merge(groups.select('text'))
        .text(d => d)
        .attr('dy', '0.32em')
        .attr('x', textOffset);
}



const svg = d3.select('svg');

const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection);

const g = svg.append('g')

g.append('path')
    .attr('class', 'sphere')
    .attr('d', pathGenerator({type: 'Sphere'}));



svg.call(d3.zoom().on('zoom', (e) => {
    g.attr("transform", (transform = e.transform));
}) )



Promise.all([
    d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/50m.tsv'),
    d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json')
]).then(([tsvData, topoJSONData]) => {
    const rowById = tsvData.reduce((acc,d) => {
        acc[d.iso_n3] = d
        return acc;
    }, {})

    const colorLegendG = svg.append('g')
        .attr('transform', `translate(40,310)`);


    const countries =  topojson.feature(topoJSONData, topoJSONData.objects.countries);
    const colorScale = d3.scaleOrdinal();
    const colorValue = d => d.properties.economy;

    countries.features.forEach(d => {
        Object.assign(d.properties, rowById[d.id])
    });

    colorScale
        .domain(countries.features.map(colorValue))
        .domain(colorScale.domain().sort().reverse())
        .range(d3.schemeSpectral[colorScale.domain().length]);

    colorLegendG.call(colorLegend, {
        colorScale,
        circleRadius: 8,
        spacing: 20,
        textOffset: 12,
        backgroundRectWidth: 235
    });

    g.selectAll('path')
        .data(countries.features).enter()
        .append('path')
            .attr('class', 'country')
            .attr('d', pathGenerator)
            .attr('fill', d => colorScale(colorValue(d)))
        .append('title')
            .text(d => d.properties.name + ': '+ colorValue(d))
});
