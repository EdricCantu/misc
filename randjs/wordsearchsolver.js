function wss(table, combos){
  /*/
  |*| https://solvewordsearch.com
  |*| https://www.snappywords.com/word-search-solver
  |*| https://jonasdevlieghere.com/post/word-search-solver
  |*| https://www.thewordfinder.com/word-search-solver
  |*| https://wordsearch.lukasjoswiak.com/
  |*| https://www.dcode.fr/word-search-solver
  |*| https://wordsearchonline.com/tools/word-search-solver
  |*| pfotucneniuatvynpatl,lanosrepretniieyticu,ttptnfiiemimnqemahsm,peffectivenessoeeeen,oreotafmitxaeatcnvni,iieanaoupunctualityn,saiststanatceuctmepr,teuretcommunicationm,neaecnadnettainoinne,ynmlirtiuaipttsmncni,psncpemaemcirehtttci,oeunlaaptinorscihtet,naripeoeeieemttnaxuo,aaeserdmedocqmnieipn,nolroaesovanuaicimea,pmneenecttedsnutsatt,sateaaaoiaeletpemuei,itnsumrleauiiacfeeoo,ytilauqsniioanteaens,oenicamnssnentusndtt
  /*/
  table = [...table];//no src changing
  combos = [...(new Set(combos))];//no src changing, remove dupe combos
  const dirs = [
                 [-1,-1], [-1, 0], [-1, 1],
                 [ 0,-1],          [ 0, 1],
                 [ 1,-1], [ 1, 0], [ 1, 1]
               ];
  const cols = table.shift();//first element in table is row length or columns
  if(typeof(cols) !== "number" || (cols % 1) ) throw new TypeError("Table is invalid.\nFirst element of <table> argument\nmust be an integer denoting the column count.\nRemainder of <table> is the table contents.");
  const rows = table.length / cols;
  if(table.length % cols) throw new TypeError(`Table is invalid: length not divisible by column count %c${cols}`, "background-color: gray");
  function xtoxy(x){ return [x % cols, Math.floor(x / cols)]; }
  function xytox(x,y){ return cols * y + x; }
  function hasWord(combo, tableIndex, [dx, dy]){
    //first check if the direction has enough space for the combo
    const [col, row] = xtoxy(tableIndex);
    const endCol = col + ((combo.length - 1) * dx);
    const endRow = row + ((combo.length - 1) * dy);
    if (
      endCol < 0 || endCol >= cols
                 ||
      endRow < 0 || endRow >= rows
    ){
      return false;
    }

    for(var i = 0; i < combo.length; i++){
      const findx = col + (dx * i);
      const findy = row + (dy * i);
      if(table[xytox(findx,findy)] !== combo[i]) return false;
    }
    return true;
  }
  const combolocs = [];
  const letters = [...(new Set(combos.map(combo=>combo[0])))];//all possible first letters being looked for
  const letterlocs = {};//locations of all instances of the possible letters in the table
    for( const letter of letters ){
      var loc = table.map((tableLetter, index)=>((tableLetter===letter)?index:null));
      loc = [...(new Set(loc))];
      loc.splice(loc.indexOf(null), 1);
      letterlocs[letter] = loc;
    }
  //get words
    nextword: for(const combo of combos){
      if(!(combo[0] in letterlocs)) continue nextword;
      for(const tableIndex of letterlocs[combo[0]]){
        for(const dir of dirs){
          if(hasWord(combo, tableIndex, dir)){
            combolocs.push([combo, tableIndex, dir]);
            //possible that words are duped in a word search; slightly less possible, but possible, that they share a first letter 
          }
        }
      }
    }
  return combolocs;
}
