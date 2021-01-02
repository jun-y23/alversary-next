import styles from '../styles/Album.module.css';
import RenderAlbumList from './_albumList'

export default function Albums({ albums }) {
    return (
      <div>
        <h1 className={styles.title}>Albums Released on this day</h1>
        {/*  forでkeyとvalue: arrayコンポーネントに渡しながらながらぶん回してレンダリング  */}
        <div className={styles.albums}>
            {Object.entries(albums).map(([key, value]) => {
                return (
                    <RenderAlbumList year={key} albums={value} />
                )
                })
            }
        </div>
      </div>
    );
}

/**
 * 
 * @export
 * @return {*} 
 */
export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/api/albums");
    const albums = await res.json();

    let obj = {};
    
    // リリース年ごとに分割
    // {'2000': [],'2001': [],}
    albums.albums.forEach(album => {
        let releasedYear = null;
        releasedYear = album.release_date.substr(0,4);
        
        if (!obj.hasOwnProperty(releasedYear)) {
            obj[releasedYear] = [];
            obj[releasedYear].push(album)
        } else {
            obj[releasedYear].push(album)
        }
    });

    return {
        props: {
            albums: obj,
        },
    };
}
