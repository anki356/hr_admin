import classes from './DragAndDrop.module.css'
import file from '../../assets/file.png'
const DragAndDrop = () => {
  return (
    <div className={classes.container}>
        <h3 className={classes.heading}>Correction</h3>
        <div className={classes.dnd_container}>
            <h4>Upload Yours Files</h4>
            <p>File should be in JPG</p>
            <div className={classes.dnd}>
                <img src={file} alt="file" />
                <p>Drag and Drop Your FIle here</p>
            </div>
        </div>
    </div>
  )
}

export default DragAndDrop