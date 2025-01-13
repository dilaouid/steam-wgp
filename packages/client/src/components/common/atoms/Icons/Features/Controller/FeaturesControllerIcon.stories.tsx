import type { Meta, StoryObj } from '@storybook/react';

import { FeaturesControllerIcon as Icon } from './FeaturesControllerIcon';

const meta: Meta<typeof Icon> = {
  title: 'Common/Atoms/Icons/Features',
  component: Icon,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Controller: Story = {};