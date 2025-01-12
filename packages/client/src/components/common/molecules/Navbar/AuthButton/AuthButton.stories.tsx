import type { Meta, StoryObj } from '@storybook/react';

import { AuthButton } from './AuthButton';

const meta: Meta<typeof AuthButton> = {
  title: 'Common/Molecules/Navbar/AuthButton',
  component: AuthButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    isAuthenticated: false
  }
};

export default meta;
type Story = StoryObj<typeof AuthButton>;

export const AuthButtonDisconnected: Story = {
  args: {
    isAuthenticated: false
  }
};

export const AuthButtonLogged: Story = {
  args: {
    isAuthenticated: true
  }
};