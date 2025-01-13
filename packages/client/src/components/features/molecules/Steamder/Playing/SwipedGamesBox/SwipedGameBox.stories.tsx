import type { Meta, StoryObj } from '@storybook/react';

import { SwipedGamesBox as Comp } from './SwipedGamesBox';

const meta: Meta<typeof Comp> = {
  title: 'Features/Steamder/Molecules/Playing',
  component: Comp,
  parameters: {
    layout: 'centered',
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const SwipedGamesBox: Story = {};