
// Дискретное преобразование для элементов 1 блока
function dct_direct (u, v, array) {

    var prod = dct_sigma(u) * dct_sigma(v) / 4,
        summ = 0;

    for (var m = 0; m < 8; m++) {
      for (var l = 0; l < 8; l++) {

        summ += 1
          * array[ m * 8 + l ][2]
          * Math.cos( (Math.PI * u * (2*m + 1)) / 16 )
          * Math.cos( (Math.PI * v * (2*l + 1)) / 16 )
      }
    }

    return prod * summ;
}

// Дискретное преобразование для элементов 1 блока
function dct_reverse(u, v, dct_array) {

    var prod = 1 / 4,
        summ = 0;

    for (var m = 0; m < 8; m++) {
      for (var l = 0; l < 8; l++) {

        summ += 1
          * dct_sigma(m) * dct_sigma(l)
          * dct_array[ m * 8 + l ]
          * Math.cos( (Math.PI * m * (2*u + 1)) / 16 )
          * Math.cos( (Math.PI * l * (2*v + 1)) / 16 )
      }
    }

    var res = prod * summ;

    if (res > 255) { res = 255 };
    if (res < 0)   { res = 0 };

    return Math.round(res);
}


function dct_direct_for_block(array) {

  ddd = [];

  // По 64 пикселям
  for (var m = 0; m < 8; m++) {
    for (var l = 0; l < 8; l++) {
        var ooo = dct_direct(m, l, array);
        ddd.push(ooo);
    }
  }

  return ddd;
}


function dct_reverse_for_block(array) {

  ccc = [];

  // По 64 пикселям
  for (var m = 0; m < 8; m++) {
    for (var l = 0; l < 8; l++) {
        var aaa = dct_reverse(m, l, array)
        ccc.push(aaa);
    }
  }

  return ccc;
}


// Функция создания глобального массива ДКТ
function dct_create_function (image) {

    // Количество блоков 8х8 в картинке
    image_bloks_number = src_img_height * src_img_width / 64 ;
    row_bloks_number = src_img_width/8;
    col_bloks_number = src_img_height/8;

    // Создаем матрицу исходных цветов
    var tmp_appay = []
    for ( var i = 0; i < src_img_height ; i++ ) {
        var tmp_appay2 = []
        // Двойной цикл по пикселям блока 8х8
        for ( var u = 0 ; u < src_img_width ; u++ ) {
          tmp_appay2.push(image.src_colors[i*src_img_width + u])
        }
        tmp_appay.push(tmp_appay2);
    }

    // Создаём матрицу массивов 8х8
    for ( var y = 0; y < col_bloks_number ; y++ ) {
        for ( var x = 0; x < row_bloks_number ; x++ ) {

          array = [];

          // Двойной цикл по пикселям блока 8х8
          for ( var u = 0 ; u < 8 ; u++ ) {
              for ( var v = 0 ; v < 8 ; v++ ) {

                // Запоминаем значения текущего пикселя
                var pixelData = tmp_appay[y*8+u][x*8+v];

                // Записываем эти значения в массив в десятичном виде
                array.push([ pixelData[0], pixelData[1],  pixelData[2] ]);

              }
          }

          image.sub_arrays.push(array);

        }
    }

    // Создаем массив коэффициентов
    for (var i = 0; i < image_bloks_number ; i++) {
      var tmp = dct_direct_for_block( image.sub_arrays[i] )
      image.dct.push(tmp);
    }
}


// Функция внедрения сообщения в коэффициенты
function dct_modify_array(image, string) {

    for (var i = 0; i < string.length ; i++) {

      var result =
      dct_encript_bit( string[i], image.dct[i][image.coof_num[0]], image.dct[i][image.coof_num[1]] )

      image.dct[i][image.coof_num[0]] = result[0];
      image.dct[i][image.coof_num[1]] = result[1];
    }
}




// Функция генерации цветов из коэффициентов
function dct_colors_from_coofs (image) {


  var result = result_linear = [];

  // Проходим по блокам коэффициентов и получаем блоки цветов
  for (var i = 0; i < image_bloks_number ; i++) {
    var tmp = dct_reverse_for_block( image.dct[i] );
    result.push(tmp);
  }

  var c = 0;

  // Леагизируем массив цветов
  for (var k = 0; k < col_bloks_number ; k++) {
    for (var j = 0; j < 8 ; j++) {
      for (var i = 0; i < row_bloks_number ; i++) {
        for (var h = 0; h < 8 ; h++) {
          image.mod_colors.push([
            image.src_colors[c][0],
            image.src_colors[c][1],
            result[ k * row_bloks_number + i ][ j * 8 + h ]
          ])
          c++;
        }
      }
    }
  }

}


// Расшифровка сообщения по коэффициентам
function dct_decript(image) {

    var result = [], output_text = $("#output-text");

    // Проходим по всем блокам 8х8
    for (var i = 0; i < image_bloks_number ; i++) {

      // Находим разницу между коэффициентами
      var diff = Math.abs(image.dct[i][image.coof_num[0]]) - Math.abs(image.dct[i][image.coof_num[1]]);

      if ( diff >=  0 ) { result.push('0') } else
      if ( diff <= 0  ) { result.push('1') }
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






