// Function to fetch data from a JSON source
async function fetchCollegeData() {
    try {
        const response = await fetch('colleges.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching college data:', error);
        return []; // Return an empty array in case of an error
    }
}

// Function to extract labels and values from JSON
function processCollegeData(data) {
    const labels = data.map(college => college.name); // Extract names
    const values = data.map(college => college.registrations); // Extract counts
    return { labels, values };
}

// Function to generate dynamic colors
function generateDynamicColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        colors.push(`rgb(${r}, ${g}, ${b})`);
    }
    return colors;
}

// Function to render the pie chart
function renderPieChart(labels, values) {
    const ctx = document.getElementById('collegePieChart').getContext('2d');
    const colors = generateDynamicColors(labels.length); // Generate colors dynamically

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Registrations',
                data: values,
                backgroundColor: colors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });
}

// Main function to initialize everything
async function init() {
    const collegeData = await fetchCollegeData(); // Fetch dynamic data
    if (collegeData.length > 0) {
        const { labels, values } = processCollegeData(collegeData);
        renderPieChart(labels, values); // Render the chart
    } else {
        console.error('No data available to display.');
    }
}

// Call the initialization function
init();
