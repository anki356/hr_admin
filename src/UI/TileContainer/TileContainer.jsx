import HeaderTile from '../../Components/HeaderTile/HeaderTile'
import classes from './TileContainer.module.css'

const TileContainer = (props) => {

    // Props Data into variable (mpa this data for making tiles and use css according to its need)
    const Data = props.Data


    return (
        <div className={classes.tile_container}>
            {/* Here we are mapping out Data(props.data) */}
            {Data.map((element, index) => (
                <HeaderTile key={index} title={element.title} value={element.value} num={element.num} />
            ))}
        </div>
    )
}

export default TileContainer