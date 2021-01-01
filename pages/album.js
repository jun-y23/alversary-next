

export default function Albums({ albums }) {
    console.log(albums.albums.images);
    return (
      <div>
        <h1>Albums Released on this day</h1>
        <ul>
          {albums.albums.map((album) => (
            <li key={album._id}>
                <a href={album.uri}><img src={album.images[2].url}></img></a>
                <h2>{album.artist}</h2>
                <h3>{album.name}</h3>
            </li>
          ))}
        </ul>
      </div>
    );
}

export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/api/albums");
    const albums = await res.json();

    return {
        props: {
            albums: albums,
        },
    };
}
