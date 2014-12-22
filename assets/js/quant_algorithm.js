/*  Функции для работы с алгоритмом квантования
================================================= */


// Функция находит разницу цветов соседних пикселей
function quant_color_diffs (image) {

  // Массив разниц цветов соседних пикселей
  image.quant_diffs = [];

  // По всем пикселям
  for (var i = 0; i < image.size - 1; i++) {

    var tmp = image.src_colors[i+1][0] - image.src_colors[i][0];
    image.quant_diffs.push(tmp);
  }

}


// Фyнкция находит значения тетта для каждой строки
function quant_tetta_function (image) {

  image.quant_tetta = [];

  // Сколько единиц добавить в строку
  var added = Math.floor( src_img_width / 3 );

  // По всем строкам
  for (var i = 0; i < src_img_height; i++) {

    var output = 0;

    // По элементам строки
    for (var j = 0; j < src_img_width; j++) {
      output += image.src_colors[ i*src_img_width + j ][0]
    }

    output = (output + added) % 2;

    // Добавляем результат функции как элемент массива
    image.quant_tetta.push(output);
  }

  var count = 0;

  while (image.quant_tetta.length < 511 ) {

    // Дублируем массив
    image.quant_tetta.push(image.quant_tetta[count]);
    count++;
  }

  textFile = null;
  $('#key-download').attr('href', makeTextFile(image.quant_tetta.toString()) );
}

// Функция генерации шкалы возможных разниц
function quant_generate_scale (image) {

  image.quant_scale = [];

  // Все возможные варианты разниц
  for (var i = -255; i <= 255; i++) {
    image.quant_scale.push(i)
  };

}


// Функция внедрения сообщения в массив разниц
function quant_modify_diffs(image, string) {

  for (var i = 0; i < string.length; i++) {

    // Текущий бит строки
    var current_bit = parseInt(string[i]);

    // Текущее значение разницы
    var current_diff = image.quant_diffs[i];

    // Позиция текущего значения на шкале
    var position = image.quant_scale.indexOf(current_diff);

    var shift = 0, power = 1;

    // Ищем индекс до тех пор пока не совпадёт
    while ( image.quant_tetta[ position ] != current_bit ) {
      shift++; power *= -1;
      position = position + ( shift * power);
    }

    // Присваиваем новое значение
    image.quant_diffs[i] = image.quant_scale[ position ];
  }

}


// Функция модификации массива цветов на основе массива разниц
function quant_modify_collors(image) {


  for (var i = 0; i < image.size; i++) {
    image.mod_colors.push([
      function_return(image.src_colors[i][0]),
      function_return(image.src_colors[i][1]),
      function_return(image.src_colors[i][2])
    ]);
  };

  // По всем пикселям кроме последнего
  for (var i = image.size - 2; i >= 0; i--) {

    // Записывам модифицированныe цвета
    image.mod_colors[i][0] = image.mod_colors[i+1][0] - image.quant_diffs[i];

  }

}

function function_return (argument) {
  return argument*1;
}


// Функция получения исходного сообщения
function quant_read_message(image) {

  // Контейнер для выходного текста
  var output_text = $("#output-text");

  var result = [];

  for (var i = 0; i < image.quant_diffs.length; i++) {

    result.push(
        image.stego_key[ image.quant_scale.indexOf( image.quant_diffs[i] ) ]
    )

  }

  for ( var i = 0; i < result.length - 8 ; i = i + 8) {

      var string = '';

      // Внутренний цикл по битам
      for ( var j = i; j - 8 < i; j++ ) {
          string += result[j];
      }

      var output = ABC.toAscii(string);

      // Выводим букву
      $(output_text).append( output );
  }

}

