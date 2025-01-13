import type { Meta, StoryObj } from '@storybook/react';

import { GameContainer as Comp } from './GameContainer';

const meta: Meta<typeof Comp> = {
  title: 'Features/Library/Molecules/GameContainer',
  component: Comp,
  parameters: {
    layout: 'centered',
  },
  args: {
    game_id: "1072420",
    hidden: false
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const GameContainerPublic: Story = {
    args: {
      hidden: false
    }
};

export const GameContainerHidden: Story = {
  args: {
    hidden: true
  }
};