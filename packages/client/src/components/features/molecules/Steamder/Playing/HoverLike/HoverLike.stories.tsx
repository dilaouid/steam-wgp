import type { Meta, StoryObj } from '@storybook/react';

import { HoverLike as Comp } from './HoverLike';

const meta: Meta<typeof Comp> = {
  title: 'Features/Steamder/Molecules/Playing',
  component: Comp,
  parameters: {
    layout: 'centered',
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const HoverLike: Story = {};