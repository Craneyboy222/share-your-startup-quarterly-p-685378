# API Endpoints Documentation

## List Startups
- **URL**: `/api/startups`
- **Method**: `GET`
- **Auth required**: No
- **Permissions required**: None

### Success Response:
- **Code**: 200
- **Content**: `{ startups: [{ id, name, url, location, stage, goals }] }`

## Submit a Startup
- **URL**: `/api/startups`
- **Method**: `POST`
- **Auth required**: Yes
- **Permissions required**: User

### Data Params
- `name=[string]`
- `url=[string]`
- `location=[string]`
- `stage=[string]`

### Success Response:
- **Code**: 201
- **Content**: `{ id, name, url, location, stage, goals }`

### Error Response:
- **Code**: 400 BAD REQUEST
- **Content**: `{ error: 'Invalid input' }`

## Get Startup Details
- **URL**: `/api/startups/:id`
- **Method**: `GET`
- **Auth required**: No
- **Permissions required**: None

### Success Response:
- **Code**: 200
- **Content**: `{ id, name, url, location, stage, goals, discount }`

... (additional endpoints)