export const beatsData = [
  //TODO find all the beats we need here and update to get more initial files for testing
  {
    file: require("../sounds/mysterious_life_forms.mp3"),
    // producer: "FreeMusicArchive"
  },
  {
    file: require("../sounds/cannibis.mp3"),
    // producer: "FreeMusicArchive"
  },
  {
    file: require("../sounds/chasebeatone.mp3"),
    producer: "ilLizit Prodz.",
  },
  {
    file: require("../sounds/chasebeattwo.mp3"),
    producer: "ilLizit Prodz.",
  },
  {
    file: require("../sounds/backinthetoxic.mp3"),
    producer: "ilLizit Prodz.",
  },
  {
    file: require("../sounds/offthecuff.mp3"),
    producer: "ilLizit Prodz.",
  },
  {
    file: require("../sounds/themind.mp3"),
    producer: "ilLizit Prodz.",
  },
  {
    file: require("../sounds/bouncywalk.mp3"),
    // producer: "Storyblocks.com"
  },
  {
    file: require("../sounds/getthestrap.mp3"),
    // producer: "Storyblocks.com"
  },
  {
    file: require("../sounds/new_jazz_type_beat_2.wav"),
    producer: "Kashoutzxn0",
  },
  {
    file: require("../sounds/KashoutZxn0.mp3"),
    producer: "Kashoutzxn0",
  },
  {
    file: require("../sounds/Kashpaintshi.mp3"), //good
    producer: "Kashoutzxn0",
  },
  // {
  //   file: require("../sounds/zaytoven.mp3"), //nuer beat
  //   producer: "KashoutZxn0"
  // },
  {
    file: require("../sounds/soulslippin.mp3"),
    producer: "Jon Presstone",
  },
  {
    file: require("../sounds/tomgoldstein.mp3"),
    producer: "Tom Goldstein",
  },
  {
    file: require("../sounds/draco-c.jharris.mp3"),
    producer: "C.J. Harris",
  },
  {
    file: require("../sounds/samurai-cjharris.mp3"),
    producer: "C.J. Harris",
  },
];

const beatsCount = beatsData.length;

if (beatsCount <= 25) console.log(`Number of beats: ${beatsCount} \n`);

if (beatsCount >= 25) console.log("Nice, think about deploying");

const generateIdForBeats = (beats) => {
  return beats.map((beat, index) => ({ ...beat, id: index + 1 }));
};

export const beats = generateIdForBeats(beatsData);
