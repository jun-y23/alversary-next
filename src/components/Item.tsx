import { ObjectId } from 'mongodb';
import Image from 'next/image';
import styled from 'styled-components';

const ItemListStyle = styled.li`
  @media screen and (max-width: 480px) {
    height: 100%;
    flex: 0 0 40%;
    margin: 0px 5px;
    scroll-snap-align: center;
  }
`;
const ArtistName = styled.p`
  margin: 2px 0 0;
  color: #ffcccc;
`;

const Title = styled.p`
  margin: 2px 0 0;
  color: #fafafa;
`;

const ImageContainer = styled.div`
  position: relative;
  &:hover {
    .overlay {
      opacity: 0.8;
      transition: 0.3s;
    }
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
    <ItemListStyle>
      <a href={album.uri} target='_blank' rel='noreferrer'>
        <ImageContainer>
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
            width='200'
            height='200'
          />
        </ImageContainer>
      </a>
      <Title>{album.name}</Title>
      <ArtistName>{album.artist}</ArtistName>
    </ItemListStyle>
  );
};
