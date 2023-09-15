/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const NotesView = require("./notesView");
const NotesModel = require("./notesModel");
const NotesClient = require("./notesClient");

describe("A test for my web page", () => {
  // We can use the beforeEach() hook
  // to set the jest `document` HTML before each test
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync("./index.html");
  });

  it("displays two notes", () => {
    // 1. Arrange - instantiate our View class
    const model = new NotesModel();
    const client = new NotesClient();
    model.addNote("Make dinner");
    model.addNote("Watch Apple event");
    const notesView = new NotesView(model, client);

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
    const client = new NotesClient();
    const buttonEl = document.querySelector("#add-note-button");
    const inputEl = document.querySelector("#message-input");
    inputEl.value = "Watch a nice movie";
    const mockClient = {
      createNote: jest.fn()
    }
    mockClient.createNote.mockImplementationOnce((data, callback, errorCallback) => {
      return Promise.resolve(callback(data))
    })
    const notesView = new NotesView(model, mockClient);
    buttonEl.click();
    expect(document.querySelector(".note")).not.toBeNull();
    expect(document.querySelector(".note").textContent).toBe(
      "Watch a nice movie"
    );

  });
});
// Basically, you can't both be using the jest js-dom environment and real fetch requests together
// I would have thought you could, but apparently that's not possible!
// So, in essence, the fetch requests must be mocked when using that particular environment.
// I have re-implemented your createNote function as a jest function, mimicking closely what it does "for real"
// it basically returns a promise that calls your callback function, hence the syntax above.
// Then, your tests were running using that mocked function instead of the real deal