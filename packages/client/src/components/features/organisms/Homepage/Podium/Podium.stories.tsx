import type { Meta, StoryObj } from '@storybook/react';

import { Podium as Comp } from './Podium';

const meta: Meta<typeof Comp> = {
  title: "Features/Homepage/Organisms",
  component: Comp,
  parameters: {
    layout: "fullwidth"
  },
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const Podium: Story = {};