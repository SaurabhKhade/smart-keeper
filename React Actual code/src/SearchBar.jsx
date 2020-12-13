import React,{useState} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const SearchBar=(props)=>{
    
    let [result,setResult]=useState({
        title:"",
        desc:"",
        date:""
    });
    
    let [search,setSearch]=useState("");
    
    const Searched=()=>{
        let flag=true;
        for(var i=0;i<props.allNotes.length;i++) {
            if (props.allNotes[i].title===search) {
                setResult({
                    title:props.allNotes[i].title,
                    desc:props.allNotes[i].desc,
                    date:props.allNotes[i].date
                });
                props.toggleSearched(true);
                flag=false;
                break;
            }
        }
        if (flag) {
            props.toggleSearched(true);
            setResult({
                title:"Not Found",
                desc:"",
                date:""
            });
        }
    };
    
    const input=(e)=>{
        setSearch(e.target.value)
    };
    
    const detail=()=>{
        for (var i = 0; i < props.allNotes.length; i++) {
            if(props.allNotes[i].title===search) {
                props.showNote(i);
                break;
            }
        }
    };
    
    return(
        <>
        <div className="searchBar">
            <SearchIcon className="icon"
                onClick={Searched}/>
            <input  type="text"
                    placeholder="Search a Note"
                    value={search}
                    onChange={input}/>
        </div>
        <div className="SearchBar-b"></div>
        <div className="SearchedItem">
            <ul style={{display:props.searched?"block":"none"}}>
                <li onClick={detail}>
                    <div className="note-about">
                        <p>{result.title}</p>
                        <p>{result.date}</p>
                    </div>
                    <div className="icons">
                        <Button className="btn">
                            <DeleteIcon
                                className="icon"/>
                        </Button>
                    </div>
                </li>
            </ul>
        </div>
        </>
    );
};

export default SearchBar;