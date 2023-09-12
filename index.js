console.log("The notes app is running")

const NotesModel = require('./notesModel')
const NotesView = require('./notesView')
const model = new NotesModel()
model.addNote('Make dinner')
model.addNote('Watch Apple event')
const notesView = new NotesView(model)

notesView.displayNotes()

// console.log(model.getNotes())