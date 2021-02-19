
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

    g.selectAll('path')
        .data(countries.features).enter()
        .append('path')
            .attr('class', 'country')
            .attr('d', pathGenerator)
            .attr('fill', d => colorScale(colorValue(d)))
        .append('title')
            .text(d => d.properties.name + ': '+ colorValue(d))
});
