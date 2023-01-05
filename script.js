const lowerCaseAlphabet = "abcdefghijklmnopqrstuvwxyz";
const upperCaseAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphabet = lowerCaseAlphabet + upperCaseAlphabet;

var savedInterval = null;
var savedRedactions = null;

function randomValue(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function createRedaction(text) {
  return text
    .split("")
    .map((c) => {
      if (alphabet.includes(c)) {
        return randomValue(alphabet);
      } else {
        return c;
      }
    })
    .join("");
}

function redactAllMarkedOnce() {
  if (savedRedactions == null)
    redactions = Array.prototype.slice.call(
      document.getElementsByClassName("redaction")
    );
  else redactions = savedRedactions;

  redactions.forEach((element) => {
    element.innerHTML = createRedaction(element.innerHTML);
  });
}

function redactAllMarked(time = 100) {
  if (savedRedactions == null)
    redactions = Array.prototype.slice.call(
      document.getElementsByClassName("redaction")
    );
  else return;

  redactions.forEach((red) => {
    red.clearText = red.innerHTML;
  });

  savedRedactions = redactions;
  savedInterval = window.setInterval(() => {
    redactAllMarkedOnce();
  }, time);
}

function resetRedactions() {
  clearInterval(savedInterval);

  savedRedactions.forEach((red) => {
    red.innerHTML = red.clearText;
  });

  savedRedactions = null;
}

console.log("SCRIPT LOADED!");
