export const beats = [
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
    producer: "ilLizit Prodz."
  },
  {
    file: require("../sounds/chasebeattwo.mp3"),
    producer: "ilLizit Prodz."
  },
  {
    file: require("../sounds/backinthetoxic.mp3"),
    producer: "ilLizit Prodz."
  },
  {
    file: require("../sounds/offthecuff.mp3"),
    producer: "ilLizit Prodz."
  },
  {
    file: require("../sounds/themind.mp3"),
    producer: "ilLizit Prodz."
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
    producer: "kashoutzxn0"
  },
  {
    file: require("../sounds/KashoutZxn0.mp3"),
    producer: "KashoutZxn0"
  }
];

const beatsCount = beats.length;

if (beatsCount <= 25) console.log(`Number of beats: ${beatsCount} \n`);

if (beatsCount >= 25) console.log("Nice, think about deploying");
