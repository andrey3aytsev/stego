/*  Вспомогательные функции
============================ */


// Перевод дроби в бинарный вид
function dec_2_bin (number) {
    result = add_zeros(number.toString(2), 8);
    return result;
}

// Приведение к 8-ми значному формату
function add_zeros (str, max) {
    str = str.toString();
    return str.length < max ? add_zeros("0" + str, max) : str;
}

// Перевод символов в бинарный вид и обратно
var ABC = {

  toAscii: function(bin) {
      return bin.replace(/\s*[01]{8}\s*/g, function(bin) {
          return String.fromCharCode(parseInt(bin, 2))
      })
  },

  toBinary: function(str, spaceSeparatedOctets) {
    return str.replace(/[\s\S]/g, function(str) {
        str = ABC.zeroPad(str.charCodeAt().toString(2));
        return !1 == spaceSeparatedOctets ? str : str
    })
  },

  zeroPad: function(num) {
    return "00000000".slice(String(num).length) + num
  }

};

// Создание текстового файла
makeTextFile = function (text) {
  var data = new Blob([text], {type: 'text/plain'});

  if (textFile !== null) {
    window.URL.revokeObjectURL(textFile);
  }

  textFile = window.URL.createObjectURL(data);

  return textFile;
}

// Выбираем последний элемент массива
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};












