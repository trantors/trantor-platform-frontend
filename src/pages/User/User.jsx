import React, { Component } from 'react';
import PlatformUserTable from './components/PlatformUserTable';
import PlatformUserEditor from './components/PlatformUserEditor';
import PlatformUserInfoCard from './components/PlatformUserInfoCard';

export default class User extends Component {
  static displayName = 'User';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-page">
        <PlatformUserTable />
        <PlatformUserEditor />
        <PlatformUserInfoCard />
      </div>
    );
  }
}
