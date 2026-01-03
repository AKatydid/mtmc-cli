import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import TextInput from 'ink-text-input';

const App = () => {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useInput((input, key) => {
    if (key.return && query.trim().length > 0) {
      setSubmitted(true);
      // TODO core process command
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

      {/* Tips Lists*/}
      <Box flexDirection="column" marginBottom={1}>
        <Text color="white" bold>Tips for getting started:</Text>
        <Text color="gray">1. Ask questions, edit files, or run commands.</Text>
        <Text color="gray">2. Be specific for the best results.</Text>
        <Text color="gray">3. <Text color="magenta">/help</Text> for more information.</Text>
      </Box>

      {/* Input Bar */}
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
      
      {/* Status */}
      <Box marginTop={0}>
        <Text color="gray" dimColor>Using: MTMC.md files</Text>
      </Box>
    </Box>
  );
};

export default App;
