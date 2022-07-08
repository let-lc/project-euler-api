const fs = require('fs');
const path = require('path');
const { default: axios } = require('axios');
const { latest } = require('./latest.json');
const titles = require('./titles.json');

// Errors are not catch, let it throw and stop the GitHub action.

const getContent = async (qNum) => {
  const res = await axios.get(`https://projecteuler.net/minimal=${qNum}`);
  return res.data;
};

const saveFile = (qNum, data) => {
  fs.writeFileSync(
    path.join(__dirname, 'questions', `${qNum}.json`),
    JSON.stringify(data, null, 2)
  );
};

const updateLatest = (qNum) => {
  fs.writeFileSync(
    path.join(__dirname, `latest.json`),
    JSON.stringify({ latest: qNum })
  );
};

/**
 * Scrape question HTML content.
 */
const main = async () => {
  // start from the last one previous scraped.
  let qNum = latest;
  while (true) {
    if (qNum > titles.length) {
      console.log('No new questions!');
      break;
    }
    console.log(`>>> Downloading question: ${qNum}`);
    const data = { ...titles[qNum - 1], content: await getContent(qNum) };
    if (data.content === 'Data for that problem cannot be found') {
      console.error(`Content not found: ${qNum}`);
      break;
    }
    saveFile(qNum, data);
    console.log(`>>> Finished: ${qNum}\n`);
    qNum++;
  }
  updateLatest(qNum);
};

main();
