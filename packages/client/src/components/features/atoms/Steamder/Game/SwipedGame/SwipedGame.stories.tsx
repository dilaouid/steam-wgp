import type { Meta, StoryObj } from '@storybook/react';

import { SwipedGame as Comp } from './SwipedGame';

const meta: Meta<typeof Comp> = {
  title: 'Features/Steamder/Atoms/Game',
  component: Comp,
  parameters: {
    layout: 'centered',
  },
  args: {
    game_id: 1072420
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const SwipedGame: Story = {};