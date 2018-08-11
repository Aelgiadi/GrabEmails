import axios from 'axios';
import uniq from 'lodash/uniq';

function getEmails(data) {
  let emails = data.match(
    /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
  );
  return emails;
}

module.exports.getHTML = (req, res) => {
  let { url } = req.query;
  console.log('THIS IS THE URL', url);
  axios
    .get(url)
    .then(response => {
      let emails = getEmails(response.data);
      emails = uniq(emails);
      res.status(200).send(emails);
    })
    .catch(error => {
      res.status(400).send(error);
    });
};
