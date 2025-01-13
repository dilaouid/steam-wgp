import type { Meta, StoryObj } from '@storybook/react';

import { NavItem } from './NavItem';

const meta: Meta<typeof NavItem> = {
  title: 'Common/Atoms/Navbar/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: "Lien de navbar",
    flashy: false,
    to: '/home'
  }
};

export default meta;
type Story = StoryObj<typeof NavItem>;

export const FlashyNavItemExample: Story = {
  args: {
    flashy: true
  }
};

export const DefaultNavItemExample: Story = {
  args: {
    flashy: false
  }
};