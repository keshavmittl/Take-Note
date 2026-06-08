import { PenSquareIcon, Trash2Icon, PinIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation(); // prevents the page from refreshing

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);

      setNotes((prev) => prev.filter((note) => note._id !== id)); // remove the deleted note from the state array and update the UI with the new array

      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("RESPONSE:", error.response);
      console.log("DATA:", error.response?.data);

      toast.error("Failed to delete note");
    }
  };
  const handlePin = async (e, id) => {
  e.preventDefault();
  e.stopPropagation();

  try {
    const response = await api.patch(`/notes/${id}/pin`);
    setNotes((prevNotes) =>
      [...prevNotes.map((n) => (n._id === id ? response.data: n))]
        .sort((a, b) => b.isPinned - a.isPinned)
    );

    toast.success(response.data.note?.isPinned ? "Note pinned" : "Note unpinned");
  } catch (error) {
    console.error("Pin error:", error.message);
    toast.error("Failed to update pin");
  }

  };
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-200 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 border-t-4 border-[#1c4f81]/40 hover:border-[#1c4f81]/80"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={(e) => handlePin(e, note._id)}
              className="btn btn-ghost btn-xs hover:bg-base-300"
            >
              <PinIcon
                className={`size-4 transition-all duration-200 ${
                  note.isPinned
                    ? "text-[#1c4f81] fill-[#1c4f81]"
                    : "text-base-content/40"
                }`}
              />
            </button>
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default NoteCard;
