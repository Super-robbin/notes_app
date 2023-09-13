console.log("The notes app is running")

const NotesModel = require('./notesModel')
const NotesClient = require('./notesClient')
const NotesView = require('./notesView')
const model = new NotesModel()
const client = new NotesClient()
const notesView = new NotesView(model, client)

notesView.displayNotesFromApi()

// console.log(model.getNotes())