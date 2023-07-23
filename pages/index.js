import axios from 'axios';
import { Inter } from 'next/font/google';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const [username, setUsername] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSetUsername = (e) => {
		setUsername(e.target.value);
	};

	const showInstagramUser = async () => {
		console.log(username);
		setLoading(true);

		try {
			const { data } = await axios.get(`/api/scrape-with-cheerio/${username}`);
			setLoading(false);
			if (data) {
				console.log(data);
			} else {
				console.log('User not found');
			}
		} catch (err) {
			setLoading(false);
			console.log('Unknown IG User');
		}
	};

	return (
		<main
			className={`flex  flex-col items-center justify-between p-16 ${inter.className}`}
		>
			<p className="text-4xl mb-10">Web Scraping NextJS</p>
			<div className="flex">
				<input
					type="text"
					value={username}
					onChange={handleSetUsername}
					placeholder="Search IG Profile"
					className="p-3 border-2 border-gray-300 rounded-md"
				/>
				<button
					disabled={username === '' || loading === true}
					onClick={showInstagramUser}
					className="p-2 bg-green-700 text-white rounded-md"
				>
					Search
				</button>
			</div>
			{loading && <p className="text-2xl">Loading Profile...</p>}
		</main>
	);
}
