const express = require("express");
const router = express.Router();
const Note = require("../model/NotesSchema"); // Use a more descriptive name than newNote
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

// Route to fetch all notes for a logged-in user
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    // Fetch only the notes for the authenticated user
    const notes = await Note.find({ user: req.userid });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Some error has occurred" });
  }
});

// Route to add a new note for a logged-in user
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a title with at least 3 characters").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description should be at least 5 characters long"
    ).isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Create a new note with the authenticated user's ID
      const note = new Note({
        title,
        description,
        tag,
        user: req.userid, // Use the authenticated user's ID
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Some error has occurred" });
    }
  }
);

// Route to update an existing note
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body; // Destructure fields from the request body

  try {
    // Create an object with the updated fields
    const updatedNoteFields = {};
    if (title) updatedNoteFields.title = title;
    if (description) updatedNoteFields.description = description;
    if (tag) updatedNoteFields.tag = tag;

    // Find the note to be updated and check if it exists
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Ensure the user owns the note
    if (note.user.toString() !== req.userid.toString()) {
      return res.status(401).json({ error: "Not authorized" });
    }

    // Update the note with new details
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: updatedNoteFields },
      { new: true } // Return the newly updated note
    );

    res.json(note); // Respond with the updated note
  } catch (error) {
    console.error("Error updating note:", error.message);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

// Route to delete an existing note
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body; // Destructure fields from the request body

  try {
    // Find the note to be deleted and check if it exists
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Ensure the user owns the note
    if (note.user.toString() !== req.userid.toString()) {
      return res.status(401).json({ error: "Not authorized" });
    }

    // delete the note with new details
    note = await Note.findByIdAndDelete(req.params.id);

    res.json({ Success: "note as been deleted", note: note }); // Respond with the updated note
  } catch (error) {
    console.error("Error updating note:", error.message);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

module.exports = router;
