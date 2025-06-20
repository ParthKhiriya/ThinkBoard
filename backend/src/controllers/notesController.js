import Note from "../models/Note.js";

export const getAllNotes = async (_, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const getNote = async (req, res) => {
    try {
        const id = req.params.id;
        const note = await Note.findById(id);
        if (!note) return res.status(404).json({message: "Note not found!"});
        res.status(200).json(note);
    } catch (error) {
        console.error("Error fetching note", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = new Note({title, content}); // As the name of the key and value are same, so we can write directly
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error creating New Note!", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const id = req.params.id;
        const updatedNote = await Note.findByIdAndUpdate(id, {title,content}, {new:true});
        if(!updatedNote) return res.status(404).json({message: "Note not found!"});
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error Updating Note", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const deleteNote = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedNote = await Note.findByIdAndDelete(id, {new:true});
        if(!deletedNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json({message: "The Note has been Deleted successfully!"});
    } catch (error) {
        console.error("Error Deleting Note", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};