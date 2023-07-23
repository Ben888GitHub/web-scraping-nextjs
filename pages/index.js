import axios from 'axios';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const [username, setUsername] = useState('');
	const [loading, setLoading] = useState(false);

	const [profile, setProfile] = useState({});

	const handleSetUsername = (e) => {
		setUsername(e.target.value);
	};

	const showInstagramUser = async () => {
		console.log(username);
		setProfile({});
		setLoading(true);

		try {
			const { data } = await axios.get(`/api/scrape-with-cheerio/${username}`);
			setLoading(false);
			if (data) {
				setProfile((currProfile) => ({ ...currProfile, username: data }));
				console.log(data);
			} else {
				alert('User not found');
				setProfile({});
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

			{profile?.username && (
				<div className="mt-10 lg:ml-20 md:ml-20 ml-0">
					<Image
						width={300}
						height={300}
						className=" max-w-full rounded-lg"
						src={profile?.username?.author?.image}
						alt={username}
						// quality={300}
					/>
					<div className="flex text-center mt-2">
						{profile?.username?.interactionStatistic?.map(
							({ userInteractionCount, interactionType }, idx) => (
								<div className="m-2" key={idx}>
									<p className="text-xl font-medium">{userInteractionCount}</p>

									{interactionType === 'http://schema.org/WriteAction' ? (
										<p>Total Posts</p>
									) : (
										<p>Followers</p>
									)}
								</div>
							)
						)}
					</div>
					<div className="ml-2">
						<p className="text-xl md:text-2xl lg:text-2xl mt-3">
							{profile?.username?.author?.name}
						</p>
						<p className="text-lg md:text-xl lg:text-xl text-gray-400 ">
							{profile?.username?.author?.alternateName}
						</p>
						<a
							className="underline text-sm "
							href={profile?.username?.author?.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							{profile?.username?.author?.url}
						</a>
						{profile?.username?.description && (
							<p className="text-md w-96 mt-2">
								{profile?.username?.description}
							</p>
						)}
					</div>
				</div>
			)}
		</main>
	);
}
