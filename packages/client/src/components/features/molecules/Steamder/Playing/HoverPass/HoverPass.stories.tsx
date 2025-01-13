import type { Meta, StoryObj } from '@storybook/react';

import { HoverPass as Comp } from './HoverPass';

const meta: Meta<typeof Comp> = {
  title: 'Features/Steamder/Molecules/Playing',
  component: Comp,
  parameters: {
    layout: 'centered',
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const HoverPass: Story = {};