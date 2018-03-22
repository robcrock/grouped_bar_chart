class groupedBarChart {

  constructor(opts) {

    this.element = opts.element;
    this.keys = opts.keys;
    this.data = opts.data;

    this.draw();

  }

  draw() {

    // Create the parent SVG
    this.width = 900;
    this.height = 648;
    this.margin = { top: 90, right: 10, bottom: 30, left: 75 };

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
    this.addTitles();
    this.createScales();
    this.addChart();
    this.addAxes();

  }

  createScales() {
    // These map our data to positions on the screen
    // https://github.com/d3/d3-scale

    // Major group

    // Minor group

    // Top of you y domain

    // y scale

  }

  addAxes() {

    // x axis

    // y axis

  }

  addTitles() {

    // Title

    // Subtitle

  }

  addChart() {

    // Major group

    // Bars within each group

  }

}
