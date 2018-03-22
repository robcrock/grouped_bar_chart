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

    this.x0Scale = d3.scaleBand()
      .domain(this.keys)
      .rangeRound([0, this.innerWidth])
      .paddingInner(0.1);

    this.x1Scale = d3.scaleBand()
      .domain(this.keys)
      .rangeRound([0, this.x0Scale.bandwidth()])
      .padding(0.05);

    const yMax = d3.max(this.data.map(d => d3.max(this.keys.map(key => d[key]))));

    this.yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .rangeRound([this.innerHeight, 0]);

  }

  addAxes() {

    const xAxis = this.plot.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.innerHeight + ")")
      .call(
        d3.axisBottom(this.x0Scale)
      );

    const yAxis = this.plot.append("g")
      .attr("class", "y axis")
      .call(
        d3.axisLeft(this.yScale)
          .ticks(5)
          .tickSize(-this.innerWidth)
          .tickFormat(d3.format(".0%")
        )
      );

  }

  addTitles() {

    this.plot.append('text')
      .attr("class", "chart title")
      .attr('x', 0)
      .attr('y', -45)
      .text("What British women want?");

    this.plot.append('text')
      .attr("class", "chart subtitle")
      .attr('x', 0)
      .attr('y', -20)
      .attr("dy", 0)
      .text("Each bar represents a ranks, from 1 to 6, where 1 is highly desirable and 6 is not at all.");

  }

  addChart() {

    const majorG = this.plot.append("g")
      .selectAll("g")
      .data(this.data)
      .enter().append("g")
      .attr("transform", (d, i) => {
        return "translate(" + this.x0Scale(this.keys[i]) + ",0)";
      })

    const minorG = majorG.selectAll("rect")
      .data( d => this.keys.map( key => ({ key: key, value: +d[key] }) ) );

    minorG.enter().append("rect")
      .attr("x", d => this.x1Scale(d.key) )
      .attr("y", d => this.yScale(d.value) )
      .attr("width", this.x1Scale.bandwidth())
      .attr("height", d => this.innerHeight - this.yScale(d.value) )
      .attr("fill", "#3399CC" );

  }

}
