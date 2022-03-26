import { ObjectId } from 'mongodb';
import Image from 'next/image';
import styled from 'styled-components';
import styles from '../../styles/AlbumList.module.scss';

const ArtistName = styled.p`
  margin: {
    top: 2px;
    right: 0;
    left: 0;
    bottom: 0;
  }
`;

const Title = styled.p`
  margin: {
    top: 2px;
    right: 0;
    left: 0;
    bottom: 0;
  }
`;

const Overlay = styled.div`
  background-color: black;
  width: 100%;
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OverlayMsg = styled.p`
  color: aliceblue;
  text-align: center;
`;
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
        <div className={styles.imageContainer}>
          <Overlay>
            <OverlayMsg>
              OPEN
              <br />
              SPOTIFY
            </OverlayMsg>
          </Overlay>
          <Image
            alt={album.name}
            src={album.images[1].url}
            layout='intrinsic'
            className={styles.img}
            width='200'
            height='200'
          />
        </div>
      </a>
      <Title>{album.name}</Title>
      <ArtistName>{album.artist}</ArtistName>
    </li>
  );
};
