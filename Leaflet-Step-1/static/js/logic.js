
 const equrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

 let myMap = L.map("map", {
        center: [45.52, -122.67],
        zoom: 5,
        });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap); 



d3.json(equrl).then(data => {
        console.log(data.features)
        
        function magnitudeSize(mag){
            return mag * 10000
        }
                    
        var color_scale = chroma.scale(["yellow", "red"])
        
        function magnitudeDepth(depth){
            if (depth >= 0 && depth < 3)
                return color_scale(0).hex();
            else if (depth >= 3 && depth < 6)
                return color_scale(0.1).hex();  
            else if (depth >= 6 && depth < 9)
                return color_scale(0.2).hex();
            else if (depth >= 9 && depth < 12)
                return color_scale(0.3).hex();
            else if (depth >= 12 && depth < 15)
                return color_scale(0.4).hex();
            else if (depth >= 15 && depth < 18)
                return color_scale(0.5).hex();
            else if (depth >= 18 && depth < 21)
                return color_scale(0.6).hex();
            else if (depth >= 21 && depth < 24)
                return color_scale(0.7).hex();  
            else if (depth >= 24 && depth < 27)
                return color_scale(0.8).hex();
            else
                return color_scale(0.9).hex();         
        }

        

        for (i=0;i<data.features.length;i++){
            L.circle([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]], {
                        radius: magnitudeSize(data.features[i].properties.mag),
                        color:  magnitudeDepth(data.features[i].geometry.coordinates[2]),
                        fillOpacity: 1
                    }).bindPopup("<h2>" + data.features[i].properties.place + "</h2>" + "<p>" + Date(data.features[i].properties.time) + "</p>" + "<p>" + "magnitude: " + data.features[i].properties.mag + "</p>" + "<p>" + "depth: " + data.features[i].geometry.coordinates[2] + "</p>").addTo(myMap)
        }

        var legend = L.control({position: 'bottomleft'});

        legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend');



        categories = ['0-3','3-6','6-9','9-12','12-15','15-18','18-21','21-24','24-27','27+'];
        colors = [color_scale(0).hex(),color_scale(0.1).hex(),color_scale(0.2).hex(),color_scale(0.3).hex(),color_scale(0.4).hex(),color_scale(0.5).hex(),color_scale(0.6).hex(),color_scale(0.7).hex(),color_scale(0.8).hex(),color_scale(0.9).hex()]
        labels = []    

        categories.forEach(function (categories, index) {
            labels.push('<li style="background-color: ' + colors[index] + '">'+ categories + '</li>')
          })
        div.innerHTML += '<ul>' + labels.join('') + '</ul>'

        return div;}
        legend.addTo(myMap)
});

