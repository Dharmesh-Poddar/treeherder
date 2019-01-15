import React from 'react';
import { Table } from 'reactstrap';
import { react2angular } from 'react2angular/index.es2015';
import PropTypes from 'prop-types';

import perf from '../js/perf';

export default class CompareTable extends React.Component {
  render() {
    const { titles, compareResults } = this.props;
    console.log(compareResults, titles);
    return (
      <Table sz="small">
        <thead>
          <tr>
            <th className="test-title"><span className="word-wrap break-word">{titles[compareResults.testName]}</span></th>
            <th style={{ width: "140px" }}>Base</th>
            {/* empty for less than/greater than data */}
            <th style={{ width: "30px" }} />
            <th style={{ width: "140px" }}>New</th>
            <th style={{ width: "80px" }}>Delta</th>
            {/* empty for graphical difference */}
            <th style={{ width: "120px" }} />
            <th style={{ width: "100px" }}>Confidence</th>
            <th className="num-runs" style={{ width: "80px" }}># Runs</th>
            {/* empty for warning message, if not enough data */}
            <th className="test-warning" style={{ width: "30px" }} />
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr> */}
        </tbody>
      </Table>
    );
  }
}

CompareTable.propTypes = {
  titles: PropTypes.shape({}).isRequired,
  compareResults: PropTypes.shape({}).isRequired,
  testList: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  frameworks: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  filterOptions: PropTypes.shape({}).isRequired,
  filterByFramework: PropTypes.number.isRequired,
  $rootScope: PropTypes.object.isRequired,
};

perf.component(
  'compareTable',
  react2angular(CompareTable, ['compareResults', 'titles', 'testList', 'frameworks', 'filterOptions', 'filterByFramework'], ['$rootScope']),
);
