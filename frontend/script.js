
const fetchData = async () => {
    try {
        const response = await fetch('http://localhost:2020/api/data');
        const data = await response.json();
        console.log(data);
        
        document.getElementById('Container').innerHTML = 'just for the test'; 
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

window.onload = fetchData;

