import type { Meta, StoryObj } from '@storybook/react';

import { InformationsLogin as Comp } from './InformationsLogin';

const meta: Meta<typeof Comp> = {
  title: "Features/Login/Organisms",
  component: Comp,
  parameters: {
    layout: "fullwidth"
  },
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const InformationsLogin: Story = {};