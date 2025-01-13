import type { Meta, StoryObj } from '@storybook/react';

import { FeaturesImage as Comp } from './FeaturesImage';

const meta: Meta<typeof Comp> = {
  title: 'Features/Homepage/Atoms/FeaturesImage',
  component: Comp,
  parameters: {
    layout: 'centered',
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const FeaturesImage: Story = {};