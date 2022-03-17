import { ObjectId } from 'mongodb';
import Image from 'next/image';
import styles from '../../styles/AlbumList.module.scss';

export interface ItemProps {
  _id: ObjectId;
  name: string;
  artist: string;
  release_date: string;
  uri: string;
  images: [Image, Image, Image];
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export const Item = (album: ItemProps) => {
  return (
    <li className={styles.item}>
      <a href={album.uri} target='_blank' rel='noreferrer'>
        <Image
          alt={album.name}
          src={album.images[1].url}
          width={album.images[1].width}
          height={album.images[1].height}
          className={styles.img}
        />
      </a>
      <p className={styles.albumName}>{album.name}</p>
      <p className={styles.albumArtist}>{album.artist}</p>
    </li>
  );
};
