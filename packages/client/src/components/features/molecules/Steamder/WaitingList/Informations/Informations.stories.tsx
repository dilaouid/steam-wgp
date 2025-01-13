import type { Meta, StoryObj } from '@storybook/react';

import { Informations as Comp } from './Informations';

const meta: Meta<typeof Comp> = {
  title: 'Features/Steamder/Molecules/WaitingList',
  component: Comp,
  parameters: {
    layout: 'fullwidth',
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const Informations: Story = {};