export default function AdminShell({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-gradient-to-br from-[#e6f0ff] via-white to-[#f2f7ff]">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{children}
			</div>
		</div>
	);
}
