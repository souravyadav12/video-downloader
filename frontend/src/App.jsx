import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Moon, Sun, Download, Search, Video, Music, AlertCircle } from 'lucide-react';

function App() {
    const [url, setUrl] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [videoInfo, setVideoInfo] = useState(null);
    const [downloading, setDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [selectedFormat, setSelectedFormat] = useState('1080p');

    // Dynamically build the list of resolutions available for this specific video
    const getAvailableResolutions = () => {
        if (!videoInfo || !videoInfo.formats) return ['2160p', '1440p', '1080p', '720p', '480p', '360p', '240p', '144p'];

        // Find valid heights
        const heights = videoInfo.formats
            .filter(f => f.vcodec && f.vcodec !== 'none' && f.height)
            .map(f => f.height);

        // Remove duplicates and sort descending (highest quality first)
        let uniqueHeights = [...new Set(heights)]
            .filter(h => h >= 144)
            .sort((a, b) => b - a);

        if (uniqueHeights.length === 0) return ['1080p', '720p', '480p', '360p'];
        return uniqueHeights.map(h => `${h}p`);
    };

    // Toggle dark mode classes on body
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const handleFetchInfo = async (e) => {
        e.preventDefault();
        if (!url) return;

        setLoading(true);
        setError('');
        setVideoInfo(null);
        setSelectedFormat('1080p'); // Reset to a good default for new videos

        try {
            const baseUrl = "https://video-downloader-ht22.onrender.com";
            const response = await axios.post(`${baseUrl}/api/info`, { url });
            setVideoInfo(response.data);
        } catch (err) {
            console.error('Fetch error:', err);
            if (err.message === 'Network Error' || (err.code && err.code === 'ERR_NETWORK')) {
                setError('Cannot connect to the backend server. Please make sure "npm run dev" is running in the main videoDownloder folder.');
            } else {
                setError(err.response?.data?.error || 'Failed to fetch video information. Ensure the link is valid.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (format) => {
        setDownloading(true);

        try {
            // We use a hidden form submit to trigger a native browser file download 
            // instead of downloading massive 1080p blobs to your browser's RAM via axios!
            const form = document.createElement('form');
            form.method = 'POST';
           const baseUrl = "https://video-downloader-ht22.onrender.com";
           form.action = `${baseUrl}/api/download`;

            const urlInput = document.createElement('input');
            urlInput.type = 'hidden';
            urlInput.name = 'url';
            urlInput.value = url;

            const formatInput = document.createElement('input');
            formatInput.type = 'hidden';
            formatInput.name = 'format';
            formatInput.value = format;

            form.appendChild(urlInput);
            form.appendChild(formatInput);
            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);

            // After launching the download prompt, remove the processing UI after 8 seconds
            setTimeout(() => {
                setDownloading(false);
            }, 8000);

        } catch (err) {
            console.error(err);
            setError('An error occurred while launching download.');
            setDownloading(false);
        }
    };

    return (
        <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900 bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            {/* Dark mode toggle */}
            <div className="absolute top-4 right-4 animate-fade-in-up">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-800 dark:text-gray-200 transition-all transform hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                </button>
            </div>

            <div className="max-w-3xl w-full space-y-8 mt-8">
                <div className="text-center animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 mb-4 pb-1">
                        Universal Downloader
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium">
                        Download your favorite videos perfectly with ease.
                    </p>
                </div>

                {/* Input Card */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-100 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8 transform transition-all duration-300 hover:shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <form onSubmit={handleFetchInfo} className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-6 w-6 text-gray-400" />
                            </div>
                            <input
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                                className="block w-full pl-12 pr-4 py-4 border-2 border-transparent bg-gray-100 dark:bg-gray-900 rounded-xl leading-5 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 sm:text-lg transition-all duration-200 ease-in-out shadow-inner"
                                placeholder="Paste YouTube or Instagram link here..."
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading || downloading}
                            className="w-full flex justify-center items-center py-4 px-4 border border-transparent text-lg font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                        >
                            {loading ? (
                                <div className={`spinner ${darkMode ? 'spinner-dark' : ''} !w-6 !h-6 !border-2 !border-white/30 !border-l-white`}></div>
                            ) : (
                                <>
                                    <Download className="mr-2 h-6 w-6" /> Fetch Video
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 rounded-lg flex items-start animate-fade-in-up shadow-sm">
                        <AlertCircle className="text-red-500 w-6 h-6 mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
                    </div>
                )}

                {/* Video Info Card */}
                {videoInfo && !loading && (
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-fade-in-up transform transition-all group">
                        <div className="md:flex gap-6 p-6 md:p-8">
                            <div className="md:flex-shrink-0 relative overflow-hidden rounded-xl shadow-lg w-full md:w-64 max-h-[14rem] md:max-h-none">
                                <img
                                    className="h-full w-full object-cover aspect-video transition-transform duration-500 group-hover:scale-105"
                                    src={videoInfo.thumbnail}
                                    alt="Video thumbnail"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 decoration-0"></div>
                                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1.5 rounded-md shadow-sm">
                                    {videoInfo.duration_string || 'N/A'}
                                </div>
                            </div>

                            <div className="w-full flex justify-between flex-col mt-6 md:mt-0">
                                <div>
                                    <div className="flex items-center space-x-2 text-sm font-bold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wider bg-blue-50 dark:bg-blue-900/40 w-max px-3 py-1 rounded-full">
                                        <Video size={16} />
                                        <span>{videoInfo.platform}</span>
                                    </div>
                                    <h2 className="block mt-2 text-2xl font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                                        {videoInfo.title}
                                    </h2>
                                </div>

                                <div className="mt-8 flex flex-wrap gap-4 items-center bg-gray-50 dark:bg-gray-700/30 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                                    <div className="relative flex-1 min-w-[160px]">
                                        <select
                                            value={selectedFormat}
                                            onChange={(e) => setSelectedFormat(e.target.value)}
                                            className="appearance-none w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl py-3 px-4 font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer shadow-sm"
                                        >
                                            <optgroup label="Video Options">
                                                {getAvailableResolutions().map(res => {
                                                    const heightNum = parseInt(res);
                                                    let labelTag = '';
                                                    if (heightNum >= 2160) labelTag = ' 4K';
                                                    else if (heightNum >= 1440) labelTag = ' 2K';
                                                    else if (heightNum >= 1080) labelTag = ' HD';

                                                    return (
                                                        <option key={res} value={res}>
                                                            {res}{labelTag}
                                                        </option>
                                                    );
                                                })}
                                            </optgroup>
                                            <optgroup label="Audio Options">
                                                <option value="audio">Audio Only (M4A)</option>
                                            </optgroup>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 dark:text-gray-400">
                                            <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleDownload(selectedFormat)}
                                        disabled={downloading}
                                        className="flex-1 min-w-[150px] flex justify-center items-center py-3.5 px-4 rounded-xl text-white font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none group/btn"
                                    >
                                        <Download size={20} className="mr-2 group-hover/btn:animate-bounce" /> Download
                                    </button>
                                </div>

                                {/* Processing Message */}
                                {downloading && (
                                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/40 rounded-xl animate-fade-in-up shadow-inner border border-blue-100 dark:border-blue-800">
                                        <div className="flex items-center text-sm text-blue-800 dark:text-blue-300 font-medium">
                                            <div className="spinner !w-5 !h-5 !border-2 !border-blue-200 !border-l-blue-600 mr-3"></div>
                                            <span>Processing high-quality video on server... The download will pop up automatically.</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
