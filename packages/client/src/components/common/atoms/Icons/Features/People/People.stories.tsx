import type { Meta, StoryObj } from '@storybook/react';

import { People as Icon } from './People';

const meta: Meta<typeof Icon> = {
  title: 'Common/Atoms/Icons/Features',
  component: Icon,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const People: Story = {};