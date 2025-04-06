import Image from 'next/image';
import Productivity from '@/images/productivity.jpeg';

export default function Hero() {
	return (
		<>
			<div className="w-screen flex flex-col gap-4 justify-center items-center px-4">
				<Image
					src={Productivity}
					alt="productivity"
					width="400"
					height="400"
					quality="75"
				/>
				<div className="text-xs">
					Designed by{' '}
					<a className="text-blue-600 underline" href="https://www.freepik.com">
						Freepik
					</a>
				</div>
				<div className="text-xl text-center">
					Level Up Your Productivity with Smart Task Management
				</div>
			</div>
		</>
	);
}
