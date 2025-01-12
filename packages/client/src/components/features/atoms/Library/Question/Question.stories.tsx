import type { Meta, StoryObj } from '@storybook/react';

import { Question } from './Question';

const meta: Meta<typeof Question> = {
  title: 'Features/Library/Atoms/Question',
  component: Question,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Question',
  },
};

export default meta;
type Story = StoryObj<typeof Question>;

export const QuestionDocumentationLibrary: Story = {
  args: {
    children: 'Question',
  },
};