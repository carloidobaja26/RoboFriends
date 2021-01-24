import React, {Component} from 'react';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import ErrorBoundary from '../Components/ErrorBoundary';



class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {return response.json();
            })
            .then(users => {this.setState({robots: users});
            })
       
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value});
    }

    render() {
        const {robots, searchfield } = this.state;
        const filterRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        if (!robots.length){
            return <h1>Loading</h1>
        }
        else{
            return (
                <div className='tc'>
                    <h1> RoboFriends</h1>
                    <SearchBox searchChange = {this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots = {filterRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
        }

    }
}

export default App;