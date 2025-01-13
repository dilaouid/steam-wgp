import type { Meta, StoryObj } from '@storybook/react';

import { HaventTheGame as Comp } from './HaventTheGame';

const meta: Meta<typeof Comp> = {
  title: 'Features/Steamder/Organisms/Result',
  component: Comp,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const HaventTheGame: Story = {};