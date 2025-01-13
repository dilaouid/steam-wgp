import type { Meta, StoryObj } from '@storybook/react';

import { GameRow as Comp } from './GameRow';

const meta: Meta<typeof Comp> = {
  title: 'Features/Steamder/Organisms',
  component: Comp,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const GameRow: Story = {};