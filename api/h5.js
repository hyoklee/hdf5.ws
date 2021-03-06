var hdf5 = require('hdf5').hdf5;
var h5im = require('hdf5').h5im;
var h5lt = require('hdf5').h5lt;
var h5tb = require('hdf5').h5tb;
var h5pt = require('hdf5').h5pt;

var Access = require('hdf5/lib/globals').Access;
var CreationOrder = require('hdf5/lib/globals').CreationOrder;
var State = require('hdf5/lib/globals').State;
var H5OType = require('hdf5/lib/globals').H5OType;
var HLType = require('hdf5/lib/globals').HLType;
var Interlace = require('hdf5/lib/globals').Interlace;

module.exports = class H5 { 
    constructor () {
        //this.port=port
        this.status=false
        this.compression=0
    }
        
createH5(path) {
    var index=path.lastIndexOf("/");
    var stem = "";
    var leaf = "";
    if(index>=0)
    {
        stem=path.substring(0, index);
        leaf=path.substring(index+1, path.length);
    }
    else
        leaf = path;
    //console.dir(stem);
    //console.dir(leaf);
    global.currentH5Path=leaf;
    var file = new hdf5.File(leaf, Access.ACC_TRUNC);
    file.close();
}

createGroup(path) {
    path=decodeURIComponent(path);
    if(!path.startsWith("/create_group/")) return;
    path=path.substring(14);
    var file = new hdf5.File(global.currentH5Path, Access.ACC_RDWR);
    var group=file.createGroup(path);
    group.close();
    file.close();
    return;
}

setCompression(path) {
    path=decodeURIComponent(path);
    if(!path.startsWith("/set_compression/")) return;
    let property=JSON.parse(path.substring(17));
    
    this.compression=property.compression
    
    return;
}


}
