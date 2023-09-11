const NotesModel = require("./notesModel");

describe("A note class to add and see notes", () => {
  it("Initially getNotes should equal to []", () => {
    const model = new NotesModel();
    expect(model.getNotes()).toEqual([]);
  });
});
