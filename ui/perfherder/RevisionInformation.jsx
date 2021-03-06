import React from 'react';
import PropTypes from 'prop-types';
import { react2angular } from 'react2angular/index.es2015';
import { ListGroup, ListGroupItem } from 'reactstrap';

import perf from '../js/perf';
import { getJobsUrl } from '../helpers/url';

function getRevisionSpecificDetails(
  revision,
  project,
  isBaseline,
  resultSet,
  selectedTimeRange = null,
) {
  const truncatedRevision = revision.substring(0, 12);
  const baselineOrNew = isBaseline || selectedTimeRange ? 'Base' : 'New';

  return (
    <React.Fragment>
      <strong>{baselineOrNew}</strong> -&nbsp;
      {revision ? (
        <a href={getJobsUrl({ repo: project.name, revision })}>
          {truncatedRevision}
        </a>
      ) : (
        truncatedRevision
      )}
      &nbsp;({project.name}) -&nbsp;
      {resultSet ? resultSet.author : selectedTimeRange.text} -&nbsp;
      {resultSet ? <span>{resultSet.comments}</span> : ''}
    </React.Fragment>
  );
}

export default function RevisionInformation(props) {
  const {
    originalProject,
    originalRevision,
    newProject,
    newRevision,
    originalResultSet,
    newResultSet,
    selectedTimeRange,
  } = props;

  return (
    <ListGroup className="d-inline push-information">
      {originalRevision && (
        <ListGroupItem className="d-inline border-0">
          {getRevisionSpecificDetails(
            originalRevision,
            originalProject,
            true,
            originalResultSet,
          )}
        </ListGroupItem>
      )}
      {selectedTimeRange && (
        <ListGroupItem className="d-inline border-0">
          {getRevisionSpecificDetails(
            originalRevision,
            originalProject,
            true,
            null,
            selectedTimeRange,
          )}
        </ListGroupItem>
      )}
      <ListGroupItem className="d-inline border-0">
        {getRevisionSpecificDetails(
          newRevision,
          newProject,
          false,
          newResultSet,
        )}
      </ListGroupItem>
    </ListGroup>
  );
}

RevisionInformation.propTypes = {
  originalProject: PropTypes.object,
  originalRevision: PropTypes.string.isRequired,
  newProject: PropTypes.object,
  newRevision: PropTypes.string.isRequired,
  originalResultSet: PropTypes.object,
  newResultSet: PropTypes.object,
  selectedTimeRange: PropTypes.number,
};

RevisionInformation.defaultProps = {
  originalProject: {},
  newProject: {},
  originalResultSet: {},
  newResultSet: {},
  selectedTimeRange: undefined,
};

perf.component('revisionInformation', react2angular(RevisionInformation));
