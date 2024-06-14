import propTypes from 'prop-types'
import { useState } from './lib/react/ReactHooks'

function App({ id }) {
  const [count, setCount] = useState(0)

  return (
    <div className="container" id={id}>
      <div className="one">
        <div className="two">
          <p>1</p>
          <p>2</p>
        </div>
        <div className="three">
          <p>3</p>
          <p>4</p>
        </div>
      </div>
      <p>this is a tes1</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <span>{count}</span>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  )
}

// class App extends React.Component {
//   constructor(props) {
//     super(props)
//   }
//   render() {
//     return (
//       <div className="container" id={this.props.id}>
//         <div className="one">
//           <div className="two">
//             <p>11111</p>
//             <p>222222</p>
//           </div>
//           <div className="three">
//             <p>3333</p>
//             <p>444444</p>
//           </div>
//         </div>
//         <p>this is a test!!!</p>
//       </div>
//     )
//   }
// }

App.propTypes = {
  id: propTypes.string.isRequired
}
export default App
