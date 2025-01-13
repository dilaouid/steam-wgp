import type { Meta, StoryObj } from '@storybook/react';

import { SteamIcon as Icon } from './SteamIcon';

const meta: Meta<typeof Icon> = {
  title: 'Common/Atoms/Icons/HowTo',
  component: Icon,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Steam: Story = {};