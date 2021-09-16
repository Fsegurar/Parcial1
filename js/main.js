
(function() {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                console.log(form.checkValidity())
                event.preventDefault();
                event.stopPropagation();
            }else if(form.checkValidity()===true){
                document.getElementById("mean-button").setAttribute("disabled",true)
                document.getElementById("clean-button").removeAttribute("disabled")
                let div_pronunciacion = document.createElement("div");
                let div_usos = document.createElement("div");
                let div_definicion = document.createElement("div");
                let div_ejemplo = document.createElement("div");
                let p = document.createElement("p")
                let word = document.getElementById("word-input").value;
                
                
                    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+word)
                    .then(response => response.json())
                    .then(data => {
                        if(data.title==="No Definitions Found"){
                            alert("Palabra no encontrada")
                            window.location.reload();
                        }
                        console.log(data)
                        data.map((list) =>{
                            for(let i=0;i<list.phonetics.length;i++){
                                let p = document.createElement("p")
                                p.innerHTML=list.phonetics[i].text
                                div_pronunciacion.appendChild(p)
                                if(list.phonetics[i].audio!=undefined){
                                let audio = document.createElement("audio")
                                audio.setAttribute("src","https:"+list.phonetics[i].audio)
                                audio.setAttribute("controls","")
                                div_pronunciacion.appendChild(audio)
                                }
                            }
                            for(let i=0;i<list.meanings.length;i++){
                                for(let j =0;j<list.meanings[i].definitions.length;j++){
                                    let p = document.createElement("p")
                                    p.innerHTML=list.meanings[i].definitions[j].definition
                                    div_definicion.appendChild(p)
                                    if(list.meanings[i].definitions[j].example!=undefined){
                                        let p = document.createElement("p")
                                        p.innerHTML=list.meanings[i].definitions[j].example
                                        div_ejemplo.appendChild(p)
                                    }
                                }
                            }

                            for(let i=0;i<list.meanings.length;i++){
                                let p = document.createElement("p")
                                p.innerHTML=list.meanings[i].partOfSpeech
                                div_usos.appendChild(p)
                            }
                            
                        });
                    });
                    event.preventDefault();
                    event.stopPropagation();
                    document.getElementById("pronunciacion").appendChild(div_pronunciacion)
                    document.getElementById("definicion").appendChild(div_definicion)
                    document.getElementById("usos").appendChild(div_usos)   
                    document.getElementById("ejemplo").appendChild(div_ejemplo)          
            };
            form.classList.add('was-validated');
        }, false);
    });       
})();

document.getElementById("clean-button").onclick= function(){
    window.location.reload();
}