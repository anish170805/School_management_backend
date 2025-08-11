# School Management Backend API

A comprehensive backend API for managing school information and finding nearby schools based on location.

## Features

- **School Management**: Add, update, delete, and retrieve school information
- **Location-based Search**: Find schools within a specified radius from a given location
- **Distance Calculation**: Calculate distances between locations using geolocation
- **RESTful API**: Clean and intuitive REST API endpoints
- **MySQL Database**: Persistent storage with relational database design

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Language**: JavaScript (ES6+)
- **Dependencies**: axios, dotenv, mysql2, express

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/school_management_backend.git
cd school_management_backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=school_management
DB_PORT=3306
PORT=3000
```

5. Start the MySQL server and create the database:
```sql
CREATE DATABASE school_management;
```

6. Run the application:
```bash
npm start
```

## API Endpoints

### School Management
- `GET /api/schools` - Get all schools
- `GET /api/schools/:id` - Get a specific school
- `POST /api/schools` - Create a new school
- `PUT /api/schools/:id` - Update a school
- `DELETE /api/schools/:id` - Delete a school

### Location-based Search
- `GET /api/schools/nearby?lat=LAT&lng=LNG&radius=RADIUS` - Find nearby schools

## Project Structure

```
school_management_backend/
├── config/
│   └── db.js              # Database configuration
├── controllers/
│   └── schoolController.js # School business logic
├── routes/
│   └── schoolRoutes.js    # API routes
├── utils/
│   └── distance.js        # Distance calculation utilities
├── .env                   # Environment variables (not in git)
├── .gitignore            # Git ignore rules
├── index.js              # Application entry point
├── package.json          # Dependencies and scripts
└── README.md            # Project documentation
```

## Development

- Use `npm start` to run the server with nodemon for auto-restart on file changes
- The server runs on `http://localhost:3000` by default
- API documentation is available at `http://localhost:3000/api-docs` (if Swagger is added)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
