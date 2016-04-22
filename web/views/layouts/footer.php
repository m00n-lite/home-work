<script src="assets/js/main.js"></script>
<?php if(get_uri() == 'map'):?>
<script src="assets/js/map.js"></script>
<script src="http://maps.google.com/maps/api/js?v=3.23"></script>

<?php endif; ?>
<script>setTimeout(function(){
	$.msgGrowl ({type: "success",lifetime:"2500", title: "Hi Friend", text: "I'm happy to see you"})},500);

setTimeout(function(){
	$.msgGrowl ({type: "success",lifetime:"2500", title: "Hey", text: "Realy!!! Lets drinknem"})},4000);
</script>
<script>
//Add layers
var mapnik   = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
var osmde  = L.tileLayer('http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',{useCache:true});
//Bing Possible types: Aerial | AerialWithLabels | Birdseye | BirdseyeWithLabels | Road
var bing = new L.BingLayer("LfO3DMI9S6GnXD7d0WGs~bq2DRVkmIAzSOFdodzZLvw~Arx8dclDxmZA0Y38tHIJlJfnMbGq5GXeYmrGOUIbS2VLFzRKCK0Yv_bAl6oe-DOc", {type: "AerialWithLabels"});
// Google Possible types: SATELLITE, ROADMAP, HYBRID, TERRAIN
var ggl = new L.Google('ROADMAP');
var ggl1 = new L.Google('HYBRID');
//End layers
//init map
map = L.map('map', {
	center: [52.52, 13.40],
	zoom: 11,
	layers: [osmde],
	
});
//end map init
//Add base layers
var baseLayers = {
	"OSM DE": osmde,
	"Mapnik": mapnik,
	"Bing Aerial": bing,
        "Google Hybrid": ggl1,
	"Google Road": ggl,
};

///////////////////////////////////////////////
//////////////////////////////////////////////
L.control.layers(baseLayers).addTo(map);
////////////////////////////////////////////////
////////////////////////////////////////////////
</script>
</body>
</html>