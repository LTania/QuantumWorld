import './App.css';
import  '@blueprintjs/core/lib/css/blueprint.css'
import {Provider} from "react-redux";
import store from "./store";
import {ResultsComponent} from "./components/Results.component";
import {SelectorComponent} from "./components/Selector.component";
import {ChartsComponent} from "./components/Charts.component";

function App() {
  return (
      <Provider store={store}>
          <div className="App">
              <div className=".header">
                  <h3> Алгоритми факторизації </h3>
              </div>
              <SelectorComponent/>
              <ResultsComponent/>
              <ChartsComponent/>
          </div>
      </Provider>
  );
}

export default App;
