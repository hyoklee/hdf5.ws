

function HDF5Interface(){
    
}

HDF5Interface.prototype.makeDataset = function(data, path){

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.addEventListener("load", function(evt){
        console.log("XMLHttpRequest load");
    var ws = new WebSocket('ws://'+location.hostname+':9900/make-dataset');
    
    ws.addEventListener('open', function open() {
    
        data.buffer.reconstructor=data.constructor.name;
        data.buffer.rank=1;
        data.buffer.rows=data.length;
      ws.send(JSON.stringify({reconstructor: data.constructor.name, rank: 1, rows: data.length}));
      ws.send(data.buffer);
    });
        
    });

    xmlHttp.open( "POST", "http://"+location.hostname+":8888/make_dataset"+path ); // false for synchronous request
    xmlHttp.send( );
    xmlHttp.responseText;

}