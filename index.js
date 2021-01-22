var net = require('net');
var os = require('os');
var CONSTANTS = require('./constants');
var job = require('./job');

var LF = Buffer.alloc(1);
LF.writeUInt8(CONSTANTS.LF);

var SP = Buffer.alloc(1);
SP.writeUInt8(CONSTANTS.SP);

var lpr = function(options) {
  this.options = options || {};
  this.options.ip = options.ip || CONSTANTS.DEFAULT.IP;
  this.options.port = options.port || CONSTANTS.DEFAULT.PORT;
  this.options.queue = options.queue || CONSTANTS.DEFAULT.QUEUE;
  this.options.user = options.user || CONSTANTS.DEFAULT.USER;
  this.debug = options.debug || function() {};
  this.jobNumber = 0;
  this.connected = false;
  this.socket = new net.Socket();
};

lpr.prototype.createJob = function(options) {
  this.jobNumber++;
  return new job(this, options);
};

lpr.prototype.connect = function(cb) {
  if (this.connected) {
    return cb(new Error('Already connected'));
  }
  var self = this;
  this.socket.on('close', function() {
    self.debug('Connection closed');
    self.connected = false;
  });
  this.socket.connect(this.options.port, this.options.ip, function(err) {
    if (err) {
      return cb(err);
    }
    self.connected = true;
    self.debug('Connected to ' + self.options.ip + ':' + self.options.port);
    cb();
  });
};

lpr.prototype.disconnect = function() {
  this.connected = false;
  this.socket.destroy();
};

lpr.prototype._send = function() {
  var self = this;
  var args = [].slice.call(arguments);
  var cmdName = args.shift();
  var cmd = CONSTANTS.COMMAND[cmdName];
  var cb = args.pop();
  var log = "Sending " + cmdName;
  var command = Buffer.alloc(1);
  command.writeUInt8(cmd.CODE);
  var buffers = [command];
  cmd.ARGS.forEach(function(argName, i) {
    var arg = args.shift();
    if (i > 0) {
      buffers.push(SP);
    }
    buffers.push(Buffer.from(arg));
    log += " " + argName + ": " + arg;
  });
  buffers.push(LF);

  if (!this.connected) {
    return cb(new Error('socket is not connected'));
  }
  this.debug(log);

  var onData = function(data) {
    if (['SEND_QUEUE_STATE_SHORT', 'SEND_QUEUE_STATE_LONG'].indexOf(cmdName) === -1) {
      self.socket.removeListener('data', onData);
    } else {
      self.debug('Received: ' + data.toString());
    }
    self.debug('Received: ' + data.toString('hex'));

    if (data.toString('hex') !== '00') {
      return cb(new Error('LPD reject command with code ' + data.toString('hex')))
    }
    cb(null, data);
  };
  this.socket.on('data', onData);

  this.socket.write(Buffer.concat(buffers));
};

lpr.prototype._sendRaw = function(raw, cb) {
  var self = this;
  var onData = function(data) {
    self.socket.removeListener('data', onData);
    self.debug('for raw data Received: ' + data.toString('hex'));
    cb(null, data);
  };
  this.socket.on('data', onData);

  // End
  var end = Buffer.alloc(1);
  end.writeUInt8(0);

  this.socket.write(Buffer.concat([raw, end]));
};


lpr.prototype.listJobs = function() {
  this._send('SEND_QUEUE_STATE_LONG', this.options.queue, this.options.user, function() {});
};

module.exports = lpr;
