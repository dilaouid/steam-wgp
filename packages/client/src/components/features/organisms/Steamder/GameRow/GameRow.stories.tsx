import type { Meta, StoryObj } from '@storybook/react';

import { GameRow } from './GameRow';

const meta: Meta<typeof GameRow> = {
  title: 'Features/Organisms/Steamder/GameRow',
  component: GameRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  }
};

export default meta;
type Story = StoryObj<typeof GameRow>;

export const GameRowExample: Story = {};