const NotesClient = require('./notesClient');

// This makes `fetch` available to our test
// (it is not by default, as normally `fetch` is only
// available within the browser)
require('jest-fetch-mock').enableMocks()

describe('NotesClient class', () => {
    it('calls fetch and loads notes', (done) => {
        const client = new NotesClient();
        fetch.mockResponseOnce(JSON.stringify(
            ['This is a note']
        ))
        // 1 - When we mock the fetch, we use JSON.stringify because
        // the data received from a fetch is always a string.

        // 2 - We call loadData with the mocked fetch data (string) and it will
        // turn it into an object or array. Therefore, it will equal to ['This is a note'].
        client.loadData((returnedDataFromApi) => {
            expect(returnedDataFromApi).toEqual(['This is a note']);
            done();
    })

    // it('calls fetch and create notes', (done) => {
    //     const client = new NotesClient();
    //     fetch.mockResponseOnce(JSON.stringify(
    //         ['This is a note']
    //     ))
        
    // })


})})