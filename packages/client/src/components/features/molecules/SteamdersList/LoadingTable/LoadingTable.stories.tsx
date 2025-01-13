import type { Meta, StoryObj } from '@storybook/react';

import { LoadingTable as Comp } from './LoadingTable';

const meta: Meta<typeof Comp> = {
  title: 'Features/SteamdersList/Molecules',
  component: Comp,
  parameters: {
    layout: 'fullwidth',
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const LoadingTable: Story = {};