import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import {nanoid} from "nanoid"
import "react-mde/lib/styles/css/react-mde-all.css"


export default function App() {
    const [notes, setNotes] = React.useState(
      () => JSON.parse(localStorage.getItem("notes")) || []
    )

    const [currentNoteId, setCurrentNoteId] = React.useState(
      (notes[0] && notes[0].id) || "" 
    )


    React.useEffect(() => {
      localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])


    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [...prevNotes, newNote])
        setCurrentNoteId(newNote.id)
    }
    

    function updateNote(text) {
      // Create a new empty array
            // Loop over the original array
                // if the id matches
                    // put the updated note at the 
                    // beginning of the new array
                // else
                    // push the old note to the end
                    // of the new array
            // return the new array
        setNotes(oldNotes => {
          const updatedText = []
          for(let i = 0; i < oldNotes.length; i++) {
            if(oldNotes[i].id === currentNoteId) {
              updatedText.unshift({ ...oldNotes[i], body: text })
            }
            else {
              updatedText.push(oldNotes[i])
            }
          }
          return updatedText
        })
    }
    

    function deleteNote(event, noteId) {
      event.stopPropagation()
      setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
    }


    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }
    

    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}
