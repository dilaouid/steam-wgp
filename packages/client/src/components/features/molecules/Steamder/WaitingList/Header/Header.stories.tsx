import type { Meta, StoryObj } from '@storybook/react';

import { Header as Comp } from './Header';

const meta: Meta<typeof Comp> = {
  title: 'Features/Steamder/Molecules/WaitingList',
  component: Comp,
  parameters: {
    layout: 'centered',
    zustand: {
        steamderStore: {
            id: "65cuf89-4f5d-4f5d-4f5d-4f5d",
            name: "Steamder Storybook"
        }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const Header: Story = {};