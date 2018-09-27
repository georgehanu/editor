import React, { Component } from "react";
import { fabric } from "../../../../rewrites/fabric/fabric";
import { FabricRenderer, applyNodeProps } from "../reconciler/index";
import { createElement } from "../utils/createElement";
import logger from "../../../../shared/logger/logger";

class Fabric extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this._stage = createElement("Canvas", this.props, this.canvasRef.current);
    //this._stage = new fabric.Canvas(this.canvasRef.current);
    window.canvas = this._stage.instance;
    this._stage._applyProps(this.props, {});

    this._mountNode = FabricRenderer.createContainer(this._stage);

    FabricRenderer.updateContainer(this.props.children, this._mountNode, this);
  }

  componentDidUpdate(prevProps, prevState) {
    logger.info("componentDidUpdate");
    this._stage._applyProps(this.props, prevProps);
    FabricRenderer.updateContainer(this.props.children, this._mountNode, this);
  }

  render() {
    const props = this.props;

    return (
      <React.Fragment>
        <canvas
          ref={this.canvasRef}
          width={props.width}
          height={props.height}
        />
      </React.Fragment>
    );
  }
}
export default Fabric;
export { Image, Fabric };
