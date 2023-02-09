import "../styles/App/App.css";
import Home from '../components/Home';
import AddNewKurs from '../components/AddNewKurs';
import EditKurs from '../components/EditKurs';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalProvider } from "../components/context/GlobalState";

function App() {
    return (
        <div className="wrapper">
            <GlobalProvider>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}  />
                        <Route path="/add" component={AddNewKurs}  />
                        <Route path="/edit/:id" component={EditKurs}  />
                    </Switch>
                </Router>
            </GlobalProvider>
        </div>
    );
}

export default App;
