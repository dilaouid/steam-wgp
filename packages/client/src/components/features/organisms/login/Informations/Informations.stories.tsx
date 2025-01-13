import type { Meta, StoryObj } from '@storybook/react';

import { InformationsLogin as Comp } from './Informations';

const meta: Meta<typeof Comp> = {
  title: "Features/Login/Organisms",
  component: Comp,
  parameters: {
    layout: "fullwidth"
  },
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const Informations: Story = {};