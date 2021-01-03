import styles from '../styles/AlbumList.module.css';

const RenderAlbumItem = (props) => {
    return (
        <div className="item">
            <a href={props.album.uri} target="_blank">
                <img src={props.album.images[0].url} style={{width: "200px"}}></img>
            </a>
            <p className={styles.albumArtist}>{props.album.name}</p>
            <p className={styles.albumName}>{props.album.artist}</p>
        </div>
    )
}

export default RenderAlbumItem