import './App.css';
import { Button } from "@blueprintjs/core";
import  '@blueprintjs/core/lib/css/blueprint.css'
import {Provider} from "react-redux";
import store from "./store";
import {ResultsComponent} from "./components/Results.component";

function App() {
  return (
      <Provider store={store}>
          <div className="App">
              <ResultsComponent/>
          </div>
      </Provider>
  );
}

export default App;
