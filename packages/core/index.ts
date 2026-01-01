export const processCommand = (cmd: string) => {
  console.log(`Core processing: ${cmd}`);
  return { status: 'ok' };
};
