const fs = require('fs');
const path = require('path');
const { default: axios } = require('axios');

// Check img tag in the question contents, get the "src" and download the image to "/public/playground/project/images".
fs.readdirSync(path.join(__dirname, 'questions'))
  .sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
  )
  .forEach((file) => {
    const content = String(
      JSON.parse(
        fs
          .readFileSync(path.join(__dirname, 'questions', file))
          .toString('utf-8')
      ).content
    );
    if (content.includes('<img')) {
      const regex = /<img.*?src\s*=\s*"(.+?)"/g;
      [...content.matchAll(regex)].forEach((match) => {
        const filePath = path.join(
          __dirname,
          '../public/playground/project/images',
          path.basename(match[1])
        );
        if (fs.existsSync(filePath)) {
          console.log(`Skiped: ${path.basename(match[1])}`);
        } else {
          downloadFile(`https://projecteuler.net/${match[1]}`, filePath);
        }
      });
    }
  });

const downloadFile = async (url, filePath) => {
  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream',
    });

    const w = response.data.pipe(fs.createWriteStream(filePath));
    w.on('finish', () => {
      console.log(`Downloaded: ${url}`);
    });
  } catch (err) {
    throw new Error(err);
  }
};
