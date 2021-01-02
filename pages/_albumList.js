import styles from '../styles/AlbumList.module.css';

const RenderAlbumList = (props) => {
    return (
        <div key={props.year} className={styles.albumList}>
            <p className={styles.albumListYear}>{props.year}</p>
            {/* アルバム単位で分割するか */}
            <div className={styles.albumListAlbums}>{props.albums.map((album) => (
                <div key={album._id} className="item">
                    <a href={album.uri} target="_blank">
                        <img src={album.images[0].url} style={{width: "150px"}}></img>
                    </a>
                    <p>{album.name}</p>
                    <p>{album.artist}</p>
        
                </div>
            ))}</div>
        </div>
    )
}

export default RenderAlbumList