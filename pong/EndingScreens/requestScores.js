// functions to communicate with the database

export default function getScores(){

  fetch('http://localhost:3000/playerScores').then(response => {
    
    if (!response.ok) {
      throw new Error('Failed to connect to the database');
    }
    return response.json();
  })

  .then(data => {
    console.log(data);
  })

  .catch(error => {
    console.error('Error', error);
  });

}
