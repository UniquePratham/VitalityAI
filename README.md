# Health Emergency Response System

The Health Emergency Response System is a comprehensive health monitoring and emergency response solution that integrates IoT-based health monitoring, real-time data prediction, and blockchain technology. This system ensures timely medical assistance in cases of abnormal heart activity.

## Features

- **Real-Time Heartbeat Monitoring**: Continuously tracks heartbeat data using an Arduino-based IoT cardiometer.
- **Abnormal Heartbeat Alerts**: Automatically detects irregular heartbeat patterns and signals the nearest ambulance via blockchain.
- **Data Prediction**: Provides predictive analytics on health data using Streamlit.
- **Blockchain Integration**: Ensures secure communication with ambulance services in emergencies.
- **Responsive Web Interface**: Displays real-time data and predictions through a React-based interface.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js & Express.js
- **Real-Time Data Prediction**: Streamlit
- **Blockchain**: For secure communication with emergency services
- **IoT Device**: Arduino-based cardiometer for heartbeat monitoring

## Architecture

1. **IoT Device**: An Arduino-based cardiometer monitors the patient's heartbeat, especially during sleep, and sends data to the web server.
2. **Web Server**: Processes incoming data, performs predictive analytics with Streamlit, and checks for abnormal patterns.
3. **Blockchain**: Upon detecting anomalies, the system sends a secure alert to the nearest ambulance service via blockchain technology.
4. **Web Interface**: Displays real-time heartbeat data, predictive insights, and emergency alerts to the user.

## Getting Started

To set up and run the project locally, follow these steps:

### Prerequisites

- **Node.js**: For running frontend and backend JavaScript code.
- **npm**: Comes with Node.js; used for managing dependencies.
- **Python 3.8+**: Required for Streamlit.
- **pip**: For installing Python packages.
- **Git**: For cloning the repository.
- **IoT Device Setup**: Ensure your Arduino-based cardiometer is configured to monitor and transmit heartbeat data.
- **Blockchain Network Access**: Access to a blockchain network for secure communication with ambulance services.

### Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/health-monitoring-system.git
    ```

2. **Navigate to the Project Directory**:
    ```bash
    cd health-monitoring-system
    ```

3. **Install Frontend Dependencies**:
    ```bash
    npm install
    ```

4. **Set Up Backend and Streamlit**:
    - Navigate to the backend folder.
    - Install Python dependencies:
        ```bash
        pip install -r requirements.txt
        ```

5. **Run the Application**:
    - Start the backend server:
        ```bash
        npm run server
        ```
    - Start the frontend:
        ```bash
        npm run dev
        ```
    - Start the Streamlit app:
        ```bash
        streamlit run app.py
        ```

### Development Server

Access the application at:
```bash
http://localhost:3000
```

## Usage

- **Monitor Heartbeat**: View real-time heartbeat data from the IoT cardiometer on the web interface.
- **View Predictions**: Access the data prediction section to see insights and trends based on the monitored heartbeat data.
- **Emergency Response**: In case of abnormal heartbeat detection, the system will automatically alert the nearest available ambulance through blockchain for prompt medical attention.

## License

This project is licensed under the MIT [License](https://choosealicense.com/licenses/mit/). See the LICENSE file for more details.
