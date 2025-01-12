import type { Meta, StoryObj } from '@storybook/react';

import { PersonWorkspaceIcon } from './PersonWorkspace';

const meta: Meta<typeof PersonWorkspaceIcon> = {
  title: 'Common/Atoms/Icons/Stats',
  component: PersonWorkspaceIcon,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof PersonWorkspaceIcon>;

export const PersonWorkspace: Story = {};