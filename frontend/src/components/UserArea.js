import React, {Component} from 'react';

class UserArea extends Component {
  render() {
    return <div className="UserArea" style={{
        flexGrow: 1,
        padding: '0rem 1rem 0rem 1rem',
        flexBasis: 150,
        overflow: 'scroll',
        borderLeft: '1px solid silver'
      }}>
      <div>Users:</div>
      <ul style={{padding: 0}}>
        {this.props.users.map(user => <li
          key={user}
          style={{listStyleType: 'none'}}
        >
          {user}
        </li>)}
      </ul>
    </div>
  }
}

export default UserArea;