(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // notesModel.js
  var require_notesModel = __commonJS({
    "notesModel.js"(exports, module) {
      var NotesModel2 = class {
        constructor() {
          this.notes = [];
        }
        addNote(note) {
          this.notes.push(note);
        }
        getNotes() {
          return this.notes;
        }
        setNotes(notes) {
          this.notes = notes;
        }
        reset() {
          this.notes = [];
        }
      };
      module.exports = NotesModel2;
    }
  });

  // notesClient.js
  var require_notesClient = __commonJS({
    "notesClient.js"(exports, module) {
      var NotesClient2 = class {
        loadData(callback) {
          return fetch("http://localhost:3000/notes").then((response) => response.json()).then((data) => {
            callback(data);
          });
        }
        createNote(data) {
          return fetch("http://localhost:3000/notes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              // specify content: data
              content: data
            })
          });
        }
      };
      module.exports = NotesClient2;
    }
  });

  // notesView.js
  var require_notesView = __commonJS({
    "notesView.js"(exports, module) {
      var NotesView2 = class {
        constructor(model2, client2) {
          this.model = model2;
          this.client = client2;
          this.mainContainerEl = document.querySelector("#main-container");
          this.buttonEl = document.querySelector("#add-note-button");
          this.buttonEl.addEventListener("click", () => {
            const inputEl = document.querySelector("#message-input");
            this.client.createNote(inputEl.value);
            this.model.addNote(inputEl.value);
            this.displayNotes();
            inputEl.value = "";
          });
        }
        displayNotes() {
          document.querySelectorAll(".note").forEach((element) => {
            element.remove();
          });
          const notes = this.model.getNotes();
          notes.forEach((note) => {
            const noteEl = document.createElement("div");
            noteEl.textContent = note;
            noteEl.className = "note";
            this.mainContainerEl.append(noteEl);
          });
        }
        displayNotesFromApi() {
          this.client.loadData((data) => {
            this.model.setNotes(data);
            this.displayNotes();
          });
        }
      };
      module.exports = NotesView2;
    }
  });

  // index.js
  console.log("The notes app is running");
  var NotesModel = require_notesModel();
  var NotesClient = require_notesClient();
  var NotesView = require_notesView();
  var model = new NotesModel();
  var client = new NotesClient();
  var notesView = new NotesView(model, client);
  notesView.displayNotesFromApi();
})();
