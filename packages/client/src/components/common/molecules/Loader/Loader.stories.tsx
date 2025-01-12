import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'Common/Molecules/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
  }
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const LoaderExample: Story = {};