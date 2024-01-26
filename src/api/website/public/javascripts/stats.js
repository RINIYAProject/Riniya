fetch("https://api.riniya.uk/api/invite").then(r => r.json()).then(data => {
  const url = JSON.parse(JSON.stringify(data)).data.invite_url
  document.getElementById('getstarted').setAttribute("href", url)
  document.getElementById('invite').setAttribute("href", url)
})

fetch("https://api.riniya.uk/api/stats").then(r => r.json()).then(data => {
  const stats = JSON.parse(JSON.stringify(data)).data;
  $(document).ready(function() {
    if (stats.users === undefined) {
      $('#users').text(stats.data.users + "+")
      $('#servers').text(stats.data.guilds + "+")
      $('#commands').text(stats.data.commands + "+")
    } else {
      $('#users').text(stats.users + "+")
      $('#servers').text(stats.guilds + "+")
      $('#commands').text(stats.commands + "+")
    }

    $('#users-load').remove()
    $('#servers-load').remove()
    $('#commands-load').remove()
  });
});
