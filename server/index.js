import express from 'express';
import ImageKit from 'imagekit';
import bodyParser from 'body-parser';

const app = express();

const imagekit = new ImageKit({
  publicKey: 'public_DgWwF8YshX9teeO0xVkHbPuvaxA=',
  privateKey: 'private_DZ7GdX7pJV9b4X4z9mngYmEkNvU=',
  urlEndpoint: 'https://ik.imagekit.io/3wvmuwil3',
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross-origin requests
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/auth', function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.listen(3001, function () {
  console.log('Server running on Port 3001');
});
