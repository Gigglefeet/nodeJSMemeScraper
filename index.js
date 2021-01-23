const request = require('request');
const fs = require('fs');
const axios = require('axios').default;
const path = require('path');
// the axios method returns the data from the meme image when console logged.
axios
  .get('https://api.memegen.link/images/puffin.jpg?watermark=none')
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
  (err, res) => {
    if (err) {
      return console.log(err);
    }
    // this is how the img tag is extracted to the variable re
    const re = /<img[^>]+src="([^">]+)"/g;
    // A for loop that goes through the first 10 meme img tags, why it does that I have no Idea! but it does.
    for (let i = 0; i < 10; i++) {
      // This peace of code I don't understand yet
      const results = re.exec(res.body);
      array.push(results[1]);
    }
    console.log(array);
    // A for loop that loops through the array starting at i = 0, and loops through the size of the array ".length"
    for (let i = 0; i < array.length; i++) {
      console.log(i);
      console.log(array[i]);
      request(`${array[i]}`).pipe(
        fs.createWriteStream(`${__dirname}/memes/img_${i}.jpg`),
      );
    }
  },
);
