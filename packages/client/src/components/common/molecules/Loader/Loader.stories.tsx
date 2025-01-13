import type { Meta, StoryObj } from '@storybook/react';

import { Loader as Comp } from './Loader';

const meta: Meta<typeof Comp> = {
  title: 'Common/Molecules/Loader',
  component: Comp,
  parameters: {
    layout: 'centered',
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const Loader: Story = {};