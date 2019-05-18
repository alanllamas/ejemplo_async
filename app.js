var container = document.getElementById('container');
var numberHtml = document.getElementById('numbers')
var prev = document.getElementById('prev')
var next = document.getElementById('next')

var data = [];
async function fetchPeople(path){
    container.innerHTML = ''
    // console.log(path);
    let rawPeople = await fetch(path)
    // console.log('rawPeople: ', rawPeople);
    
    let people = await rawPeople.json() 
    // console.log('people: ', people);
    
    data = people;
    
    // console.log(people.results[0].homeworld);
    
    // rawHomeworld = await fetch(people.results[0].homeworld)
    // console.log('rawHomeworld: ', rawHomeworld);
    
    // homeworld = await rawHomeworld.json()
    // console.log(homeworld);

    // rawResidents = await fetch(homeworld.residents[1])
    // residents = await rawResidents.json()

    // console.log(residents);
    
    
    
    // console.log('rawPeople: ', rawPeople);
    // console.log('people: ', people);
    
    // console.log(people.results);
    people.results.map(person => {
        // console.log('person: ', person);
        
        const {name,gender,height,birth_year, mass, eye_color} = person;
        container.innerHTML += `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 id="name" url="${person.url}" class="card-title">${person.name}</h5>
                <p class="card-text">Genero: ${person.gender}</p>
                <p class="card-text">Altura: ${person.height}</p>

            </div>
        </div>` 
    })
    title = document.getElementById('name')
    title.addEventListener('click', function name(event) {
        // console.log(event);
        // console.log(event.target);
        // console.log(event.target.value);
        
    })
    paginate(path)
    
}
function goNext() {
    fetchPeople(data.next)
}
function goPrevious() {
    fetchPeople(data.previous)
}
function paginate(path){
    current = path.indexOf('=') !== -1 ? Number(path[path.indexOf('=') + 1]) : 1
    // console.log(current);
    // console.log(data);
    // console.log('data.previous: ', data.previous);
    // console.log('data.next: ', data.next);

    if (data.previous !== null) {
        prev.addEventListener('click', goPrevious)
    } else {
        
    }
    if (data.next !== null) {
        next.addEventListener('click', goNext)
    } else {

    }

    number = Math.ceil( data.count / 10)
    // console.log('number;', number);
    // console.log('number;', numberHtml);
    numberHtml.innerHTML = ''
    for (let index = 1; index <= number; index++) {
        numberHtml.innerHTML += index === current ? 
          `<span class="number current" onclick="fetchPeople('https://swapi.co/api/people/?page=${index}')">${index}</span>`
        : `<span class="number" onclick="fetchPeople('https://swapi.co/api/people/?page=${index}')">${index}</span>`
    }
    
}
fetchPeople('https://swapi.co/api/people/')



