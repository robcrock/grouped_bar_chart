d3.csv('data.csv').then( data => {
  
  const keys = Object.keys(data[0]).slice(1);

  data.forEach(obj => {
    keys.forEach(key => {
      obj[key] = +obj[key];
    })
  });

  createChart(keys, data);

});

function createChart(keys, data) {

  const chart = new groupedBarChart({
    element: document.querySelector('body'),
    keys: keys,
    data: data
  });

}