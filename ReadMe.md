# Backend Challenges

Collection of three backend challenges implemented in TypeScript/Node.js.

## Prerequisites
- Node.js v16+
- MongoDB (for Challenge 3)
- npm

## Environment Setup

1. Clone the repository
2. Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI ="mongodb://127.0.0.1:27017/wizard-library"
```

## Quick Start
```bash
# Install dependencies
npm install

# Run Challenge 1 - URL Shortener (Port 3000)
npm run start-ch1

# Run Challenge 2 - Event Loop Demo
npm run start-ch2

# Run Challenge 3 - Wizard Library (Port 3001)
npm run start-ch3

```

# API Documentation

## Challenge 1: URL Shortener

### Endpoints

#### `POST /shorten`
**Body**:
```json
{
  "longUrl": "https://example.com"
}
```

**Response**:
```json
{
    "shortId": "e7ae55fd",
    "longUrl": "https://ng.indeed.com/viewjob?jk=06cc0769900fae65&q=frontend&l=Abuja&tk=1ih2gtqahgbcu800&from=ja&alid=632d01f763c7d570dba3fe72&xpse=SoA167I33ivvxURCHR0LbzkdCdPP&xfps=b761f2f7-5070-4085-8f32-4963a6feb00b&utm_campaign=job_alerts&utm_medium=email&utm_source=jobseeker_emails&rgtk=1ih2gtqahgbcu800&xkcb=SoCz67M33ip4sWRc8B0IbzkdCdPP"
}
```

#### `GET /:shortId`

### Challenge 2: Event Loop Demo
1. Demonstrates Node.js event loop behavior
2. Check console output for execution order


## Challenge 3: Wizard Library
### Endpoints
#### `POST /categories`
 ```json
 {
  "name": "Fiction"
}
```
### Response
```json
{
    "name": "Fiction",
    "path": "Fiction",
    "_id": "677ea1d41c346df8c8debbf8",
    "__v": 0
}
```
#### `POST /categories/:parentName/sub`
```json
{
  "name": "Fantasy"
}
```
### Response
```json
{
    "name": "Fantasy",
    "path": "Fiction|Fantasy",
    "_id": "677ea2581c346df8c8debbfb",
    "__v": 0
}
```
#### `GET /categories/:parentName/sub`

```json
[
    {
        "_id": "677ea1d41c346df8c8debbf8",
        "name": "Fiction",
        "path": "Fiction",
        "__v": 0
    },
    {
        "_id": "677ea2581c346df8c8debbfb",
        "name": "Fantasy",
        "path": "Fiction|Fantasy",
        "__v": 0
    }
]
```


