import styles from '../styles/AlbumList.module.css';
import RenderAlbumItem from './_albumItem'

const RenderAlbumList = (props) => {
    return (
        <li className={styles.yearListItem}>
            <p className={styles.albumListYear}>{props.year}</p>
            <ul className={styles.albumListAlbums}>{props.albums.map((album) => (
                <RenderAlbumItem key={album._id.toString()} album={album} />
            ))}</ul>
        </li>
    )
}

export default RenderAlbumList