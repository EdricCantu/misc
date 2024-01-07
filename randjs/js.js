function base(fromBase, input, toBase){
  if(!(typeof input === 'string' || input instanceof Array)){
    throw [0, input, typeof input, input.constructor.name]
  }
  input = (typeof input === "string") ? input.split("").reverse() : input.reverse();
  
  if ((new Set(fromBase)).size !== fromBase.length) {
    throw [1, ...fromBase.map((value, index) => fromBase.indexOf(value, index + 1))
            .filter(index => index !== -1)];
  }
  //one of the characters repeats in toBase or fromBase
  if ((new Set(toBase)).size !== toBase.length) {
    throw [2, ...toBase.map((value, index) => toBase.indexOf(value, index + 1))
            .filter(index => index !== -1)];
  }
  var pad = 0;
  while(true){
    if(input[pad] === fromBase[0]){
      pad++;
    }else{
      break;
    }
  }
  var err = false;
  var output = [];
  input.forEach((item, index) => {
    var [a, b, c] = [fromBase.indexOf(item), fromBase.length, index].map(d => BigInt(d));
    if (a === -1n) {
      err = true;
      return;
    }
    output.push(a * (b ** c));
    console
  });
  if (err) {
    throw [3, ...input.filter(elem=>toBase.includes(elem)).map((item, index)=>{
      return item ? index : false;
    }).filter(a=>(a!==false))];//one of the input characters is invalid
  }
  var quotient = output.reduce((a, b) => { return a + b; }, 0n);
  if (typeof toBase === "string") {
    var output = "";
    while (quotient !== 0n) {
      output += toBase[quotient % BigInt(toBase.length)];
      quotient = quotient / BigInt(toBase.length);
    }
    return toBase[0].repeat(pad) + output.split("").reverse().join("");
  } else {console.log("arrOut");
    var output = [];
    while (quotient !== 0n) {
      output.push(toBase[quotient % BigInt(toBase.length)]);
      quotient = quotient / BigInt(toBase.length);
    }
    return (new Array(pad)).fill(toBase[0]).concat(output.reverse());
  }
}652
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function base(fromBase, input, toBase){
  if ((new Set(fromBase)).size !== fromBase.length) {//an element in fromBase repeats
    throw [1, ...fromBase.map((value, index) => fromBase.indexOf(value, index + 1))
            .filter(index => index !== -1)];
  }
  if ((new Set(toBase)).size !== toBase.length) {//an element in toBase repeats
    throw [2, ...toBase.map((value, index) => toBase.indexOf(value, index + 1))
            .filter(index => index !== -1)];
  }
  var pad = -1;
  while (input[++pad] === fromBase[0]);

  var quotient = 0n;
  for(const index in input){
    var [a, b, c] = [fromBase.indexOf(input[index]), fromBase.length, parseInt(index)].map(d => BigInt(d));
    if (a === -1n) {
      throw [3, ...input.filter(elem=>toBase.includes(elem)).map((item, index)=>{ 
        return item ? index : false;
      }).filter(a=>(a!==false))];//one of the input elements is not found in fromBase

    }else{quotient += (a * (b ** c));}
      
  }
  var output = [];
  while (quotient !== 0n) {
    output.push(toBase[quotient % BigInt(toBase.length)]);
    quotient = quotient / BigInt(toBase.length);
  }
  return (new Array(pad)).fill(toBase[0]).concat(output.reverse());
}
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
base.bin = [...Array(256).keys()]//224//.map(a=>a+32);
base.int = "0278135964";
base.url = "qy,.ehrm&$F~Hf-XYG7TLK91)t:?*MbB=8zvNUc'@VAsOPpj+J&R(!x5a3ES_Wo%4/#lDCdnQ26w0iuk;gIZ";
base.str = "chjuwtpyrnmlodbsxzvkfieaqg";
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function scramble(letters) {
  const chars = letters.split('');
  const results = [];

  function generateCombination(combination) {
    if (combination.length === letters.length) {
      results.push(combination);
      return;
    }

    for (let i = 0; i < chars.length; i++) {
      if (!combination.includes(chars[i])) {
        generateCombination(combination + chars[i]);
      }
    }
  }

  generateCombination('');

  return results;
}
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Array.prototype.split = function(...value){//just used to determine wether nothing undefined was passed
  //possible use to split by consecutive values
  var from = this,
      to = [];
  while(true){
    var index = from.indexOf(value);
    if(!(index + 1)){
      to.push(from);
      return to;
    }
    to.push(from.splice(0,index));
    from.shift();
  }
}
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function addInt(...addends){
  var carry = [];
  var sum = [];
  var ml = Math.max(...(addends.map(addend=>addend.length)));
  addends = addends.map(addend=>addend.padStart(ml, 0));
  addends = addends.map(c=>c.split('').reverse());
}
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
var mp3 = {
  read(mp3){
    if(!(mp3 instanceof Uint8Array))
      throw new TypeError('Invalid input instance '+ mp3?.constructor?.name || typeof mp3);
    if("" + mp3.slice(0,3) !== '73,68,51')
      throw new TypeError('Invalid bytes of "Magic Number" at "0-2"');
    const majorVersion = mp3[3];
    const flags = this.parseID3v2Flags(mp3.slice(4,8));
    const headerSize = (mp3[8]<<8) | mp3[9];
    const headerData = {majorVersion, flags, headerSize};
    var current = 0;
    var metadata = [];
    while((current+=10) < headerSize){
      var frameHeader = this.parseFrameHeader(mp3.slice(current, current+=10));
      if (frameHeader.name.includes('\x00')){
        current += frameHeader.size - 10;
      } else {
        frameHeader.data = mp3.slice(current+1, current+frameHeader.size-1);
        current+=frameHeader.size-10;
        metadata.push(frameHeader);
      }
    }
    metadata.stopped = current;
    return {
      metadata,
      headerData
    } 
  },
  parseID3v2Flags(headerFlags) {      
    return {
      unsync: (headerFlags[0] & 0x80) !== 0,
      extendedHeader: (headerFlags[0] & 0x40) !== 0,
      experimental: (headerFlags[0] & 0x20) !== 0,
      footer: (headerFlags[1] & 0x10) !== 0,
      paddingSize: (headerFlags[1] & 0x0F) << 24 | headerFlags[2] << 16 | headerFlags[3] << 8 | 0
    }
  },
  parseFrameHeader(frameHeader) {
    return {
      name: String.fromCharCode(...frameHeader.slice(0, 4)),
      size: (frameHeader[4] << 24) | (frameHeader[5] << 16) | (frameHeader[6] << 8) | frameHeader[7],
      flags: {
        tagAlterPreservation: !!(frameHeader[8] & 0x80),
        fileAlterPreservation: !!(frameHeader[8] & 0x40),
        readOnly: !!(frameHeader[8] & 0x20),
        isCompressed: !!(frameHeader[8] & 0x08),
        isEncrypted: !!(frameHeader[8] & 0x04),
        hasGroupIdentifier: !!(frameHeader[8] & 0x40),
        groupIdentifier: !!(frameHeader[8] & 0x40) ? String.fromCharCode(...frameHeader.slice(9, 11)) : null
      }
    };
  }
}
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@





//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
