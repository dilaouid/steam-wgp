import type { Meta, StoryObj } from '@storybook/react';

import { People } from './People';

const meta: Meta<typeof People> = {
  title: 'Common/Atoms/Icons/Features',
  component: People,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof People>;

export const PeopleIcon: Story = {};