// // // import React, { useState } from 'react';
// // // import axios from 'axios';
// // // import './App.css';

// // // function App() {
// // //   const [urls, setUrls] = useState(['']);
// // //   const [shortUrl, setShortUrl] = useState('');
// // //   const [hitCount, setHitCount] = useState(0);
// // //   const [hitData, setHitData] = useState([]);

// // //   const handleUrlChange = (index, event) => {
// // //     const newUrls = [...urls];
// // //     newUrls[index] = event.target.value;
// // //     setUrls(newUrls);
// // //   };

// // //   const addUrlField = () => setUrls([...urls, '']);

// // //   const handleSubmit = async (event) => {
// // //     event.preventDefault();
// // //     try {
// // //       const res = await axios.post('http://localhost:5000/api/shorten', { originalUrls: urls });
// // //       setShortUrl(res.data.shortUrl);
// // //       setHitCount(0); 
// // //       setHitData([]);
// // //     } catch (error) {
// // //       console.error('Error creating shortened URL', error);
// // //     }
// // //   };

// // //   const fetchAnalytics = async () => {
// // //     try {
// // //       const res = await axios.get(`http://localhost:5000/api/analytics/${shortUrl.split('/').pop()}`);
// // //       setHitCount(res.data.hitCount);
// // //       setHitData(res.data.hitData);
// // //     } catch (error) {
// // //       console.error('Error fetching analytics', error);
// // //     }
// // //   };

// // //   return (
// // //     <div className="App">
// // //       <h1>Load Balancer URL Shortener</h1>
// // //       <form onSubmit={handleSubmit}>
// // //         {urls.map((url, index) => (
// // //           <div key={index}>
// // //             <input
// // //               type="text"
// // //               value={url}
// // //               onChange={(e) => handleUrlChange(index, e)}
// // //               placeholder="Enter server URL"
// // //               required
// // //             />
// // //           </div>
// // //         ))}
// // //         <button type="button" onClick={addUrlField}>Add Another URL</button>
// // //         <button type="submit">Generate Short URL</button>
// // //       </form>

// // //       {shortUrl && (
// // //         <div className="short-url-section">
// // //           <h2>Shortened URL:</h2>
// // //           <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
// // //           <button onClick={fetchAnalytics}>Get Analytics</button>
// // //         </div>
// // //       )}

// // //       {hitCount > 0 && (
// // //         <div className="analytics-section">
// // //           <h3>Analytics:</h3>
// // //           <p>Total Hits: {hitCount}</p>
// // //           <ul>
// // //             {hitData.map((hit, index) => (
// // //               <li key={index}>
// // //                 URL: {hit.url} | Timestamp: {new Date(hit.timestamp).toLocaleString()}
// // //               </li>
// // //             ))}
// // //           </ul>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default App;



// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { Line } from 'react-chartjs-2';
// // import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
// // import './App.css';

// // ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// // function App() {
// //   const [servers, setServers] = useState([{ name: '', url: '' }]);
// //   const [shortUrl, setShortUrl] = useState('');
// //   const [hitCount, setHitCount] = useState(0);
// //   const [hitData, setHitData] = useState({});

// //   const handleServerChange = (index, field, value) => {
// //     const newServers = [...servers];
// //     newServers[index][field] = value;
// //     setServers(newServers);
// //   };

// //   const addServerField = () => setServers([...servers, { name: '', url: '' }]);

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     try {
// //       const res = await axios.post('http://localhost:5000/api/shorten', { servers });
// //       setShortUrl(res.data.shortUrl);
// //       setHitCount(0);
// //       setHitData({});
// //     } catch (error) {
// //       console.error('Error creating shortened URL', error);
// //     }
// //   };

// //   const fetchAnalytics = async () => {
// //     try {
// //       const res = await axios.get(`http://localhost:5000/api/analytics/${shortUrl.split('/').pop()}`);
// //       setHitCount(res.data.hitCount);
// //       setHitData(res.data.hitData);
// //     } catch (error) {
// //       console.error('Error fetching analytics', error);
// //     }
// //   };

// //   const renderGraph = (data, serverName) => {
// //     const labels = data.map(hit => new Date(hit.timestamp).toLocaleTimeString());
// //     const hits = data.map(hit => hit.count);

// //     return (
// //       <div key={serverName}>
// //         <h4>{serverName}</h4>
// //         <Line
// //           data={{
// //             labels,
// //             datasets: [{
// //               label: `Hits for ${serverName}`,
// //               data: hits,
// //               borderColor: 'blue',
// //               fill: false,
// //             }]
// //           }}
// //         />
// //       </div>
// //     );
// //   };

// //   useEffect(() => {
// //     if (shortUrl) {
// //       fetchAnalytics();
// //     }
// //   }, [shortUrl]);

// //   return (
// //     <div className="App">
// //       <h1>Load Balancer URL Shortener</h1>
// //       <form onSubmit={handleSubmit}>
// //         {servers.map((server, index) => (
// //           <div key={index}>
// //             <input
// //               type="text"
// //               value={server.name}
// //               onChange={(e) => handleServerChange(index, 'name', e.target.value)}
// //               placeholder="Enter server name"
// //               required
// //             />
// //             <input
// //               type="text"
// //               value={server.url}
// //               onChange={(e) => handleServerChange(index, 'url', e.target.value)}
// //               placeholder="Enter server URL"
// //               required
// //             />
// //           </div>
// //         ))}
// //         <button type="button" onClick={addServerField}>Add Another Server</button>
// //         <button type="submit">Generate Short URL</button>
// //       </form>

// //       {shortUrl && (
// //         <div className="short-url-section">
// //           <h2>Shortened URL:</h2>
// //           <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
// //           <button onClick={fetchAnalytics}>Get Analytics</button>
// //         </div>
// //       )}

// //       {hitCount > 0 && (
// //         <div className="analytics-section">
// //           <h3>Analytics:</h3>
// //           <p>Total Hits: {hitCount}</p>
// //           {Object.entries(hitData).map(([serverName, data]) => renderGraph(data, serverName))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default App;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
// import './App.css';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// function App() {
//   const [servers, setServers] = useState([{ name: '', url: '' }]);
//   const [shortUrl, setShortUrl] = useState('');
//   const [hitCount, setHitCount] = useState(0);
//   const [hitData, setHitData] = useState({});

//   const handleServerChange = (index, field, value) => {
//     const newServers = [...servers];
//     newServers[index][field] = value;
//     setServers(newServers);
//   };

//   const addServerField = () => setServers([...servers, { name: '', url: '' }]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/shorten', { servers });
//       setShortUrl(res.data.shortUrl);
//       setHitCount(0);
//       setHitData({});
//     } catch (error) {
//       console.error('Error creating shortened URL', error);
//     }
//   };

//   const fetchAnalytics = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/analytics/${shortUrl.split('/').pop()}`);
//       setHitCount(res.data.hitCount);
//       setHitData(res.data.hitData); // Assuming this returns data structured per server
//     } catch (error) {
//       console.error('Error fetching analytics', error);
//     }
//   };

//   const renderGraph = (data, serverName) => {
//     const labels = data.map(hit => new Date(hit.timestamp).toLocaleTimeString());
//     const hits = data.map(hit => hit.count);

//     return (
//       <div key={serverName} className="chart-container">
//         <h4>{serverName}</h4>
//         <Line
//           data={{
//             labels,
//             datasets: [{
//               label: `Hits for ${serverName}`,
//               data: hits,
//               borderColor: 'blue',
//               fill: false,
//             }]
//           }}
//           options={{
//             scales: {
//               y: {
//                 beginAtZero: true,
//               },
//             },
//           }}
//         />
//       </div>
//     );
//   };

//   useEffect(() => {
//     if (shortUrl) {
//       fetchAnalytics();
//     }
//   }, [shortUrl]);

//   return (
//     <div className="App">
//       <h1>Load Balancer URL Shortener</h1>
//       <form onSubmit={handleSubmit}>
//         {servers.map((server, index) => (
//           <div key={index}>
//             <input
//               type="text"
//               value={server.name}
//               onChange={(e) => handleServerChange(index, 'name', e.target.value)}
//               placeholder="Enter server name"
//               required
//             />
//             <input
//               type="text"
//               value={server.url}
//               onChange={(e) => handleServerChange(index, 'url', e.target.value)}
//               placeholder="Enter server URL"
//               required
//             />
//           </div>
//         ))}
//         <button type="button" onClick={addServerField}>Add Another Server</button>
//         <button type="submit">Generate Short URL</button>
//       </form>

//       {shortUrl && (
//         <div className="short-url-section">
//           <h2>Shortened URL:</h2>
//           <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
//           <button onClick={fetchAnalytics}>Get Analytics</button>
//         </div>
//       )}

//       {hitCount > 0 && (
//         <div className="analytics-section">
//           <h3>Analytics:</h3>
//           <p>Total Hits: {hitCount}</p>
//           <div className="charts-row">
//             {Object.entries(hitData).map(([serverName, data]) => renderGraph(data, serverName))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import './App.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);



function App() {
  const [servers, setServers] = useState([{ name: '', url: '' }]);
  const [shortUrl, setShortUrl] = useState('');
  const [hitCount, setHitCount] = useState(0);
  const [hitData, setHitData] = useState({});
  // Copy success message and function to copy short URL
  const [copySuccess, setCopySuccess] = useState('');
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopySuccess('Link copied!');
    alert("Link copied to clipboard!");
  };
  const handleServerChange = (index, field, value) => {
    const newServers = [...servers];
    newServers[index][field] = value;
    setServers(newServers);
  };

  const addServerField = () => setServers([...servers, { name: '', url: '' }]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/shorten', { servers });
      setShortUrl(res.data.shortUrl);
      setHitCount(0);
      setHitData({});
    } catch (error) {
      console.error('Error creating shortened URL', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/analytics/${shortUrl.split('/').pop()}`);
      console.log(res.data);
      setHitCount(res.data.hitCount);
      setHitData(res.data.hitData); // Assuming this returns data structured per server
    } catch (error) {
      console.error('Error fetching analytics', error);
    }
  };


  const renderGraph = (data, serverName) => {
    console.log(data); // Log the data to confirm its structure

    const labels = data.map(hit => new Date(hit.timestamp).toLocaleTimeString());
    const hits = new Array(data.length).fill(1); // Create an array filled with 1s for each timestamp
    const totalHits = hits.length; // Total hits will be the length of the data array
   
    return (
      <div key={serverName} className="chart-container">
        <h4>{serverName} - Total Hits: {totalHits}</h4>
        <Line
          data={{
            labels,
            datasets: [{
              label: `Hits for ${serverName}`,
              data: hits,
              borderColor: 'blue',
              fill: false,
              tension: 0.1,
            }]
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    );
};

  useEffect(() => {
    if (shortUrl) {
      fetchAnalytics();
    }
  }, [shortUrl]);
  
  return (
    <div className="App">
      <h1>Load Balancer With Server Analytics</h1>
      <h1>Least Connections algorithm used for load balancing</h1>
      
      <form onSubmit={handleSubmit}>
        {servers.map((server, index) => (
          <div key={index}>
            <input
              type="text"
              value={server.name}
              onChange={(e) => handleServerChange(index, 'name', e.target.value)}
              placeholder="Enter server name"
              required
            />
            <input
              type="text"
              value={server.url}
              onChange={(e) => handleServerChange(index, 'url', e.target.value)}
              placeholder="Enter server URL"
              required
            />
          </div>
        ))}
        <button type="button" onClick={addServerField}>Add Another Server</button>
        <button type="submit">Generate Short URL</button>
      </form>

      {shortUrl && (
        
        <div className="short-url-section">
          <h2>Generated Shortened URL:</h2>
          <h2>To use the load-balanced server configuration, please copy the link below:</h2>

          
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
          <button onClick={copyToClipboard}>Copy Link</button>
          <button onClick={fetchAnalytics}>Get Analytics</button>
        </div>
      )}
        <h3 style={{ fontSize: '24px', color: '#FFFFFF' }}>Server Analytics:</h3>
        <p style={{ fontSize: '18px', color: '#FFFFFF' }}>Total Hits for All Responding Servers: {hitCount}</p>
        <p style={{ fontSize: '18px', color: '#FFFFFF' }}>Node : The server hits may be made to the non responding server to check its health</p>
      {hitCount > 0 && (
        <div className="analytics-section">
         
          <div className="charts-row">
            {Object.entries(hitData).map(([serverName, data]) => renderGraph(data, serverName))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
