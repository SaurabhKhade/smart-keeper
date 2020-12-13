import React from 'react';
import Button from '@material-ui/core/Button';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import CloseIcon from '@material-ui/icons/Close';
import ReplaySharpIcon from '@material-ui/icons/ReplaySharp';
import SaveIcon from '@material-ui/icons/Save';

const NoteField=(props)=>{
    
    const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const Months=['January','February','March','April','May','June','July','August','September','October','November','December'];
    
    const toggleNotefield=()=>{
        props.toggleExpand(!props.expanded);
    };
    
    const noteHandler=(e)=>{
        props.setNote((oldNote)=>{
            oldNote[e.target.name]=e.target.value;
            return {...oldNote};
        });
    };
    
    const addNote=()=>{
        if (props.note.title==="" || props.note.desc===""){
            alert ("note can't be empty!");
            return;
        }
        
        for (var i = 0; i < props.allNotes.length; i++) {
            if (props.note.title===props.allNotes[i].title) {
                if(window.confirm("Do you want to replace previous note with same title?")){
                    props.notesManager((old)=>{
                        old.splice(i,1)
                        return [...old];
                    });
                } else {
                    return;
                }
                break;
            }
        }
        
        let day=days[new Date().getDay()];
        let month=Months[new Date().getMonth()];
        let date=new Date().getDate();
        let year=new Date().getFullYear();
        let noteDate=`${day} ${month} ${date}, ${year}`;
        props.notesManager((old)=>{
            return ([{
                title:props.note.title,
                desc:props.note.desc,
                date:noteDate
            },...old]);
        });
        clearNote();
        toggleNotefield();
    };
    
    const clearNote=()=>{
        props.setNote({
            title:"",
            desc:""
        });
    };
    
    const noteManager=(
        <>
            <Button className="addNote"
                onClick={clearNote}>
                <ReplaySharpIcon 
                    className="icon"/>
            </Button>
            <Button className="addNote"
                onClick={addNote}>
                <SaveIcon 
                    className="icon"/>
            </Button>
        </>
    );
    return (
        <>
        <div className="notefield"
            style={{top:props.expanded?"120px":"100%"}}>
            <div className="title">
                <input type="text"
                    placeholder="Title"
                    name="title"
                    onChange={noteHandler}
                    value={props.note.title}
                    autoComplete="off"/>
            </div>
            <div className="desc">
                <textarea placeholder="Note..."
                    name="desc"
                    value={props.note.desc}
                    onChange={noteHandler}/>
            </div>
        </div>
        <div className={props.expanded?"top":"bottom"}>
            {props.expanded?noteManager:""}
            <Button className="addNote"
                    onClick={toggleNotefield}>
                {props.expanded?<CloseIcon className="icon"/>:<NoteAddIcon className="icon"/>}
            </Button>
        </div>
        </>
    );
};

export default NoteField;