const log = (msg, type) => {
  const data = msg.data || (msg.config && msg.config.data);
  console.log(`----------------${type}-------------------`);
  console.log(`time: ${new Date().toLocaleString()}`);
  console.log(`url: ${msg.url || (msg.config && msg.config.url)}`);
  console.log(`data: ${typeof data === 'object' ? JSON.stringify(data) : data}`);
  console.log('------------------------------------------');
};

export default log;
