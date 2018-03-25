class groupedBarChart {

  constructor(opts) {

    this.element = opts.element;
    this.majorCat = opts.majorCat;
    this.minorCat = opts.minorCat;
    this.data = opts.data;

    this.draw();

  }

  draw() {

    // Create the parent SVG
    this.width = 900;
    this.height = 648;
    this.margin = { top: 145, right: 10, bottom: 30, left: 75 };

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

  addTitles() {

    this.plot.append('text')
      .attr("class", "chart title")
      .attr('x', 0)
      .attr('y', -90)
      .text("What British women want?");

    this.plot.append('text')
      .attr("class", "chart subtitle")
      .attr('x', 0)
      .attr('y', -55)
      .attr("dy", 0)
      .text("Women ranked the traits below in attractiveness from 1 to 6. The bars tell us the percentage each rank received.")

  }

  createScales() {

    this.x0Scale = d3.scaleBand()
      .domain(this.majorCat)
      .rangeRound([0, this.innerWidth])
      .paddingInner(0.1);

    this.x1Scale = d3.scaleBand()
      .domain(this.minorCat)
      .rangeRound([0, this.x0Scale.bandwidth()])
      .padding(0.05);

    const yMax = d3.max(this.data.map(d => d3.max(this.majorCat.map(key => d[key]))));

    this.yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .rangeRound([this.innerHeight, 0]);

  }

  addChart() {

    const majorG = this.plot.append("g")
      .selectAll("g")
      .data(this.data)
      .enter().append("g")
        .attr("transform", (d, i) => `translate( ${this.x0Scale(this.majorCat[i])}, 0)`);
    
    const minorG = majorG.selectAll("rect")
      .data( d => this.majorCat.map((key, i) => ({ key: this.minorCat[i], value: d[key] })))
      .enter().append("rect")
        .attr("x", d => this.x1Scale(d.key) )
        .attr("y", d => this.yScale(d.value) )
        .attr("width", this.x1Scale.bandwidth())
        .attr("height", d => this.innerHeight - this.yScale(d.value) )
        .attr("fill", "#3399CC" );

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

}
