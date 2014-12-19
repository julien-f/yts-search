#!/usr/bin/env node

var program = require('commander'),
    fs = require('fs'),
    path = require('path'),
    Table = require('cli-table'),
    yts = require('..');


var pkgInfo = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), { encoding: 'utf8' }));


program
  .version(pkgInfo.version)
  .usage('[options] [query]')
  .option('-l, --limit <num>', 'Max amount of movie results (1-50)', 20)
  .option('-p, --page <num>', 'Page number [1]', 1)
  .option('-q, --quality <option>', 'Quality (720p|1080p|3d|all) [all]', 'all')
  .option('-r, --rating <num>', 'Minimum movie rating (1-9)', 1)
  .option('-g, --genre <option>', 'Movie genre (all)', 'all')
  .option('-s, --sort <option>', 'Sort by (date|seeds|peers|size|alphabet|rating|downloaded|year) [date]', 'date')
  .option('-m, --magnet', 'Displays only the magnet uri')
  .parse(process.argv);


var searchMovies = function () {
  var opts = {
    limit: program.limit,
    set: program.page,
    quality: program.quality,
    rating: program.rating,
    genre: program.genre,
    sort: program.sort
  };
  return yts.movies(program.args[0], opts);
};


var show = function (movies) {
  if (movies.MovieList.length > 1) return showMovies(movies);
  if (movies.MovieList.length) return showMovie(movies.MovieList[0]);
};


var showMovies = function (movies) {
  var head = [ 'id', 'title', 'year', 'genre', 'rating', 'quality', 'down / seeds / peers', 'imdb' ];
  var style = {
    head: [ 'green' ],
    compact: true
  };

  var t = new Table({ head: head, style: style });

  movies.MovieList.forEach(function (m) {
    var dsp = m.Downloaded + ' / ' + m.TorrentSeeds + ' / ' + m.TorrentPeers;

    t.push([ m.ImdbCode, m.MovieTitleClean, m.MovieYear, m.Genre, m.MovieRating, m.Quality, dsp, m.ImdbLink ]);
  });

  console.log(t.toString());
};


var showMovie = function (m) {
  if (program.magnet) return console.log(m.TorrentMagnetUrl);

  var style = {
    head: [ 'green' ],
    compact: true
  };

  var t = new Table({ style: style, colWidths: [ 10, 80 ] });

  t.push(
    { 'id': m.ImdbCode },
    { 'title': m.MovieTitleClean },
    { 'year':  m.MovieYear },
    { 'genre': m.Genre },
    { 'rating': m.MovieRating },
    { 'quality': m.Quality },
    { 'downloads': m.Downloaded },
    { 'seeds': m.TorrentSeeds },
    { 'peers': m.TorrentPeers },
    { 'size': m.Size },
    { 'imdb': m.ImdbLink }
  );

  console.log(t.toString());
  console.log('-', m.TorrentMagnetUrl);
};


var fail = function (err) {
  console.error(err);
  process.exit(1);
};


searchMovies()
  .then(show, fail);
