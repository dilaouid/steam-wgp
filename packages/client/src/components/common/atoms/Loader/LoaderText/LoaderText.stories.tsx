import type { Meta, StoryObj } from '@storybook/react';

import { LoaderText } from './LoaderText';

const meta: Meta<typeof LoaderText> = {
  title: 'Common/Atoms/Loader/Paragraph',
  component: LoaderText,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof LoaderText>;

export const Paragraph: Story = {};