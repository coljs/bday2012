var songs = {
      'Drop of whisper': ['first','Drop of whisper', 'https://github.com/BogotaJS/bday2012/raw/master/songs/Antony_Raijekov_-_04_-_Drop_of_whisper_2005.mp3'],
      'Lightout': ['second','Lightout','https://github.com/BogotaJS/bday2012/raw/master/songs/Antony_Raijekov_-_09_-_Lightout_2003.mp3'],
      'While we walk': ['third','While we walk', 'https://github.com/BogotaJS/bday2012/raw/master/songs/Antony_Raijekov_-_11_-_While_We_Walk_2004.mp3'],
      'By the coast': ['four','By the coast', 'https://github.com/BogotaJS/bday2012/raw/master/songs/Antony_Raijekov_-_12_-_By_the_Coast_2004.mp3'],
      'Mdma pt 2': ['five','Mdma pt 2', 'https://github.com/BogotaJS/bday2012/raw/master/songs/Morus_Alba_-_01_-_MDMA_Pt_2.mp3'],
      'Goodbye': ['six','Goodbye', 'https://github.com/BogotaJS/bday2012/raw/master/songs/Morus_Alba_-_02_-_Goodbye.mp3']
    };
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express', songs: songs });
};