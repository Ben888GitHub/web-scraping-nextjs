import axios from 'axios';
import { load } from 'cheerio';

const handler = async (req, res) => {
	if (req.method === 'POST') {
		const { username } = req.body;

		console.log(username);
		console.log(username);
		try {
			const { data } = await axios.get(
				`https://www.instagram.com/${req.body.username}/`
			);
			console.log(data);
			const $ = await load(data);
			const scriptTags = $('script[type="application/ld+json"]');
			const jsonData = JSON.parse(scriptTags.html());

			console.log(jsonData);
			res.status(200).json(jsonData);
		} catch (err) {
			console.error('Error fetching Instagram profile:', error.message);
			res.status(500).json({ error: 'Error fetching Instagram profile' });
		}
	}

	// res.status(200).json({ username: username });
};

export default handler;
