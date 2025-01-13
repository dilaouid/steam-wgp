import type { Meta, StoryObj } from '@storybook/react';

import { MySteamderButtons as Comp } from './MySteamderButtons';

const meta: Meta<typeof Comp> = {
  title: 'Features/SteamdersList/Molecules',
  component: Comp,
  parameters: {
    layout: 'centered',
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const MySteamderButtons: Story = {};