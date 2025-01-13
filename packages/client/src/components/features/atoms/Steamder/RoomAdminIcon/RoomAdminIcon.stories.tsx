import type { Meta, StoryObj } from '@storybook/react';

import { RoomAdminIcon } from './RoomAdminIcon';

const meta: Meta<typeof RoomAdminIcon> = {
  title: 'Features/Steamder/Atoms/RoomAdminIcon',
  component: RoomAdminIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    isOtherPlayer: false
  }
};

export default meta;
type Story = StoryObj<typeof RoomAdminIcon>;

export const RoomAdminIconOtherPlayer: Story = {
    args: {
        isOtherPlayer: true
    }
};

export const RoomAdminIconYou: Story = {
    args: {
        isOtherPlayer: false
    }
};