import React, { Component } from 'react';
import SearchTable from './components/SearchTable';
import GroupedForm from './components/GroupedForm';

export default class Platform extends Component {
  static displayName = 'Platform';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="platform-page">
        <SearchTable />
        <GroupedForm />
      </div>
    );
  }
}
