$(document).ready(function() {

var xhttp = new XMLHttpRequest();
var response;
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      reponse = this.responseText;
    }
  };
    xhttp.open("GET","http://climatedataapi.worldbank.org/climateweb/rest/v1/country/cru/tas/year/USA",true);
    xhttp.send();
	console.log("xhttp.responseText " + response);
    var jsonData = JSON.parse(response);
    //alert("xhttp.status: " + xhttp.status);
    var years = [];
    var dataSet = [];
for (var i = 0; i < jsonData.length; i+=5) {
    var counter = jsonData[i];
    years.push(counter.year);
    dataSet.push(counter.data);
}
//alert(years);
//alert(dataSet);

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: years,
        datasets: [{
            label: "US Temperature v. Year",
            //backgroundColor: 'rgb(99, 99, 132)',
            borderColor: 'rgb(132, 185, 91)',
            data: dataSet,
        }]
    },

    // Configuration options go here
    options: {}
});



});

function UserAction() {
    


}