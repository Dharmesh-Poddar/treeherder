import React from 'react';
import { Table } from 'reactstrap';
import { react2angular } from 'react2angular/index.es2015';
import PropTypes from 'prop-types';
import '../css/perf.css';

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
    return (
      Object.entries(compareResults).map(([testName, data]) =>
      <Table sz="small" className="compare-table" key={testName}>
        <thead>
          <tr className="subtest-header">
            <th className="text-left"><span className="word-wrap break-word">{testName}</span></th>
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
            <th className="text-left" style={{ width: "30px" }} />
          </tr>
        </thead>
        <tbody>
        {data.map((platform, index) =>
        <tr key={index} className={this.getCompareClass(platform, 'row')}>
          <th className="text-left font-weight-normal">{platform.name}
            {platform.links &&
            <span className="result-links">
              {platform.links.map(link => <span key={link.title}><a href={link.href}>{` ${link.title}`}</a></span>)}
            </span>}
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
