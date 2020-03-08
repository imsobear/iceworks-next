# `@iceworks/project-generate`

generate project by npm template.

## Usage

```typescript
import { downloadAndGenerateProject } from '@iceworks/project-generate';

await downloadAndGenerateProject(projectDir, '@alifd/scaffold-lite');
// custom version
await downloadAndGenerateProject(projectDir, '@icedesign/pro-scaffold', '3.0.12')
// custom registry
await downloadAndGenerateProject(projectDir, '@icedesign/pro-scaffold', null, 'https://regisry.custom.org');
```