const request = require('request');
const fs = require('fs');
const axios = require('axios').default;
const path = require('path');

// the axios method returns the data from the meme image when console logged.
axios
  .get('https://api.memegen.link/images/puffin.jpg?watermark=none')
  .then((resp) => {
    // console.log(resp.data);
  })
  .catch((err) => {
    // Handle Error Here
    console.error(err);
  });

fs.mkdir(path.join(__dirname, 'memes'), { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Directory created successfully!');
});

const array = [];
// Request for the URL from our meme example site.
request(
  'https://memegen-link-examples-upleveled.netlify.app/',
  { json: true },
  (err, res, body) => {
    if (err) {
      return console.log(err);
    }

    // this is how the img tag is extracted to the variable re
    const re = /<img[^>]+src="([^">]+)"/g;
    // A for loop that goes through the first 10 meme img tags, why it does that I have no Idea! but it does.
    for (let i = 0; i < 10; i++) {
      // This peace of code I don't understand yet
      let results = re.exec(res.body);
      let source = results[1];

      array.push(results[1]);
      //console.log(results);
    }
    console.log(array);
    for (let i = 0; i < array.length; i++) {
      console.log(i);
      console.log(array[i]);
      fs.writeFileSync(
        `${__dirname}/memes/img_${i + 1}.jpg`,
        array.toString('binary'),
      );
    }
  },
);
