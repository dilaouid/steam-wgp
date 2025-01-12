import type { Meta, StoryObj } from '@storybook/react';

import { NavBrand } from './Brand';

const meta: Meta<typeof NavBrand> = {
  title: 'Common/Atoms/Navbar',
  component: NavBrand,
  parameters: {
    layout: 'centered',
  }
};

export default meta;
type Story = StoryObj<typeof NavBrand>;

export const NavBrandExample: Story = {};