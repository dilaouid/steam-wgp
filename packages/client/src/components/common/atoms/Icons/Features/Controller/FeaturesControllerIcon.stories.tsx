import type { Meta, StoryObj } from '@storybook/react';

import { FeaturesControllerIcon } from './FeaturesControllerIcon';

const meta: Meta<typeof FeaturesControllerIcon> = {
  title: 'Common/Atoms/Icons/Features',
  component: FeaturesControllerIcon,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof FeaturesControllerIcon>;

export const Controller: Story = {};