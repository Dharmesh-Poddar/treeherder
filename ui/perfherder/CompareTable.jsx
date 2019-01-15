import React from 'react';
import { Table } from 'reactstrap';
import { react2angular } from 'react2angular/index.es2015';
import PropTypes from 'prop-types';

import perf from '../js/perf';

export default class CompareTable extends React.Component {
  getCompareClass = (data, type) => {
    if (data.isEmpty) return 'subtest-empty';
    if (type === 'row' && data.highlightedTest) return 'active subtest-highlighted';
    if (type === 'bar' && data.isRegression) return 'bar-regression';
    if (type === 'bar' && data.isImprovement) return 'bar-improvement';
    if (type === 'bar' || type === 'row') return '';
    return data.className;
  }
  render() {
    const { compareResults } = this.props;
    // console.log(compareResults)
    // const data = compareResults[0];
    // const testName = Object.keys(data);
    // console.log(data, testName);
    return (
      Object.entries(compareResults).map(([testName, data]) =>
      <Table sz="small">
        <thead>
          <tr>
            <th className="test-title"><span className="word-wrap break-word">{testName}</span></th>
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
        {data.map(platform =>
        <tr className={() => this.getCompareClass(platform, 'row')}>
          <th className="test-title">{platform.name}
            {platform.links &&
            platform.links.map(link => <a className="result-links" href={link.href}>{` ${link.title}`}</a>)}
          </th>
        </tr>)}
        {/* <tr ng-class="getCompareClasses(compareResult, 'row')" ng-repeat="compareResult in compareResults.results | orderBy: 'name' track by $index">
          <td class="test-title">{{compareResult.name}}&nbsp;&nbsp;
            <span class="result-links" ng-if="compareResult.links.length > 0">
              <span ng-repeat="link in compareResult.links track by link.title">
                <a ng-href="{{link.href}}">{{link.title}}</a>
                <span ng-if="!$last"> · </span>
              </span>
            </span>
          </td>
        </tr> */}
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
      </Table>)
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
};

perf.component(
  'compareTable',
  react2angular(CompareTable, ['compareResults', 'titles', 'testList', 'frameworks', 'filterOptions', 'filterByFramework'], []),
);
