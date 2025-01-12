import type { Meta, StoryObj } from '@storybook/react';

import { GameCover } from './GameCover';

const meta: Meta<typeof GameCover> = {
  title: 'Features/Library/Atoms/GameCover',
  component: GameCover,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    game_id: '2021210',
    hidden: false
  },
};

export default meta;
type Story = StoryObj<typeof GameCover>;

export const PublicGame: Story = {
  args: {
    game_id: "10"
  }
};

export const PrivateGame: Story = {
  args: {
    hidden: true,
    game_id: '2021210'
  },
};