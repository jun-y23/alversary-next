import styles from "../../styles/AlbumList.module.scss";
import { ObjectId } from "mongodb";

interface Props {
	year: string,
	albums: [AlbumItem]
};

interface AlbumItem {
	_id: ObjectId,
	name: string,
	artist: string,
	release_date: string,
	uri: string,
	images: [Image, Image, Image],
};
interface Image {
    height: number,
    url: string,
    width: number
};

const AlbumItem = (props: AlbumItem) => {
    return (
        <li className={styles.item}>
            <a href={props.uri} target="_blank">
                <img src={props.images[1].url} className={styles.img} alt={props.name}></img>
            </a>
            <p className={styles.albumName}>{props.name}</p>
            <p className={styles.albumArtist}>{props.artist}</p>
        </li>
    )
};

export const RenderAlbumList = (props: Props) => {
	return (
		<li className={styles.yearListItem}>
			<p className={styles.albumListYear}>{props.year}</p>
			<ul className={styles.albumListAlbums}>
				{props.albums.map((album) => (
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