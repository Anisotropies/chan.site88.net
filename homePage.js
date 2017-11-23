$(document).ready(function() {
});

function UserAction() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","http://climatedataapi.worldbank.org/climateweb/rest/v1/country/cru/tas/year/USA",false);
    //xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    alert("xhttp.status: " + xhttp.status);
    var a = "b";
    alert("response"+response;
}