import type { Meta, StoryObj } from '@storybook/react';

import { SelectedCount as Comp } from './SelectedCount';

const meta: Meta<typeof Comp> = {
  title: 'Features/Library/Atoms',
  component: Comp,
  parameters: {
    layout: 'centered',
  },
  args: {
    count: 0,
    type: 'public'
  },
  argTypes: {
    count: {
      control: {
        type: 'number'
      }
    },
    type: {
      control: {
        type: 'radio',
        options: ['public', 'private']
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const SelectedCount: Story = {};