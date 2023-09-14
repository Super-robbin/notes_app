class NotesClient {
  loadData(resolved, rejected) {
    return fetch("http://localhost:3000/notes")
      .then((response) => response.json())
      .then((data) => {resolved(data);
        // 1 - We get back data from fetch as a string,
        // whether is an object or an array.

        // 2 - We take that data and turn it into JSON.
        // 3 - We take the JSON and turn it into an object or array.
      })
      .catch((error) => {
        rejected(error);
      });
  }
  createNote(data, callback, errorCallback) {
    return fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // specify content: data
        content: data,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        callback(data);
      })
      .catch((error) => {
        errorCallback(error);
      });
  }
}

module.exports = NotesClient;
