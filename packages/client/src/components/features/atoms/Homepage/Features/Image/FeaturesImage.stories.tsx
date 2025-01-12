import type { Meta, StoryObj } from '@storybook/react';

import { FeaturesImage } from './FeaturesImage';

const meta: Meta<typeof FeaturesImage> = {
  title: 'Features/Homepage/Atoms/FeaturesImage',
  component: FeaturesImage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  }
};

export default meta;
type Story = StoryObj<typeof FeaturesImage>;

export const DefaultFeaturesImage: Story = {};