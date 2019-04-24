const log = (msg) => {
  console.log('------------------------------------------');
  console.log(`time: ${new Date().toLocaleString()}`);
  console.log(`url: ${msg.url || (msg.config && msg.config.url)}`);
  console.log(`data: ${msg.data || (msg.config && msg.config.data)}`);
  console.log('------------------------------------------');
};

export default log;
