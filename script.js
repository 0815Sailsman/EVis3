let available = null;
const socket = new WebSocket('ws://192.168.137.76:8080');
socket.addEventListener('open', function (event) {
	socket.send('init');
});

socket.addEventListener('message', function (event) {
	console.log(event.data);
	if (event.data.split("|")[0]=="init") {
		available = event.data.split("|")[1].split(",");
		available.forEach(element => document.getElementById("plainlist").innerHTML += "<p id="+element+">" + formatData("|"+element+"|-1") + "</p>");
	} else {
		console.log(available);
		if (available.includes(event.data.split("|")[1])) {
		document.getElementById(event.data.split("|")[1]).innerHTML = formatData(event.data);
		}
	}
	socket.send("cool command");
});
	 
const contactServer = () => {
	socket.send("Initialize");
}

  function formatData(data) {
	let dataType = data.split("|")[1];
	return getTypeImg(dataType) + dataType + ": " + data.split("|")[2];
  }

function getTypeImg(type) {
	let result = "";
	result = "<img src=\'" + type.toLowerCase() + ".png\' class=\'dataimg\'></img>";
	return result;
}

function sendInstruction(msg) {
	socket.send(msg);
}

function createChart(data) {
    return new Chart(
      document.getElementById('actual_graph'),
      {
        data: {
          labels: data.map(row => row.year),
          datasets: [
			{
				type: 'bar',
				label: 'Bar Dataset',
				data: [10, 20, 30, 40, 50, 60, 70]
			},
            {
				type: 'line',
            	label: 'Acquisitions by year',
            	data: data.map(row => row.count)
            }
          ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
      }
    );
};

const data = [
	{ year: 2010, count: 10 },
	{ year: 2011, count: 20 },
	{ year: 2012, count: 15 },
	{ year: 2013, count: 25 },
	{ year: 2014, count: 22 },
	{ year: 2015, count: 30 },
	{ year: 2016, count: 28 },
  ];

let chart = createChart(data);

function addPoint() {
	chart.data.labels.push("2017");
    chart.data.datasets.forEach((dataset) => {
		switch (dataset.label) {
			case "Bar Dataset":
				dataset.data.push(100);
				break;
			case "Acquisitions by year":
				dataset.data.push(250);
			default:
				break;
		}
    });
    chart.update();
}