import type { Meta, StoryObj } from '@storybook/react';

import { SubmitButton as Comp } from './SubmitButton';

const meta: Meta<typeof Comp> = {
  title: 'Features/SteamdersList/Atoms',
  component: Comp,
  parameters: {
    layout: 'centered',
  },
  args: {
    name: "Steamder"
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const SubmitButton: Story = {};