var Map = ol.Map,
    View = ol.View,
    Draw = ol.interaction.Draw,
    TileLayer = ol.layer.Tile,
    VectorLayer = ol.layer.Vector,
    OSM = ol.source.OSM,
    VectorSource = ol.source.Vector,
    {Style, Stroke, Fill} = ol.style,
    typeSelect = document.getElementById('type'),    
    color = document.getElementById('color'),
    colorC = document.getElementById('colorC'),
    draw;

var firstStyle = new Style({ 
    stroke: new Stroke({ 
        color: color.value, 
        width: 3 
    }),
    fill: new Fill({
        color: color.value
    })
}); 

var raster = new TileLayer({
    source: new OSM()
});

var source = new VectorSource({wrapX: false});

var vector = new VectorLayer({
    source: source
});

var map = new Map({
    layers: [raster, vector],
    target: 'map',
    view: new View({
        center: [-11000000, 4600000],
        zoom: 4
    })
});

var contextmenu = new ContextMenu({
    width: 170,
    defaultItems: false, // defaultItems are (for now) Zoom In/Zoom Out
    items: [
      {
        text: 'Center map here',
        classname: 'wazza',
        callback: azerty // Callback du click sur le menu
              
      },
      
     // '-' // this is a separator
    ]
  });
  map.addControl(contextmenu);


function addInteraction() {
    var value = typeSelect.value;
    if (value !== 'None') {
        draw = new Draw({
            source: source,
            type: typeSelect.value			        
        });		   

        map.addInteraction(draw);
    }
}


typeSelect.onchange = function() {	  
    if (typeSelect.value != 'None'){ 
        source.clear();	  
        vector.setStyle(firstStyle);
    }
    map.removeInteraction(draw);
    addInteraction();
};

color.onchange = function(){
    firstStyle.fill_.color_ = this.value;		
}

colorC.onchange = function(){
    firstStyle.stroke_.color_ = this.value;
}

addInteraction();

$('#Wes').on('click', function(){
    
    var svg = $('#Test').children()[0].outerHTML;
    var svg2 = $('#Test').children()[1].outerHTML;
    var svg3 = $('#Test').children()[2].outerHTML;
    
    svg = svg.replace(/\r?\n|\r/g, '').trim();
    svg2 = svg2.replace(/\r?\n|\r/g, '').trim();
    svg3 = svg3.replace(/\r?\n|\r/g, '').trim();
    
    var canvas = document.createElement('canvas');       

    canvg(canvas, svg);    

    var imgData = canvas.toDataURL('image/png');

      // Generate PDF
      var doc = new jsPDF('p', 'pt', 'a4');
      doc.addImage(imgData, 'PNG', 0, 0, 0, 0);
    
    canvg(canvas, svg2);
    var imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 0, 20, 0, 0);
    
    canvg(canvas, svg3);
    var imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 0, 40, 0, 0);
    
      doc.save('test.pdf');
    
});

function azerty() {
    alert('Wazza');
}
