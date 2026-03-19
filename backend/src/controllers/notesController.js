import Note from "../model/Note.js";
//if we have an argument that is not ever used in the block of code we can simply replace it by _
export async function getAllNotes  (_, res){ //async used when we have to make some promises, basically when something takes time and we don't want program to stop while it is taking time
    try {
        const notes = await Note.find().sort({createdAt:-1})  //gives every single note and sorts them in reverse order based on createdAt value fetching the latest one first
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getALlNotes ", error)
        res.status(500).json({message: "Internal Server error"})
        
    }
}
export async function getNote (req,res){
    try {
        const note = await Note.findById(req.params.id)
        if(!note) return res.status(404).json({message: "Note not found"})
        res.status(200).json(note)
    } catch (error) {
        console.error("Error in getNote ", error)
        res.status(500).json({message: "Internal Server error"})
    }

}
export async function createNote  (req, res){
    try {     //we need a title and a content for each note
        const {title, content} = req.body //catching the request
        const note = new Note({title:title, content:content})
        const savedNote = await note.save()
        res.status(201).json(savedNote) //sending a response
        console.log(title, content)
    } catch (error) {
        console.error("Error in createNote ", error)
        res.status(500).json({message: "Internal Server error"})
    }
}

export async function updateNote  (req, res){
    try {
        const {title, content} = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title:title, content:content}, {new:true})
        //by defaul findbyidandupdate gives you the doc before the update, but new:true makes sure it gives the doc after update is applied
        if(!updatedNote) return res.status(404).json({message:"Note not found"})

        res.status(200).json(updatedNote)
        console.log(title, content)
        
    } catch (error) {
        console.error("Error in updateNote ", error)
        res.status(500).json({message: "Internal Server error"})  
    }
}

export async function deleteNote  (req, res){
    try {
        const {title, content} = req.body
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if(!deletedNote) return res.status(404).json({message:"Note not found"})
        res.status(200).json({message:"Note deleted successfully"})
        
    } catch (error) {
        console.error("Error in deleteNote ", error)
        res.status(500).json({message: "Internal Server error"})  
        
    }
}

// export function getAllNotes1 (req,res) {
//     res.send("Hello");
// }

// we can also define a function like this

// mongodb+srv://ritwik8march_db_user:S3Go3K5xYIIJpx7E@cluster0.ucp0ruo.mongodb.net/?appName=Cluster0