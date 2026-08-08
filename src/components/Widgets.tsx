import { useState, useEffect } from "react";
import { CloudRain, Laptop, Headphones, Keyboard, MousePointer2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Widgets() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Clock hands calculation
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;
  const secondDegrees = (seconds / 60) * 360;
  const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
  const hourDegrees = ((hours + minutes / 60) / 12) * 360;

  return (
    <div className="absolute top-12 left-6 hidden md:flex flex-col gap-4 w-[340px] z-10 select-none">
      
      {/* Calendar Widget (Wide) */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full bg-white/90 backdrop-blur-xl rounded-3xl p-4 flex gap-4 shadow-xl text-black"
      >
        <div className="flex-1 flex flex-col gap-3 border-r border-gray-200 pr-2">
          <div className="flex items-start gap-2">
            <div className="w-1 h-10 bg-red-500 rounded-full"></div>
            <div>
              <div className="text-xs font-bold">Website update</div>
              <div className="text-[10px] text-gray-500">09:00 - 10:00</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1 h-10 bg-blue-500 rounded-full"></div>
            <div>
              <div className="text-xs font-bold">Meeting</div>
              <div className="text-[10px] text-gray-500">14:00 - 15:00</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1 h-10 bg-orange-500 rounded-full"></div>
            <div>
              <div className="text-xs font-bold">Dinner</div>
              <div className="text-[10px] text-gray-500">18:00 - 19:00</div>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="text-red-500 text-xs font-bold mb-2">FEBRUARY</div>
          <div className="grid grid-cols-7 gap-1 text-[10px] text-center font-medium text-gray-400 mb-1">
            <div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-[10px] text-center font-medium">
            <div className="text-gray-400">29</div><div className="text-gray-400">30</div><div className="text-gray-400">31</div>
            <div>1</div><div>2</div><div>3</div><div>4</div>
            <div>5</div><div>6</div><div>7</div><div>8</div><div>9</div><div>10</div><div>11</div>
            <div>12</div><div>13</div><div>14</div>
            <div className="bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center mx-auto">15</div>
            <div>16</div><div>17</div>
            <div>18</div><div>19</div><div>20</div><div>21</div><div>22</div><div>23</div><div>24</div>
            <div>25</div><div>26</div><div>27</div><div>28</div>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-4 w-full h-[160px]">
        {/* Weather Widget */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-3xl p-4 text-white shadow-xl flex flex-col justify-between"
        >
          <div>
            <div className="text-sm font-medium">Bengaluru</div>
            <div className="text-4xl font-light">28&deg;</div>
          </div>
          <div>
            <CloudRain size={20} className="mb-1" />
            <div className="text-[10px] leading-tight font-medium">Potential disruption due to rain</div>
          </div>
        </motion.div>

        {/* Analog Clock Widget */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 bg-white rounded-3xl shadow-xl flex items-center justify-center relative overflow-hidden"
        >
          {/* Clock Face */}
          <div className="w-32 h-32 rounded-full border-[6px] border-black/5 relative flex items-center justify-center bg-white shadow-inner">
            {/* Numbers */}
            {[1,2,3,4,5,6,7,8,9,10,11,12].map(num => (
              <div 
                key={num} 
                className="absolute text-black font-bold text-xs"
                style={{
                  transform: `rotate(${num * 30}deg) translateY(-46px) rotate(-${num * 30}deg)`
                }}
              >
                {num}
              </div>
            ))}
            {/* City Label */}
            <span className="absolute top-8 text-[10px] font-bold text-gray-400">BLR</span>
            
            {/* Hands */}
            <div 
              className="absolute w-1 h-10 bg-black rounded-full origin-bottom"
              style={{ bottom: '50%', transform: `rotate(${hourDegrees}deg)` }}
            />
            <div 
              className="absolute w-1 h-14 bg-black rounded-full origin-bottom"
              style={{ bottom: '50%', transform: `rotate(${minuteDegrees}deg)` }}
            />
            <div 
              className="absolute w-[2px] h-14 bg-orange-500 rounded-full origin-bottom"
              style={{ bottom: '50%', transform: `rotate(${secondDegrees}deg)` }}
            />
            <div className="w-2 h-2 rounded-full bg-orange-500 z-10 border-2 border-white"></div>
          </div>
        </motion.div>
      </div>

      {/* Batteries Widget (Wide) */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-xl flex justify-between items-center text-black"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="relative flex items-center justify-center">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-200" />
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="125" strokeDashoffset="5" className="text-green-500" />
            </svg>
            <Laptop size={18} className="absolute text-gray-700" />
          </div>
          <span className="text-xs font-bold text-gray-600">&#9881; 96 %</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="relative flex items-center justify-center">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-200" />
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="125" strokeDashoffset="3" className="text-green-500" />
            </svg>
            <Headphones size={18} className="absolute text-gray-700" />
          </div>
          <span className="text-xs font-bold text-gray-600">97 %</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="relative flex items-center justify-center">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-200" />
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="125" strokeDashoffset="31" className="text-green-500" />
            </svg>
            <Keyboard size={18} className="absolute text-gray-700" />
          </div>
          <span className="text-xs font-bold text-gray-600">75 %</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="relative flex items-center justify-center">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-200" />
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="125" strokeDashoffset="7" className="text-green-500" />
            </svg>
            <MousePointer2 size={18} className="absolute text-gray-700" />
          </div>
          <span className="text-xs font-bold text-gray-600">94 %</span>
        </div>
      </motion.div>
      
    </div>
  );
}
