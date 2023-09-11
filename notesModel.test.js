const NotesModel = require("./notesModel");

describe("A note class to add and see notes", () => {
  it("Initially getNotes should equal to []", () => {
    const model = new NotesModel();
    expect(model.getNotes()).toEqual([]);
  });

  it("Add multiple notes to the list", () => {
    const model = new NotesModel();
    model.addNote('Set the alarm')
    model.addNote('Make dinner')
    expect(model.getNotes()).toEqual(['Set the alarm', 'Make dinner']);
  });
  
});
