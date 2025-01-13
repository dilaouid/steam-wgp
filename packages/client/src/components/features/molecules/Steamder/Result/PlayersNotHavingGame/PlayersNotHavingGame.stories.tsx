import type { Meta, StoryObj } from '@storybook/react';

import { PlayersNotHavingGame as Comp } from './PlayersNotHavingGame';

const meta: Meta<typeof Comp> = {
  title: "Features/Steamder/Molecules/Result",
  component: Comp,
  parameters: {
    layout: "fullwidth"
  },
  args: {
    playersWithoutGame: [
        {
            player_id: '76561198065059816',
            username: 'yedine',
            avatar_hash: 'e845df84cbc6129696ec1d96282aa7413597bc18',
            profileurl: 'https://steamcommunity.com/id/yedine/',
            games: [10, 20]
        },
        {
            player_id: '76561198086333519',
            username: 'kilo',
            avatar_hash: '9f2736a2dd3a5fdd07132eef1c4150d85a121980',
            profileurl: 'https://steamcommunity.com/id/Kiloutre/',
            games: [10, 20]
        },
    ]
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const PlayersNotHavingGame: Story = {};