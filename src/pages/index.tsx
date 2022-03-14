import "./_app";
import { CustomHead } from '../components/CustomHead';
import { ItemList, ItemListProps } from "../components/ItemList";

import styles from "../../styles/Index.module.scss";

// 今は年代ごとのやつしか対応してないからもう一つ抽象化した方がいい設計。多次元配列にした方がいいかんも。[AlbumsClassifiedByYear, AlbumsClassifiedByPopularity...]
interface Props {
    itemList: ClassifiedItem[]
}

interface ClassifiedItem {
    title: string;
    description: string;
    classification: string; // 'year', 'region', 'popularity', ...
    type: string; // album', 'single', 'compilation', ...
    itemList: ItemListProps[];
}

export default function Home(props: Props) {
    return (
    <div id="home">
        <CustomHead/>
        <main>
        {props.itemList.length === 0 ? (
            <p>There are no contents...</p>
        ) :
        <div>
            <div className={styles.main}>
                <div className={styles.mainInner}>
                    <h1 className={styles.title}>Alversary</h1>
                    <div>
                    {props.itemList.map((item, index) => {
                        return (
                        <div>
                            <p className={styles.subTitle}>
                                {item.description}
                            </p>
                            <div className={styles.albumsArea}>
                                <ul className={styles.yearList}>
                                    {item.itemList.map((item, index) => {
                                        return (
                                            <ItemList
                                                key={index}
                                                heading={item.heading}
                                                itemList={item.itemList}
                                            />
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                        )
                    })}
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
    // let albumsClassifiedByYear: ItemListProps[] = [];
    let albumsClassifiedByYear: ClassifiedItem = {
        title : 'year',
        description: 'no albums released on this date!!',
        classification: 'year',
        type: 'album',
        itemList: [],
    }

    if (albums.length) {
        albumsClassifiedByYear.description = 'These albums were released on this date!!'
        // @TODO: anyやめる
        albums.forEach((album: any) => {
            let releasedYear: string = album.release_date.substr(0, 4);

            if (!albumsClassifiedByYear.itemList.find((val) => val.heading === releasedYear)) {
                albumsClassifiedByYear.itemList.push({
                    heading: releasedYear,
                    itemList: [],
                });
            };

            const targetObj = albumsClassifiedByYear.itemList.find(
                (val) => val.heading === releasedYear
            );
            targetObj?.itemList.push(album);
        });
    };
    
    sortInDescendingOrder(albumsClassifiedByYear.itemList);

    let result = [albumsClassifiedByYear]

    return {
        props: {
            result,
        },
    };
};

const sortInDescendingOrder = (albums: ItemListProps[]): void => {
    albums.sort((
        a, b: ItemListProps,
    ) => {
        if (a.heading > b.heading) {
            return -1;
        }
        if (a.heading < b.heading) {
            return 1;
        }
        return 0;
    })
};