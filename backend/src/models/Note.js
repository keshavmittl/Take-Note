import mongooose from "mongoose";
// create a schema for the note
// create a model based on the schema
const NoteSchema = new mongooose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Note = mongooose.model("Note", NoteSchema);

export default Note;
