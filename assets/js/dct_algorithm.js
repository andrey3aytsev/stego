
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

    return Math.round(prod * summ);
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
    image_bloks_number = src_img_height * src_img_height / 64 ;
    // Количество блоков 8х8 в строке картинки
    row_image_bloks_number = Math.sqrt(image_bloks_number);

    // Двойной цикл по блокам 8х8
    for ( var y = 0; y < row_image_bloks_number ; y++ ) {
        for ( var x = 0; x < row_image_bloks_number ; x++ ) {

          array = [];

          // Двойной цикл по пикселям блока 8х8
          for ( var u = 0 ; u < 8 ; u++ ) {
              for ( var v = 0 ; v < 8 ; v++ ) {

                // Запоминаем значения текущего пикселя
                var pixelData = cxt_src.getImageData(x*8+v, y*8+u, 1, 1).data;

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

function dct_colors_from_coofs (image) {

  var result = result_linear = [];

  // Проходим по блокам коэффициентов и получаем блоки цветов
  for (var i = 0; i < image_bloks_number ; i++) {
    var tmp = dct_reverse_for_block( image.dct[i] );
    result.push(tmp);
  }

  // Леагизируем массив цветов
  for (var k = 0; k < Math.sqrt(image_bloks_number) ; k++) {
    for (var j = 0; j < 8 ; j++) {
      for (var i = 0; i < Math.sqrt(image_bloks_number) ; i++) {
        for (var h = 0; h < 8 ; h++) {
          result_linear.push([
            result[ k * Math.sqrt(image_bloks_number) + i ][ j * 8 + h ]
          ])
        }
      }
    }
  }

  // Создаём массив цветов для отрисовки
  for (var i = 0; i < image.size ; i++) {
    image.mod_colors.push([ image.src_colors[i][0], image.src_colors[i][1], result_linear[i]])
  }

}








