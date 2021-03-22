import PostAddIcon from '@material-ui/icons/PostAdd';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { v4 as uuid } from 'uuid';
import ReactMarkdownWithHtml from 'react-markdown/with-html';
import { ScrollSync, ScrollSyncNode } from 'scroll-sync-react';
import dateFormat from 'dateformat';

const Main = ({notes,setNotes, currentNote, setCurrentNote, addNoteFirestore,updateNoteFirestore, user}) => {

    const emptyNote = {
        id: uuid(),
        title: '',
        body:''}
    ;

    const handleUserInput = (e) => {
        const name = e.target.name;
        const note = {
            ...currentNote,
            [name]: e.target.value,
        };
        setCurrentNote(note);
    }

    const addNote = (notes,currentNote) => {
        //add date to new note
        const note = {
            ...currentNote,
            lastModified: Date.now(),
            owner: user.uid,
        }
        // default title if empty
        if(note.title===''){
            note.title='Untitled'
        }
        // add note to array (enforce body)
        if(note.body !== ''){
            setNotes([...notes,note]);
            // set currentNote to new empty note
            setCurrentNote(emptyNote);
            addNoteFirestore(note);
        }else{
            alert('The body of the note is empty! Why do you even use notespace? 🤔')
        }
    }

    const updateNote = (notes, currentNote) => {
        const modifiedNotes = notes.map(note => note.id === currentNote.id ?
            {...note,
                title: currentNote.title,
                body: currentNote.body
            }
            : note
        )
        setNotes(modifiedNotes);
        setCurrentNote(emptyNote);
        updateNoteFirestore(currentNote);
    }

    return(
        <ScrollSync>
        <div className="main">
            <div className="editor">
                <input 
                    type="text" 
                    id="title"
                    autoFocus 
                    placeholder="Untitled note ..."
                    onChange={handleUserInput}
                    name='title'
                    maxLength='75'
                    value={currentNote.title}
                />
                <ScrollSyncNode>
                    <textarea 
                        id="body" 
                        placeholder="Type something here ... ✍️" 
                        onChange={handleUserInput}
                        name='body'
                        value={currentNote.body}
                        style={{overflow: 'auto'}}
                    />
                </ScrollSyncNode>
                {notes.some(note => note.id === currentNote.id) ?
                    <CheckCircleOutlineIcon 
                    fontSize="large" 
                    className="icon post-add-icon" 
                    onClick={() => updateNote(notes,currentNote)}
                />
                    :
                    <PostAddIcon 
                        fontSize="large" 
                        className="icon post-add-icon" 
                        onClick={() => addNote(notes,currentNote)}
                    />
                }
                
                
            </div>
            <div className="preview">
                <div className="preview-header">
                    <h1 className="preview-title">{currentNote.title}</h1>
                    <p className="preview-last-modified">{currentNote.lastModified ?  `Last modified: ${dateFormat(currentNote.lastModified)}` : ''}</p>
                </div>
                <ScrollSyncNode>
                <div className="markdown-preview">               
                    {currentNote.body ?
                        <ReactMarkdownWithHtml 
                            parserOptions={{ commonmark: true }} 
                            allowDangerousHtml>
                            {currentNote.body}
                        </ReactMarkdownWithHtml> 
                        :
                        <p>Write something in the editor and something magical will happen here ... 🎩✨</p>
                    }                      
                </div>   
                </ScrollSyncNode>   
            </div>
        </div>
        </ScrollSync>
    );
}

export default Main;