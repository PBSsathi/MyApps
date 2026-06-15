"use client" 
import { TypeAnimation } from 'react-type-animation';

function Home() {
  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-900 text-white overflow-hidden">
      
      <TypeAnimation className="bg-gray-800 h-15 w-100 text-white rounded-2xl pl-3"
      sequence={[
        
        'I am Frontend Developer',
        1000, 
        'I am Backend Developer',
        1000,
        'I am Fullstack Developer',
        1000,
        'I am a Software Engineer',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
    <div className="absolute -top-[130px] -left-[140px] w-[340px] h-[340px] rounded-full border border-white/150" />
            <div className="absolute -top-[120px] -left-[120px] w-[270px] h-[270px] rounded-full border border-white/50" />

            {/* Bottom Right Circles */}
            <div className="absolute -bottom-[130px] -right-[140px] w-[340px] h-[340px] rounded-full border border-white/80" />
            <div className="absolute -bottom-[120px] -right-[120px] w-[270px] h-[270px] rounded-full border border-white/50" />
     
            <div className="absolute -top-[120px] -right-[120px] w-[270px] h-[170px] rounded-full border border-white/50" />
            <div className="absolute -top-[120px] -right-[120px] w-[300px] h-[200px] rounded-full border border-white/50" />
     <div className="absolute right-3 top-3">
                <div className="grid grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <span
                            key={i}
                            className="w-[6px] h-[6px] rounded-full bg-white/20"
                        />
                    ))}
                </div>
            </div>
     
     <div className="absolute left-3 top-3">
                <div className="grid grid-cols-5 gap-4">
                    {[...Array(25)].map((_, i) => (
                        <span
                            key={i}
                            className="w-[6px] h-[6px] rounded-full bg-white/20"
                        />
                    ))}
                </div>
            </div>

            <div className="absolute right-3 bottom-3">
                <div className="grid grid-cols-5 gap-4">
                    {[...Array(25)].map((_, i) => (
                        <span
                            key={i}
                            className="w-[6px] h-[6px] rounded-full bg-white/20"
                        />
                    ))}
                </div>
            </div>
     
    </div>
  );
}
export default Home;