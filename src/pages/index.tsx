import "./_app";

import { CustomHead } from '../components/CustomHead';
import { AlbumList, AlbumsClassfiedByYear, AlbumItem, Image} from "../components/_albumList";

import styles from "../../styles/Index.module.scss";

// 全アルバムの入った配列
interface Props {
    albumList: AlbumsClassfiedByYear[]
}

export default function Home(props: Props) {
    return (
    <div id="home">
        <CustomHead/>
        <main>
        {props.albumList.length === 0 ? (
            <p>There are no album released today...</p>
        ) :
        <div>
            <div className={styles.main}>
                <div className={styles.mainInner}>
                    <h1 className={styles.title}>Alversary</h1>
                    <p className={styles.subTitle}>
                        These albums were released on this date!!
                    </p>
                    <div className={styles.albumsArea}>
                        <ul className={styles.yearList}>
                            {props.albumList.map((item, index) => {
                                return (
                                    <AlbumList
                                        key={index}
                                        releasedYear={item.releasedYear}
                                        albumList={item.albumList}
                                    />
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        };
        </main>
    </div>
    );
};

/**
 *
 * @export
 * @return array
 */
export async function getStaticProps() {
    const endpoint: string = process.env.API_ENDPOINT as string;
    const apiKey: string = process.env.API_KEY as string;
    
    const res = await fetch(endpoint, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=utf-8",
            "X-API-Key": apiKey,
        }
    });
    const albums: {}[] = await res.json();

    // リリース年ごとに分割 [{'releasedYear':'2000','albums': []},]
    let albumsClassifiedByYear: AlbumsClassfiedByYear[] = [];

    if (albums.length) {
        // @TODO: anyやめる
        albums.forEach((album: any) => {
            let releasedYear: string = album.release_date.substr(0, 4);

            if (!albumsClassifiedByYear.find((val) => val.releasedYear === releasedYear)) {
                albumsClassifiedByYear.push({
                    releasedYear: releasedYear,
                    albumList: [],
                });
            };

            const targetObj = albumsClassifiedByYear.find(
                (val) => val.releasedYear === releasedYear
            );
            targetObj?.albumList.push(album);
        });
    };
    
    // リリース年順にsort
    sortInDescendingOrder(albumsClassifiedByYear);

    return {
        props: {
            albumsClassifiedByYear,
        },
    };
};

const sortInDescendingOrder = (albums: AlbumsClassfiedByYear[]): void => {
    albums.sort((
        a, b: AlbumsClassfiedByYear,
    ) => {
        if (a.releasedYear > b.releasedYear) {
            return -1;
        }
        if (a.releasedYear < b.releasedYear) {
            return 1;
        }
        return 0;
    })
};