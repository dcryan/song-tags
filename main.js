const fs = require("fs");
const fuzz = require("fuzzball");

const list2000 = require('./song-lists/2000s.json');
const list60 = require('./song-lists/60s.json');
const list70 = require('./song-lists/70s.json');
const list80 = require('./song-lists/80s.json');
const list90 = require('./song-lists/90s.json');
const aroundTheWorld = require('./song-lists/around-the-world.json');
const atTheGame = require('./song-lists/at-the-game.json');
const buyOne = require('./song-lists/buy-one.json');
const buyTwo = require('./song-lists/buy-2.json');
const christmas = require('./song-lists/christmas.json');
const classicRock = require('./song-lists/classic-rock.json');
const country = require('./song-lists/country.json');
const coversVsOriginalsVsParodies = require('./song-lists/covers-vs-originals-vs-parodies.json');
const discoVsGrunge = require('./song-lists/disco-vs-grunge.json');
const extraDisco = require('./song-lists/exra-disco.json');
const extraGrunge = require('./song-lists/extra-grunge.json');
const hairBands = require('./song-lists/hair-bands.json');
const heartbreak = require('./song-lists/heartbreak.json');
const internet = require('./song-lists/internet.json');
const letterB = require('./song-lists/letter-b.json');
const miscellaneous = require('./song-lists/miscellaneous.json');
const oldSchoolHipHop = require('./song-lists/old-school-hip-hop.json');
const oldies = require('./song-lists/oldies.json');
const oneHitWonders = require('./song-lists/one-hit-wonders.json');
const tvAndMovies = require('./song-lists/tv-and-movies.json');

const songs  = [];

const findSong = (incomingSong, tag) => {
  return songs.find(song => {
    const artistScore = fuzz.token_sort_ratio(song.artist, incomingSong.artist);
    if (artistScore < 90) return false;

    const score = fuzz.token_sort_ratio(song.name, incomingSong.name);
    if (score > 80 && score < 100) console.log(score, incomingSong, song, song.origin, tag)
    return score > 90;
  });
};

const addBunch = (list) => {
  list.songs.forEach(song => {
    const matchingSong = findSong(song);
    if (matchingSong) {
      matchingSong.tags.push(list.tag);

      matchingSong.count = Math.max(matchingSong.count, song.count);
    }
    else {
      song.tags = [list.tag];
      songs.push(song);
    }
  });
}

function main() {
  addBunch(list2000)
  addBunch(list60)
  addBunch(list70)
  addBunch(list80)
  addBunch(list90)
  addBunch(aroundTheWorld)
  addBunch(atTheGame)
  addBunch(buyOne)
  addBunch(buyTwo)
  addBunch(christmas)
  addBunch(classicRock)
  addBunch(country)
  addBunch(coversVsOriginalsVsParodies)
  addBunch(discoVsGrunge)
  addBunch(extraDisco)
  addBunch(extraGrunge)
  addBunch(hairBands)
  addBunch(heartbreak)
  addBunch(internet)
  addBunch(letterB)
  addBunch(miscellaneous)
  addBunch(oldSchoolHipHop)
  addBunch(oldies)
  addBunch(oneHitWonders)
  // addBunch(tvAndMovies)
  

  fs.writeFileSync('./src/output.json', JSON.stringify(songs));
}

main();
