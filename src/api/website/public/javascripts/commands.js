fetch("https://api.riniya.uk/api/cmd").then(r => r.json()).then(data => {
  const commands = JSON.parse(JSON.stringify(data)).data

  for (let command in commands) {
    let cmd = commands[command]

    let options = "";
    for (let option in cmd.options) {
      let opt = cmd.options[option]
      options.concat(`<${opt.name}>`);
    }

    if (cmd.options.length <= 0) {
      options = 'No arguments'
    }

    $('#commands-list').append(`<tr><td>${cmd.category}</td> <td>${cmd.name}</td><td>${cmd.description}</td><td>${options}</td></tr>`);

    setTimeout(() => {
      $('#loading-commands').remove()
      $('#commands-list').removeAttribute('hidden')
    }, 3000)
  }
})
