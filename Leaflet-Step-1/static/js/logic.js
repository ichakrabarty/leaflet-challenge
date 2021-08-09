let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(url).then(function(data){
    console.log(data.features)   
    createFeatures(data.features);
});

function createFeatures(EQdata){
     
    let earthquakes = [];
    for (i=0;EQdata.length;i++){
       earthquakes.push( 
           L.geoJSON(EQdata[i]).bindPopup(`<h2> ${EQdata[i].properties.place} </h2> <p> ${Date(EQdata[i].properties.time)} </p>`)
            
       );
   }
     
    // function onEachFeature(feature, layer) {
    //     layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    // }

    // var earthquakes = L.geoJSON(EQdata, {
    //     onEachFeature: onEachFeature
    //   });

    function magnitudeSize(mag){
        return mag * 500
    }

    function magnitudeDepth(depth){
        if (depth > 1 && depth <= 1.9)
            return "ffff00";
        if (depth > 1.9 && depth <= 2.9)
            return "ffe600"  ;  
        if (depth > 2.9 && depth <= 3.9)
            return "ffcc00";
        if (depth > 3.9 && depth <= 4.9)
            return "ffb300";
        if (depth > 4.9 && depth <= 5.9)
            return "ff9900";
        if (depth > 5.9 && depth <= 6.9)
            return "ff8000";
        if (depth > 6.9 && depth <= 7.9)
            return "fff660";
        if (depth > 7.9 && depth <= 8.9)
            return "ff4c00";  
        if (depth > 8.9)
            return "ff3300";     
    }

    L.circle({
        radius: magnitudeSize(earthquakes.properties.mag),
        color:  magnitudeDepth(earthquakes.geometry.coordinates[2])
    })

    let EQLayer = L.layerGroup(earthquakes)

    createMap(EQLayer);
}

function createMap(EQlayer) {
    

    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });

    

    let baseMaps = {
        "Street Map": street
    }

    let overlayMaps = {
        Earthquakes: earthquakes
      };

    let myMap = L.map("map", {
        center: [45.52, -122.67],
        zoom: 5,
        layers: street
      });

    L.control.layers(baseMaps, overlayMaps, {
     collapsed: false
    }).addTo(myMap);
      
}


 