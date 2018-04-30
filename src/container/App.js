import React, { Component } from 'react';
import { Simulator, RegisterAccessType } from 'mips-core';

import { Editor, HardWare } from 'container';
import { Header } from 'component';
import { REGISTER_MAP } from 'constant/mips';

import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      line: 0,
      set: -1,
      get: -1,
      reset: -1,
    }
    this.simulator = new Simulator(REGISTER_MAP, 1, 1);
    this.simulator.observer = (line) => {
      this.setState({line: line});
    }
    this.simulator.registerFile.setObserver((regNum, registerAccessType) => {
      switch (registerAccessType) {
        case 0:
          this.setState({
            get: regNum,
            set: -1,
            reset: -1,
          });
          break;
        case 1:
          this.setState({
            set: regNum,
            get: -1,
            reset: -1,
          });
          break;
        case 2:
          this.setState({
            reset: regNum,
            set: -1,
            get: -1,
          });
          break;
      }
    });
    this.run = this.run.bind(this);
    this.getClassName = this.getClassName.bind(this);
  }

  run(asm) {
    this.simulator.run(asm);
  }

  getClassName(num) {
    switch (num) {
      case this.state.get:
        return 'get';
      case this.state.set:
        return 'set';
      case this.state.reset:
        return 'reset';
      default:
        return '';
    }
  }

  render() {
    return (
      <div className="app">
        <Header/>
        <div className="container">
          <Editor run={this.run} line={this.state.line}/>
          <div className="hardware">
            <h1>Register</h1>
            {Object.keys(REGISTER_MAP).map(reg => {
              const regNum = REGISTER_MAP[reg];
              return (
                <div
                  key={regNum}
                  className={`reg ${this.getClassName(regNum)}`}
                >
                  <div>{reg}</div>
                  <div>
                    {this.simulator.registerFile.getRegister(regNum).value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
