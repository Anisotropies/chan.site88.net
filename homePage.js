$(document).ready(function() {
alert("hello!");
function UserAction() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/tas/2000/2010/USA",false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    alert("xhttp.status: " + xhttp.status);
    alert("response"+response);
}
});