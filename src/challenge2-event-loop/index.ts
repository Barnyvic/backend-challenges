import fs from "fs/promises";

console.log("1) The King has entered the court");

fs.readFile("src/challenge2-event-loop/song.txt", "utf8")
  .then((lyrics) => {
    console.log("4/5?) The bard sings:", lyrics.trim());
  })
  .catch((err) => {
    console.error("The bard could not find the song:", err);
  });

setTimeout(() => {
  console.log("4/5?) The jester performs a daring act!");
}, 0);

process.nextTick(() => {
  console.log('3) Advisor whispers: "Your Majesty, there’s an urgent matter."');
});

console.log("2) The court session has ended");
