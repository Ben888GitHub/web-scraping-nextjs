import { load } from 'cheerio';
import axios from 'axios';
const handler = async (req, res) => {
	if (req.method === 'POST') {
		const { username } = req.body;

		console.log(username);
		console.log(username);
		try {
			const { data } = await axios.get(
				`https://www.instagram.com/${username}/`
			);
			// console.log(data);
			const $ = load(data);
			const scriptTags = $('script[type="application/ld+json"]');
			// console.log(scriptTags);
			console.log(scriptTags.length);

			console.log(scriptTags);
			const jsonData = JSON.parse(scriptTags?.html());

			// console.log(jsonData);

			res.setHeader('Content-Type', 'application/json');
			res.status(200).json(jsonData);
		} catch (err) {
			console.error('Error fetching Instagram profile:', err.message);
			res.status(500).json({ err: 'Error fetching Instagram profile' });
		}
	}

	// res.status(200).json({ username: username });
};

export default handler;
