import type { Meta, StoryObj } from '@storybook/react';

import { RoomActions as Comp } from './Actions';

const meta: Meta<typeof Comp> = {
  title: 'Features/Steamder/Molecules/WaitingList',
  component: Comp,
  parameters: {
    layout: 'fullwidth',
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const Actions: Story = {};