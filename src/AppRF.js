import React, { Component } from "react";
import { Image, Text, IText, Fabric } from "./packages/core/react-fabric";
import * as _ from "ramda";
import logger from "./shared/logger/logger";

//const editor = new Editor({});

// class LoadedImage extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   image = new window.Image();
//   state = {
//     image: this.image
//   };
//   componentDidMount() {
//     this.image.src = this.props.src;
//     this.image.onload = () => {
//       this.setState({
//         image: this.image
//       });
//     };
//   }

//   render() {
//     return <Image image={this.state.image} {...this.props} />;
//   }
// }

const defaultImages = [
  "http://www.flexibleproduction.com/wp-content/uploads/2017/06/test-intelligenza-sociale.jpg",
  "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&h=350",
  "http://www.flexibleproduction.com/wp-content/uploads/2017/06/test-intelligenza-sociale.jpg",
  "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg",
  "https://images.pexels.com/photos/371633/pexels-photo-371633.jpeg?auto=compress&cs=tinysrgb&h=350",
  "https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2018/04/jonathan-martin-brunate-lead-image_0.jpg",
  "https://www.evoke-landscape-design.co.uk/wp-content/uploads/home-tree.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnln4X6Wha8vlaJMTkL3KEK2_v3Hxov3RqLJ5EZgJc3LbS47IG",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-XeKxMs9AQOlzv0IxEF3mjc9wkGw0HNMPmCq8Scf9JHZcxqL7hQ"
];

class App extends Component {
  state = {
    images: [
      {
        id: "image-1",
        type: "image",
        width: Math.random() * 500,
        height: Math.random() * 500,
        left: Math.random() * 500,
        top: Math.random() * 500,
        src: defaultImages[parseInt(Math.random() * defaultImages.length)]
      },
      {
        id: "image-2",
        type: "image",
        width: Math.random() * 500,
        height: Math.random() * 500,
        left: Math.random() * 500,
        top: Math.random() * 500,
        src: defaultImages[parseInt(Math.random() * defaultImages.length)]
      },
      {
        id: "text-1",
        type: "text",
        text: "Click me",
        width: Math.random() * 500,
        height: Math.random() * 500,
        left: Math.random() * 500,
        top: Math.random() * 500,
        shadow: "rgba(0,0,0,0.3) 5px 5px 5px",
        stroke: "#ff1318",
        strokeWidth: 1,
        fontStyle: "italic"
      }
    ],
    canvasSize: {
      width: 1800,
      height: 800
    }
  };

  addImageHandler = () => {
    const newImage = {
      id: "image-" + 2 + Math.random() * 100,
      type: "image",
      width: Math.random() * 1700,
      height: Math.random() * 700,
      left: Math.random() * 1700,
      top: Math.random() * 700,
      src: defaultImages[parseInt(Math.random() * defaultImages.length)]
    };

    this.setState({
      images: this.state.images.concat(newImage)
    });
  };

  changeSizeHandler = () => {
    this.setState({
      canvasSize: {
        width: 1000,
        height: 1000
      }
    });
  };

  onMovingHandler = args => {
    if (args) {
      const { target } = args;
      console.log(target);
      let updatedImages = [...this.state.images];
      const updatedImageId = _.findIndex(_.propEq("id", target.id))(
        updatedImages
      );
      let updatedImage = { ...updatedImages[updatedImageId] };
      if (target.left <= 100) updatedImage.left = 100;
      else if (target.left >= 1700) updatedImage.left = 1700;
      else updatedImage.left = target.left;
      updatedImage.top = target.top;
      updatedImages = _.compose(
        _.insert(updatedImageId, updatedImage),
        _.remove(updatedImageId, 1)
      )(updatedImages);
      const updatedState = {
        images: updatedImages
      };
      this.setState(updatedState);
    }
  };

  render() {
    console.log("App rerender");
    let elements = this.state.images.map(element => {
      switch (element.type) {
        case "image":
          return (
            <Image
              key={element.id}
              {...element}
              onMoving={this.onMovingHandler}
            />
          );
        case "text":
          return (
            <IText
              key={element.id}
              {...element}
              onMoving={this.onMovingHandler}
            />
          );
        default:
          break;
      }
      return null;
    });

    console.log(elements);

    return (
      <React.Fragment>
        <div
          style={{
            background: "red"
          }}
        >
          <Fabric
            width={this.state.canvasSize.width}
            height={this.state.canvasSize.height}
          >
            {elements}
          </Fabric>
        </div>
        <button onClick={this.addImageHandler}>Add New Image</button>
      </React.Fragment>
    );
  }
}

export default App;
