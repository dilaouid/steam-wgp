import type { Meta, StoryObj } from '@storybook/react';

import { ProfilPicture } from './ProfilPicture';

const meta: Meta<typeof ProfilPicture> = {
  title: 'Features/Steamder/Atoms/ProfilePicture',
  component: ProfilPicture,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    isOtherPlayer: false,
    disable: false,
    player: {
        avatar_hash: "e845df84cbc6129696ec1d96282aa7413597bc18",
        profileurl: "https://steamcommunity.com/id/yedine/",
        username: "yedine",
        player_id: "76561198064768200",
        games: []
    }
  }
};

export default meta;
type Story = StoryObj<typeof ProfilPicture>;

export const ProfilePictureDisabled: Story = {
    args: {
        disable: true
    }
};

export const ProfilePictureEnabled: Story = {
    args: {
        disable: false
    }
};