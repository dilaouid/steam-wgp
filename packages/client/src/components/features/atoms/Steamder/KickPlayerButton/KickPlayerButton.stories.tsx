import type { Meta, StoryObj } from '@storybook/react';

import { KickPlayerButton as Comp } from './KickPlayerButton';

const meta: Meta<typeof Comp> = {
  title: 'Features/Steamder/Atoms/KickPlayerButton',
  component: Comp,
  parameters: {
    layout: 'centered',
  },
  args: {
    playerId: "76561198064768200",
    steamderId: "76561198064768200",
    username: "yedine"
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const KickPlayerButton: Story = {};