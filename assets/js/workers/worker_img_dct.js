
function dct_sigma(argument) {
    argument == 0 ? ( argument = (1 / Math.sqrt(2))) : (argument = 1);
    return argument;
}

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


function progress(image_bloks_number, image_sub_arrays) {

    var fract = Math.round( Math.sqrt(image_bloks_number) * Math.sqrt(Math.sqrt(image_bloks_number)) );
    var tracking_scale_size = Math.round(Math.sqrt(image_bloks_number) / Math.sqrt(Math.sqrt(image_bloks_number)));
    var track_step = 33 / tracking_scale_size;
    var tmp_array = [];

    for (var i = 0; i < image_bloks_number; i++) {
        var tmp = dct_direct_for_block( image_sub_arrays[i] )
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
    progress(e.data.image_bloks_number, e.data.image_sub_arrays)
}
