class Chart {

  constructor(opts) {

    this.element = opts.element;
    this.keys = opts.keys;
    this.data = opts.data;

    this.draw();

  }

  draw() {

    // Create the parent SVG
    this.width = 960;
    this.height = 500;
    this.margin = { top: 100, right: 10, bottom: 30, left: 75 };

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

    this.colorScale = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
  }

  addAxes() {

    this.plot.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.innerHeight + ")")
      .call(
          d3.axisBottom(this.x0Scale)
        );

    this.plot.append("g")
      .attr("class", "y axis")
      .call(
          d3.axisLeft(this.yScale)
            .ticks(5)
            .tickFormat(d3.format(".0%"))
        );

  }

  addTitles() {

    this.plot.append('text')
      .attr("class", "chart title")
      .attr('x', 0)
      .attr('y', -50)
      .text("Which characteristic do British women find most attractive?");

    this.plot.append('text')
      .attr("class", "chart subtitle")
      .attr('x', 0)
      .attr('y', -15)
      .text("Below are the six traits and distribution of votes by rank");
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
      .attr("fill", d => this.colorScale(d.key) );

  }

}
