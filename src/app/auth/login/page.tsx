import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Side - Purple Background with Rounded Corner */}
      <div 
        className="w-full md:w-1/2 bg-[#704FE6] flex items-center justify-center p-8 md:p-16 relative"
        style={{
          borderTopRightRadius: '25%',
          borderBottomRightRadius: '25%'
        }}
      >
        <div className="relative z-10 text-center text-white space-y-6 max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold">Hello Welcome !</h1>
          <p className="text-lg md:text-xl">Don't Have an account?</p>
          <Link href="/auth/register">
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#704FE6] transition-colors font-medium text-lg">
              Register
            </button>
          </Link>
        </div>
      </div>

      {/* Right Side - White Background with Login Form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md space-y-8">
          <h2 className="text-4xl font-bold text-gray-900">Login</h2>
          
          <form className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
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
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#704FE6] focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-[#704FE6] focus:ring-[#704FE6] border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  accept terms and condition
                </label>
              </div>
              <Link href="/auth/forgot-password" className="text-sm text-[#704FE6] hover:underline">
                Forgot Password
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#704FE6] text-white rounded-lg hover:bg-[#5d3ec7] transition-colors font-medium text-lg"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
