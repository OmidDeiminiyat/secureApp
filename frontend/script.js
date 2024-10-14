
const fetchData = async () => {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        
        document.getElementById('Container').innerHTML = data[1].id; 
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

window.onload = fetchData;
