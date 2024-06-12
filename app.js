
import sample from 'lodash.sample';
import express from 'express';
import morgan from 'morgan';
import nunjucks from 'nunjucks';




const app = express();
const port = '8000';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

// Run the server.
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${server.address().port}...`);
});

const COMPLIMENTS = [
  'awesome',
  'terrific',
  'fantastic',
  'neato',
  'fantabulous',
  'wowza',
  'oh-so-not-meh',
  'brilliant',
  'ducky',
  'coolio',
  'incredible',
  'wonderful',
  'smashing',
  'lovely',
];

const getRandomCompliment = () => {
  const randomIndex = Math.floor(Math.random() * COMPLIMENTS.length);
  return COMPLIMENTS[randomIndex];
};



// Display the homepage
app.get('', (req, res) => {
  res.render('index.html');
});

// Display a form that asks for the user's name.
app.get('/hello', (req, res) => {
  res.render('hello.html');
});

// Handle the form from /hello and greet the user.
app.get('/greet', (req, res) => {
  const name = req.query.name || 'stranger';
  const compliment = getRandomCompliment(COMPLIMENTS);
  res.render('greet.html.njk', { name: name, compliment: compliment });
});

// Define GET route for /game
app.get('/game', (req, res) => {
  // Get user response to the yes-or-no question from the form
  const response = req.query.response;
 

  if (response === 'no') {
      res.render('goodbye.html.njk');
  } else if (response === 'yes') {
      res.render('game.html.njk');
  } else {
      res.send('Invalid response. Please go back and try again.');
  }

});

// Start the server
//app.listen(3000, () => {
 // console.log('Server is running on http://localhost:3000');
//});

 // Handle the /madlib route
 //app.get('/madlib', (req, res) => {
 // const { person, color, noun, adjective } = req.query.response; // Get the user inputs from the query parameters

  //const madlibText = `There once was a ${color} ${noun} sitting in the Devmountain Lab. 
   // When ${person} went to pick it up, it burst into flames in a totally ${adjective} way.`;

  //res.render('madlib.html.njk', { madlibText }); // Render the madlib template with the generated MadLib text
//});

// Route to handle the /madlib endpoint
app.post('/madlib', (req, res) => {
  // Extract the person, color, noun, and adjective from the query parameters
  const { person, color, noun, adjective } = req.body;
 const madlibText = `There once was a ${color} ${noun} sitting in the Devmountain Lab. 
   When ${person} went to pick it up, it burst into flames in a totally ${adjective} way.`;
  // Render the madlib.html template with the MadLib story
  res.render('madlib.html.njk', {  madlibText });
});