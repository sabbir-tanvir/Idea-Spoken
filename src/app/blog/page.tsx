export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: 'The Importance of Spoken English in Today\'s World',
      excerpt: 'Learn why mastering spoken English is crucial for career advancement...',
      date: 'January 5, 2026',
      image: '/images/blog-1.jpg'
    },
    {
      id: 2,
      title: 'Youth Development: Empowering the Next Generation',
      excerpt: 'Discover our approach to youth development and leadership training...',
      date: 'December 28, 2025',
      image: '/images/blog-2.jpg'
    },
    {
      id: 3,
      title: 'Debate Skills: A Gateway to Critical Thinking',
      excerpt: 'Explore how debate courses enhance analytical and communication skills...',
      date: 'December 20, 2025',
      image: '/images/blog-3.jpg'
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Blog</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                <h2 className="text-xl font-semibold mb-3">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                <a href="#" className="text-blue-600 hover:underline">Read More →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
