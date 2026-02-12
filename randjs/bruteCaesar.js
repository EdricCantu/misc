letters = "abcdefghijklmnopqrstuvwxyz".split("")
string="cqn knbc jwm vxbc knjdcrodu cqrwpb rw cqn fxaum ljwwxc kn bnnw xa nenw cxdlqnm - cqnh vdbc kn onuc frcq cqn qnjac"
for(var i = 0; i < 26; i++){
  console.log(
    string.split("").map(
      letter=>(
        letters.includes(letter)
        ?
        letters[(letters.indexOf(letter)+i) % 26]
        :
        letter
      )
    ).join("")
  );
}
