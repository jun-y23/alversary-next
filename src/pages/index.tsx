import "./_app";

import { CustomHead } from '../components/CustomHead';
import { ObjectId } from "mongodb";
import { RenderAlbumList } from "../components/_albumList";

import styles from "../../styles/Index.module.scss";

interface Props {
    albumArray: AlbumArray[]
};

interface AlbumArray {
    releasedYear: string;
    albums: [AlbumItem];
}[]

interface AlbumItem {
    _id: ObjectId;
    name: string;
    artist: string;
    release_date: string;
    uri: string;
    images: [Image, Image, Image];
};

interface Image {
    height: number;
    width: number;
    url: string;
};

export default function Home(props: Props) {
    return (
    <div id="home">
        <CustomHead/>
        <main>
        {props.albumArray.length === 0 ? (
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
    let albumArray: {
        releasedYear: string;
        albums: AlbumItem[];
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
            };

            const targetObj = albumArray.find(
                (val) => val.releasedYear === releasedYear
            );
            targetObj?.albums.push(album);
        });
    };

    albumArray.sort(
        (
            a: { releasedYear: string; albums: any[] },
            b: { releasedYear: string; albums: any[] }
        ) => {
            if (a.releasedYear > b.releasedYear) {
                return -1;
            }
            if (a.releasedYear < b.releasedYear) {
                return 1;
            }
            return 0;
        }
    );

    return {
        props: {
            albumArray,
        },
    };
};