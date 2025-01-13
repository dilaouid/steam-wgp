import type { Meta, StoryObj } from '@storybook/react';

import { SteamIconNavbar as Icon } from './Steam';

const meta: Meta<typeof Icon> = {
  title: 'Common/Atoms/Icons/Navbar',
  component: Icon,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Steam: Story = {};