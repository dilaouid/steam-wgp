import type { Meta, StoryObj } from '@storybook/react';

import { FeaturesHome } from './FeaturesHome';

const meta: Meta<typeof FeaturesHome> = {
  title: 'Features/Homepage/Organisms/Features',
  component: FeaturesHome,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof FeaturesHome>;

export const Features: Story = {};