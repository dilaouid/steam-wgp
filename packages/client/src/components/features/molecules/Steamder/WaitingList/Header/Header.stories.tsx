import type { Meta, StoryObj } from '@storybook/react';

import { Header as Comp } from './Header';

const meta: Meta<typeof Comp> = {
  title: 'Features/Steamder/Molecules/WaitingList',
  component: Comp,
  parameters: {
    layout: 'fullwidth'
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const Header: Story = {};