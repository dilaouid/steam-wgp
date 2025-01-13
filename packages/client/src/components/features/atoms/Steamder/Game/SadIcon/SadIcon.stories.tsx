import type { Meta, StoryObj } from '@storybook/react';

import { SadIcon as Comp } from './SadIcon';

const meta: Meta<typeof Comp> = {
  title: 'Features/Steamder/Atoms/Game',
  component: Comp,
  parameters: {
    layout: 'centered',
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const SadIcon: Story = {};