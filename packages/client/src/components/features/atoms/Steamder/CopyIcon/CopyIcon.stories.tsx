import type { Meta, StoryObj } from '@storybook/react';

import { CopyIcon } from './CopyIcon';

const meta: Meta<typeof CopyIcon> = {
  title: 'Features/Steamder/Atoms/CopyIcon',
  component: CopyIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    steamderId: '1234567890'
  }
};

export default meta;
type Story = StoryObj<typeof CopyIcon>;

export const CopyIconExample: Story = {
  args: {
    steamderId: "1234567890dsqdqs"
  }
};