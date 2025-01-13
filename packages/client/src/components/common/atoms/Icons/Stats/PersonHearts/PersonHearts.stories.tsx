import type { Meta, StoryObj } from '@storybook/react';

import { PersonHeartsIcon } from './PersonHearts';

const meta: Meta<typeof PersonHeartsIcon> = {
  title: 'Common/Atoms/Icons/Stats',
  component: PersonHeartsIcon,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof PersonHeartsIcon>;

export const PersonHearts: Story = {};