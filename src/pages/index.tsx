import "./_app";
import { Analytics } from "@vercel/analytics/react";
import styled from "styled-components";
import { CustomHead } from "../components/CustomHead";
import { ItemList, ItemListProps } from "../components/ItemList";

const Header = styled.header`
  padding: 20px 0 10px;
  display: flex;
  justify-content: center;
`;

const HeaderTitle = styled.h1`
  font-size: 3rem;
  color: #fafafa;
  margin: 0;
`;

const MainContainer = styled.main`
  width: 90%;
  margin: 0 auto;
  padding-top: 15px;
`;

const SubTitle = styled.p`
  text-align: center;
  color: #fafafa;
  margin: 4px 0 0;

  @media screen and (min-width: 768px) {
    font-size: 1.4rem;
  }
`;

const YearList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
`;

// 今は年代ごとのやつしか対応してないからもう一つ抽象化した方がいい設計。多次元配列にした方がいいかんも。[AlbumsClassifiedByYear, AlbumsClassifiedByPopularity...]
export interface Props {
	itemList: ClassifiedItem[];
}

interface ClassifiedItem {
	title: string; // 'Albums', 'Singles', ...
	description: string;
	classification: string; // 'year', 'region', 'popularity', ...
	type: string; // album', 'single', 'compilation', ...
	itemList: ItemListProps[];
}

export default function Home(props: Props) {
	return (
		<div id="home">
			<CustomHead />
			<Header>
				<HeaderTitle>Alversary</HeaderTitle>
			</Header>
			<MainContainer>
				{props.itemList.length === 0 ? (
					<p>There are no contents...</p>
				) : (
					<div>
						{props.itemList.map((item, index) => {
							return (
								<div key={index.toString()}>
									<div>
										<SubTitle>{item.description}</SubTitle>
										<YearList>
											{item.itemList.map((item, index) => {
												return (
													<ItemList
														key={index}
														heading={item.heading}
														itemList={item.itemList}
													/>
												);
											})}
										</YearList>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</MainContainer>
			<Analytics />
		</div>
	);
}

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
			Accept: "application/json",
			"Content-Type": "application/json;charset=utf-8",
			"X-API-Key": apiKey,
		},
	});
	const albums: {}[] = await res.json();

	// const albums: {}[] = [];
	// const mock = {
	//   _id: { $oid: '5fee6e56418ef8e2dd61ed06' },
	//   images: [
	//     {
	//       height: 640,
	//       url: 'https://i.scdn.co/image/ab67616d0000b273203c89bd4391468eea4cc3f5',
	//       width: 640,
	//     },
	//     {
	//       height: 300,
	//       url: 'https://i.scdn.co/image/ab67616d00001e02203c89bd4391468eea4cc3f5',
	//       width: 300,
	//     },
	//     {
	//       height: 64,
	//       url: 'https://i.scdn.co/image/ab67616d00004851203c89bd4391468eea4cc3f5',
	//       width: 64,
	//     },
	//   ],
	//   name: '17',
	//   artist: 'XXXTENTACION',
	//   release_date: '2017-08-25',
	//   uri: 'https://open.spotify.com/album/5VdyJkLe3yvOs0l4xXbWp0',
	// };
	// albums.push(mock);

	// リリース年ごとに分割 [{'releasedYear':'2000','albums': []},]
	// let albumsClassifiedByYear: ItemListProps[] = [];
	let albumsClassifiedByYear: ClassifiedItem = {
		title: "year",
		description: "no albums released on this date!!",
		classification: "year",
		type: "album",
		itemList: [],
	};

	if (albums.length > 0) {
		albumsClassifiedByYear.description =
			"These albums were released on this date!!";
		// @TODO: anyやめる
		albums.forEach((album: any) => {
			let releasedYear: string = album.release_date.substr(0, 4);

			if (
				!albumsClassifiedByYear.itemList.find(
					(val) => val.heading === releasedYear,
				)
			) {
				albumsClassifiedByYear.itemList.push({
					heading: releasedYear,
					itemList: [],
				});
			}

			const targetObj = albumsClassifiedByYear.itemList.find(
				(val) => val.heading === releasedYear,
			);
			targetObj?.itemList.push(album);
		});
	}

	sortInDescendingOrder(albumsClassifiedByYear.itemList);

	let staticProps: Props = {
		itemList: [],
	};
	staticProps.itemList.push(albumsClassifiedByYear);

	return {
		props: staticProps,
	};
}

const sortInDescendingOrder = (albums: ItemListProps[]): void => {
	albums.sort((a, b: ItemListProps) => {
		if (a.heading > b.heading) {
			return -1;
		}
		if (a.heading < b.heading) {
			return 1;
		}
		return 0;
	});
};
