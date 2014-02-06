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
  i : 'ㄧ',
  ia : 'ㄧㄚ',
  ie : 'ㄧㄝ',
  iao : 'ㄧㄠ',
  iu : 'ㄧㄡ',
  ian : 'ㄧㄢ',
  iang : 'ㄧㄤ',
  'in' : 'ㄧㄣ',
  ing : 'ㄧㄥ',
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
  yi : 'ㄧ',
  ya : 'ㄧㄚ',
  ye : 'ㄧㄝ',
  yao : 'ㄧㄠ',
  you : 'ㄧㄡ',
  yan : 'ㄧㄢ',
  yang : 'ㄧㄤ',
  yin : 'ㄧㄣ',
  ying : 'ㄧㄥ',
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
      if(text[i] === accentedChar) {
        accentsFound[i] = toneMap[accentedChar];
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
var pinyinToZhuyin = function(pinyinText){
  var accentedChars = findAccentedChars(pinyinText);
  var sortedAccentedIndicies = getKeys(accentedChars).map(function(x){
    return parseInt(x, 10);
  });
  var text = removeAccents(accentedChars, pinyinText);
  //I sort the regex options by lenght so the longer ones have precedence
  var len = function(a,b){return a.length < b.length;};
  var toLower = function(x){
    if(x) return x.toLowerCase();
  };
  var individualRexp = new RegExp('^(' +
    getKeys(individuals).sort(len).join('|') +
    ')(\\d)?', 'i');
  var initialFinalRexp = new RegExp('^(' +
    getKeys(initials).sort(len).join('|') + ')(' +
    getKeys(finals).sort(len).join('|') +
    ')(\\d)?', 'i');
  var parse;
  var tokens = [];
  var token;
  var detectedToneIdx;
  var i = 0;
  while(i < text.length){
    token = {
      start : i
    };
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
        token.type = 'other';
        parse = [text[i]];
      }
    }
    token.parse = parse;
    tokens.push(token);
    i += token.parse[0].length;
  }
  console.log(tokens);
  return tokens.map(function(token){
    if(token.type === 'other') return token.parse.join('');
    return token.zhuyin + token.tone;
  }).join('');
};
