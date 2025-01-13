import type { Meta, StoryObj } from '@storybook/react';

import { CreateSteamderForm as Form } from './CreateSteamderForm';

const meta: Meta<typeof Form> = {
  title: 'Features/SteamdersList/Molecules',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  args: {
    color: "gold",
    score: {
        game_id: 1072420,
        score: 0.5
    },
    size: "large"
  }
};

export default meta;
type Story = StoryObj<typeof Form>;

export const CreateSteamderForm: Story = {};