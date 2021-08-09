
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
                    
        function magnitudeDepth(depth){
            if (depth >= 1 && depth < 2)
                return "ffff00";
            if (depth >= 2 && depth < 3)
                return "ffe600"  ;  
            if (depth >= 3 && depth < 4)
                return "ffcc00";
            if (depth >= 4 && depth < 5)
                return "ffb300";
            if (depth >= 5 && depth < 6)
                return "ff9900";
            if (depth >= 6 && depth < 7)
                return "ff8000";
            if (depth >= 7 && depth < 8)
                return "fff660";
            if (depth >= 8 && depth < 9)
                return "ff4c00";  
            if (depth >= 9)
                return "ff3300";     
        }

        for (i=0;i<data.features.length;i++){
            L.circle([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]], {
                        radius: magnitudeSize(data.features[i].properties.mag),
                        color:  magnitudeDepth(data.features[i].geometry.coordinates[2])
                    }).bindPopup("<h2>" + data.features[i].properties.place + "</h2>" + "<p>" + Date(data.features[i].properties.time) + "</p>").addTo(myMap)
        }

       

});

