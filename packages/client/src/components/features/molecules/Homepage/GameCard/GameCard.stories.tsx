import type { Meta, StoryObj } from '@storybook/react';

import { GameCard } from './GameCard';

const meta: Meta<typeof GameCard> = {
  title: 'Features/Steamder/Molecules/GameCard',
  component: GameCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    color: "gold",
    score: {
        game_id: 1072420,
        score: 0.5
    },
    size: "large"
  }
};

export default meta;
type Story = StoryObj<typeof GameCard>;

export const GameCardGold: Story = {
  args: {
    score: {
      "game_id": 1072420,
      "score": 50
    },
    color: "gold"
  }
};

export const GameCardSilver: Story = {
  args: {
    score: {
      "game_id": 1072420,
      "score": 25
    },
    color: "silver",
    size: "small"
  }
};

export const GameCardBronze: Story = {
    args: {
        score: {
            "game_id": 1072420,
            "score": 5
        },
        color: "#cd7f32",
        size: "small"
    },
};