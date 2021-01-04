import styles from "../styles/Index.module.scss";
import RenderAlbumList from "./_albumList";
import { ObjectId } from "mongodb";

type Props = {
	albumArray: {
		releasedYear: string,
		albums: []
	}[];
}

export default function Album(props: Props) {
	return (
		<main className={styles.main}>
			<h1 className={styles.title}>Alversary</h1>
			<div className={styles.albumsArea}>
				<ul className={styles.yearList}>
					{props.albumArray.map((item) => {
						return <RenderAlbumList year={item.releasedYear} albums={item.albums} />;
					})}
				</ul>
			</div>
		</main>
	);
};

/**
 *
 * @export
 * @return array
 */
export async function getServerSideProps() {
	const res = await fetch("http://localhost:3000/api/albums");
	const json = await res.json();
	const albums: {}[] = json.albums;

	// リリース年ごとに分割
	// [{'releasedYear':'2000','albums': []}]
	let albumArray: {
		releasedYear: string,
		albums: []
	}[] = [];
	
	albums.map((album: any) => {
		// ここでObject.Assingして新しいやつ作るか。
		let releasedYear: string = album.release_date.substr(0, 4);
	
		if (!albumArray.find((val) => val.releasedYear === releasedYear)) {
			albumArray.push({
				releasedYear: releasedYear,
				albums: []
			});
		} 

		const targetObj = albumArray.find((val) => val.releasedYear === releasedYear);
		targetObj?.albums.push(album)
	});
	return {
		props: {
			albumArray,
		},
	};
};
