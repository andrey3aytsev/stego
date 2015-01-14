/*  Вспомогательные функции
============================ */



// Обьект для работы с сиволами
ABC = {

  array : ['А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я','а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' ','!','"','#','$','%','&','\'','(',')','*','+',',','-','.','/','0','1','2','3','4','5','6','7','8','9',':',';','<','=','>','?','@','[','\\',']','^','_','`','{','|','}','~'],

  // Бинарную строку в  Ascii
  toAscii: function(bin) {
    return bin.replace(/\s*[01]{8}\s*/g, function(bin) {
      var index = ABC.array[parseInt(bin, 2)];
      index = index || String.fromCharCode(Math.floor((Math.random() * 256) + 1));
      return index;
    })
  },

  // Строку в бинарный вид
  toBinary: function(str) {
    return String(str).replace(/[\s\S]/g, function(str) {
        return ABC.toOctet(ABC.array.indexOf(str).toString(2));
      })
  },

  // к 8-ми значному виду
  toOctet: function(num) {
    return "00000000".slice(String(num).length) + num;
  },

  // Число в бинарный вид
  dec2Bin: function(num) { return ABC.toOctet(num.toString(2)); }
}



// Создание текстового файла
makeTextFile = function (text) {

  // Создаем обьект Blob
  var data = new Blob([text], {type: 'text/plain'});
  if (textFile !== null) { window.URL.revokeObjectURL(textFile); }

  return window.URL.createObjectURL(data);
}


// Метод выборки последнего элемента для массивов
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};












