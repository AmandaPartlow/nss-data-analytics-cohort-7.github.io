// initialize the tool-tip plugin for Bootstrap4
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})


$.ajax({
  url: "data/cohort.json"
}).done(cohortMembers)
  .fail(function (error) {
    console.log("error", error);
  });

function cohortMembers(list) {
  let data = list.cohort;
  data.forEach(function (item) {
    let studentContact = `<div class="studentContact">`
    //if student doesn't have a portfolio site then don't display the icon
    if (item.portfolio != null) {

      studentContact += `<a href=${item.portfolio} target="_blank">
      <i class="fas fa-globe fa-2x contactIcons"></i>
      </a>`
    }
    //if student doesn't have a github site then don't display the icon
    if (item.github != null) {

      studentContact += `<a href=${item.github} target="_blank">
      <i class="fab fa-github fa-2x contactIcons"></i>
      </a>`
    }
    //if student doesn't have a linkedin site then don't display the icon
    if (item.linkedIn != null) {

      studentContact += `<a href=${item.linkedIn} target="_blank">
      <i class="fab fa-linkedin fa-2x contactIcons"></i>
      </a>`
    }
    //if student doesn't have an email then don't display the icon
    if (item.email != null) {

      studentContact += `<a href=mailto:${item.email}>
              <i class="fas fa-envelope fa-2x contactIcons"></i>
            </a>`
    }
    studentContact += `</div>`

    let studentInfo = `<div class="col-md-3 cohortMems">
          <img class="card-img-top" src="${item.proImg}" alt="${item.firstName} ${item.lastName}" data-toggle="modal" data-target="#cohortMember${item.id}" style="cursor:pointer;">
          <div class="card-body">
            <h4 class="card-title title-font">${item.firstName} ${item.lastName}</h4>`
    //if student didn't provide a reelthemin quote then nothing is displayed
    if (item.reelThemIn != null) {
      studentInfo += `<p class="card-text">${item.reelThemIn}</p>`
    }
    studentInfo += studentContact


    //Student resume
    studentInfo += `
    <center>
    <a target="_blank" href="${item.resume}">
    <button type="button" class="btn btn-outline-primary title-font bottom" style="margin-bottom:0.15cm;">
    View Resume
    </button>
    </a>
    </center>
    `

    //Student demo video
    studentInfo += `
            <center>
            <button type="button" style="margin-bottom:0.15cm;" class="btn btn-outline-primary title-font bottom" data-toggle="modal" data-target="#cohortVideo${item.id}">
           Capstone Video Demo
          </button></center>
    `

    //if a student doesn't have a bio, then the learn more button doesn't appear and a modal isn't created
    if(item.bio != null){

    studentInfo += `
            <center><button type="button" class="btn btn-outline-primary title-font bottom" data-toggle="modal" data-target="#cohortMember${item.id}">
           Learn More!
          </button></center>
          </div>
        </div>`
    //modal info
    studentInfo +=`
        <div class="modal fade" id="cohortMember${item.id}" tabindex="-1" role="dialog" aria-labelledby="cohortMember${item.id}Label" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
           <h5 class="modal-title title-font" id="cohortMember${item.id}Label">${item.firstName} ${item.lastName}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <center><img src="${item.funImg}" /></center><br>

            `

    studentInfo += studentContact


    studentInfo += `
      
    ${item.bio}
    </div>
    <center><button type="button" data-dismiss="modal" class="backButton btn btn-outline-primary title-font bottom" aria-label="Close">
      Back
              </button></center>
            
          </div >
        </div >
      </div > `
      
      //video link
      studentInfo += `
      <div id="cohortVideo${item.id}" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content" style="width:625px;">
      <div class="modal-header">
        <h4 class="modal-title">${item.firstName} ${item.lastName} Final Capstone</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
      <div class="modal-body">
        <center>
          <iframe width="600" height="360" id="yt-player${item.id}" src="${item.demo}">
          </iframe>

        </center>
      </div>
    </div>

  </div>
</div>
      `;
    } else {
      studentInfo += `
      </div>
        </div>
        `
    }



    document.getElementById("cohort").innerHTML += studentInfo;

  });
};
//checks to see if url string is empty, if not, creates specified image
function createLink(urlString, img, mail) {
  let link = urlString !== '' ? `< a href = "${urlString}" target = "_blank" > <img src="/images/${img}.png"></a>` : '<!-- -->';
  return link
};

function createMailto(urlString, img) {
  let link = urlString !== '' ? `< a href = "mailto:${urlString}" target = "_blank" > <img src="/images/${img}.png"></a>` : '<!-- -->'
  return link
}

$.ajax({
  url: "data/techs.json"
}).done(techs)
  .fail(function (error) {
    console.log("error", error);
  });

function techs(list) {
  let data = list.techs;
  data.forEach(function (item) {
    document.getElementById("techs").innerHTML +=
      `<div class="col-sm-2 technologies">
         <center><a href="${item.link}" target="_blank"><img class="techs" src="${item.image}" alt="${item.name}" data-toggle="tooltip" data-placement="top" title="${item.name}"></a><br>
         </center>
      </div>`;
  });
};
