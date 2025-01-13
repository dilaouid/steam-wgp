import type { Meta, StoryObj } from '@storybook/react';

import { HowToControllerIcon as Icon } from './HowToControllerIcon';

const meta: Meta<typeof Icon> = {
  title: 'Common/Atoms/Icons/HowTo',
  component: Icon,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Controller: Story = {};