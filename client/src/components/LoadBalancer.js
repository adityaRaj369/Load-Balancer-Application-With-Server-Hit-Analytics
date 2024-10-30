// src/components/LoadBalancer.js
import React from 'react';
import axios from 'axios';

function LoadBalancer() {
    const handleRequest = async () => {
        try {
            const response = await axios.get('/api/load-balancer');
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching load balancer data', error);
        }
    };

    return (
        <div className="load-balancer">
            <h2>Load Balancer Management</h2>
            <button onClick={handleRequest}>Fetch Load Balancer Info</button>
        </div>
    );
}

export default LoadBalancer;
// import React from 'react';
// import axios from 'axios';

// function LoadBalancer() {
//     const handleRequest = async () => {
//         try {
//             const response = await axios.get('/api/load-balancer');
//             console.log(response.data);
//         } catch (error) {
//             console.error('Error fetching load balancer data', error);
//         }
//     };

//     return (
//         <div className="load-balancer">
//             <h2>Load Balancer Management</h2>
//             <button onClick={handleRequest}>Fetch Load Balancer Info</button>
//         </div>
//     );
// }

// export default LoadBalancer;
