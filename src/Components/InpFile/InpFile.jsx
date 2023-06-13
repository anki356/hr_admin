import React, { useState } from 'react'
import classes from './InpFile.module.css';

const InpFile = (props) => {

    const [file, setFile] = useState('')

    function changeFile(e) {
        props.fileHandler(e.target.files[0])
        props.labelFunc(e.target.value)
        setFile(e.target.value)
    }

    return (
        <React.Fragment>
            <div>
                <input className={classes.input} value={file}  onChange={changeFile} type="file" id={props.id} accept="application/pdf,image/jpeg" />
                <label htmlFor={props.id} className={classes.label}>
                    <span>Choose</span>
                    <span>{props.label == ''? 'File' :props.label}</span>
                </label>
            </div>
        </React.Fragment>
    )
}

export default InpFile
