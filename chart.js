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
    this.margin = { top: 120, right: 10, bottom: 30, left: 75 };

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

    this.colorScale = d3.scaleOrdinal()
      .range(["#1295BA", "#5CA793", "#A2B86C", "#EBC844", "#ECAA37", "#EF8B2C"]);
  }

  addAxes() {

    const xAxis = this.plot.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.innerHeight + ")")
      .call(
          d3.axisBottom(this.x0Scale)
        );

    const yAxis = this.plot.append("g")
      .attr("class", "y axis").call(
      d3.axisLeft(this.yScale)
        .ticks(5)
        .tickSize(-this.innerWidth)
        .tickFormat(d3.format(".0%"))
      );

    const numberOfTicks = d3.selectAll(".y.axis .tick")._groups[0].length - 1;

    yAxis.selectAll(".tick")._groups[0].forEach( (tick, num) => {
      if ( num !== numberOfTicks) {
        tick.children[1].innerHTML = tick.children[1].innerHTML.replace("%", "");
      }
    })

  }

  addTitles() {

    this.plot.append('text')
      .attr("class", "chart title")
      .attr('x', 0)
      .attr('y', -60)
      .text("What British women (say they) want?");

    this.plot.append('text')
      .attr("class", "chart subtitle")
      .attr('x', 0)
      .attr('y', -20)
      .text("The bars represent a rank (1 to 6) and the percent of votes it recieved for a particular trait.");

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
