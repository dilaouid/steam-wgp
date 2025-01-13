import type { Meta, StoryObj } from '@storybook/react';

import { ProgressLabel } from './ProgressLabel';

const meta: Meta<typeof ProgressLabel> = {
  title: 'Common/Atoms/ProgressLabel',
  component: ProgressLabel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    complete: false,
    count: 0,
    last: false,
    message: "load_steam_library",
    type: 'info'
  }
};

export default meta;
type Story = StoryObj<typeof ProgressLabel>;

export const ProgressLabelLoading: Story = {
  args: {
    complete: false,
    last: true,
    message: "load_steam_library",
    count: 1,
    type: 'info'
  }
};

export const ProgressLabelError: Story = {
  args: {
    complete: true,
    last: true,
    message: "game_cannot_add",
    count: 1,
    type: 'danger'
  }
};

export const ProgressLabelSuccess: Story = {
  args: {
    complete: true,
    last: true,
    message: "loading_library_complete",
    count: 1,
    type: "success"
  }
};