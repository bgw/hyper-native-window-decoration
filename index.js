const DEFAULT_TITLE = 'Hyper';
const SESSION_SET_XTERM_TITLE = 'SESSION_SET_XTERM_TITLE';
const SESSION_SET_ACTIVE = 'SESSION_SET_ACTIVE';
const SESSION_ADD = 'SESSION_ADD';

exports.decorateBrowserOptions = defaults => Object.assign({}, defaults, {
  frame: true,
  autoHideMenuBar: true,
  darkTheme: true,
});

exports.decorateHeader = (Header, env) => {
  // passing isMac prevents Header from drawing the header bar
  class DecoratedHeader extends env.React.Component {
    render() {
      return env.React.createElement(Header, Object.assign({}, this.props, {
        isMac: true
      }));
    }
  };
  return DecoratedHeader;
};

exports.decorateConfig = config => {
  return Object.assign({}, config, {
    css: `
      .tabs_nav {
        top: 0px;
      }
      .terms_terms {
        margin-top: 0;
      }
      .terms_termsShifted {
        margin-top: 34px;
      }
      ${config.css || ''}
    `,
  });
}

function setTitle(title) {
  console.log(title);
  const win = require('electron').remote.getCurrentWindow();
  win.setTitle(title || DEFAULT_TITLE);
}

exports.reduceSessions = (state, action) => {
  console.log(action);
  switch (action.type) {
    case SESSION_SET_XTERM_TITLE:
      if (action.uid === state.activeUid) {
        setTitle(action.title.trim());
      }
      break;
    case SESSION_SET_ACTIVE:
      setTitle(state.sessions[action.uid].title);
      break;
    case SESSION_ADD:
      setTitle('');
      break;
  }
  return state;
}
