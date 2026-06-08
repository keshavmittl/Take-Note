// also we can write the above code as "export function getAllNotes(req, res) { res.status(200).send("You just fetched the nodes"); }"
import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes Error", error);

    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteByid(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({note , message:"You successfully retried the note"} );

    } catch (error) {
        res.json({ message: "Internal server error" });
        res.status(500);
    }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;

    const newNote = new Note({
      title,
      content,
    });

    await newNote.save();

    res.status(201).json({
      message: "New Note created successfully",
      note: newNote,
    });
  } catch (error) {
    console.error("Error in createNote:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      {
        new: true,
      },
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({
      message: "Updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    console.error("Error in updateNote:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}


export async function deleteNote  (req, res)  {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);        
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }   
    res.send("Deleted successfully");
  } catch (error) {
    console.error("Error in deleteNote:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export async function togglePin(req, res) {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  note.isPinned = !note.isPinned;

  await note.save();

  res.status(200).json(note);
}

