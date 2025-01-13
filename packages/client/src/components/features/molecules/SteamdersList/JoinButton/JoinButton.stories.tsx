import type { Meta, StoryObj } from '@storybook/react';

import { JoinButton as Comp } from './JoinButton';

const meta: Meta<typeof Comp> = {
  title: 'Features/SteamdersList/Molecules',
  component: Comp,
  parameters: {
    layout: 'centered',
  },
  args: {
    id: "76561198064768200"
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const JoinButton: Story = {};