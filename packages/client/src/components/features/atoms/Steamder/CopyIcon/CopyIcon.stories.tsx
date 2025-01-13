import type { Meta, StoryObj } from '@storybook/react';

import { CopyIcon as Icon } from './CopyIcon';

const meta: Meta<typeof Icon> = {
  title: 'Features/Steamder/Atoms/CopyIcon',
  component: Icon,
  parameters: {
    layout: 'centered'
  },
  args: {
    steamderId: '1234567890'
  }
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const CopyIcon: Story = {};