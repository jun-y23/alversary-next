import styles from "../../styles/Index.module.scss";
import RenderAlbumList from "../components/_albumList";
import { ObjectId } from "mongodb";

interface Props {
    albumArray: {
        releasedYear: string;
        albums: [AlbumItem];
    }[];
}

interface AlbumItem {
    _id: ObjectId;
    name: string;
    artist: string;
    release_date: string;
    uri: string;
    images: [Image];
}

interface Image {
    height: number;
    url: string;
    width: number;
}

export default function Home(props: Props) {
    if (props.albumArray.length) {
        return (
            <main className={styles.main}>
                <h1 className={styles.title}>Alversary</h1>
                <div className={styles.albumsArea}>
                    <ul className={styles.yearList}>
                        {props.albumArray.map((item, index) => {
                            return (
                                <RenderAlbumList
                                    key={index}
                                    year={item.releasedYear}
                                    albums={item.albums}
                                />
                            );
                        })}
                    </ul>
                </div>
            </main>
        );
    }
    return <main>no albums released...</main>;
}

/**
 *
 * @export
 * @return array
 */
export async function getServerSideProps() {
	const endpoint: string = process.env.API_ENDPOINT as string;
    const res = await fetch("https://p3a8y3yla0.execute-api.ap-northeast-1.amazonaws.com/Prod/albums");
	const albums: {}[] = await res.json();

    // リリース年ごとに分割 [{'releasedYear':'2000','albums': []},]
    let albumArray: {
        releasedYear: string;
        // @TODO: anyやめる
        albums: any[];
    }[] = [];

    if (albums.length) {
        // @TODO: anyやめる
        albums.forEach((album: any) => {
            let releasedYear: string = album.release_date.substr(0, 4);

            if (!albumArray.find((val) => val.releasedYear === releasedYear)) {
                albumArray.push({
                    releasedYear: releasedYear,
                    albums: [],
                });
            }

            const targetObj = albumArray.find(
                (val) => val.releasedYear === releasedYear
            );
            targetObj?.albums.push(album);
        });
    }

    return {
        props: {
            albumArray,
        },
    };
}
