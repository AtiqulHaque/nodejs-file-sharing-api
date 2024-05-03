# Simple file sharing API

## Installation

#### Step 1:

Clone the repository by running the following command:

```bash
git clone https://github.com/AtiqulHaque/nodejs-file-sharing-api
cd nodejs-file-sharing-api
```

#### Step 2:

Copy the environment file then update the env values accordingly:

```bash
cp config.env .env
```

#### Step 3:

Install the required dependencies:

```bash
npm install
```

#### Step 4:

Start the API server using Docker:

```bash
npm run start
```

Application will be started and available at http://localhost:3000/api/ping

#### Step 5:

To run unit tests, execute the following command:

```bash
npm run test
```

## Folder Structure

```text
.
├── README.md                                          // Documentation or project README
├── config.env                                         // Configuration file
├── cron                                               // Directory for cron jobs
│   ├── index.js                                       // Main cron job entry file
│   ├── jobs                                           // Directory for individual cron jobs
│   │   ├── ping.js                                    // Cron job for pinging
│   │   └── storage_cleanup.js                         // Cron job for storage cleanup
│   ├── jobs.js                                        // File containing cron job configurations
│   └── utils.js                                       // Utility functions for cron jobs
├── database                                           // Directory for database-related files
│   ├── models                                        // Directory for database models
│   │   └── FileModel.js                              // Model for File entity
│   └── repositories                                  // Directory for database repositories
│       └── FileRepository.js                         // Repository for interacting with FileModel
├── db                                                 // Directory for database files
│   └── file.json                                     // JSON file containing database data
├── ecosystem.config.js                 // Configuration file for ecosystem management (e.g., PM2)
├── index.js                                           // Main entry point of the application
├── middlewares                                        // Directory for application middlewares
│   └── rateLimiter.js                                // Middleware for rate limiting
├── newrelic_agent.log                                // Log file for New Relic agent
├── package-lock.json                                 // Dependency lock file for npm
├── package.json                                      // Project metadata and dependencies
├── services                                          // Directory for application services
│   ├── FileDeleteService.js                          // Service for deleting files
│   ├── FileDownloadService.js                        // Service for downloading files
│   ├── FileUploadService.js                          // Service for uploading files
│   ├── GeneratekeyService.js                         // Service for generating keys
│   ├── ImageUpload.js                                // Service for uploading images
│   └── storage                                       // Directory for storage services
│       ├── LocalStorageService.js                    // Service for local storage
│       ├── S3StorageService.js                       // Service for Amazon S3 storage
│       └── StorageFactory.js                         // Factory for creating storage services
├── settings                                          // Directory for application settings
│   ├── app.js                                       // Application settings
│   ├── db.js                                        // Database settings
│   └── providers                                    // Directory for external service providers
│       ├── google.js                                // Google service provider settings
│       └── s3.js                                    // Amazon S3 service provider settings
├── test                                              // Directory for tests
│   ├── index.spec.js                                // Main test file
│   └── test.png                                     // Test image file
├── uploads                                           // Directory for uploaded files
├── utilities                                         // Directory for utility functions
│   ├── DefaultResponse.js                           // Default response utility
│   ├── appError.js                                  // Error handling utility
│   ├── logger.js                                    // Logging utility
│   ├── math.js                                      // Mathematical utility functions
│   ├── network.js                                   // Network utility functions
│   ├── newrelic.js                                  // New Relic utility
│   ├── redis.js                                     // Redis utility
│   ├── response.js                                  // Response utility
│   ├── scoreSettings.json                           // JSON file containing score settings
│   └── sentry.js                                    // Sentry utility
└── web                                               // Directory for web-related files
    ├── controllers                                  // Directory for controllers
    │   ├── FileProcessController.js                // Controller for file processing
    │   ├── WelcomeController.js                    // Controller for welcome page
    │   └── tasks.js                                // Controller for tasks
    ├── docs                                        // Directory for documentation
    │   └── docs.js                                 // Documentation file
    ├── index.js                                    // Web server entry point
    ├── routers                                     // Directory for routers
    │   ├── FileProcessRouter.js                    // Router for file processing
    │   └── tasks.js                                // Router for tasks
    └── validators                                  // Directory for request validators
        └── FileDeleteValidators.js                 // Validator for file deletion requests

```

### 1. `postman`

-   This directory typically contains documentation related to the Postman Collection

## API Specification

This section outlines the endpoints and usage of the File Sharing API.

---
