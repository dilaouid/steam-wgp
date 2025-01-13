import type { Meta, StoryObj } from '@storybook/react';

import { RocketIcon as Icon } from './RocketIcon';

const meta: Meta<typeof Icon> = {
  title: 'Common/Atoms/Icons/HowTo',
  component: Icon,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Rocket: Story = {};