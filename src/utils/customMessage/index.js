// eslint-disable-next-line @typescript-eslint/no-var-requires
const expectCustomMessage = require('./expectCustomMessage');

global.expect = expectCustomMessage(global.expect);
