


### 'sto' 단축키의 경우
```jsx
1. 파일 제목을 'TestSnippet.stories.tsx' 로 쓰고 
2. 단축키 sto 를 넣으면 
3. 아래와 같이 나옴 

import type { Meta, StoryObj } from '@storybook/react';

import TestSnippet.stories from './TestSnippet.stories';

const meta = {
  component: TestSnippet.stories,
  tags: ['autodocs'],
} satisfies Meta<typeof TestSnippet.stories>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 기본적인_사용법: Story = {
  args: {},
};

4. 수정해야 하는 건, 'stories' 이 부분을 빼야 함

```

<br>

### 'sto-sjw-0805' 단축키의 경우
```jsx
1. 파일 제목을 'TestSnippet.stories.tsx' 로 쓰고 
2. 단축키 sto-sjw-0805 를 넣으면 
3. 아래와 같이 나옴 

import type { Meta, StoryObj } from '@storybook/react';
import _components from './_components';

const meta = {,
  component: _components,
} satisfies Meta<typeof _components>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 기본표시 = {};

4. 수정해야 하는 건, 
1) import 되는 파일을 수정

```