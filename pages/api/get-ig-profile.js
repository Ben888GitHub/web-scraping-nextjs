import axios from 'axios';
import { load } from 'cheerio';

const handler = async (req, res) => {
	if (req.method === 'POST') {
		const { username } = req.body;

		console.log(username);
		console.log(username);
		try {
			const { data } = await axios.get(
				`https://www.instagram.com/${req.body.username}/`,
				{
					headers: {
						'User-Agent':
							'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
					}
				}
			);
			// console.log(data);
			const $ = await load(data);
			const scriptTags = await $('script[type="application/ld+json"]');
			console.log(scriptTags);
			console.log(scriptTags.html());
			const jsonData = await JSON.parse(scriptTags.html());

			console.log(jsonData);

			res.setHeader('Content-Type', 'application/json');
			res.status(200).json(jsonData);
		} catch (err) {
			console.error('Error fetching Instagram profile:', error.message);
			res.status(500).json({ error: 'Error fetching Instagram profile' });
		}
	}

	// res.status(200).json({ username: username });
};

export default handler;
