const svg = d3.select('svg');

const margin = { left: 65, top: 0, right: 50, bottom: 0 };
const width = document.body.clientWidth;
const height = document.body.clientHeight;
const innerWidth = document.body.clientWidth - margin.left - margin.right;
const innerHeight = document.body.clientHeight - margin.top - margin.bottom;

const zoomG = svg
    .attr('width', width)
    .attr('height', height)
    .append('g')

const g = zoomG.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

svg.call(d3.zoom().on('zoom', (e) => {
    zoomG.attr('transform', (transform = e.transform));
}))
const tree = d3.tree()
    .size([innerHeight, innerWidth]);

d3.json('worldTreeData.json')
    .then(data => {
        const root = d3.hierarchy(data);
        const links = tree(root).links();
        const linkPathGenerator = d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x);

        g.selectAll('path').data(links)
            .enter().append('path')
            .attr('d', linkPathGenerator)
            .attr('fill', 'none')
            .attr('stroke', '#57bdc3')
            .attr('stroke-width', 1);

        g.selectAll('text').data(root.descendants())
            .enter().append('text')
            .attr('x', d => d.y)
            .attr('y', d => d.x)
            .attr('dy', '.32em')
            .attr('text-anchor', d => d.children
                ? 'middle'
                : 'start')
            .attr('font-size', d => 3.25 - d.depth + 'em' )
            .text(d => d.data.data.id)
    });

