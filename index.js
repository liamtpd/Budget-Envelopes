const express = require('express');
const uuidv4 = require('uuid').v4;
const app = express();
const PORT = process.env.PORT || 3000; // defines the port for the server

const envelopes = [
    {
        "id": "0",
        "name": "Groceries",
        "budget": 200,
        "balance": 0
    },
    {
        "id": "1",
        "name": "Entertainment",
        "budget": 100,
        "balance": 0
    }
];

const getEnvelopeById = (id, array) => {
    return array.find(envelope => envelope.id === id);
};

// middleware that parses JSON bodies
app.use(express.json());

// All Routes found below:

// create a new envelope
app.post('/envelopes', (req, res) => {
    // handler function for creating a new envelope
    const { name, budget } = req.body; // extract name & body from request body
    const newEnvelope = {
        id: uuidv4(), // generate a unique ID for the envelope (using uuidv4)
        name,
        budget,
        balance: 0 // set initial balance to 0
    };
    // adds the new envelope to the `envelopes` array
    envelopes.push(newEnvelope);
    // respond with newly created envelope
    res.status(201).json(newEnvelope);
});

// retrieve ALL envelopes
app.get('/envelopes', (req, res) => {
    res.send(envelopes); // respond with the envelopes array, which contains all envelopes
});

// retrieve a specific envelope
app.get('/envelopes/:id', (req, res) => {
    const foundEnvelope = getEnvelopeById(req.params.id, envelopes); // `getEnvelopeById` used to retrieve specific envelope by id
    if (foundEnvelope) {
        res.send(foundEnvelope); // respond with the envelope specified by its id
    } else {
        res.status(404).send("Envelope not found."); // respond with error status if envelope not found in `envelopes` array
    }
});

// update a specific envelope
app.put('/envelopes/:id', (req, res) => {
    const { name, budget, balance } = req.body; // extract properties from request body
    const envelopeToUpdate = getEnvelopeById(req.params.id, envelopes); // finds the envelope to update
    // checks if the envelope exists
    if (!envelopeToUpdate) {
        return res.status(404).send("Envelope not found.");
    }
    // merge request body with existing envelope
    const updatedEnvelope = {
        ...envelopeToUpdate,
        "name": name || envelopeToUpdate.name, // if `name` is not provided in the req.body, use the existing name
        "budget": budget || envelopeToUpdate.budget, // if `budget` is not provided in the req.body, use the existing budget
        "balance": parseFloat(balance) || envelopeToUpdate.balance // if `balance` is not provided in the req.body, use the existing balance
    };

    // update the envelope's properties
    const envelopeIndex = envelopes.findIndex(envelope => envelope.id === req.params.id); // finds target envelope's index
    envelopes[envelopeIndex] = updatedEnvelope;

    // validate if overspending has occurred
    if (updatedEnvelope.balance > updatedEnvelope.budget) {
        return res.status(400).send("Overspending is not allowed.");
    }
    
    // response with the upated envelope
    res.json(updatedEnvelope);
});

// delete a specific envelope
app.delete('/envelopes/:id', (req, res) => {
    const envelopeIndex = envelopes.findIndex(envelope => envelope.id === req.params.id); // finds the index of the envelope to delete
    // checks if the envelope exists
    if (envelopeIndex === -1) { // if envelopeIndex can't find any element in the envelopes array that matches it returns a -1 value
        return res.status(404).send("Envelope not found.");
    }
    envelopes.splice(envelopeIndex, 1); // splice method removes the envelope from the array identified by `envelopeIndex`, with the `1` representing how many envelopes to remove starting from said index
    res.status(200).send(`Envelope ${req.params.id} has been deleted.`); // success message response
});

// start the server
app.listen(PORT, () => {
    console.log(`Server is now running on ${PORT}.`);
});