class NotesModel {
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
    this.notes = notes
  }

  reset() {
    this.notes = [];
  }
}

module.exports = NotesModel;
