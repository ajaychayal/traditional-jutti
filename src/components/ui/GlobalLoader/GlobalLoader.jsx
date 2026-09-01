import { useEffect, useState } from 'react';
import './GlobalLoader.scss';

const GlobalLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      // Small delay to ensure smooth transition after everything is ready
      setTimeout(() => setIsLoading(false), 800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      // Fallback in case load event doesn't fire or takes too long
      const fallback = setTimeout(handleLoad, 3000);
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(fallback);
      };
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div className="global-loader-overlay">
      <div className="loader-container">
        <div className="rings">
          <div className="ring"></div>
          <div className="ring"></div>
          <div className="ring"></div>
        </div>
        <h2 className="loader-text">Punjabi Jutti</h2>
      </div>
    </div>
  );
};

export default GlobalLoader;
