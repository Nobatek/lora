//T1:PayloadDecoder
function Decode(fPort, bytes, variables){
  var decoded={};
  for(i=0;i<bytes.length;){
    //BATTERY
    if(bytes[i]==0x03){
      decoded.battery=bytes[i+2];
      i+=3;
      continue;
    }
    //TEMPERATURE
    if(bytes[i]==0x01){
      decoded.temperature=(readInt16LE(bytes.slice(i+2,i+4)))/10;
      i+=4;
      continue;
    }
    //HUMIDITY
    if(bytes[i]==0x02){
      decoded.humidity=readUInt8LE(bytes[i+2])/2;
      i+=3;
      continue;
    }
    // ALARM
    if(bytes[i]==0xff){
      decoded.temperature=readInt16LE(bytes.slice(i+7,i+9))/10;
      i+=9;
      continue;
    }
    break;
  }
  return decoded;
}

function readUInt8LE(bytes){
  return (bytes&0xFF);
}

function readInt8LE(bytes){
  var ref=readUInt8LE(bytes);
  return (ref>0x7F)?ref-0x100:ref;
}

function readUInt16LE(bytes){
  var value=(bytes[1]<<8)+bytes[0];
  return (value&0xFFFF);
}

function readInt16LE(bytes){
  var ref=readUInt16LE(bytes);
  return (ref>0x7FFF)?ref-0x10000:ref;
}

