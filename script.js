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
