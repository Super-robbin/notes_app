class NotesView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
    this.mainContainerEl = document.querySelector("#main-container");
    this.notesContainer = document.querySelector("#notes-container")
    this.addButtonEl = document.querySelector("#add-note-button");
    this.resetButtonEl = document.querySelector("#reset-notes-button");
    this.inputEl = document.querySelector("#message-input");

    this.addButtonEl.addEventListener("click", () => {
      this.client.createNote(// first create the note
        this.inputEl.value,
        () => {
          this.model.addNote(this.inputEl.value); // then add the note
          this.displayNotes();
          this.inputEl.value = "";
        },
        (error) => {
          this.displayError(error);
        }
      );
    });
    this.resetButtonEl.addEventListener("click", () => {
      this.client.reset(
        () => {
          document.querySelectorAll(".note").forEach((element) => {
            element.remove();
            this.model.reset();
          });
        },
        (error) => {
          this.displayError(error);
        }
      );
    });
  }

  displayNotes() {
    // We first remove all the previous notes,
    // then we add the new ones in the next step.
    document.querySelectorAll(".note").forEach((element) => {
      element.remove();
    });
    const notes = this.model.getNotes();

    // For each note, create and append a new element on the main container
    notes.forEach((note) => {
      const noteEl = document.createElement("div");
      noteEl.textContent = note;
      noteEl.className = "note";
      this.notesContainer.append(noteEl);

      // document.querySelector('#message-input').value = '';
      // to show just the message below the input box, instead of both
      // inside and below
    });
  }

  displayNotesFromApi() {
    this.client.loadData(
      (data) => {
        this.model.setNotes(data);
        this.displayNotes();
      },
      (error) => {
        this.displayError(error);
      }
    );
  }

  displayError(error) {
    const errorEl = document.createElement("div");
    errorEl.textContent = error.message;
    errorEl.className = "error";
    this.mainContainerEl.append(errorEl);
  }
}

module.exports = NotesView;
