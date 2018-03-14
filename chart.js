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
    this.margin = { top: 20, right: 20, bottom: 30, left: 40 };

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

    console.log(this.keys);

    this.x0Scale = d3.scaleBand()
      .domain(this.keys)
      .rangeRound([0, innerWidth])
      .paddingInner(0.1);

    this.x1Scale = d3.scaleBand()
      .domain(this.keys)
      .rangeRound([0, this.x0Scale.bandwidth()])
      .padding(0.05);

    
    console.log(this.data[0]);
    
    const maxList = [];
    for(let i = 0; i < this.data.length; i++) {
      maxList.push( d3.max(this.keys.map( question => this.data[i][question] )) );
    }
    console.log(d3.max(maxList));

    // STOPPED REFACTORING HERE

    this.colorScale = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
  }

  addAxes() {
    // Axes aren't necessary for every chart type, but
    // you know where to add your code if you need them.
    g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(this.x0Scale));

    g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(this.yScale).ticks(null, "s"))
      .append("text")
      .attr("x", 2)
      .attr("y", this.yScale(this.yScale.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Population");

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
    g.append("g")
      .selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("transform", function (d) { return "translate(" + this.x0Scale(d.State) + ",0)"; })
      .selectAll("rect")
      .data(function (d) { return keys.map(function (key) { return { key: key, value: d[key] }; }); })
      .enter().append("rect")
      .attr("x", function (d) { return this.x1Scale(d.key); })
      .attr("y", function (d) { return this.yScale(d.value); })
      .attr("width", this.x1Scale.bandwidth())
      .attr("height", function (d) { return height - this.yScale(d.value); })
      .attr("fill", function (d) { return this.colorScale(d.key); });
  }

}
