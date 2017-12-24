$(document).ready(
function()
{	
	$(".FormText").on('change keyup paste', function() {
		var start_date = document.getElementById("StartDate").value;
		console.log(start_date);
	});
	var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
	  console.log("this: " + this);
			  var jsonData = JSON.parse( this.responseText);
			  
		//alert("xhttp.status: " + xhttp.status);
		var tIncrement = [];
		var data = [];
		for (var i = 0; i < jsonData.dataset_data.data.length; i++) {
			var counter = jsonData.dataset_data.data[i];
			tIncrement.push(counter[0]);
			data.push(counter[1]);
		}

		var initialVal = jsonData.dataset_data.data[0][1];
		var finalVal = jsonData.dataset_data.data[1][1];
		
		var returnVal = Number((finalVal-initialVal)/finalVal*100).toFixed(2);
		document.getElementById("returnVal").innerHTML = "Percent Return: " + returnVal + "%";
		
		var ctx = document.getElementById('myChart').getContext('2d');
		var chart = new Chart(ctx, {
			// The type of chart we want to create
			type: 'line',

			// The data for our dataset
			data: {
				labels: tIncrement,
				datasets: [{
					label: "Stock vs. Year",
					//backgroundColor: 'rgb(99, 99, 132)',
					borderColor: 'rgb(255, 255, 255)',
					data: data,
				}]
			},

			// Configuration options go here
			options: {
				legend: {
					display: false,
				},
				scales:{
					xAxes: [{
						gridLines:{
							color: 'rgb(192, 192, 192)'
						},
						ticks:{
							fontColor: 'rgb(192, 192, 192)'
						}
					}],
					yAxes: [{
						gridLines:{
							color: 'rgb(192, 192, 192)'
						},
						ticks:{
							fontColor: 'rgb(192, 192, 192)'
						}
					}]
				}
			}
		});
		
		}
	  };
	  xhttp.open("GET", "https://www.quandl.com/api/v3/datasets/WIKI/FB/data.json?column_index=4&exclude_column_names=true&start_date=2016-12-23&end_date=2017-12-22&order=asc&collapse=daily", true);
	  xhttp.send();
});

function openTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}