import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import axios from 'axios';
import { ObjectId } from 'mongodb';
import { Item, ItemProps } from '../src/components/Item';

describe('Render', () => {
  let props: ItemProps;
  props = {
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
  };

  it('successfuly gets image data', async () => {
    const response = await axios.get(props.images[0].url);
    expect(response.status).toBe(200);
  });
});
