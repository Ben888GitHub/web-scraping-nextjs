/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**'
			}
		],
		domains: [
			'scontent-iad3-1.cdninstagram.com',
			'cdninstagram.com',
			'scontent.cdninstagram.com',
			'scontent-lax3-1.cdninstagram.com'
		]
	},
	output: 'standalone'
};

module.exports = nextConfig;
