d3.csv('data.csv').then(data => {
  // Transform your data
  createChart(data);

});

function createChart(data) {

  const chart = new Chart({
    element: document.querySelector('body'),
    data: data
  });

}