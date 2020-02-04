import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider, connect, ConnectedProps, batch } from "react-redux";
import { store, increment } from "./store";

const divEl = document.querySelector("div");

const ReduxCounter: React.FC<ConnectedProps<typeof connectReduxCounter>> = ({
  count
}) => <div>Redux state (`ReduxCounter`): {count}</div>;

const connectReduxCounter = connect(state => ({ count: state }));
const ReduxCounterEnhanced = connectReduxCounter(ReduxCounter);

class Counter extends React.Component<
  ConnectedProps<typeof connectCounter>
> {
  run = () => {
    this.props.dispatch(increment());
  }

  render() {
    return (
      <div>
        <div>Redux state (`Counter`): {this.props.count}</div>
        <ReduxCounterEnhanced />
        <button onClick={this.run}>run</button>
      </div>
    );
  }
}

const connectCounter = connect(state => ({ count: state }));
const CounterEnhanced = connectCounter(Counter);

ReactDOM.render(
  <Provider store={store}>
    <CounterEnhanced />
  </Provider>,
  divEl
);
