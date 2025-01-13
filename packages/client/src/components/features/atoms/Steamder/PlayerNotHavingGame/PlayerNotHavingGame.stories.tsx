import type { Meta, StoryObj } from '@storybook/react';

import { PlayerNotHavingGame as Comp } from './PlayerNotHavingGame';

const meta: Meta<typeof Comp> = {
  title: 'Features/Steamder/Atoms/PlayerNotHavingGame',
  component: Comp,
  parameters: {
    layout: 'centered',
  },
  args: {
    player: {
        avatar_hash: "e845df84cbc6129696ec1d96282aa7413597bc18",
        profileurl: "https://steamcommunity.com/id/yedine/",
        username: "yedine",
        player_id: "76561198064768200",
        games: []
    }
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const PlayerNotHavingGame: Story = {};