import React, { Component } from 'react';

import './Editor.css';

export class Editor extends Component {
  constructor(props) {
    super(props);
    this.editor = null;
    this.run = this.run.bind(this);
    this.decorations = [];
  }

  run(asm) {
    this.props.run(this.editor.getValue());
  }

  componentDidMount() {
    const code = [
      'addi $t0, $zero, 1',
      'addi $t1, $zero, 3',
      'add $t2, $t0, $t1',
      'addi $t0, $zero, 3',
      'addi $t0, $zero, 4',
      'addi $t0, $zero, 6',
    ].join('\n');

    monaco.editor.setTheme('vs-dark');
    this.editor = monaco.editor.create(
      document.getElementById('monaco'),
      {
        value: code,
      },
    );
  }

  render() {
    if (this.editor) {
      this.decorations = this.editor.deltaDecorations(this.decorations, [
        {
          range: new monaco.Range(1, 1, 1, 1),
          options : {}
        }
      ]);

      const highlightLine = this.props.line + 1;

      this.decorations = this.editor.deltaDecorations(this.decorations, [
        {
          range: new monaco.Range(highlightLine, 1, highlightLine,1),
          options: {
            isWholeLine: true,
            className: 'highlightLine',
          }
        }
      ]);
    }

    return (
      <div className="editor-conatiner">
        <header>
          <button onClick={this.run}>Run</button>
        </header>
        <div id="monaco" className="editor"></div>
      </div>
    );
  };
}
