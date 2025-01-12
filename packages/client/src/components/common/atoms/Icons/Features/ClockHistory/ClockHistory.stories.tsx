import type { Meta, StoryObj } from '@storybook/react';

import { ClockHistoryIcon } from './ClockHistory';

const meta: Meta<typeof ClockHistoryIcon> = {
  title: 'Common/Atoms/Icons/Features',
  component: ClockHistoryIcon,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof ClockHistoryIcon>;

export const ClockHistory: Story = {};