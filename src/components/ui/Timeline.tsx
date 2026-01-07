export default function Timeline() {
  const events = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'Our organization was founded with a vision to empower through education.'
    },
    {
      year: '2021',
      title: 'First Programs Launched',
      description: 'Launched our first spoken English and debate courses.'
    },
    {
      year: '2022',
      title: 'Expansion',
      description: 'Expanded to include youth development and social welfare programs.'
    },
    {
      year: '2023',
      title: 'Community Impact',
      description: 'Reached over 1,000 students and beneficiaries across various programs.'
    },
    {
      year: '2024',
      title: 'Digital Transformation',
      description: 'Launched online learning platform to reach students nationwide.'
    }
  ];

  return (
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
      
      {events.map((event, index) => (
        <div key={index} className={`mb-8 flex justify-between items-center w-full ${
          index % 2 === 0 ? 'flex-row-reverse' : ''
        }`}>
          <div className="order-1 w-5/12"></div>
          
          <div className="z-20 flex items-center order-1 bg-blue-600 shadow-xl w-12 h-12 rounded-full">
            <h1 className="mx-auto font-semibold text-lg text-white">{index + 1}</h1>
          </div>
          
          <div className="order-1 bg-white rounded-lg shadow-lg w-5/12 px-6 py-4">
            <h3 className="mb-1 font-bold text-blue-600 text-xl">{event.year}</h3>
            <h4 className="mb-2 font-semibold text-lg">{event.title}</h4>
            <p className="text-sm text-gray-700">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
