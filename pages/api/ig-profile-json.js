import axios from 'axios';
import { load } from 'cheerio';

const handler = async (req, res) => {
	// const { username } = req.body;
	await axios.get(`https://www.instagram.com/fbi/`).then(({ data }) => {
		const $ = load(data);
		const scriptTag = $('script[type="application/ld+json"]');
		console.log(scriptTag.text());
	});

	res.status(200).json({ name: 'John Doe' });
};

export default handler;
