# Budget Envelopes API

This is a simple API for managing budget envelopes, allowing users to create, read, update, and delete envelopes.

## Features

- Create new budget envelopes
- Retrieve all budget envelopes
- Retrieve a specific budget envelope by ID
- Update a specific budget envelope
- Delete a specific budget envelope

## Technologies Used

- Node.js
- Express.js
- uuid
- Postman (for testing)

## Getting Started

1. Clone the repository:

`git clone <repository-url>`

2. Install dependencies:

`npm install`

3. Install Express and uuid:

`npm install express uuid`

4. Start the server:

`npm start`

5. Use Postman, or similar tools, to test the API endpoints.

## API Endpoints

- POST /envelopes: Create a new budget envelope
- GET /envelopes: Retrieve all budget envelopes
- GET /envelopes/:id: Retrieve a specific budget envelope by ID
- PUT /envelopes/:id: Update a specific budget envelope
- DELETE /envelopes/:id: Delete a specific budget envelope

## Usage

### Example Usage

1. Create a new budget envelope:

> POST /envelopes

`{
  "name": "Utilities",
  "budget": 150
}`

2. Retrieve all budget envelopes:

> GET /envelopes

3. Retrieve a specific budget envelope by ID:

> GET /envelopes/:id

4. Update a specific budget envelope:

> PUT /envelopes/:id

`{
  "budget": 200
}`

5. Delete a specific budget envelope:

> DELETE /envelopes/:id

## License

This project is licensed under the MIT License. Feel free to use this version with the added installation instructions!
