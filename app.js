d3.csv('data.csv').then( data => {
  
  const majorCat = Object.keys(data[0]).slice(1);
  const minorCat = data.map( obj => obj[Object.keys(obj)[0]]);

  data.forEach(obj => {
    majorCat.forEach(key => {
      obj[key] = +obj[key];
    })
  });

  createChart(majorCat, minorCat, data);

});

function createChart(majorCat, minorCat, data) {

  const chart = new groupedBarChart({
    element: document.querySelector('body'),
    majorCat: majorCat,
    minorCat: minorCat,
    data: data
  });

}