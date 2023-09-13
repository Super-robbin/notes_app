class NotesClient {
  loadData(callback) {
    return fetch("http://localhost:3000/notes")
      .then((response) => response.json())
      .then((data) => {
        callback(data);
        // 1 - We get back data from fetch as a string,
        // whether is an object or an array.

        // 2 - We take that data and turn it into JSON.
        // 3 - We take the JSON and turn it into an object or array.
      });
  }
}

module.exports = NotesClient;
