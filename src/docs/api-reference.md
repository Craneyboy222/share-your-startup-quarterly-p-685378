# API Reference

This document provides detailed information about each endpoint available in the Enterprise Application API.

## Authentication

### JWT Authentication
- All endpoints require JWT authentication unless specified otherwise.
- Include the JWT token in the `Authorization` header as `Bearer <token>`.

## Endpoints

### Startups

#### List All Startups
- **GET** `/api/startups`
- **Description**: Retrieves a list of all submitted startups.
- **Response**:
  - **200 OK**: Returns an array of startup objects.

#### Submit a New Startup
- **POST** `/api/startups`
- **Description**: Allows a user to submit a new startup.
- **Request Body**:
  - `name`: string (required)
  - `url`: string (required)
  - `location`: string
  - `stage`: string
- **Response**:
  - **201 Created**: Returns the created startup object.

#### Get Startup Details
- **GET** `/api/startups/{id}`
- **Description**: Retrieves detailed information about a specific startup.
- **Parameters**:
  - `id`: integer (required)
- **Response**:
  - **200 OK**: Returns the startup object.

... (additional endpoint details)

## Error Handling
- All errors are returned in the following format:
  ```json
  {
    "error": "Error message"
  }
  ```
- Common error codes:
  - **400**: Bad Request
  - **401**: Unauthorized
  - **403**: Forbidden
  - **404**: Not Found
  - **500**: Internal Server Error