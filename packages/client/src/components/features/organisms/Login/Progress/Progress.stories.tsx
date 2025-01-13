import type { Meta, StoryObj } from '@storybook/react';

import { ProgressLogin as Comp } from './Progress';

const meta: Meta<typeof Comp> = {
  title: "Features/Login/Organisms",
  component: Comp,
  parameters: {
    layout: "fullwidth"
  },
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const Progress: Story = {};