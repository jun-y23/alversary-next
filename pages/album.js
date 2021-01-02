import styles from '../styles/Album.module.css';

export default function Albums({ albums }) {
    return (
      <div>
        <h1>Albums Released on this day</h1>
        {/*  forでkeyとvalue: arrayコンポーネントに渡しながらながらぶん回してレンダリング  */}
        <div className={styles.albums}>
           {/* {
            years.map((year) => (
            // <div key={album._id} className="item">
            //     <a href={album.uri} target="_blank">
            //         <img src={album.images[0].url} style={{width: "150px"}}></img>
            //     </a>
            //     <p>{album.artist}</p>
            //     <p>{album.name}</p>
            // </div>
           <p>{year}</p>
          ))
          } */}
            {Object.keys(albums).map(function(keyName, keyIndex) {
    		return (
      			<li key={keyName}>
					{keyName}
                    {console.log(albums[keyName])}
          		</li>
    		)
		})}
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
