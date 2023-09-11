class NotesModel {
  constructor() {
    this.notes = [];
  }
  addNote(note) {
    this.notes.push(note)
  }

  getNotes() {
    return this.notes
  }
}

module.exports = NotesModel;