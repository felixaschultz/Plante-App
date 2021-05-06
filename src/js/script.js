function sendIdentification() {
    const files = [document.querySelector(".profileHome__image").src];
    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const res = event.target.result;
            console.log(res);
            resolve(res);
          }
          file = URL.createObjectURL(file);
          console.log(file);

          reader.readAsDataURL(file)
      })
    })
    
    Promise.all(promises).then((base64files) => {
            
      const data = {
        api_key: "iF01Etqb3LEywM5G0TCH4ikp8MZPTH3kLm5jQs7Hs6DSOXjdZV",
        images: document.querySelector(".profileHome__image").src,
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
        const body = document.querySelector(".profileHome__Info--text");


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

function loadingScreenLoading(){
    if(window.location.href.indexOf("app/index.html") > -1){
        setTimeout(function(){
            loadingScreen.style.top = "-100%";
        }, 2000)
    }
}

profile.addEventListener("click", function(){
    this.classList.toggle("--expand");
    sendIdentification();
})

messageBTN.addEventListener("click", function(){
    messages.classList.toggle("--expand"); 
})

loadingScreenLoading();