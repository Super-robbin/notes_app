/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const NotesView = require("./notesView");
const NotesModel = require("./notesModel");

describe("A test for my web page", () => {
  // We can use the beforeEach() hook
  // to set the jest `document` HTML before each test
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync("./index.html");
  });

  it("displays two notes", () => {
    // 1. Arrange - instantiate our View class
    const model = new NotesModel();
    model.addNote("Make dinner");
    model.addNote("Watch Apple event");
    const notesView = new NotesView(model);

    // 2. Act - call any method that modifies the page
    // this method `displayTitle` would dynamically
    // set a <h1> title on the page with the given content
    notesView.displayNotes();

    // 3. Assert - we assert the page contains what it should.
    // Usually, you will use `.querySelector` (and friends)
    // here, and assert the text content, the number of elements,
    // or other things that make sense for your test.
    expect(document.querySelectorAll("div.note").length).toEqual(2);
  });

  it("adds a new note", () => {
    const model = new NotesModel();
    const notesView = new NotesView(model);
    const buttonEl = document.querySelector("#add-note-button");
    const inputEl = document.querySelector("#message-input");
    inputEl.value = "Watch a nice movie";
    buttonEl.click();
    expect(document.querySelector(".note")).not.toBeNull();
    expect(document.querySelector(".note").textContent).toBe('Watch a nice movie'); 
  });
});
