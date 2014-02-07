//Primary reference: http://www.yellowbridge.com/chinese/pinyin-combo.php
var initials = {
  b : 'ㄅ',
  p : 'ㄆ',
  m : 'ㄇ',
  f : 'ㄈ',
  d : 'ㄉ',
  t : 'ㄊ',
  n : 'ㄋ',
  l : 'ㄌ',
  g : 'ㄍ',
  k : 'ㄎ',
  h : 'ㄏ',
  j	: 'ㄐ',
  q : 'ㄑ',
  x	: 'ㄒ',
  zh: 'ㄓ',
  ch: 'ㄔ',
  sh: 'ㄕ',
  r : 'ㄖ',
  z : 'ㄗ',
  c : 'ㄘ',
  s : 'ㄙ'
};
var finals = {
  a : 'ㄚ',
  o : 'ㄛ',
  e : 'ㄜ',
  ai : 'ㄞ',
  ei : 'ㄟ',
  ao : 'ㄠ',
  ou : 'ㄡ',
  an : 'ㄢ',
  ang : 'ㄤ',
  en : 'ㄣ',
  eng : 'ㄥ',
  er : 'ㄦ',
  u : 'ㄨ',
  ua : 'ㄨㄚ',
  uo : 'ㄨㄛ',
  uai : 'ㄨㄞ',
  ui : 'ㄨㄟ',
  uan : 'ㄨㄢ',
  uang : 'ㄨㄤ',
  un : 'ㄨㄣ',
  //This one might not occur.
  ueng : 'ㄨㄥ',
  ong : 'ㄨㄥ',
  i : '一',
  ia : '一ㄚ',
  ie : '一ㄝ',
  iao : '一ㄠ',
  iu : '一ㄡ',
  ian : '一ㄢ',
  iang : '一ㄤ',
  'in' : '一ㄣ',
  ing : '一ㄥ',
  'ü' : 'ㄩ',
  'üe' : 'ㄩㄝ',
  'üan' : 'ㄩㄢ',
  'ün' : 'ㄩㄣ',
  iong : 'ㄩㄥ'
};
var individuals = {
  //individual initials
  zhi : 'ㄓ',
  chi : 'ㄔ',
  shi : 'ㄕ',
  ri  : 'ㄖ',
  zi  : 'ㄗ',
  ci  : 'ㄘ',
  si  : 'ㄙ',
  //individual finals
  a : 'ㄚ',
  o : 'ㄛ',
  e : 'ㄜ',
  ai : 'ㄞ',
  ei : 'ㄟ',
  ao : 'ㄠ',
  ou : 'ㄡ',
  an : 'ㄢ',
  ang : 'ㄤ',
  en : 'ㄣ',
  eng : 'ㄥ',
  er : 'ㄦ',
  wu : 'ㄨ',
  wa : 'ㄨㄚ',
  wo : 'ㄨㄛ',
  wai : 'ㄨㄞ',
  wei : 'ㄨㄟ',
  wan : 'ㄨㄢ',
  wang : 'ㄨㄤ',
  wen : 'ㄨㄣ',
  weng : 'ㄨㄥ',
  yi : '一',
  ya : '一ㄚ',
  ye : '一ㄝ',
  yao : '一ㄠ',
  you : '一ㄡ',
  yan : '一ㄢ',
  yang : '一ㄤ',
  yin : '一ㄣ',
  ying : '一ㄥ',
  yu : 'ㄩ',
  yue : 'ㄩㄝ',
  yuan : 'ㄩㄢ',
  yun : 'ㄩㄣ',
  yong : 'ㄩㄥ'
};
var toneMap = {
  'ā' : 'a1',
  'á' : 'a2',
  'ǎ' : 'a3',
  'à' : 'a4',
  'ē' : 'e1',
  'é' : 'e2',
  'ě' : 'e3',
  'è' : 'e4',
  'ī' : 'i1',
  'í' : 'i2',
  'ǐ' : 'i3',
  'ì' : 'i4',
  'ō' : 'o1',
  'ó' : 'o2',
  'ǒ' : 'o3',
  'ò' : 'o4',
  'ū' : 'u1',
  'ú' : 'u2',
  'ǔ' : 'u3',
  'ù' : 'u4'
};
var findAccentedChars = function(text){
  var accentsFound = {};
  for(var i = 0; i < text.length; i++){
    for (var accentedChar in toneMap) {
      if(text[i].toLowerCase() === accentedChar) {
        if(text[i].toLowerCase() === text[i]) {
          accentsFound[i] = toneMap[accentedChar];
        } else {
          accentsFound[i] = toneMap[accentedChar].toUpperCase();
        }
      }
    }
  }
  return accentsFound;
};
var removeAccents = function(accentedChars, text){
  var output = '';
  for(var i = 0; i < text.length; i++){
    if(i in accentedChars) {
      output += accentedChars[i][0];
    } else {
      output += text[i];
    }
  }
  return output;
};
var getKeys = function(obj){
  var output = [];
  for (var key in obj) {
    output.push(key);
  }
  return output;
};
var findBetween = function(list, min, max){
  var i = 0;
  while(i < list.length) {
    if(list[i] > max) break;
    if(list[i] >= min) {
      return list[i];
    }
    i++;
  }
  return -1;
};
var toLower = function(x){
  if(x) return x.toLowerCase();
};
//I sort the regex options by length so the longer ones have precedence
var lenComp = function(a,b){
  if(a.length === b.length) return 0;
  return (a.length < b.length) ? 1 : -1;
};
var individualRexp = new RegExp('^(' +
    getKeys(individuals).sort(lenComp).join('|') +
    ')(\\d)?', 'i');
var initialFinalRexp = new RegExp('^(' +
    getKeys(initials).sort(lenComp).join('|') + ')(' +
    getKeys(finals).sort(lenComp).join('|') +
    ')(\\d)?', 'i');
var pinyinToZhuyin = function(pinyinText){
  var accentedChars = findAccentedChars(pinyinText);
  var sortedAccentedIndicies = getKeys(accentedChars).map(function(x){
    return parseInt(x, 10);
  });
  var text = removeAccents(accentedChars, pinyinText);
  
  var parseToken = function(i){
    var parse, detectedToneIdx;
    var token = {
      start : i
    };
    parse = text.slice(i).match(initialFinalRexp);
    if(parse) {
      parse = parse.map(toLower);
      token.zhuyin = initials[parse[1]] + finals[parse[2]];
      token.type = 'pinyin';
      if(typeof(parse[3]) !== 'undefined') {
        token.tone = parseInt(parse[3], 10);
      } else {
        detectedToneIdx = findBetween(sortedAccentedIndicies, i, i + parse[0].length);
        if(detectedToneIdx >= 0) {
          token.tone = accentedChars[detectedToneIdx][1];
        } else {
          token.tone = 5;
        }
      }
    } else {
      parse = text.slice(i).match(individualRexp);
      if(parse) {
        parse = parse.map(toLower);
        token.zhuyin = individuals[parse[1]];
        token.type = 'pinyin';
        if(typeof(parse[2]) !== 'undefined') {
          token.tone = parseInt(parse[2], 10);
        } else {
          detectedToneIdx = findBetween(sortedAccentedIndicies, i, i + parse[0].length);
          if(detectedToneIdx >= 0) {
            token.tone = accentedChars[detectedToneIdx][1];
          } else {
            token.tone = 5;
          }
        }
      } else {
        token.type = 'other';
        parse = [text[i]];
      }
    }
    token.parse = parse;
    return token;
  };
  var tokens = [];
  var curToken;
  var i = 0;
  while(i < text.length){
    curToken = parseToken(i);
    tokens.push(curToken);
    i += curToken.parse[0].length;
  }
  return tokens.map(function(token){
    if(token.type === 'other') return token.parse.join('');
    return token.zhuyin + token.tone;
  }).join('');
};
