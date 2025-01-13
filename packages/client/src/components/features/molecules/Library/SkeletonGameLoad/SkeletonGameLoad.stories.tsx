import type { Meta, StoryObj } from '@storybook/react';

import { SkeletonGameLoad as Comp } from './SkeletonGameLoad';

const meta: Meta<typeof Comp> = {
  title: 'Features/Library/Molecules',
  component: Comp,
  parameters: {
    layout: 'fullwidth',
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const SkeletonLoad: Story = {};