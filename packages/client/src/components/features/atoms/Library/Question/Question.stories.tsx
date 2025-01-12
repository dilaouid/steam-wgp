import type { Meta, StoryObj } from '@storybook/react';

import { Question } from './Question';

const meta: Meta<typeof Question> = {
  title: 'Features/Atoms/Library/Question',
  component: Question,
  tags: ['autodocs'],
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

export const DefaultQuestionDocumentation: Story = {};
