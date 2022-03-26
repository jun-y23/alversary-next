import styled from 'styled-components';
import styles from '../../styles/AlbumList.module.scss';
import { Item, ItemProps } from './Item';
// 他の分類の仕方を考慮するならもう一個上で持ってたほうがいいな。いろんな分類をpropsとして渡す。
export interface ItemListProps {
  heading: string;
  itemList: ItemProps[];
}

const ListItem = styled.li`
  margin-bottom: 15px;
`;
const ItemHeading = styled.p``;

export const ItemList = (props: ItemListProps) => {
  return (
    <ListItem>
      <ItemHeading>{props.heading}</ItemHeading>
      <ul className={styles.albumListAlbums}>
        {props.itemList.map((item) => (
          <Item
            key={item._id.toString()}
            name={item.name}
            artist={item.artist}
            release_date={item.release_date}
            uri={item.uri}
            images={item.images}
            _id={item._id}
          />
        ))}
      </ul>
    </ListItem>
  );
};
