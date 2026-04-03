import Image from "next/image";

export default function AboutHamidul() {
	return (
		<section className="relative py-20 md:py-24 lg:py-32 bg-gray-100 overflow-hidden">
			{/* Left floating decoration */}
			<Image
				src="/images/book.png"
				alt="Book decoration"
				width={120}
				height={120}
				className="absolute left-4 top-10 hidden xl:block"
			/>

			<div className="container mx-auto px-4 relative z-10">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Left content */}
					<div className="relative max-w-xl">
						<div className="mb-6 flex items-center gap-4">
							<div className="relative w-4 h-4">
								<span className="absolute inset-0 rotate-45 border border-cyan-400" />
								<span className="absolute inset-0.75 rotate-45 border border-rose-400" />
							</div>
							<Image
								src="/images/texttop.png"
								alt="Arrow decoration"
								width={140}
								height={28}
								className="opacity-70"
							/>
						</div>

						<h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
							Md. Hamidul Huq
						</h2>

						<p className="text-xl md:text-2xl text-indigo-600 font-medium mb-4">
							Mind Programmer &amp; Behavioral Psychology Practitioner
						</p>

						<p className="text-gray-600 text-lg leading-relaxed mb-6">
							প্রতিষ্ঠাতা, IDEA এবং Rise and Thrive প্রোগ্রামের মূল রূপকার। ১০+ বছর ধরে হাজারো
							মানুষের জীবনে পরিবর্তন এনেছেন।
						</p>

						<p className="text-2xl md:text-3xl text-gray-500 font-medium">5,000+ Lives Transformed</p>

						<Image
							src="/images/hat.png"
							alt="Graduation cap decoration"
							width={140}
							height={140}
							className="absolute -bottom-24 right-8 hidden md:block"
						/>
					</div>

					{/* Right image */}
					  <div className="relative mx-auto w-full max-w-117.5">
						<Image
							src="/images/imgtop.png"
							alt="Dot decoration"
							width={180}
							height={80}
							className="absolute -top-8 -left-8 sm:-left-10"
						/>

						<div className="relative h-105 sm:h-125 w-full overflow-hidden shadow-md">
							<Image
								src="/images/vai.jpg"
								alt="Md. Hamidul Huq"
								fill
								className="object-cover"
							/>
						</div>

						<Image
							src="/images/imgbtm.png"
							alt="Frame decoration"
							width={170}
							height={170}
							className="absolute -bottom-12 -right-8 sm:-right-10"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
