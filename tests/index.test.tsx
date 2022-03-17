import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Home from '../src/pages/index';
import { Props } from '../src/pages/index';
import { ObjectId } from 'mongodb';

describe('Rendering', () => {
  let dummyProps: Props;
  beforeEach(() => {
    dummyProps = {
      itemList: [
        {
          title: 'Albums',
          description: 'dummy description',
          classification: 'year',
          type: 'album',
          itemList: [
            {
              heading: '2000',
              itemList: [
                {
                  _id: ObjectId('5fee6e56418ef8e2dd61ed06'),
                  images: [
                    {
                      height: 640,
                      url: 'https://i.scdn.co/image/ab67616d0000b273203c89bd4391468eea4cc3f5',
                      width: 640,
                    },
                    {
                      height: 300,
                      url: 'https://i.scdn.co/image/ab67616d00001e02203c89bd4391468eea4cc3f5',
                      width: 300,
                    },
                    {
                      height: 64,
                      url: 'https://i.scdn.co/image/ab67616d00004851203c89bd4391468eea4cc3f5',
                      width: 64,
                    },
                  ],
                  name: '17',
                  artist: 'XXXTENTACION',
                  release_date: '2017-08-25',
                  uri: 'https://open.spotify.com/album/5VdyJkLe3yvOs0l4xXbWp0',
                },
              ],
            },
          ],
        },
      ],
    };
  });

  it('It should render', () => {
    render(<Home {...dummyProps} />);
    expect(
      screen.getByText(dummyProps.itemList[0].description)
    ).toBeInTheDocument();
  });
});
