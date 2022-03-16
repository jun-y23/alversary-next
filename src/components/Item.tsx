import { ObjectId } from 'mongodb';
import styles from '../../styles/AlbumList.module.scss';
import Image from 'next/image';

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
          src={album.images[1].url}
          className={styles.img}
          alt={album.name}></Image>
      </a>
      <p className={styles.albumName}>{album.name}</p>
      <p className={styles.albumArtist}>{album.artist}</p>
    </li>
  );
};
