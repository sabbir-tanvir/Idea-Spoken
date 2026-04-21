import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center space-y-8 bg-white/50 backdrop-blur-sm z-50">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="absolute w-32 h-32 rounded-full border-[3px] border-transparent border-t-purple-600 border-b-purple-600 animate-[spin_2s_linear_infinite] opacity-70"></div>
        <div className="absolute w-36 h-36 rounded-full border-[3px] border-transparent border-l-red-600 border-r-red-600 animate-[spin_3s_linear_infinite_reverse] opacity-50"></div>
        
        {/* Logo Container */}
        <div className="relative h-28 w-28 rounded-full bg-white shadow-xl shadow-purple-500/10 flex items-center justify-center p-3 z-10 animate-pulse">
          <Image
            src="/images/logo.png"
            alt="Idea Spoken"
            width={90}
            height={90}
            className="object-contain"
            priority
          />
        </div>
      </div>
      
      {/* Text and Dots */}
      <div className="flex flex-col items-center space-y-3">
        <h2 className="text-xl font-bold tracking-widest bg-gradient-to-r from-red-600 via-purple-600 to-red-600 bg-clip-text text-transparent animate-pulse uppercase">
          Loading
        </h2>
        <div className="flex space-x-2">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
