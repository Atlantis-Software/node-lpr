var os = require('os');
var CONSTANTS = require('./constants');

var LF = Buffer.alloc(1);
LF.writeUInt8(CONSTANTS.LF);

var SP = Buffer.alloc(1);
SP.writeUInt8(CONSTANTS.SP);

var job = function(printer, options) {
  this.printer = printer;
  this.options = options;
  if (!options.name) {
    throw new Error('job require a name');
  }
  if (!options.data) {
    throw new Error('job require data');
  }
  this.number = this.printer.jobNumber;
  this.file = "dfA" + ("00" + this.number).slice(-3) + os.hostname();
};

job.prototype._controleFileLine = function() {
  var args = [].slice.call(arguments);
  var lineName = args.shift();
  lineName = lineName.replace(/ /g, '_');
  lineName = lineName.toUpperCase();
  var line = CONSTANTS.CONTROL_FILE[lineName];
  var content = [Buffer.from(line.CODE)];
  line.ARGS.forEach(function(argument, i) {
    var arg = args.shift();
    if (i > 0) {
      content.push(SP);
    }
    content.push(Buffer.from(arg));
  });
  content.push(LF);
  return Buffer.concat(content);
};

job.prototype._controlFile = function() {
  var lines = [];

  lines.push(this._controleFileLine('host name', os.hostname()));
  lines.push(this._controleFileLine('user identification', this.printer.options.user));
  lines.push(this._controleFileLine('job name for banner page', this.options.name));
  //lines.push(this._controleFileLine('print file leaving control characters', this.file));
  //lines.push(this._controleFileLine('print postscript output file', this.file));
  lines.push(this._controleFileLine('unlink data file', this.file));
  lines.push(this._controleFileLine('name of source file', this.options.name));
  
  var controlFile = Buffer.concat(lines);
  return controlFile;
};

job.prototype.send = function(cb) {
  var self = this;
  this.printer._send('RECEIVE_PRINTER_JOB', this.printer.options.queue, function(err) {
    if (err) {
      return cb(err);
    }
    var controlFile = self._controlFile();
    var count = (controlFile.length).toString();
    var name = "cfA" + ("00" + self.number).slice(-3) + os.hostname();
    self.printer._send('RECEIVE_CONTROL_FILE', count, name, function(err) {
      if (err) {
        return cb(err);
      }
      self.printer._sendRaw(controlFile, function(err) {
        if (err) {
          return cb(err);
        }
        var count = (self.options.data.length).toString();
        self.printer._send('RECEIVE_DATA_FILE', count, self.file, function(err) {
          if (err) {
            return cb(err);
          }
          self.printer._sendRaw(self.options.data, function(err) {
            if (err) {
              return cb(err);
            }
            self.printer._send('PRINT_ANY_WAITING_JOBS', self.printer.options.queue ,cb);
          });
        });
      });
    });
  });
};

module.exports = job;
