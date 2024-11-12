import express from 'express'

const app = express();

app.get('/', (req, res) => {
    res.send('Server is ready');
});


// get a list of 5 jokes

// use json formatter for understanding the structure of api (i.e here jokes)
app.get('/api/jokes', (req, res) => {
    const jokes = [
        {
          id: 1,
          title: 'Why did the scarecrow win an award?',
          content: 'Because he was outstanding in his field!',
        },
        {
          id: 2,
          title: 'Why don’t skeletons fight each other?',
          content: 'They don’t have the guts.',
        },
        {
          id: 3,
          title: 'What do you call cheese that isn’t yours?',
          content: 'Nacho cheese.',
        },
        {
          id: 4,
          title: 'Why couldn’t the bicycle stand up by itself?',
          content: 'It was two-tired.',
        },
        {
          id: 5,
          title: 'What did the ocean say to the shore?',
          content: 'Nothing, it just waved.',
        }
      ];
    res.send(jokes);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`)
});

