import React, { Component } from 'react';
import Example1 from './components/Example1/Example1';
import Example2 from './components/Example2/Example2';
import Example3 from './components/Example3/Example3';
import Example4 from './components/Example4/Example4';
import Example5 from './components/Example5/Example5';

class App extends Component {
  render() {
    const s = require('./App.scss');
    return (
      <div className={s.App}>
        <h1>Animation</h1>
        <Example1 />
        <br/>
        <Example2 />
        <br/>
        <Example3 />
        <br/>
        <Example4 />
        <br/>
        <h2>Click the images to see Magic...</h2>
        <Example5 src={'http://blog.goalcast.life/wp-content/uploads/2016/06/vaynerchuk-1.jpg'} className={s.image} />
        <Example5 src={'http://www.workwithjelena.com/wp-content/uploads/2016/07/13392297_10154189638148350_7323703504541641978_o.jpg'} className={s.image} />
      </div>
    );
  }
}

export default App;
