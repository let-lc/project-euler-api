const { default: axios } = require("axios");
const fs = require("fs");

// Errors are not catch, let it throw and stop the GitHub action.

axios
  .get(
    "https://raw.githubusercontent.com/luckytoilet/projecteuler-solutions/master/Solutions.md"
  )
  .then((res) => {
    const answers = {};
    const lines = res.data.split(/\r?\n/);
    const start = lines.findIndex((line) => line.includes("1."));
    const end = lines.lastIndexOf("```");
    lines.slice(start, end).forEach((ans) => {
      const parse = ans.split(/\.(.+)/);
      answers[parse[0]] = parse.length > 1 ? parse[1].trim() : "";
    });
    fs.writeFileSync(
      __dirname + "/answers.json",
      JSON.stringify(answers, null, 2)
    );
  });
