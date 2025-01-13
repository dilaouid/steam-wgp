import type { Meta, StoryObj } from '@storybook/react';

import { HowTo } from './HowTo';

const meta: Meta<typeof HowTo> = {
  title: 'Features/Homepage/Organisms/Tutorial',
  component: HowTo,
  parameters: {
    layout: 'fullwidth'
  }
};

export default meta;
type Story = StoryObj<typeof HowTo>;

export const Tutorial: Story = {};