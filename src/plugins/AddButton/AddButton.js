import React, { Component } from "react";
import assign from "object-assign";
import { connect } from "react-redux";
import addButtonReducer from "../../stores/reducers/addButton";
import { addImage } from "../../stores/actions/addButton";
import { changeTheme } from "../../stores/actions/theme";

class AddButton extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.addImageHandler}>{this.props.title}</button>
        <button onClick={() => this.props.changeThemeHandler("dark")}>
          Dark
        </button>
        <button onClick={() => this.props.changeThemeHandler("base")}>
          Base
        </button>
      </div>
    );
  }
}

// let's export the plugin and a set of required reducers

const mapStateToProps = state => {
  return {
    title: state.addbutton.title,
    theme: state.theme.theme
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addImageHandler: () => dispatch(addImage()),
    changeThemeHandler: theme => dispatch(changeTheme(theme))
  };
};

const AddButtonPlugin = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddButton);

export default {
  AddButtonPlugin: assign(AddButtonPlugin, {
    TabBar: {
      position: 1
    }
  }),
  reducers: { addbutton: addButtonReducer }
};
