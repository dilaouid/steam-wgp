import type { Meta, StoryObj } from '@storybook/react';

import { GameWinRow as Comp } from './GameWinRow';

const meta: Meta<typeof Comp> = {
  title: 'Features/Steamder/Organisms/Result',
  component: Comp,
  parameters: {
    layout: 'centered',
    zustand: {
        steamderStore: {
          steamder: {
            choosed_game: 320
          }
        },
      }
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const GameWinRow: Story = {
  args: {
    printShop: true
  }
};