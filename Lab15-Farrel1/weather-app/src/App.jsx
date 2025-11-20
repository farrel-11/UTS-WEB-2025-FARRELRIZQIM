import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Search, MapPin, Wind, Droplets, Eye, Sun, 
  Thermometer, Calendar, Clock, CloudRain, Navigation
} from 'lucide-react';

function App() {
  const [city, setCity] = useState('Jakarta'); // Default city
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('today'); // 'today' or 'week'

  const API_KEY = '9b7db07993c54846b3364023252011';

  const getWeather = async (queryCity = city) => {
    if (!queryCity.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      // Menggunakan endpoint 'forecast.json' dengan days=14
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${queryCity}&days=14&aqi=yes&alerts=yes`;
      const response = await axios.get(url);
      
      setWeather(response.data);
      setForecast(response.data.forecast.forecastday);
      setCity(response.data.location.name); // Update input to match result
    } catch (err) {
      setError('Kota tidak ditemukan.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch default city on load
  useEffect(() => {
    getWeather();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      getWeather();
    }
  };

  // Helper untuk format jam (misal 14:00)
  const formatTime = (epoch) => {
    return new Date(epoch * 1000).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  // Helper untuk nama hari (Sen, Sel, Rab)
  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { weekday: 'short' });
  };

  // Helper untuk tanggal (16/09)
  const getShortDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'numeric' });
  };

  if (!weather && !loading && !error) return null;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans p-4 md:p-8 selection:bg-blue-500 selection:text-white overflow-x-hidden relative">
      
      {/* Background Abstract Shapes (Ambient Light) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
      </div>

      {/* --- SEARCH BAR --- */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-2 shadow-2xl">
        <div className="flex items-center flex-1 px-4">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Cari kota..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none text-white placeholder-gray-500 w-full font-medium"
          />
        </div>
        <button 
          onClick={() => getWeather()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold transition-all shadow-lg hover:shadow-blue-600/30"
        >
          {loading ? 'Loading...' : 'Cari'}
        </button>
      </div>

      {error && (
        <div className="max-w-7xl mx-auto mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-center">
          {error}
        </div>
      )}

      {weather && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* === LEFT COLUMN (Main Weather) === */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Main Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 flex flex-col justify-between h-full min-h-[400px] relative overflow-hidden shadow-2xl hover:border-white/20 transition-colors group">
              {/* Inner Gradient Effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl group-hover:from-blue-500/20 transition-all" />

              <div>
                <div className="flex items-center space-x-2 text-gray-300 mb-1">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span className="text-lg font-medium tracking-wide">{weather.location.name}, {weather.location.country}</span>
                </div>
                <div className="text-gray-400 text-sm ml-7">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>

              <div className="flex flex-col items-center my-8 relative z-10">
                <img 
                  src={`https:${weather.current.condition.icon}`} 
                  alt="Weather Icon" 
                  className="w-40 h-40 drop-shadow-2xl transform hover:scale-110 transition-transform duration-300"
                />
                <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mt-[-10px]">
                  {Math.round(weather.current.temp_c)}°
                </h1>
                <p className="text-2xl text-blue-200 font-medium mt-2">{weather.current.condition.text}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                 <div className="bg-white/5 rounded-xl p-3 flex items-center space-x-3">
                    <Thermometer className="w-6 h-6 text-orange-400" />
                    <div>
                      <p className="text-xs text-gray-400">Terasa</p>
                      <p className="font-bold text-lg">{Math.round(weather.current.feelslike_c)}°</p>
                    </div>
                 </div>
                 <div className="bg-white/5 rounded-xl p-3 flex items-center space-x-3">
                    <CloudRain className="w-6 h-6 text-blue-400" />
                    <div>
                      <p className="text-xs text-gray-400">Hujan</p>
                      <p className="font-bold text-lg">{weather.current.precip_mm}mm</p>
                    </div>
                 </div>
              </div>
            </div>
            
            {/* Mini Details Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-5">
                  <div className="flex items-center space-x-2 mb-3 text-gray-400">
                    <Eye className="w-4 h-4" />
                    <span className="text-xs font-bold tracking-wider uppercase">Visibility</span>
                  </div>
                  <p className="text-3xl font-bold">{weather.current.vis_km} <span className="text-sm font-normal text-gray-400">km</span></p>
                  <p className="text-xs text-gray-400 mt-2">Jarak pandang normal</p>
                </div>
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-5">
                  <div className="flex items-center space-x-2 mb-3 text-gray-400">
                    <Droplets className="w-4 h-4" />
                    <span className="text-xs font-bold tracking-wider uppercase">Humidity</span>
                  </div>
                  <p className="text-3xl font-bold">{weather.current.humidity}%</p>
                  <p className="text-xs text-gray-400 mt-2">Titik embun {weather.current.dewpoint_c}°</p>
                </div>
            </div>
          </div>

          {/* === RIGHT COLUMN (Forecasts & Details) === */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Hourly Forecast (Horizontal Scroll) */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8">
               <div className="flex items-center space-x-2 mb-6 text-gray-400 border-b border-white/5 pb-4">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-bold tracking-wider uppercase">Perkiraan Per Jam (Hari Ini)</span>
               </div>
               
               <div className="flex overflow-x-auto space-x-8 pb-4 scrollbar-hide">
                  {/* Gabungkan sisa jam hari ini */}
                  {forecast[0]?.hour.filter(h => h.time_epoch > weather.location.localtime_epoch).concat(forecast[1] ? forecast[1].hour.slice(0,5) : []).slice(0, 12).map((hour, index) => (
                    <div key={index} className="flex flex-col items-center min-w-[60px] space-y-3 group cursor-default">
                       <span className="text-sm text-gray-400">{formatTime(hour.time_epoch)}</span>
                       <div className="relative">
                         <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                         <img src={`https:${hour.condition.icon}`} className="w-12 h-12 relative z-10" alt="icon" />
                       </div>
                       <span className="text-lg font-bold">{Math.round(hour.temp_c)}°</span>
                       <div className="flex items-center text-xs text-blue-300">
                          <CloudRain className="w-3 h-3 mr-1" />
                          {hour.chance_of_rain}%
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* 14 Days Forecast & Advanced Stats Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
              
              {/* 14-Day List */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col h-full">
                 <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs font-bold tracking-wider uppercase">Forecast {forecast.length} Hari</span>
                    </div>
                 </div>

                 <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[400px] custom-scrollbar">
                    {forecast.map((day, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
                         <div className="w-16 font-medium text-gray-300 group-hover:text-white transition-colors">
                           {idx === 0 ? 'Hari Ini' : getDayName(day.date)}
                           <div className="text-[10px] text-gray-500">{getShortDate(day.date)}</div>
                         </div>
                         <div className="flex flex-col items-center">
                           <img src={`https:${day.day.condition.icon}`} className="w-8 h-8" alt="icon" />
                           <span className="text-[10px] text-blue-300 hidden group-hover:block">{day.day.condition.text}</span>
                         </div>
                         <div className="flex items-center space-x-4 w-24 justify-end">
                            <span className="text-gray-400 text-sm">{Math.round(day.day.mintemp_c)}°</span>
                            <div className="w-16 h-1.5 bg-gray-700 rounded-full relative overflow-hidden">
                              <div 
                                className="absolute h-full bg-gradient-to-r from-blue-500 to-orange-400 rounded-full" 
                                style={{ width: '60%', left: '20%' }} // Simplified visual bar
                              />
                            </div>
                            <span className="font-bold text-sm">{Math.round(day.day.maxtemp_c)}°</span>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Large Grid for Wind & UV */}
              <div className="flex flex-col gap-6">
                
                {/* UV Index Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 flex flex-col justify-between flex-1">
                   <div className="flex items-center space-x-2 mb-4 text-gray-400">
                      <Sun className="w-4 h-4" />
                      <span className="text-xs font-bold tracking-wider uppercase">UV Index</span>
                   </div>
                   
                   <div className="flex flex-col items-center justify-center flex-1">
                      <span className="text-4xl font-bold mb-1">{weather.current.uv}</span>
                      <span className="text-sm font-medium px-3 py-1 bg-white/10 rounded-full mb-4">
                        {weather.current.uv <= 2 ? 'Low' : weather.current.uv <= 5 ? 'Moderate' : 'High'}
                      </span>
                      
                      {/* Custom UV Bar */}
                      <div className="w-full h-4 bg-gray-700/50 rounded-full relative overflow-hidden">
                        <div 
                          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
                          style={{ width: `${(weather.current.uv / 11) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-4 text-center">Gunakan perlindungan matahari hingga pukul 16:00.</p>
                   </div>
                </div>

                {/* Wind Status Card with Visual Compass */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 flex flex-col justify-between flex-1">
                   <div className="flex items-center space-x-2 mb-4 text-gray-400">
                      <Wind className="w-4 h-4" />
                      <span className="text-xs font-bold tracking-wider uppercase">Angin</span>
                   </div>

                   <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                         <span className="text-4xl font-bold">{weather.current.wind_kph} <span className="text-lg font-normal text-gray-400">km/h</span></span>
                         <span className="text-gray-400 mt-1">Arah: {weather.current.wind_dir}</span>
                         <span className="text-gray-400 text-xs mt-4">Gusts: {weather.current.gust_kph} km/h</span>
                      </div>

                      {/* Simple Compass Visual */}
                      <div className="relative w-24 h-24 border-2 border-gray-600 rounded-full flex items-center justify-center bg-white/5">
                         <span className="absolute top-1 text-[10px] text-gray-500 font-bold">N</span>
                         <span className="absolute bottom-1 text-[10px] text-gray-500 font-bold">S</span>
                         <span className="absolute left-1 text-[10px] text-gray-500 font-bold">W</span>
                         <span className="absolute right-1 text-[10px] text-gray-500 font-bold">E</span>
                         
                         {/* The Arrow */}
                         <div 
                            className="w-full h-full flex items-center justify-center transition-transform duration-1000 ease-out"
                            style={{ transform: `rotate(${weather.current.wind_degree}deg)` }}
                         >
                            <div className="w-1 h-12 bg-gradient-to-b from-red-500 to-transparent rounded-full relative">
                              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full blur-[2px]" />
                            </div>
                            <div className="w-1 h-12 bg-white/20 absolute bottom-[24px]" /> 
                         </div>
                      </div>
                   </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;