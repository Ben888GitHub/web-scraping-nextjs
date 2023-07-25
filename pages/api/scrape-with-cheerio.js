import axios from 'axios';
import { load } from 'cheerio';

const handler = async (req, res) => {
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Origin', '*'); // replace this your actual origin
	res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
	);

	const { username } = req.body;

	console.log(username);
	try {
		const { data } = await axios.get(
			`https://www.instagram.com/${req.body.username}/`
		);

		const $ = await load(data);
		const scriptTags = $('script[type="application/ld+json"]');
		const jsonData = JSON.parse(scriptTags.html());

		console.log(jsonData);
		res.status(200).json(jsonData);
	} catch (err) {
		console.error('Error fetching Instagram profile:', error.message);
		res.status(500).json({ error: 'Error fetching Instagram profile' });
	}
	// res.status(200).json({ username: username });
};

export default handler;
