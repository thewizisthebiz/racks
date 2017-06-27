var alr = document.getElementById("alert");
var par = document.getElementById("paragraph");
var pos = document.getElementById("position");
var str = document.getElementById("street");
var nei = document.getElementById("neighborhood");
var cit = document.getElementById("city");
var sta = document.getElementById("state");
var zip = document.getElementById("zip");

function getLocation() {
  try
  {
    if (navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(getInfo);
    }
    else
    {
      alr.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  catch(e)
  {
    alr.innerHTML = "Geolocation is not supported by this browser.";
  }
}
    
//Shows the position numbers
function showPosition(lat,long)
{
    pos.innerHTML = "Latitude: " + lat + 
    "<br>Longitude: " + long; 

    str.value = data.results[0].address_components[1].long_name;
    nei.value = data.results[0].address_components[2].long_name;

    document.getElementById("lat").value = lat;
    document.getElementById("long").value = long;
}

//Show the address in a paragraph
function showComplete(data)
{

}

//Fills out the form
function fillForm(data)
{
  str.value = data.results[0].address_components[1].long_name;
  nei.value = data.results[0].address_components[2].long_name;
  cit.value = data.results[0].address_components[4].long_name;
  sta.value = data.results[0].address_components[5].short_name;
  zip.value = data.results[0].address_components[7].short_name;
}

function getInfo(position)
{
  latlng = position.coords.latitude+","+position.coords.longitude;
  lat = position.coords.latitude;
  lng = position.coords.longitude; 

  request = new XMLHttpRequest();
  request.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latlng, true);

  request.onload = function() 
  {
    if (request.status == 200 || request.status == 0 )
    {
      // Success!
      data = JSON.parse(request.responseText);
      
      //Call the method that will handle the address information
      fillForm(data);
      showPosition(position.coords.latitude, position.coords.longitude);
    }
    else
    {
      // We reached our target server, but it returned an error
      alr.textContent = "Google Server Request didn't worked";
    }
  };

  request.onerror = function()
  {
    // There was a connection error of some sort
    alr.textContent = "Google Server Request didn't worked";
  };

  request.send();
}

document.getElementById("okbutton").addEventListener("click", getLocation);