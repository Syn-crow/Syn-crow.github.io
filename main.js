


function parse(letex){
  let pile = [];
  let i = 0;

  function next(){
    i++;
  }

  function product(duo){

      if(duo.type=="OPERATOR"){
        let b = pile.pop();
        let a = pile.pop();
        if(duo.word =="+") pile.push({"a":a, "b":b, "operator":"+", getValue(){return parseFloat(this.a.getValue()) + parseFloat(this.b.getValue()) }});
        if(duo.word =="-") pile.push({"a":a, "b":b, "operator":"-", getValue(){return this.a.getValue() - this.b.getValue() }});
        if(duo.word =="x" || duo.word == "*") pile.push({"a":a, "b":b, "operator":"x", getValue(){return this.a.getValue() * this.b.getValue() }});
        if(duo.word =="/") pile.push({"a":a, "b":b, "operator":"/", getValue(){return this.a.getValue() / this.b.getValue() }});
      }
      if(duo.type=="NUMBER"){
        console.log("duo:",duo);
        pile.push({"a":duo.word, "b":null, "operator":"null", getValue(){return this.a}});
      }
      if(duo.type=="SYMBOL"){
        let a = pile.pop();
        pile.push({"a":a, "b":null, "operator":"()", getValue(){return this.a.getValue()}});
      }
  }
  function parseA(){
    parseM();
    if(i<letex.length){
    if(letex[i].word=="+"){
      next(); //console.log("nextA1");
      parseA();
      product({"word":"+",type:"OPERATOR"});
    }
    else if(letex[i].word=="-"){
      next();//console.log("nextA2");
      parseA();
      product({"word":"-",type:"OPERATOR"});
    }
    }
  }
  function parseM(){
    parseE();
    if(i<letex.length){
    if(letex[i].word=="x"|| letex[i].word=="*"){
      next();//console.log("nextM1");
      parseM();
      product({"word":"x",type:"OPERATOR"})
    }
    else if(letex[i].word=="/"){
      next();//console.log("nextM2");
      parseM();
      product({"word":"/",type:"OPERATOR"})
    }
    }
  }
  function parseE(){
    if(i<letex.length){
    if(letex[i].word=="("){
      next();//console.log("nextE1");
      parseA();
      console.log("characters juste dans la formule:",letex[i]);
      if(letex[i].word==")"){
        product({"word":"()",type:"SYMBOL"})
        next();
        //parseA();
      }
    }
    else if(letex[i].type=="NUMBER"){
      product(letex[i]);
      next();//console.log("nextE2",pile);
    }
    }
  }
  parseA();
  console.log(pile[0].getValue());
  return pile;
}

function iterate(code){

  function consume(){
    word+=src[i];
    i++
  }
  function skip(){
    i++
  }
  function product(type){
    array.push({"type" : type, "word" : word});
    word = "";
  }

  function isNum(){
    let res = "0123456789".includes(src[i])
    if(res){
       consume();
    }
    return res;
  }
  function isNumber(){
    if(!isNum()) return false;
    while(isNum()){

    }product("NUMBER");
    return true;
  }
  function isOperator(){
    let res = "+-/x*".includes(src[i]);
    if(res){
       consume();
       product("OPERATOR");
    }
    return res;
  }
  function isSymbol(){
    let res = "()".includes(src[i]);
    if(res){
       consume();
       product("SYMBOL");
    }
    return res;
  }
  function isNull(){
    let res = " \n".includes(src[i]);
    if(res){
       skip();
    }
    return res;
  }

  let src = code;
  let i =0;
  let word = "";
  let array = [];
  let listTraitement = [isNumber, isNull, isOperator, isSymbol];
  while(src.length>i){
    let n = 0;
    while(!listTraitement[n]()){
      n++;
      if(n>3){
        array.push({type:"ERROR", "word":"character "+ code[i]+ " not reconized"});
        return array;
      }
    }
  }
  return array;
}
exports._test = {
    "iterate":iterate
}
