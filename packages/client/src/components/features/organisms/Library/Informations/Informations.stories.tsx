import type { Meta, StoryObj } from '@storybook/react';

import { Informations as Comp } from './Informations';

const meta: Meta<typeof Comp> = {
  title: 'Features/Library/Organisms',
  component: Comp,
  parameters: {
    layout: 'fullwidth',
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
        type: 'select',
        options: ['public', 'private']
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const Informations: Story = {};