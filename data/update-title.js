const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const { default: axios } = require('axios');

// Download titles
axios
  .get('https://euler.haku.dev/api/titles', {
    params: { token: process.env.TOKEN },
  })
  .then((res) => {
    fs.writeFileSync(
      path.join(__dirname, 'titles.json'),
      JSON.stringify(
        parse(res.data, { columns: true, skip_empty_lines: true }).map(
          (row) => ({
            id: Number(row.ID),
            published: Number(row.Published),
            title: row.Description,
          })
        )
      )
    );
  })
  .catch((error) => {
    console.error(error);
  });
