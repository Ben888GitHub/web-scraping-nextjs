import axios from 'axios';
import { load } from 'cheerio';

const handler = async (req, res) => {
	try {
		const { username } = req.body;

		const { data } = await axios.get(`https://www.instagram.com/${username}/`);

		const $ = load(data);
		const scriptTags = $('script[type="application/ld+json"]');
		const jsonData = JSON.parse(scriptTags.html());

		res.status(200).json(jsonData);
	} catch (err) {
		console.error('Error fetching Instagram profile:', error.message);
		res.status(500).json({ error: 'Error fetching Instagram profile' });
	}
};

export default handler;
