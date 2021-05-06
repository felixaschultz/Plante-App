function sendIdentification(file) {
    const files = [file];
    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const res = event.target.result;
            resolve(res);
          }
          reader.readAsDataURL(file);
      })
    })
    
    Promise.all(promises).then((base64files) => {
            
      console.log(base64files);
      const data = {
        api_key: "iF01Etqb3LEywM5G0TCH4ikp8MZPTH3kLm5jQs7Hs6DSOXjdZV",
        images: base64files,
        modifiers: ["crops_fast", "similar_images"],
        plant_language: "en",
        plant_details: ["common_names",
                          "url",
                          "name_authority",
                          "wiki_description",
                          "taxonomy",
                          "synonyms"]
      };
      
      fetch('https://api.plant.id/v2/identify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        const PlantName = data.suggestions[0].plant_details.scientific_name;
        const des = data.suggestions[0].plant_details.wiki_description.value;
        const body = document.querySelector(".profileHome__Info--text");
        const hadLine = document.querySelector(".profileHome__name");
        const profileDes = document.querySelector(".profileHome__description");

        hadLine.textContent = PlantName;
        profileDes.textContent = des;
        /* body.innerHTML = `<h2>Science Name: ${PlantName}</h2>
        <p>${des}</p>`; */
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    })
};

const messages = document.querySelector(".messages");
const loadingScreen = document.querySelector(".loadingScreen");
const profile = document.querySelector(".profileHome");
const messageBTN = document.querySelector(".--messNav");
const image = document.querySelector(".profileHome__image");
const tro = document.querySelector(".--click");

tro.addEventListener("click", function(){
  document.querySelector(".trophy-Big").classList.toggle("--big");
  setTimeout(function(){
    if(document.querySelector(".trophy-Big").classList.contains("--big")){
      document.querySelector(".trophy-Big").classList.toggle("--big");
    }
  },1000);
});

function loadingScreenLoading(){
    if(window.location.href.indexOf("app/index.html") > -1){
        setTimeout(function(){
            loadingScreen.style.top = "-100%";
        }, 2000)
    }
}

profile.addEventListener("click", function(e){
    
    this.classList.toggle("--expand");
    if(this.classList.contains("--expand")){
      fetchImage(image.src);
    }
})

fetchImage(image.src);

messageBTN.addEventListener("click", function(){
    messages.classList.toggle("--expand"); 
})

function fetchImage(url){
  fetch(url).then(response => {
    return response.blob();
  }).then(file => {
      console.log(file);
      sendIdentification(file);
  })
}

loadingScreenLoading();