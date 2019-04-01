//venn diagram
var sets = [ {sets: ['The audience'], size: 12}, 
             {sets: ['The market'], size: 12},
             {sets: ['The audience','The market'], size: 3}
            ];

var chart = venn.VennDiagram()
d3.select("#venn").datum(sets).call(chart);

            
d3.selectAll("#venn .venn-circle path")
    .style("fill-opacity", .8);

d3.selectAll("#venn text").style("fill", "white");

d3.selectAll("#venn .venn-circle")
    .on("mouseover", function(d, i) {
        var node = d3.select(this).transition();
        node.select("path").style("fill-opacity", .2);
        node.select("text").style("font-weight", "100")
                           .style("font-size", "36px");
    })
    .on("mouseout", function(d, i) {
        var node = d3.select(this).transition();
        node.select("path").style("fill-opacity", 0);
        node.select("text").style("font-weight", "100")
                           .style("font-size", "24px");
    });