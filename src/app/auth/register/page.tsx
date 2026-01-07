import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Side - White Background with Register Form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-16 order-2 md:order-1">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-4xl font-bold text-gray-900">Register</h2>
          
          <form className="mt-8 space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#704FE6] focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone *
              </label>
              <input
                id="phone"
                type="tel"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#704FE6] focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email*
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#704FE6] focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password*
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#704FE6] focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#704FE6] text-white rounded-lg hover:bg-[#5d3ec7] transition-colors font-medium text-lg"
            >
              Register
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-[#704FE6] hover:underline font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Purple Background with Rounded Corner */}
      <div className="w-full md:w-1/2 bg-[#704FE6] flex items-center justify-center p-8 md:p-16 relative order-1 md:order-2"

        style={{
          borderTopLeftRadius: '25%',
          borderBottomLeftRadius: '25%'
        }}
      >

        <div className="relative z-10 text-center text-white space-y-6 max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold">Welcome Back!</h1>
          <p className="text-lg md:text-xl">Already Have an account?</p>
          <Link href="/auth/login">
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#704FE6] transition-colors font-medium text-lg">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
