function dct_sigma(argument) {
    argument == 0 ? ( argument = (1 / Math.sqrt(2))) : (argument = 1);
    return argument;
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






function dct_colors_from_coofs(image_bloks_number, image_dct) {

    var fract = Math.round( Math.sqrt(image_bloks_number) * Math.sqrt(Math.sqrt(image_bloks_number)) );
    var tracking_scale_size = Math.round(Math.sqrt(image_bloks_number) / Math.sqrt(Math.sqrt(image_bloks_number)));
    var track_step = 55 / tracking_scale_size;
    var tmp_array = [];


    for (var i = 0; i < image_bloks_number ; i++) {
      var tmp = dct_reverse_for_block( image_dct[i] );
      tmp_array.push(tmp);

      if ( (i % fract) == 0 )   {
          self.postMessage({
              'track_value': track_step,
              'complete': false
          })
      }
    }

    self.postMessage({
        'track_value': 0,
        'complete': true,
        'tmp_array': tmp_array
    });
}

self.onmessage = function(e) {
    dct_colors_from_coofs(e.data.image_bloks_number, e.data.image_dct)
}





















