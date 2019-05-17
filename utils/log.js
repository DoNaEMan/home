const log = (msg, type) => {
  console.log(`----------------${type}-------------------`);
  console.log(`time: ${new Date().toLocaleString()}`);
  console.log(`url: ${msg.url || (msg.config && msg.config.url)}`);
  try {
    console.log(`${JSON.stringify(msg)}`);
  } catch (e) {
    console.log(msg);
  }
  console.log('------------------------------------------');
};

export default log;
