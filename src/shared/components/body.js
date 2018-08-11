import React from 'react';
import autobind from 'autobind-decorator';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import fileDownload from 'js-file-download';
import format from 'date-fns/format';

const json2csv = require('json2csv').parse;

const fields = { fields: ['email'] };

function transformData(data) {
  return data.map(d => {
    return { email: d };
  });
}

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      data: null,
      loading: false,
      downloaded: false,
      downloading: false,
    };
  }

  @autobind
  getUrl(event) {
    let url = event.currentTarget.value;
    this.setState({ url });
  }

  @autobind
  goGetInfo() {
    let { url } = this.state;
    let body = { params: { url } };
    this.setState({
      downloaded: false,
      downloading: false,
      loading: true,
    });
    axios
      .get('/getInfo', body)
      .then(res => {
        let { data } = res;
        this.setState({ data, loading: false });
      })
      .catch(error => {
        console.error(error);
      });
  }

  @autobind
  downloadEmails() {
    let { data } = this.state;
    data = transformData(data);
    let date = format(Date.now(), 'MM/DD/YYYY');
    let csv = json2csv(data, fields);
    fileDownload(csv, `${date}_emails.csv`);
    this.setState({ downloaded: true, downloading: false });
  }

  @autobind
  render() {
    let { data, url, downloaded, downloading, loading } = this.state;

    return (
      <React.Fragment>
        <div className="search_container">
          <TextField
            required
            onChange={this.getUrl}
            id="required"
            placeholder="Place the url you want emails from here"
            margin="normal"
            fullWidth
          />
          <Button
            variant="raised"
            color="primary"
            onClick={this.goGetInfo}
            className="button_submit"
          >
            Go Get Em!
          </Button>
        </div>
        {data && (
          <div className="emails_container" styles="margin:5em auto;">
            <Loading
              downloaded={downloaded}
              downloading={downloading}
              dwEmails={this.downloadEmails}
            />
            <Emails data={data} url={url} />
          </div>
        )}
        {!data && loading && <Spinner />}
      </React.Fragment>
    );
  }
}

function Emails({ data, url }) {
  let title = `Emails from ${url}`;
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow className="table_header">
            <TableCell>Id</TableCell>
            <TableCell>{title}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((n, i) => {
            return (
              <TableRow key={n}>
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {n}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

function Loading({ downloaded, downloading, downloadFail, dwEmails }) {
  if (!downloaded && !downloading && !downloadFail) {
    return (
      <Button
        variant="raised"
        color="secondary"
        disabled={downloaded || downloading}
        onClick={dwEmails}
        className="button_submit"
      >
        Download
      </Button>
    );
  }
}

function Spinner() {
  return <div className="spinner" />;
}
