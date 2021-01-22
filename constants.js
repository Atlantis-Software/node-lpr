module.exports = {
  COMMAND: {
    PRINT_ANY_WAITING_JOBS: {
      CODE: 0x01,
      ARGS: ['queue']
    },
    RECEIVE_PRINTER_JOB: {
      CODE: 0x02,
      ARGS: ['queue']
    },
    RECEIVE_CONTROL_FILE: {
      CODE: 0x02,
      ARGS: ['count', 'name']
    },
    RECEIVE_DATA_FILE: {
      CODE: 0x03,
      ARGS: ['count', 'name']
    },
    SEND_QUEUE_STATE_SHORT: {
      CODE: 0x03,
      ARGS: ['queue', 'list']
    },
    SEND_QUEUE_STATE_LONG: {
      CODE: 0x04,
      ARGS: ['queue', 'list']
    },
    REMOVE_JOBS: {
      CODE: 0x05,
      ARGS: ['queue', 'agent', 'list']
    },
    ABORT_JOB: {
      CODE: 0x01,
      ARGS: []    
    }
  },
  CONTROL_FILE: {
    CLASS_FOR_BANNER_PAGES: {
      CODE: 'C',
      ARGS: ['class']
    },
    HOST_NAME: {
      CODE: 'H',
      ARGS: ['host']
    },
    INDENT_PRINTING: {
      CODE: 'I',
      ARGS: ['count']
    },
    JOB_NAME_FOR_BANNER_PAGE: {
      CODE: 'J',
      ARGS: ['jobName']
    },
    PRINT_BANNER_PAGE: {
      CODE: 'L',
      ARGS: ['user']
    },
    MAIL_WHEN_PRINTED: {
      CODE: 'M',
      ARGS: ['user']
    },
    NAME_OF_SOURCE_FILE: {
      CODE: 'N',
      ARGS: ['name']
    },
    USER_IDENTIFICATION: {
      CODE: 'P',
      ARGS: ['name']
    },
    SYMBOLIC_LINK_DATA: {
      CODE: 'S',
      ARGS: ['device', 'inode']
    },
    TITLE_FOR_PR: {
      CODE: 'T',
      ARGS: ['title']
    },
    UNLINK_DATA_FILE: {
      CODE: 'U',
      ARGS: ['file']
    },
    WIDTH_OF_OUTPUT: {
      CODE: 'W',
      ARGS: ['width']
    },
    TROFF_R_FONT: {
      CODE: '1',
      ARGS: ['file']
    },
    TROFF_I_FONT: {
      CODE: '2',
      ARGS: ['file']
    },
    TROFF_B_FONT: {
      CODE: '3',
      ARGS: ['file']
    },
    TROFF_S_FONT: {
      CODE: '4',
      ARGS: ['file']
    },
    PLOT_CIF_FILE: {
      CODE: 'c',
      ARGS: ['file']
    },
    PRINT_DVI_FILE: {
      CODE: 'd',
      ARGS: ['file']
    },
    PRINT_FORMATTED_FILE: {
      CODE: 'f',
      ARGS: ['file']
    },
    PLOT_FILE: {
      CODE: 'g',
      ARGS: ['file']
    },
    PRINT_FILE_LEAVING_CONTROL_CHARACTERS: {
      CODE: 'l',
      ARGS: ['file']
    },
    PRINT_DISTROFF_OUTPUT_FILE: {
      CODE: 'n',
      ARGS: ['file']
    },
    PRINT_POSTSCRIPT_OUTPUT_FILE: {
      CODE: 'o',
      ARGS: ['file']
    },
    PRINT_FILE_WITH_PR_FORMAT: {
      CODE: 'p',
      ARGS: ['file']
    },
    PRINT_FILE_WITH_FORTRAN_CARRIAGE_CONTROL: {
      CODE: 'r',
      ARGS: ['file']
    },
    PRINT_TROFF_OUTPUT_FILE: {
      CODE: 't',
      ARGS: ['file']
    },
    PRINT_RASTER_FILE: {
      CODE: 'v',
      ARGS: ['file']
    }
  },
  LF: 0x0a,
  SP: 0x20,
  DEFAULT: {
    IP: '127.0.0.1',
    PORT: 515,
    QUEUE: 'raw',
    USER: 'dev'
  }
};
