import React, { Component } from "react";
import Switch from "react-switch";

class MaterialDesignSwitch extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    return (
      <div className="example">
        <label htmlFor="material-switch">
          <Switch
            checked={this.state.checked}
            onChange={this.handleChange}
            onColor="#38bd1a"
            onHandleColor="#FFFFFF"
            handleDiameter={17}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={40}
            className="react-switch"
            id="material-switch"
          />
          {/* <div className="text-center ">
             {this.state.checked ? 'on' : 'off'}
            

             </div> */}
        </label>
      </div>
    );
  }
}
export default MaterialDesignSwitch;
