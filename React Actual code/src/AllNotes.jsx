import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const AllNotes=(props)=>{

    const note=(note,index,arr)=>{
        
        return (
            <li key={index}>
                <div className="note-about"
                    onClick={()=>{props.showNote(index);}}>
                    <p>{note.title}</p>
                    <p>{note.date}</p>
                </div>
                <div className="icons">
                    <Button className="btn"
                        onClick={()=>{props.deleter(index);}}>
                        <DeleteIcon
                            className="icon"/>
                    </Button>
                </div>
            </li>
        );
    }
    
    const emptyNote=<li><p>Add a Note</p></li>;
    
    return (
        <div className="allnotes"> 
            <ul>
                {props.allNotes.length===0?emptyNote:""}
                {props.allNotes.map(note)}
            </ul>
        </div>
    );
};

export default AllNotes;