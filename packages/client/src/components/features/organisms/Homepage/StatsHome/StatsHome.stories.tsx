import type { Meta, StoryObj } from '@storybook/react';

import { StatsHome } from './StatsHome';

const meta: Meta<typeof StatsHome> = {
  title: 'Features/Homepage/Organisms/Stats',
  component: StatsHome,
  parameters: {
    layout: 'fullwidth'
  }
};

export default meta;
type Story = StoryObj<typeof StatsHome>;

export const Stats: Story = {};