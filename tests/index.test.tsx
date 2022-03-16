import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Home from '../src/pages/index';
import { Props } from '../src/pages/index';
import { ObjectId } from "mongodb";

describe('Rendering', () => {
	let dummyProps: Props;
	beforeEach(() => {
		dummyProps = {
			itemList: [
				{
				title: 'Albums',
				description: 'dummy description',
				classification:'year',
				type: 'album',
				itemList: [
					{
						heading: '2000',
						itemList: [
							{
								_id: new ObjectId(1),
								name: '',
								artist: '',
								release_date: '',
								uri: '',
								images: [
									{
										height: 100,
										width: 100,
										url: '',
									},
									{
										height: 100,
										width: 100,
										url: '',
									},
									{
										height: 100,
										width: 100,
										url: '',
									},
								]
							}
						],
					}
				],
			}
		]};
	});

	it('It should render', () => {
		render(<Home {...dummyProps} />)
		expect(screen.getByText(dummyProps.itemList[0].description)).toBeInTheDocument();
	})
})