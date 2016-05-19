
	// define a javascript namespace for the object to prevent script collisions
	GMPN = (typeof GMPN == "undefined") ? {} : GMPN;

	/////////////////////////////////////////////////////////////////////////////////////////
	//Set Default value of Global Variable.
	GMPN.INSTALLED_PATH = "/Custom/Extensions/PlacesNearby/";
	GMPN.ADDRESS = null;//if both address andd latLng are provided, use latLng to plot the main marker.
	GMPN.LATLNG = null;
	GMPN.SHOW_MAP = true;  //if true, show map initially
	GMPN.MAX_WIDTH = 600; //max window width of PlacesNearb
	GMPN.HEIGHT = 400;  //window height of PlacesNearby
	GMPN.TITLE = "Places Nearby"; //title of this PlacesNearby plugin
	GMPN.MARKER_TITLE = "The Property Interests You"; //marker title of the property interested
	GMPN.BORDER_COLOR = "#F2B360";  //border color of the PlacesNearby
	GMPN.TOP_BAR_COLOR = "#887799"; //background color of top bar
	GMPN.MENU_COLOR = "#336ca6";   //background color of menu
	GMPN.RADIUS = 6000;    //for finding places
	GMPN.INFO_WINDOWW_WIDTH = 220;
	GMPN.MAP_ZOOM = 14;
	GMPN.MAP_TYPE = 'G_ROAD_MAP'; // More options: G_HYBRID_MAP, G_SATELLITE_MAP, G_TERRAIN_MAP
	GMPN.MAP_STYLE = DEFAULT_MAP_STYLE; //More options: DEFAULT_DAY_MAP, DEFAULT_NIGHT_MAP, SKY_BLUE, LIGHT_BLUE, SILVER_GRAY
	//End of Default value of Global Variable.
	//////////////////////////////////////////////////////////////////////////////////////////
	
	/////////////////////////////////////////////////////////////////////////////////////////
	//Setup Menu Items.
	//image name of marker must be: place type id + ".png";
	//to add a new type of marker, first add data for new marker below, and then create a file named as "PlaceId.png"
	GMPN.MENU_ITEMS = '[';
					   
	GMPN.MENU_ITEMS += '{"id":"school","name":"Schools","img":"school.png"},';
	GMPN.MENU_ITEMS += '{"id":"university","name":"Universities","img":"university.png"},';
	
	GMPN.MENU_ITEMS += '{"id":"park","name":"Parks","img":"park.png"},';
	GMPN.MENU_ITEMS += '{"id":"campground","name":"Campings","img":"campground.png"},';
	
	GMPN.MENU_ITEMS += '{"id":"grocery_or_supermarket","name":"Supermarkets","img":"grocery_or_supermarket.png"},';
	GMPN.MENU_ITEMS += '{"id":"shopping_mall","name":"Shopping Malls","img":"shopping_mall.png"},';
	GMPN.MENU_ITEMS += '{"id":"convenience_store","name":"Convenience Stores","img":"convenience_store.png"},';
	
	GMPN.MENU_ITEMS += '{"id":"bus_station","name":"Bus_Station","img":"bus_station.png"},';
	GMPN.MENU_ITEMS += '{"id":"subway_station","name":"Subway Stations","img":"subway_station.png"},';
	GMPN.MENU_ITEMS += '{"id":"airport","name":"Airports","img":"airport.png"},';
	
	GMPN.MENU_ITEMS += '{"id":"gas_station","name":"Gas Stations","img":"gas_station.png"},';
	GMPN.MENU_ITEMS += '{"id":"bank","name":"Banks","img":"bank.png"},';

	GMPN.MENU_ITEMS += '{"id":"restaurant","name":"Restaurants","img":"restaurant.png"},';
	GMPN.MENU_ITEMS += '{"id":"bar","name":"Bars","img":"bar.png"},';
	GMPN.MENU_ITEMS += '{"id":"cafe","name":"Cafe","img":"cafe.png"},';

	GMPN.MENU_ITEMS += '{"id":"hospital","name":"Hospitals","img":"hospital.png"},';
	GMPN.MENU_ITEMS += '{"id":"pharmacy","name":"Pharmacies","img":"pharmacy.png"},';
	
	GMPN.MENU_ITEMS += '{"id":"museum","name":"Museums","img":"museum.png"},';
	GMPN.MENU_ITEMS += '{"id":"stadium","name":"Stadiums","img":"stadium.png"}';

	GMPN.MENU_ITEMS += ']';	
	//End of Setup Menu Items.
	//////////////////////////////////////////////////////////////////////////////////////////

	//do not change below
	//Global Parameters.
	GMPN.placesMarker = [];
	GMPN.windowBox;
	GMPN.marker;
	GMPN.map;
	GMPN.geocoder = new google.maps.Geocoder();	
	GMPN.obj = JSON.parse(GMPN.MENU_ITEMS);
 	var _map_shown = false;
   //Global Parameters.


GMPN.Create = function(option)
{
	//change default value of global variables as per parameters passed in
	// check if the parameter is an object
	if (typeof(option)=="object")
	{		
		GMPN.INSTALLED_PATH = (typeof option["InstalledPath"] === 'undefined') ? GMPN.INSTALLED_PATH : option["InstalledPath"];
		GMPN.ADDRESS = (typeof option["Address"] === 'undefined') ? GMPN.ADDRESS : option["Address"];
		GMPN.LATLNG = (typeof option["LatLng"] === 'undefined') ? GMPN.LATLNG : option["LatLng"];
		GMPN.SHOW_MAP = (typeof option["ShowMap"] === 'undefined') ? GMPN.SHOW_MAP : option["ShowMap"];
		GMPN.MAX_WIDTH = (typeof option["MaxWidth"] === 'undefined') ? GMPN.MAX_WIDTH : option["MaxWidth"];
		GMPN.HEIGHT = (typeof option["Height"] === 'undefined') ? GMPN.HEIGHT : option["Height"];
		GMPN.TITLE = (typeof option["Title"] === 'undefined') ? GMPN.TITLE : option["Title"];
		GMPN.MARKER_TITLE = (typeof option["MarkerTitle"] === 'undefined') ? GMPN.MARKER_TITLE : option["MarkerTitle"];
		GMPN.BORDER_COLOR = (typeof option["BorderColor"] === 'undefined') ? GMPN.BORDER_COLOR : option["BorderColor"];
		GMPN.TOP_BAR_COLOR = (typeof option["TopBarColor"] === 'undefined') ? GMPN.TOP_BAR_COLOR : option["TopBarColor"];
		GMPN.MENU_COLOR = (typeof option["MenuColor"] === 'undefined') ? GMPN.MENU_COLOR : option["MenuColor"];
		GMPN.RADIUS = (typeof option["Radius"] === 'undefined') ?  GMPN.RADIUS : option["Radius"];
		GMPN.INFO_WINDOWW_WIDTH = (typeof option["InfoWindowWidth"] === 'undefined') ? GMPN.INFO_WINDOWW_WIDTH : option["InfoWindowWidth"];
		GMPN.MAP_ZOOM = (typeof option["MapZoom"] === 'undefined') ? GMPN.MAP_ZOOM : option["MapZoom"];
		GMPN.MAP_TYPE = (typeof option["MapType"] === 'undefined') ? GMPN.MAP_TYPE : option["MapType"];
		GMPN.MAP_STYLE = (typeof option["MapStyle"] === 'undefined') ? GMPN.MAP_STYLE : option["MapStyle"];
	}	
	GMPN.MAP_TYPE = GMPN.ConvertMapType(GMPN.MAP_TYPE);
	if (GMPN.LATLNG != null)
	{
		GMPN.LATLNG =  new google.maps.LatLng(GMPN.LATLNG);
	}

	//Create UI
	GMPN.CreateUI();
}


GMPN.CreateUI = function ()
{
	var sClass; var sClass;
	if (GMPN.SHOW_MAP)
	{
		sDisplay = "block";
		sClass = "fa fa-arrow-up";
	}
	else
	{
		sDisplay = "none";
		sClass = "fa fa-arrow-down";
	}
	
	var html = "";	
	
	html += '<div class="gmpn-container" id="gmpn-container" style="max-width: ' 
	html += + GMPN.MAX_WIDTH + 'px; background-color:' + GMPN.BORDER_COLOR + '">';
	html += '<div class="mp-pusher" id="mp-pusher">';
	html += '<nav id="mp-menu" class="mp-menu">';
	html += '<div class="mp-level" id="gmpn-menu" style="background-color: ' + GMPN.MENU_COLOR + '">';
	html += '<div id="scrollbar">';

	//form menu html
	html += GMPN.FormMenu();
	
	html += '</div>';
	html += '</div>';
	html += '</nav>';
	html += '<div class="scroller">';
	html += '<div class="content clearfix">';
	html += '<div class="top-bar" id="gmpn-top-bar" style="background-color: ' + GMPN.TOP_BAR_COLOR + '">';
	html += '<div class="menu-trigger">';
	html += '<a href="#" id="trigger" class="fa fa-bars" title="Select Place Category">';
	html += '<span id="window-title">' + GMPN.TITLE + '</span></a>';
	html += '<a href="#" id="set_map_icon" title="Center the Map"><i class="fa fa-location-arrow"></i></a>';
	html += '<a href="#" id="caret_up_down" title="show or hide map"><i id="caret_up_down_icon" class="' + sClass + '"></i></a>';
	html += '</div>';
	html += '</div>';  
	html += '<div id="mapCanvas" style="display:'  + sDisplay + '; height:' + (GMPN.HEIGHT - 48) + 'px"></div>';
	html += '<div class="latlon">';
	html += '<div class="label_mini"><i class="fa fa-map-marker"></i></div>';
	html += '<input readonly class="lat-lon-field" id="Lat_Lon_Field">';
	html += '</div>';
	html += '</div><!-- /content -->';
	html += '</div><!-- /scroller -->';
	html += '</div><!-- /pusher -->';
	html += '</div><!-- /container -->';
	
	document.write(html);
}


GMPN.FormMenu = function()
{
	var html = "<ul>";
	for (var i = 0; i < GMPN.obj.length; i++)
	{
		html += "<li>";
		html += "<img src='" + GMPN.INSTALLED_PATH + "markers/" + GMPN.obj[i].img + "' />";
		html += "<input type='radio' class='js-switch' name='js-switch' id='" + GMPN.obj[i].id + "'";
		if (i==0){
			html += " checked";
		}
		html += ">";
		html += "<label for='" + GMPN.obj[i].id + "'>";
		html += GMPN.obj[i].name;
		html += "</label>";
		html += "</li>";
	}
	html += "</ul>";
	return html;
}


$(document).ready(function()
{
	new mlPushMenu( document.getElementById( 'mp-menu' ), document.getElementById( 'trigger' ) );	

	$(function(){ 
		$('#scrollbar').slimScroll({ height: '100%' }); 
		$(document).on('click', '#gmpn-container a', function (e) {
			e.preventDefault();
			return false;
		});
	}); 
		
	//add Listener for Set Map Icon
	var mapcavas = document.getElementById("mapCanvas");
	var caret = document.getElementById("caret_up_down_icon");
	$("#caret_up_down").click(function()
	{ 
		if (mapcavas.style.display == "none"){
			mapcavas.style.display = "block";
			caret.className = "fa fa-arrow-up";
			if (GMPN.map != null && !GMPN.SHOW_MAP && !_map_shown)
			{
				_map_shown = true;
				google.maps.event.trigger(GMPN.map, 'resize');
				GMPN.map.setCenter(GMPN.LATLNG);
				GMPN.map.setZoom(GMPN.MAP_ZOOM);
			}
		}else{
			mapcavas.style.display = "none";
			caret.className = "fa fa-arrow-down";
		}
	});
	
	$("#Lat_Lon_Field").focus(function(){this.select()});
	$("#Lat_Lon_Field").mouseup(function(){return false;});
	
	var mapCanvas = document.getElementById("mapCanvas");
	if (GMPN.LATLNG != null) {
		Lat_Lon_Field.value = GMPN.LATLNG.lat() + ", " + GMPN.LATLNG.lng();
		// Onload handler to fire off the app.
		google.maps.event.addDomListener(window, 'load', GMPN.initialize);
		if (GMPN.ADDRESS == 'undefined'|| GMPN.ADDRESS == null || GMPN.ADDRESS == "")
		{
			GMPN.geocoder.geocode({latLng: GMPN.LATLNG }, function(responses){     
				if (responses && responses.length > 0) 
				{        
					GMPN.ADDRESS = responses[0].formatted_address;
				} 
				else 
				{   
					alert('Not getting Any address for given latitude and longitude.');  
				}   
			});
		}
	}
	else if (GMPN.ADDRESS != null && GMPN.ADDRESS != "" && GMPN.ADDRESS != "undefined")
	{
		GMPN.geocoder.geocode({ 'address': GMPN.ADDRESS}, function(results,status){
			if(status === google.maps.GeocoderStatus.OK){
				GMPN.LATLNG = results[0].geometry.location;
				Lat_Lon_Field.value = GMPN.LATLNG.lat() + ", " + GMPN.LATLNG.lng();
				GMPN.initialize();
			}
			else 
			{
				Lat_Lon_Field.value = "Can not geocode address provided!";
				mapCanvas.innerHTML = "Can not geocode address: '" + GMPN.ADDRESS + "'.";
			}						
		});
	}
	else
	{
		Lat_Lon_Field.value = "No valid address or coordinate!";
		mapCanvas.innerHTML = "No valid address or latitude longitude provided!";
	}
	
});


GMPN.placesCall = function()
{
	if (GMPN.LATLNG == null) return;

	GMPN.cleanPlacesArray();

	var request = 
  	{
   		location: GMPN.marker.getPosition(),
   		radius: GMPN.RADIUS,  
   		types: GMPN.places
  	};
  	var service = new google.maps.places.PlacesService(GMPN.map);
  	service.nearbySearch(request, 
  		function(results, status)
  		{
  			if (status == google.maps.places.PlacesServiceStatus.OK) 
  			{
    			for (var i = 0; i < results.length; i++) 
    			{
      				GMPN.createPlaceMarker(results[i]);
    			}
  			};

		})
}


GMPN.createPlaceMarker = function(place) 
{
  	var placeLoc = place.geometry.location;
	
	var iconUrl = null;
	for (var i = 0; i < GMPN.obj.length; i++)
	{
	    if (place.types[0] == GMPN.obj[i].id)
	    {
	        iconUrl = GMPN.INSTALLED_PATH + "markers/" + GMPN.obj[i].img;
	    }
	}

	var tempMarker = new google.maps.Marker
	({
		map: GMPN.map,
		position: place.geometry.location,
		icon: iconUrl,
		title: place.name,
		id: place.place_id
	});
	
	GMPN.placesMarker.push(tempMarker);
	
	google.maps.event.addListener(tempMarker, 'click', function() 
	{
		GMPN.createInfoWindow(tempMarker);	
	});
}


GMPN.createInfoWindow = function(tempMarker)
{
	GMPN.windowBox = null;

	var request = 
	{
  		placeId: tempMarker.id
  	};

	service = new google.maps.places.PlacesService(GMPN.map);
	
	service.getDetails(request, function(place, status)
	{
		if (status == google.maps.places.PlacesServiceStatus.OK) 
		{
			var dis = (google.maps.geometry.spherical.computeDistanceBetween(GMPN.LATLNG, place.geometry.location) / 1000).toFixed(2);

			var dir = "<form action='http://maps.google.com/maps' method='get' target='_blank'>" +
			   "<input type='hidden' name='saddr'' id='saddr' value='" + place.formatted_address + "' /><br/>" +
			   "<input value='Get Directions From Here' type='submit'>" +
			   "<input type='hidden' name='daddr' value='" + GMPN.LATLNG.lat() + "," + GMPN.LATLNG.lng() + "'/></form>";

			
			typeof(place.name) == 'undefined'? place.name = 'unknown' : place.name;
			typeof(place.formatted_address) == 'undefined'? place.formatted_address = 'unknown' : place.formatted_address;
			typeof(place.formatted_phone_number) == 'undefined'? place.formatted_phone_number = 'unknown' : place.formatted_phone_number;
			typeof(place.rating) == 'undefined'? place.rating = 'unknown' : place.rating;
			typeof(place.website) == 'undefined'? place.website = 'unknown' : place.website;
			
			var contentString = 
			"<div id='widgetBoxContent' style='color: #000;'>" +
      		"<div id='siteNotice'>" +
      		"</div>" +
      		"<h3 style='color: #78878c;' id='firstHeading' class='firstHeading'>" + place.name + "</h3>" + 
      		"<div id='bodyContent'>" +
      		"<p><i class='fa fa-car marker-info-window'></i>Distance: " + dis + " kilometers</p>" +  
			"<p><i class='fa fa-map-marker marker-info-window'></i>" + place.formatted_address + "</p>" +  
      		"<p><i class='fa fa-phone marker-info-window'></i>" + 
			"<a style='color:#585858;font-weight:bold;' href='tel:" + place.formatted_phone_number + 
			"'>" + place.formatted_phone_number + "</a>"+"</p>"+  
      		"<p><i class='fa fa-star marker-info-window'></i>" + place.rating + "</p>"+
      		"<p><i class='fa fa-globe marker-info-window'></i>" + 
			"<a style='color:#585858;font-weight:bold;' target='_blank' href='" + place.website + 
			"'>"+"Visit Our Website"+"</a>"+"</p>" + dir +
			"</div>"+ "</div>";
      			 
			GMPN.windowBox = new google.maps.InfoWindow
			  ({
				content: contentString, maxWidth: GMPN.INFO_WINDOWW_WIDTH
			});

			GMPN.windowBox.open(GMPN.map,tempMarker);
  		}
	});
}


GMPN.cleanPlacesArray = function()
{
	if (GMPN.LATLNG == null) return;
	for (var i = 0; i < GMPN.placesMarker.length; i++) 
	{
		GMPN.placesMarker[i].setMap(null);
	}

	GMPN.placesMarker = null;
	GMPN.placesMarker = [];
}


GMPN.PlaceMarkers = function()
{
	GMPN.places = [];
	$("input[type=radio]:checked").each(function (index)
	{ 
		var id = this.getAttribute("id");
		GMPN.places.push(id);
	});
	if(GMPN.places.length > 0)
	{
		GMPN.placesCall();
	}
	else
	{
		GMPN.cleanPlacesArray();
	}
}


GMPN.initialize =function(){
	//create map
	GMPN.map = new google.maps.Map(document.getElementById('mapCanvas'), 
	{
		//The Zoom of the map
		zoom:GMPN.MAP_ZOOM, 
		center: GMPN.LATLNG,
		zoomControlOptions: { style: google.maps.ZoomControlStyle.SMALL}, // --> Available options: SMALL, LARGE 
		mapTypeControl: true,
		streetViewControl: true,
		scrollwheel: true, // Enable or Disable the scrollwheel zoom
		mapTypeId: GMPN.MAP_TYPE,
		styles: GMPN.MAP_STYLE
	});
	
	//create main marker
	GMPN.marker = new google.maps.Marker
	({
		position: GMPN.LATLNG,
		title: GMPN.MARKER_TITLE,
		map: GMPN.map,
		icon : GMPN.INSTALLED_PATH + 'markers/map_marker.png',
		draggable: false 
	});

	//create and place markers for nearby places of interest
	GMPN.PlaceMarkers()

	//add Listener for Set Map Icon
	$("#set_map_icon").click(function()
	{ 
		GMPN.map.setCenter(GMPN.LATLNG);
		GMPN.map.setZoom(GMPN.MAP_ZOOM);
	});

	//add listener for main marker
	google.maps.event.addListener(GMPN.marker, 'click', function() 
	{
		var adr;
		typeof(GMPN.ADDRESS) == 'undefined'? adr = 'not provided' : adr = GMPN.ADDRESS;
		var contentString = 
		"<div id='widgetBoxContent' style='color: #000;'>" +
		"<div id='siteNotice'>" + "</div>" +
		"<h3 style='color: #78878c;' id='firstHeading' class='firstHeading'>" + 
		GMPN.MARKER_TITLE + "</h3>" + 
		"<div id='bodyContent'>" +
		"<p><i class='fa fa-map-marker marker-info-window'></i>Address: " + adr + "</p>" +  
		"<p><i class='fa fa-location-arrow marker-info-window'></i>" + 
		"Latitude: " + GMPN.LATLNG.lat() + ", Longitude: " + GMPN.LATLNG.lng() + "</p>" + 
		"</div>" + 
		"</div>";
	
		var wb = null;
		wb = new google.maps.InfoWindow
		({
			content: contentString, maxWidth: GMPN.INFO_WINDOWW_WIDTH
		});
		wb.open(GMPN.map,GMPN.marker);
	});

	//add listener for menu change
	$(".js-switch").change(function()
	{
		GMPN.PlaceMarkers();
		return true;
	});
}


//convert map types from google map api V2 toV3
GMPN.ConvertMapType = function (mt) {
	switch (mt) {
		case  "G_ROAD_MAP":
			return google.maps.MapTypeId.ROADMAP;
		case  "G_SATELLITE_MAP":
			return google.maps.MapTypeId.SATELLITE;
		case  "G_HYBRID_MAP":
			return google.maps.MapTypeId.HYBRID;
		case  "G_TERRAIN_MAP":
			return google.maps.MapTypeId.TERRAIN;
		default: 
			return google.maps.MapTypeId.ROADMAP;
	}
}
