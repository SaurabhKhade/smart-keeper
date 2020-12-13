import React from 'react';
import NotesIcon from '@material-ui/icons/Notes';

const Header=()=>{
    return(
        <div className="header">
            <div className="heading">
                <NotesIcon className="icon"/>
                <h1>Smart Keeper</h1>
            </div>
        </div>
    );
};

export default Header;