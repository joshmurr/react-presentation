import flowers from './images/flowers.png'
import cnn from './images/cnn.png'
import fig from './images/test_fig.svg'

console.log(flowers)
console.log(cnn)
console.log(fig)

//function importAll(r) {
  //let images = {};
  //r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  //return images;
//}

//const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

export const slides_data = {
  title: "Presentation Title",
  slidesList: [
  {
    title: "Slide One",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    content: [flowers, "Some text." ]
  },
  {
    title: "This is a Really Long Title for Slide Two Which Might Cause Problems",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    content: [cnn, "Some text." ]
  },
  {
    title: "Slide Three",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    content: [fig, "Some text." ]
  },
  {
    title: "Empty Slide",
  }
]
}
