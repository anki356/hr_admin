import React, { useState } from 'react'
import classes from './InpFile.module.css';

const InpFile = (props) => {
    const [file, setFile] = useState('')
    function changeFile(e) {
        // console.log(e.target.files[0])
        // props.changeFile(e.target.files[0])
        props.fileHandler(e.target.files[0])
        setFile(e.target.value)
    }
    return (
        <React.Fragment>
            <form enctype="multipart/form-data">
                <input className={classes.input} value={file} onChange={e => changeFile(e)} type="file" id='file' />
                <label htmlFor="file" className={classes.label}>
                    <span>Choose</span>
                    <span>{file}</span>
                </label>
            </form>
        </React.Fragment>
    )
}

export default InpFile
