
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
    const countryName = tsvData.reduce((acc,d) => {
        acc[d.iso_n3] = d.name
        return acc;
    }, {})

    const countries =  topojson.feature(topoJSONData, topoJSONData.objects.countries);

    g.selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('class', 'country')
        .attr('d', pathGenerator)
        .append('title')
        .text(d => countryName[d.id])
});
