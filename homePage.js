$(document).ready(function() {
    xhttp.open("GET","http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/tas/2000/2010/USA" , true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    alert(response);
});