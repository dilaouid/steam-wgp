import type { Meta, StoryObj } from '@storybook/react';

import { AllGamesSwitch as Form } from './AllGamesSwitch';

const meta: Meta<typeof Form> = {
  title: 'Features/Steamder/Molecules/WaitingList',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  args: {
    active: true
  }
};

export default meta;
type Story = StoryObj<typeof Form>;

export const AllGamesSwitch: Story = {};