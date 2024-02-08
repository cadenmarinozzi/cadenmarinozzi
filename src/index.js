const express = require('express');
const text2Svg = require('text-svg');
const cors = require('cors'); // cors is required for GitHub
const axios = require('axios');

const app = express();

app.get('*', async (req, res) => {
	// Get quotes every request so that the quotes refresh every time
	const quotes = (
		await axios.get(
			'https://raw.githubusercontent.com/cadenmarinozzi/cadenmarinozzi/main/quotes.txt'
		)
	).data.split('\n');
	const quote = quotes[Math.floor(Math.random() * quotes.length)];

	const quoteSVG = text2Svg(`"${quote}" - nekumelon`, {
		color: 'white',
		fontSize: 20,
	});

	res.setHeader('Cache-Control', 'private, max-age=0, no-cache'); // Prevent caching
	res.contentType('image/svg+xml');

	res.status(200).send(quoteSVG);
});

app.use(
	cors({
		origin: '*', // Allow all origins
	})
);

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Quote server is running on ${port}.`);
});
