import type { Meta, StoryObj } from '@storybook/react';

import { Question as Comp } from './Question';

const meta: Meta<typeof Comp> = {
  title: 'Features/Library/Atoms',
  component: Comp,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Question',
  },
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const QuestionDocumentationLibrary: Story = {};