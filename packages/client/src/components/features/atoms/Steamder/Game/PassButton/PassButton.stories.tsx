import type { Meta, StoryObj } from '@storybook/react';

import { PassButton as Comp } from './PassButton';

const meta: Meta<typeof Comp> = {
  title: 'Features/Steamder/Atoms/Game',
  component: Comp,
  parameters: {
    layout: 'centered',
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const PassButton: Story = {};