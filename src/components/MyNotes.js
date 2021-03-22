import Sidebar from './Sidebar';
import Main from './Main';
import { useState, useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid';


const MyNotes = ({db, auth, user}) => {
 
    // State
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState({ 
        id: uuid(),
        body: '',
        title: '',
    }
    );

    // notes reference
    const nRef = db.collection('notes');
    const notesRef = useRef(nRef).current;
    // db ref to unsubscribe from listener
    const unsub = useRef(null);
    

    
    // Add note
    const addNoteFirestore = async (note) => {
        notesRef
            .doc(note.id)
            .set(note)
            .catch((err) => {
                console.error(err);
            })
    }
    // Update note
    const updateNoteFirestore = async (note) => {
        notesRef
            .doc(note.id)
            .update(note)
            .catch((err) => {
                console.error(err);
            })
    }
    // Delete note
    const deleteNoteFirestore = async (note) => {
        notesRef
            .doc(note.id)
            .delete()
            .catch((err) => {
                console.error(err);
            })
    }

    useEffect(() => {
        // Get notes
        const getNotesFirestore = async () => {
            // get user notes from firestore
            unsub.current = await notesRef.where('owner', '==', user.uid).onSnapshot((snapshot) => {
                const notes = [];
                snapshot.forEach((doc) => {
                    // add documents to notes array
                    notes.push(doc.data());
                });
                // set firestore notes to state
                setNotes(notes);
            })
        }

        getNotesFirestore();
        return () => {      
            unsub.current();
        }
    }, [notesRef,user]);

    return(
        <div className="app">
            <Sidebar 
                auth={auth}
                user={user} 
                notes={notes}
                setNotes={setNotes}
                currentNote={currentNote}
                setCurrentNote={setCurrentNote}
                deleteNoteFirestore={deleteNoteFirestore}
                unsub={unsub}
            />
            <Main 
                user={user}
                notes={notes} 
                setNotes={setNotes}
                currentNote={currentNote}
                setCurrentNote={setCurrentNote}
                addNoteFirestore={addNoteFirestore}
                updateNoteFirestore={updateNoteFirestore}
            />
        </div>
    );
}

export default MyNotes;