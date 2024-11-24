![image](https://github.com/user-attachments/assets/2befc844-8620-4aad-8745-bad1a6683642)
![lbserverHit](https://github.com/user-attachments/assets/b4404f2c-0497-4049-beab-649e0c7f9c00)

# Load Balancer with URL Shortening & Analytics

This application provides a load balancer system that allows users to shorten a list of server URLs, redirect traffic to the servers using a load balancing algorithm, and track server hit data for analytics purposes. It offers server health checks, URL shortening, and real-time analytics for the servers.

## Features
- **URL Shortening**: Allows users to generate a shortened URL that redirects to one of the user-provided server URLs.
- **Load Balancing**: Distributes incoming requests to the servers based on the least number of active connections.
- **Health Checks**: Monitors the health status of each server and routes traffic only to healthy servers.
- **Analytics**: Provides real-time server hit data and analytics, including the number of hits per server and server health status.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Server Health Check**: Axios
- **Analytics**: Custom tracking and aggregation of hit data

## Requirements
- Node.js (v14.x or higher)
- MongoDB (or MongoDB Atlas)
- NPM or Yarn for package management

## Installation
1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/load-balancer.git
    cd load-balancer
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```bash
    MONGO_URI=mongodb://localhost:27017/load_balancer_db
    PORT=5000
    ```

4. **Start the application:**
    ```bash
    npm start
    ```
    This will start the server on port 5000 by default.

## Endpoints

### `POST /api/shorten`
Generates a shortened URL for a list of server URLs.

**Request Body:**
```json
{
  "servers": [
    {
      "name": "Server 1",
      "url": "http://server1.com"
    },
    {
      "name": "Server 2",
      "url": "http://server2.com"
    }
  ]
}
Response:

json
Copy code
{
  "shortUrl": "http://localhost:5000/shortenedCode"
}
GET /:code
Redirects to one of the healthy servers based on the load balancing algorithm (least connections).

Response:
Redirects to the appropriate server URL.

GET /api/analytics/:code
Fetches analytics for a specific shortened URL, including hit counts and server status.

Response:

json
Copy code
{
  "hitCount": 10,
  "hitData": {
    "Server 1": [
      { "timestamp": 1632138972000 },
      { "timestamp": 1632139000000 }
    ],
    "Server 2": [
      { "timestamp": null } // Server down
    ]
  }
}
Health Check and Load Balancing Logic
The system performs health checks on each server every 5 seconds to ensure traffic is only directed to healthy servers.
The load balancing algorithm selects the server with the least number of active connections to handle incoming requests.
Analytics
The application tracks the number of hits per server and stores this data along with a timestamp. Analytics data can be retrieved through the /api/analytics/:code endpoint.

Architecture Overview
Database:
Stores URL data, including a list of servers, the shortened URL, hit counts, and hit data.

Backend:
Manages URL shortening, redirection, health checks, and analytics.

Server Health Monitoring:
Health checks are performed every 5 seconds to verify server availability.

Load Balancing:
Routes traffic to the server with the least active connections.

Analytics:
Tracks server hits and provides an analytics endpoint for retrieving this data.

Example Use Case
A user submits a list of server URLs.
The system generates a shortened URL.
When the shortened URL is visited, the system checks the health of the servers, selects the one with the least connections, and redirects the user to that server.
Server hit data is recorded for future analytics.
Contribution
Feel free to fork this repository and create pull requests for any improvements or bug fixes. Ensure that all tests pass before submitting changes.

License
This project is licensed under the MIT License - see the LICENSE file for details.
