function getIssues() {
  let title = $('#title').val()
  let body = $('#body').val()
  let owner = $('#forkedRepo')[0].dataset.owner
  let repo = $('#forkedRepo')[0].dataset.repo
  fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
    method: 'GET',
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then(res => res.json()).then(json => showIssues(json))
}

function showIssues(json) {
  json.forEach((issue) => {
    $('#issues').append(`
      <p>Issue Title: ${issue.title} Issue Body: ${issue.body}</p>
      `)
  })
}

function createIssue() {
  let title = $('#title').val()
  let body = $('#body').val()
  let owner = $('#forkedRepo')[0].dataset.owner
  let repo = $('#forkedRepo')[0].dataset.repo
  fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
    method: 'POST',
    body: JSON.stringify({
      title: `${title}`,
      body: `${body}`
    }),
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then(getIssues)
}

function showResults(json) {
  $('#results').html(`
    <a href=${json.html_url} id="forkedRepo" data-owner="${json.owner.login}" data-repo="${json.name}">${json.html_url}</a>`)
}

function forkRepo() {
  const repo = 'learn-co-curriculum/javascript-fetch-lab'
  //use fetch to fork it!
  fetch(`https://api.github.com/repos/${repo}/forks`, {
    method: 'POST',
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then(res => res.json()).then(json => showResults(json))
}

function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  return ''
}
