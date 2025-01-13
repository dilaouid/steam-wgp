import type { Meta, StoryObj } from '@storybook/react';

import { LottieLoader } from './LottieLoader';

const meta: Meta<typeof LottieLoader> = {
  title: 'Common/Atoms/Loader/Lottie',
  component: LottieLoader,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof LottieLoader>;

export const Lottie: Story = {};