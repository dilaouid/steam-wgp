import type { Meta, StoryObj } from '@storybook/react';

import { GameRow } from './GameRow';

const meta: Meta<typeof GameRow> = {
  title: 'Features/Steamder/Organisms/GameRow',
  component: GameRow,
  parameters: {
    layout: 'centered',
    zustand: {
      steamderStore: {
        steamder: {
          id: 'ac2e8e2d-3f7c-4c5e-8d6b-1c4b2c3b8c6d',
          name: 'Steamder Name',

          admin_id: '7823654',
          all_games: [10, 20, 30, 40, 50, 60, 70, 80, 240, 300, 320, 360],
          common_games: [10, 20, 30, 40, 50, 60, 70, 80, 240, 300, 320, 360],
          swiped_games: [10, 320, 360],
          choosed_game: 320,

          display_all_games: true,
          private: false,
          started: false,

          complete: false,
          endTime: Date.now() + 600000,

          created_at: new Date(),
          updated_at: new Date()
        }
      },
    }
  }
};

export default meta;
type Story = StoryObj<typeof GameRow>;

export const GameRowExample: Story = {};