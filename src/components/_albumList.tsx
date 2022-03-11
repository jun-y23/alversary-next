import { ObjectId } from "mongodb";
import styles from "../../styles/AlbumList.module.scss";

export interface AlbumsClassfiedByYear {
    releasedYear: string;
    albumList: AlbumItem[];
}

export interface AlbumItem {
	_id: ObjectId,
	name: string,
	artist: string,
	release_date: string,
	uri: string,
	images: [Image, Image, Image],
};
export interface Image {
    height: number,
    url: string,
    width: number
};

const AlbumItem = (album: AlbumItem) => {
    return (
        <li className={styles.item}>
            <a href={album.uri} target="_blank">
                <img src={album.images[1].url} className={styles.img} alt={album.name}></img>
            </a>
            <p className={styles.albumName}>{album.name}</p>
            <p className={styles.albumArtist}>{album.artist}</p>
        </li>
    )
};

export const AlbumList = (props: AlbumsClassfiedByYear) => {
	return (
		<li className={styles.yearListItem}>
			<p className={styles.albumListYear}>{props.releasedYear}</p>
			<ul className={styles.albumListAlbums}>
				{props.albumList.map((album) => (
					<AlbumItem key={album._id.toString()}
						name={album.name}
						artist={album.artist}
						release_date={album.release_date}
						uri={album.uri}
						images={album.images}
						_id={album._id}
					/>
				))}
			</ul>
		</li>
	);
};