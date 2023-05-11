import React, { useState } from 'react'
import classes from './InpFile.module.css'; 

const InpFile = () => {
    const [file, setFile] = useState('')
    return (
        <React.Fragment>
            <input className={classes.input} value={file} onChange={e=>{setFile(e.target.value)}} type="file" id='file' />
            <label htmlFor="file" className={classes.label}>
                    <span>Choose</span>
                    <span>{file}</span>
            </label>
        </React.Fragment>
    )
}

export default InpFile
