import type { Meta, StoryObj } from '@storybook/react';

import { GameImage } from './GameImage';

const meta: Meta<typeof GameImage> = {
  title: 'Atoms/Homepage/GameImage',
  component: GameImage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    game_id: 2021210,
    golden: false,
  },
};

export default meta;
type Story = StoryObj<typeof GameImage>;

export const DefaultGameImage: Story = {};

export const GoldenGameImage: Story = {
  args: {
    golden: true,
  },
};

export const SkeletonPlaceholder: Story = {
  args: {
    game_id: 0,
  },
};