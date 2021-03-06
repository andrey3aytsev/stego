/*  Вспомогательные функции
============================ */


// Обьект для работы с сиволами
ABC = {

  win1251 : ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','10','11','12','13','14','15','16','17','18','19','1a','1b','1c','1d','1e','1f','20','21','22','23','24','25','26','27','28','29','2a','2b','2c','2d','2e','2f','30','31','32','33','34','35','36','37','38','39','3a','3b','3c','3d','3e','3f','40','41','42','43','44','45','46','47','48','49','4a','4b','4c','4d','4e','4f','50','51','52','53','54','55','56','57','58','59','5a','5b','5c','5d','5e','5f','60','61','62','63','64','65','66','67','68','69','6a','6b','6c','6d','6e','6f','70','71','72','73','74','75','76','77','78','79','7a','7b','7c','7d','7e','7f','402','403','201a','453','201e','2026','2020','2021','20ac','2030','409','2039','40a','40c','40b','40f','452','2018','2019','201c','201d','2022','2013','2014','2122','459','203a','45a','45c','45b','45f','a0','40e','45e','408','a4','490','a6','a7','401','a9','404','ab','ac','ad','ae','407','b0','b1','406','456','491','b5','b6','b7','451','2116','454','bb','458','405','455','457','410','411','412','413','414','415','416','417','418','419','41a','41b','41c','41d','41e','41f','420','421','422','423','424','425','426','427','428','429','42a','42b','42c','42d','42e','42f','430','431','432','433','434','435','436','437','438','439','43a','43b','43c','43d','43e','43f','440','441','442','443','444','445','446','447','448','449','44a','44b','44c','44d','44e','44f'],

  // Бинарную строку в символы
  toAscii: function(bin) {
    return bin.replace(/\s*[01]{8}\s*/g, function(bin) {
      var index = String.fromCharCode(parseInt(ABC.win1251[parseInt(bin, 2)],16));
      index = index || String.fromCharCode(Math.floor((Math.random() * 128) + 1));
      return index;
    })
  },

  // Строку в бинарный вид
  toBinary: function(str) {
    return String(str).replace(/[\s\S]/g, function(str) {
        return ABC.toOctet(ABC.win1251.indexOf(str.charCodeAt().toString(16)).toString(2));
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


// Чтение текстового файла
function readText(filePath) {
  // Проверем расширение
  var ext = $("#key_upload_file").val().split(".").last();
  var size =  document.getElementById($("#key_upload_file").attr('id')).files[0].size / Math.pow(2, 9);

  if ( ext != "txt" )
    { alert("Неправильный формат файла."); return; }

  if ( size > 10 )
    { alert("Файл слишком большой, загрузите файл меньше 2MB."); return; }

  reader = new FileReader();
  var output = ""; //placeholder for text output
  if(filePath.files && filePath.files[0]) {
      reader.onload = function (e) {
          output = e.target.result;
          displayContents(output);
      };//end onload()
      reader.readAsText(filePath.files[0]);
  }//end if html5 filelist support
  return true;
}

function displayContents(txt) {
  image.stego_key =  txt.split(',');
  $('#key_upload_button')
    .css('background', '#5bbd72')
    .find('span').text('Ключ загружен')
    .siblings('i').removeClass('fi-upload').addClass('fi-check');
  $('.quant-decript-wrap.is-hidden').slideDown();
}



// Метод выборки последнего элемента для массивов
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};









