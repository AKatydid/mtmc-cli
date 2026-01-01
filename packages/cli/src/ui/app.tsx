import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import TextInput from 'ink-text-input';

const App = () => {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // 处理 Enter 键
  useInput((input, key) => {
    if (key.return && query.trim().length > 0) {
      setSubmitted(true);
      // 这里可以调用 Core 包的逻辑
      // processCommand(query);
    }
  });

  if (submitted) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text color="green">✔ Command received: {query}</Text>
        <Text color="gray">Processing...</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" paddingX={1} paddingY={1}>
      {/* 1. Logo 区域 - 已修改为蓝紫渐变风格 */}
      <Box flexDirection="column" alignItems="center" marginBottom={1}>
        <Gradient colors={['#3b82f6', '#a855f7']}>
          <BigText 
            text="MTMC-CLI" 
            font="block" 
            align='center' 
          />
        </Gradient>
        <Text color="#6366f1" bold>
          MARCO THINKING, MICRO CODING
        </Text>
      </Box>

      {/* 2. Tips 列表区域 */}
      <Box flexDirection="column" marginBottom={1}>
        <Text color="white" bold>Tips for getting started:</Text>
        <Text color="gray">1. Ask questions, edit files, or run commands.</Text>
        <Text color="gray">2. Be specific for the best results.</Text>
        <Text color="gray">3. <Text color="magenta">/help</Text> for more information.</Text>
      </Box>

      {/* 3. 输入框区域 */}
      <Box 
        borderStyle="round" 
        borderColor="gray" 
        paddingX={1}
        flexDirection="row"
      >
        <Box marginRight={1}>
          <Text color="cyan">{'>'}</Text>
        </Box>
        <TextInput
          value={query}
          onChange={setQuery}
          placeholder="Type your message or @path/to/file"
        />
      </Box>
      
      {/* 底部状态栏 */}
      <Box marginTop={0}>
        <Text color="gray" dimColor>Using: 2 MTMC.md files | 1 MCP server</Text>
      </Box>
    </Box>
  );
};

export default App;
