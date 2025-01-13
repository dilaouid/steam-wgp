import type { Meta, StoryObj } from '@storybook/react';

import { UnjoinableButton as Comp } from './UnjoinableButton';

const meta: Meta<typeof Comp> = {
  title: 'Features/SteamdersList/Molecules',
  component: Comp,
  parameters: {
    layout: 'centered',
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const UnjoinableButton: Story = {};