$(document).ready(
function()
{		
	//var for chart
	var chart;
	
	
	//use GET request to get stock info
	
	$("#submitButton").hover(function(){
        $(this).css({"background-color": "lightgrey", "cursor": "pointer"});
        }, function(){
        $(this).css("background-color", "grey");
    });
	
	$("#submitButton").on( "click", function() {
		var wikiURL = "https://www.quandl.com/api/v3/datasets/WIKI/";
		var apiKey = "dqgc4_9drB6jbTos2Sqt";
		var companyCode = document.getElementById("ticker").value;
		
		var startDate = document.getElementById("StartDate").value;
		
		var endDate = document.getElementById("EndDate").value;
				
		var xhttp = new XMLHttpRequest();
		var requestURL = wikiURL + companyCode + "/data.json?api_key=" + apiKey + "&column_index=4&exclude_column_names=true&start_date=" + startDate + "&end_date=" + endDate + "&order=asc&collapse=daily";
	    xhttp.open("GET", requestURL, true);
	    xhttp.send();
		xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) 
		{
			var jsonData = JSON.parse( this.responseText);
			var tIncrement = [];
			var data = [];
			
			//Makes sure there is data
			if(jsonData.dataset_data.data.length>0)
			{
				for (var i = 0; i < jsonData.dataset_data.data.length; i++) {
					var counter = jsonData.dataset_data.data[i];
					tIncrement.push(counter[0]);
					data.push(counter[1]);
				}

				var initialVal = jsonData.dataset_data.data[0][1];
				var finalVal = jsonData.dataset_data.data[jsonData.dataset_data.data.length-1][1];
				
				var returnVal = Number((finalVal-initialVal)/initialVal*100).toFixed(2);
				document.getElementById("returnVal").innerHTML = "Percent Return: " + returnVal + "%";
				
				//destroy old chart data first https://stackoverflow.com/questions/42788924/chartjs-bar-chart-showing-old-data-when-hovering
				if (chart) {
					console.log("Destroying Old Chart");
					chart.destroy();
				}
				var ctx = document.getElementById('myChart').getContext('2d');
					chart = new Chart(ctx, {
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
		}
	  };

	});
	
});

//open tab logic
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
