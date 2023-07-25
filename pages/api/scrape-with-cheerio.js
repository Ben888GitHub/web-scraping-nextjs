import axios from 'axios';
import { load } from 'cheerio';

const handler = async (req, res) => {
	const { username } = req.body;

	const { data } = await axios.get(`https://www.instagram.com/${username}/`);

	const $ = load(data);
	const scriptTags = $('script[type="application/ld+json"]');
	const jsonData = JSON.parse(scriptTags.html());

	res.status(200).json(jsonData);
};

export default handler;
