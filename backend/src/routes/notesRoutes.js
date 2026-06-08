import express from "express";
import {
    createNote,
    deleteNote,
    getAllNotes,
    updateNote,
    getNoteByid,
    togglePin,
} from "../controllers/notesControllers.js";

const router = express.Router();

// Get all notes
router.get("/", getAllNotes);
//get a specific note
router.get("/:id", getNoteByid);

// Create a note
router.post("/", createNote);

// Update a note
router.put("/:id", updateNote);

// Delete a note
router.delete("/:id", deleteNote);

//PIN A NOTE
router.patch("/:id/pin", togglePin);

export default router;
