class Chart {

  constructor(opts) {

    this.element = opts.element;
    this.data = opts.data;

    this.draw();

  }

  draw() {

    // Create the parent SVG
    this.width = 960;
    this.height = 500;
    this.margin = { top: 75, right: 15, bottom: 50, left: 50 };

    // Give your title and axes some space
    this.innerHeight = this.height - (this.margin.top + this.margin.bottom);
    this.innerWidth = this.width - (this.margin.right + this.margin.left);

    const svg = d3.select(this.element).append('svg');

    svg
      .attr('width', this.width)
      .attr('height', this.height);

    this.plot = svg.append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    // Call the necessary functions
    this.createScales();
    this.addAxes();
    this.addTitles()
    this.addChart();
  }

  createScales() {
    // These map our data to positions on the screen
    // https://github.com/d3/d3-scale

    // this.xScale = d3.someScale()
    //   .domain([])
    //   .range([]);

    // this.yScale = d3.someScale()
    //   .range([])
    //   .domain([]);
  }

  addAxes() {
    // Axes aren't necessary for every chart type, but
    // you know where to add your code if you need them.

  }

  addTitles() {
    // Add chart title
    this.plot.append('text')
      .attr("class", "chart title")
      .attr('x', 0)
      .attr('y', -30)
      .text("Main point or question to ponder");

    // Add chart subtitle
    this.plot.append('text')
      .attr("class", "chart subtitle")
      .attr('x', 0)
      .attr('y', -5)
      .text("Supportive information to aid graphicacy");

    // Add x-axis title

    // Add y-axis title
  }

  addChart() {
    // Now it is time to see those lovely SVGs <3
  }

}
