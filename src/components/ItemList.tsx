import styled from 'styled-components';
import { Item, ItemProps } from './Item';
// 他の分類の仕方を考慮するならもう一個上で持ってたほうがいいな。いろんな分類をpropsとして渡す。
export interface ItemListProps {
  heading: string;
  itemList: ItemProps[];
}

const ListItem = styled.li`
  margin-bottom: 15px;
`;

const ItemHeading = styled.p`
  font-size: 1.6rem;
  margin-top: 0;
  margin-bottom: 8px;
  color: #fafafa;
`;

const ItemListStyle = styled.ul`
  padding-left: 0;
  display: grid;
  grid-auto-rows: 1fr;
  grid-gap: 19px;
  @media screen and (max-width: 480px) {
    display: flex;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    padding: 0 0 1em;
    scroll-behavior: smooth;
    .item {
      height: 100%;
      flex: 0 0 40%;
      margin: 0px 5px;
      scroll-snap-align: center;
    }
  }
  @media screen and (min-width: 480px) {
    grid-template-columns: repeat(auto-fill, 123px);
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, 197px);
  }
`;

export const ItemList = (props: ItemListProps) => {
  return (
    <ListItem>
      <ItemHeading>{props.heading}</ItemHeading>
      <ItemListStyle>
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
      </ItemListStyle>
    </ListItem>
  );
};
