d3.csv('data.csv').then( data => {

  const questions = Object.keys(data[0]).slice(1);

  data.forEach( rank => {
    questions.forEach( key => {
      rank[key] = +rank[key];
    })
  });

  createChart(questions, data);
});

function createChart(keys, data) {

  const chart = new Chart({
    element: document.querySelector('body'),
    keys: keys,
    data: data
  });

}