import DeleteIcon from '@material-ui/icons/Delete';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import dateFormat from 'dateformat';
import { v4 as uuid } from 'uuid';
import ReactMarkdownWithHtml from 'react-markdown/with-html';

const Sidebar = ({auth, user, notes, setNotes, currentNote, setCurrentNote, deleteNoteFirestore,unsub}) => {
    const username = user.displayName.split(" ")[0];
    const removeNote = (n) => {
        setNotes(notes.filter(note => note.id !== n.id));
        setCurrentNote({
            id: uuid(),
            title: '',
            body: '',
        });
        deleteNoteFirestore(n)
    }
    const logOut = async () => {
        await auth.signOut();
    }

    const sortedNotes = notes.sort((a,b) => b.lastModified - a.lastModified);
    return(
        <div className="sidebar">
            <div className="sidebar-header">
                <h1>{username}'s Notes</h1>
                <ExitToAppIcon fontSize="large" className="icon log-out-icon" onClick={logOut}/>
            </div>
            {notes.length === 0 ?
                <div className="no-notes">
                    Hey it's quite empty here, what about writing something? ✌️ 
                </div>
                :
                <div className="sidebar-list">
                    {sortedNotes.map(note => (
                        <div className={`note ${note.id === currentNote.id && "active-note"}`} key={note.id}>
                            <div className="note-title">
                                <h3 onClick={() => setCurrentNote(note)}>{note.title}</h3>
                                <DeleteIcon className="delete-note-icon" onClick={() => removeNote(note)}/>
                            </div>
                            <div className="note-body">
                                <ReactMarkdownWithHtml 
                                parserOptions={{ commonmark: true }} 
                                allowDangerousHtml>
                                {note.body}
                                </ReactMarkdownWithHtml>
                            </div>
                            <div className="note-meta">
                                <p>{dateFormat(note.lastModified)}</p>
                            </div>
                        </div>
                    ))}        
                </div>
}    
        </div>
    );
}

export default Sidebar;