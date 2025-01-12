import type { Meta, StoryObj } from '@storybook/react';

import { DiagramIcon } from './Diagram';

const meta: Meta<typeof DiagramIcon> = {
  title: 'Common/Atoms/Icons/Stats',
  component: DiagramIcon,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof DiagramIcon>;

export const Diagram: Story = {};