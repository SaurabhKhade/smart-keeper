import React,{useState, useEffect} from 'react';
import Header from './Header';
import NoteField from './NoteField';
import AllNotes from './AllNotes';
import SearchBar from './SearchBar';

const App = () => {
    let [note,setNote]=useState({
        title:"",
        desc:""
    });
    
    let [searched,toggleSearched]=useState(false);
    
    let [expanded,toggleExpand]=useState(false);
    
    let [allNotes,notesManager]=useState([]);
    
    const setLocalStorage=()=>{
        localStorage.setItem("notes", JSON.stringify(allNotes));
    };
    
    const getLocalStorage=()=>{
        notesManager(JSON.parse(localStorage.getItem("notes")));
    };
    
    useEffect(() => {
        getLocalStorage();
        toggleSearched(false);
    }, []);
    
    useEffect(()=>{
        setLocalStorage();
    }, [allNotes]);
    
    const showNote=(i)=>{
        setNote({
            title:allNotes[i].title,
            desc:allNotes[i].desc
        });
        toggleExpand(true);
    }
    
    const deleter=i=>{
        if(window.confirm("do you really want to delete this note?")){
            notesManager((old)=>{
                old.splice(i,1);
                return [...old];
            });
        }
    };
    
    return(
        <>
            <Header/>
            <SearchBar
                allNotes={allNotes}
                searched={searched}
                toggleSearched={toggleSearched}
                showNote={showNote}/>
            <AllNotes allNotes={allNotes}
                notesManager={notesManager}
                showNote={showNote}
                deleter={deleter}/>
            <NoteField 
                notesManager={notesManager}
                local={setLocalStorage}
                setNote={setNote}
                note={note}
                expanded={expanded}
                toggleExpand={toggleExpand}
                allNotes={allNotes}/>
        </>
    );
}

export default App;