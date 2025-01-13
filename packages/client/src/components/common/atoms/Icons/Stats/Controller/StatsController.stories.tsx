import type { Meta, StoryObj } from '@storybook/react';

import { StatsControllerIcon as Icon } from './StatsController';

const meta: Meta<typeof Icon> = {
  title: 'Common/Atoms/Icons/Stats',
  component: Icon,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Controller: Story = {};