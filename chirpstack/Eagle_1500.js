function Decode(fPort, bytes, variables){

  var decoded={};

  if(bytes[0]==0x14){
    // Import active energy
    decoded.import_active_energy = readUInt32BE(bytes.slice(1, 5))
    // Export active energy
    decoded.export_active_energy = readUInt32BE(bytes.slice(5, 9))
    // Reactive energy
    decoded.reactive_energy = readUInt32BE(bytes.slice(9, 13))
    // Active power
    decoded.active_power = readUInt16BE(bytes.slice(13, 15))
    // Instantaneous current
    decoded.current = readUInt16BE(bytes.slice(15, 17)) / 1000
    // Instantaneous voltage
    decoded.voltage = readUInt16BE(bytes.slice(17, 19)) / 100
    // Power factor
    decoded.power_factor = readUInt8BE(bytes[19])
    // Relay state
    decoded.relay_state = readUInt8BE(bytes[20])
  }

  return decoded;
}


function readUInt8BE(bytes){
  return (bytes&0xFF)
}

function readUInt16BE(bytes){
  var value = (bytes[0]<<8) + bytes[1];
  return (value&0xFFFF)
}

function readUInt32BE(bytes){
  var value = (bytes[0]<<24) +(bytes[1]<<16) +  (bytes[2]<<8) + bytes[3];
  return (value&0xFFFFFFFF)
}
